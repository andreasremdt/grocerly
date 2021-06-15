import { ChangeEvent, MouseEvent } from "react";

import styles from "./RadioButton.module.css";

type RadioButtonProps = {
  value: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: MouseEvent<HTMLInputElement>) => void;
};

function RadioButton({ value, checked, onChange, onClick, ...props }: RadioButtonProps) {
  return (
    <label className={styles.label}>
      <input
        type="radio"
        value={value}
        name="unit"
        checked={checked}
        onChange={onChange}
        onClick={onClick}
        className={styles.input}
        {...props}
      />
      <span className={styles.display}>{value}</span>
    </label>
  );
}

export default RadioButton;
