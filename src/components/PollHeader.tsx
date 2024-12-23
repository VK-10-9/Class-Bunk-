import React from 'react';
import { format } from 'date-fns';

interface PollHeaderProps {
  date: Date;
}

export function PollHeader({ date }: PollHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Class Attendance Poll for {format(date, 'dd MMMM yyyy')}
      </h1>
      <p className="mt-2 text-gray-600">
        Please indicate your attendance plans for tomorrow's class.
      </p>
    </div>
  );
}