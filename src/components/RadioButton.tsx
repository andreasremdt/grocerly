import { ChangeEvent, MouseEvent } from "react";

type RadioButtonProps = {
  value: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: MouseEvent<HTMLInputElement>) => void;
};

function RadioButton({ value, checked, onChange, onClick, ...props }: RadioButtonProps) {
  return (
    <label className="flex-1">
      <input
        type="radio"
        value={value}
        name="unit"
        checked={checked}
        onChange={onChange}
        onClick={onClick}
        className="hidden peer"
        {...props}
      />
      <span className="h-10 px-2 flex items-center justify-center font-semibold uppercase text-xs bg-gray-50 shadow-sm border border-gray-200 hover:border-gray-300 rounded-sm peer-checked:shadow-purple-100 peer-checked:bg-purple-100 peer-checked:text-purple-500 peer-checked:border-purple-200 peer-checked:hover:border-purple-300">
        {value}
      </span>
    </label>
  );
}

export default RadioButton;
