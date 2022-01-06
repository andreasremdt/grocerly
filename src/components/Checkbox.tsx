import React from "react";

function Checkbox({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label>
      <input type="checkbox" className="hidden peer" {...props} />
      <span className="flex items-center justify-center h-7 w-7 bg-gray-50 shadow-sm border border-gray-200 rounded-sm text-gray-50 peer-checked:shadow-purple-100 peer-checked:bg-purple-50 peer-checked:text-purple-500 peer-checked:border-purple-200">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
    </label>
  );
}

export default Checkbox;
