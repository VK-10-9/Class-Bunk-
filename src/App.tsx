import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { getDeviceHash } from './lib/deviceId';
import { PollResults } from './components/PollResults';
import { PollHeader } from './components/PollHeader';
import { PollOptions } from './components/PollOptions';
import { ErrorMessage } from './components/ErrorMessage';
import { SuccessMessage } from './components/SuccessMessage';
import { DeadlineInfo } from './components/DeadlineInfo';

const POLL_OPTIONS = [
  'Planning to attend class',
  'Unable to attend class',
  'Undecided'
];

const POLL_DATE = new Date('2024-12-24');
const DEADLINE = new Date('2024-12-24');
DEADLINE.setHours(23, 59, 59, 999);

// Use the same UUID as defined in the migration
const POLL_ID = '00000000-0000-0000-0000-000000000001';

function App() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<{ [key: string]: number }>({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async () => {
    const { data: votes } = await supabase
      .from('votes')
      .select('choice')
      .eq('poll_id', POLL_ID);

    if (votes) {
      const voteCounts = votes.reduce((acc, vote) => {
        acc[vote.choice] = (acc[vote.choice] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });
      
      setResults(voteCounts);
      setTotalVotes(votes.length);
    }
  };

  useEffect(() => {
    fetchResults();
    
    const channel = supabase
      .channel('votes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'votes' }, () => {
        fetchResults();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleVote = async () => {
    if (!selectedOption) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const deviceHash = getDeviceHash();
      
      const { error: voteError } = await supabase
        .from('votes')
        .insert([
          {
            poll_id: POLL_ID,
            choice: selectedOption,
            device_hash: deviceHash
          }
        ]);

      if (voteError) {
        if (voteError.code === '23505') {
          setError('You have already voted in this poll');
        } else {
          setError('An error occurred while submitting your vote');
        }
        return;
      }

      setHasVoted(true);
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <PollHeader date={POLL_DATE} />

          {!hasVoted ? (
            <div className="space-y-4">
              <PollOptions
                options={POLL_OPTIONS}
                selectedOption={selectedOption}
                onOptionSelect={setSelectedOption}
              />

              {error && <ErrorMessage message={error} />}

              <button
                onClick={handleVote}
                disabled={!selectedOption || isSubmitting}
                className={`w-full py-2 px-4 rounded-md text-white font-medium
                  ${
                    !selectedOption || isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Vote'}
              </button>
            </div>
          ) : (
            <SuccessMessage />
          )}

          <div className="pt-6 border-t">
            <PollResults results={results} total={totalVotes} />
          </div>

          <DeadlineInfo deadline={DEADLINE} />
        </div>
      </div>
    </div>
  );
}

export default App;