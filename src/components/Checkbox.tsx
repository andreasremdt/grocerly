import React from "react";

import styles from "./Checkbox.module.css";

function Checkbox({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={className}>
      <input type="checkbox" className={styles.input} {...props} />
      <span className={styles.knob}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
    </label>
  );
}

export default Checkbox;
