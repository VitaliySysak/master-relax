'use client';

import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  options: Date[];
  disabled?: boolean;
}

export const TimeSelect: React.FC<Props> = ({ value, onChange, options, disabled }) => {
  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-white">Choose time</label>
      <select
        disabled={disabled}
        className="bg-transparent text-white border border-gray-500 rounded px-2 py-1 disabled:opacity-50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Select time --</option>
        {options.map((slot, index) => (
          <option key={index} value={slot.toISOString()}>
            {formatTime(slot)}
          </option>
        ))}
      </select>
    </div>
  );
};
