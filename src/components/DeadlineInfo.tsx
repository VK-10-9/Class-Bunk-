import React from 'react';
import { format } from 'date-fns';

interface DeadlineInfoProps {
  deadline: Date;
}

export function DeadlineInfo({ deadline }: DeadlineInfoProps) {
  return (
    <div className="space-y-3 pt-6 border-t text-sm text-gray-500">
      <p>
        <strong>Submission deadline:</strong>{' '}
        {format(deadline, "HH:mm 'on' dd MMMM yyyy")}
      </p>
      <p className="italic">
        Note: This poll is for planning purposes only. Your response helps us
        prepare appropriately for tomorrow's class.
      </p>
    </div>
  );
}