import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function SuccessMessage() {
  return (
    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-md">
      <CheckCircle2 className="w-5 h-5" />
      <p>Thank you for your response!</p>
    </div>
  );
}