import { CheckIcon } from "@heroicons/react/outline";
import React from "react";

function Checkbox({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label>
      <input type="checkbox" className="hidden peer" {...props} />
      <span className="flex items-center justify-center h-7 w-7 bg-gray-50 shadow-sm border border-gray-200 rounded-sm text-gray-50 peer-checked:shadow-purple-100 peer-checked:bg-purple-50 peer-checked:text-purple-500 peer-checked:border-purple-200">
        <CheckIcon className="w-5 h-5" />
      </span>
    </label>
  );
}

export default Checkbox;