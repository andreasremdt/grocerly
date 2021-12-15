import { useContext } from "react";

import { GroceryContext } from "../GroceryContext";
import __ from "../utils/translate";
import styles from "./AmountInput.module.css";

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
    <div className={styles["amount-controls"]}>
      <button
        type="button"
        className={styles["amount-button"]}
        onClick={decrease}
        disabled={value === "" || value === "0"}
      >
        -
      </button>
      <input
        className={styles["amount-input"]}
        type="number"
        placeholder={__("form.quantity", language)}
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
      />
      <button type="button" className={styles["amount-button"]} onClick={increase}>
        +
      </button>
    </div>
  );
}

export default AmountInput;
