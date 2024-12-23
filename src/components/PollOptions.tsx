import React from 'react';

interface PollOptionsProps {
  options: string[];
  selectedOption: string | null;
  onOptionSelect: (option: string) => void;
}

export function PollOptions({ options, selectedOption, onOptionSelect }: PollOptionsProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option}
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedOption === option
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <input
            type="radio"
            name="attendance"
            value={option}
            checked={selectedOption === option}
            onChange={(e) => onOptionSelect(e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="ml-3 text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
}