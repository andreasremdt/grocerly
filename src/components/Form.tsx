import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";

import { GroceryContext } from "../GroceryContext";
import RadioButton from "./RadioButton";
import __ from "../utils/translate";
import styles from "./Form.module.css";
import AmountInput from "./AmountInput";

const UNITS = ["mg", "g", "kg", "ml", "l"];

function Form() {
  const { editing, dispatch, language, isFormVisible } = useContext(GroceryContext);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setAmount(editing.amount);
      setUnit(editing.unit);
    } else {
      setName("");
      setAmount("");
      setUnit("");
    }
  }, [editing]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (editing) {
      dispatch({
        type: "UPDATE_ITEM",
        payload: {
          id: editing.id,
          name,
          amount,
          unit: amount.length ? unit : "",
          checked: editing.checked,
        },
      });
    } else {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: Date.now(),
          name,
          amount,
          unit: amount.length ? unit : "",
          checked: false,
        },
      });

      inputRef.current?.focus();
    }

    setName("");
    setAmount("");
    setUnit("");
  };

  if (!isFormVisible) {
    return null;
  }

  return (
    <form noValidate autoCapitalize="off" onSubmit={handleSubmit} className={styles.wrapper}>
      <AmountInput value={amount} onChange={setAmount} />

      <div className={styles.units}>
        {UNITS.map((value) => (
          <RadioButton
            key={value}
            value={value}
            checked={value === unit}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setUnit(event.target.value)}
            onClick={() => setUnit("")}
          />
        ))}
      </div>
      <input
        ref={inputRef}
        className={styles["name-input"]}
        type="text"
        value={name}
        placeholder={__("form.name", language)}
        onChange={(evt) => setName(evt.target.value)}
        autoFocus
      />

      <button
        type="submit"
        className={styles.button}
        disabled={name.length < 1}
        data-testid="submit"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
    </form>
  );
}

export default Form;
