import { useContext } from "react";

import { GroceryContext } from "../GroceryContext";
import Input from "./Input";
import __ from "../utils/translate";

type AmountInputProps = {
  value: string;
  onChange: (value: string) => void;
};

function getUpdatedAmount(amount: number, factor: number, subtract: boolean = false) {
  if (subtract) {
    return amount - factor - ((amount + factor) % factor);
  }

  return amount + factor - ((amount + factor) % factor);
}

function AmountInput({ value = "", onChange }: AmountInputProps) {
  const { language } = useContext(GroceryContext);

  function increase() {
    const amountAsNumber = Number(value);

    if (amountAsNumber < 10) {
      onChange(String(amountAsNumber + 1));
    } else if (amountAsNumber >= 10 && amountAsNumber < 100) {
      onChange(String(getUpdatedAmount(amountAsNumber, 10)));
    } else {
      onChange(String(getUpdatedAmount(amountAsNumber, 50)));
    }
  }

  function decrease() {
    const amountAsNumber = Number(value);

    if (amountAsNumber <= 10 && amountAsNumber > 0) {
      onChange(String(amountAsNumber - 1));
    } else if (amountAsNumber > 10 && amountAsNumber <= 100) {
      onChange(String(getUpdatedAmount(amountAsNumber, 10, true)));
    } else if (amountAsNumber > 0) {
      onChange(String(getUpdatedAmount(amountAsNumber, 50, true)));
    }
  }

  return (
    <div className="relative max-w-[120px]">
      <button
        type="button"
        className="h-8 w-8 bg-gray-50 border border-gray-200 rounded-sm absolute flex items-center justify-center left-1 top-1 active:bg-purple-50 active:text-purple-500 active:border-purple-200"
        onClick={decrease}
        disabled={value === "" || value === "0"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      <Input
        className="text-center w-full"
        type="number"
        placeholder={__("form.quantity", language)}
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
      />
      <button
        type="button"
        className="h-8 w-8 bg-gray-50 border border-gray-200 rounded-sm absolute flex items-center justify-center right-1 top-1 active:bg-purple-50 active:text-purple-500 active:border-purple-200"
        onClick={increase}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
}

export default AmountInput;
