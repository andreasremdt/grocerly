import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";
import RadioButton from "./RadioButton";
import __ from "../utils/translate";
import AmountInput from "./AmountInput";
import Input from "./Input";
import Button from "./Button";

const UNITS = ["mg", "g", "kg", "ml", "l"];

function Form() {
  const { listId } = useParams();
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
          listId: Number(listId),
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
          listId: Number(listId),
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
    <form noValidate onSubmit={handleSubmit} className="bg-white shadow-md relative z-10">
      <div className="max-w-xl mx-auto p-2 flex flex-wrap gap-2">
        <AmountInput value={amount} onChange={setAmount} />

        <div className="flex gap-2 flex-1">
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
        <Input
          ref={inputRef}
          className="flex-1"
          type="text"
          value={name}
          placeholder={__("form.name", language)}
          onChange={(evt) => setName(evt.target.value)}
          autoFocus
        />

        <Button type="submit" disabled={name.length < 1} data-testid="submit">
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
        </Button>
      </div>
    </form>
  );
}

export default Form;
