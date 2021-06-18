import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";

import { GroceryContext } from "../GroceryContext";
import RadioButton from "./RadioButton";
import __ from "../utils/translate";
import styles from "./Form.module.css";

const UNITS = ["mg", "g", "kg", "ml", "l"];

function Form() {
  const { editing, dispatch, language } = useContext(GroceryContext);
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

    if (name.length) {
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
      }

      setName("");
      setAmount("");
      setUnit("");

      inputRef.current?.focus();
    }
  };

  return (
    <form noValidate autoCapitalize="off" onSubmit={handleSubmit} className={styles.wrapper}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        value={name}
        placeholder={__("form.name", language)}
        onChange={(evt) => setName(evt.target.value)}
        autoFocus
      />
      <input
        className={styles.input}
        type="number"
        placeholder={__("form.quantity", language)}
        value={amount}
        onChange={(evt) => setAmount(evt.target.value)}
      />
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
      <button type="submit" className={styles.button}>
        {__("form.add", language)}
      </button>
    </form>
  );
}

export default Form;
