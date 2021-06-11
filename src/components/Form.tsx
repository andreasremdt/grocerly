import { FormEvent, useState } from "react";
import { Grocery } from "../types";

type FormProps = {
  onSubmit: (payload: Grocery) => void;
};

function Form({ onSubmit }: FormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit({
      id: Date.now(),
      name,
      amount: parseInt(amount, 10),
      unit,
      checked: false,
    });

    setName("");
    setAmount("");
    setUnit("");
  };

  return (
    <form noValidate autoCorrect="off" onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(evt) => setName(evt.target.value)} />
      <input type="number" value={amount} onChange={(evt) => setAmount(evt.target.value)} />
      <select value={unit} onChange={(evt) => setUnit(evt.target.value)}>
        <option value="g">g (gram)</option>
        <option value="kg">kg (kilogram)</option>
        <option value="ml">ml (mililitres)</option>
        <option value="l">l (litres)</option>
        <option value="pieces">pieces</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
