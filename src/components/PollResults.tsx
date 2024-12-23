import React from 'react';
import { BarChart } from 'lucide-react';

interface PollResultsProps {
  results: {
    [key: string]: number;
  };
  total: number;
}

export function PollResults({ results, total }: PollResultsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-700">
        <BarChart className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Current Results</h2>
      </div>
      <div className="space-y-3">
        {Object.entries(results).map(([choice, count]) => (
          <div key={choice} className="space-y-1">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{choice}</span>
              <span>{total > 0 ? Math.round((count / total) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Total votes: {total}
      </p>
    </div>
  );
}