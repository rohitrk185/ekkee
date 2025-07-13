import React from "react";

interface ProgressProps {
  value: number; // 0 to 100
  className?: string;
}

export const Progress = ({ value, className }: ProgressProps) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className="bg-black h-2 rounded-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
