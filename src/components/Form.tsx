import { FormEvent, useEffect, useRef, useState } from "react";

import styles from "./Form.module.css";
import { Grocery } from "../types";

type FormProps = {
  editing: Grocery | null;
  onSubmit: (payload: Grocery) => void;
  onUpdate: (payload: Grocery) => void;
};

function Form({ onSubmit, onUpdate, editing }: FormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setAmount("" + editing.amount);
      setUnit(editing.unit);
    }
  }, [editing]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (name.length) {
      if (editing) {
        onUpdate({
          id: editing.id,
          name,
          amount: parseInt(amount, 10),
          unit,
          checked: editing.checked,
        });
      } else {
        onSubmit({
          id: Date.now(),
          name,
          amount: parseInt(amount, 10),
          unit,
          checked: false,
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
        placeholder="e.g. eggs, milk, spinach"
        onChange={(evt) => setName(evt.target.value)}
      />
      <input
        className={styles.input}
        type="number"
        placeholder="Quantity"
        value={amount}
        onChange={(evt) => setAmount(evt.target.value)}
      />
      <select
        data-testid="unit"
        className={styles.input}
        value={unit}
        onChange={(evt) => setUnit(evt.target.value)}
      >
        <option value=""></option>
        <option value="g">g (gram)</option>
        <option value="kg">kg (kilogram)</option>
        <option value="ml">ml (mililitres)</option>
        <option value="l">l (litres)</option>
      </select>
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
}

export default Form;
