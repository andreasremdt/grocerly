import { useContext } from "react";

import { GroceryContext } from "../GroceryContext";
import Input from "./Input";
import Icon from "./Icon";
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
        <Icon type="minus" />
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
        <Icon type="plus" />
      </button>
    </div>
  );
}

export default AmountInput;
