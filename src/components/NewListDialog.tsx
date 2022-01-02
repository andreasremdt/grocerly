import { SyntheticEvent, useEffect, useState } from "react";

import styles from "./NewListDialog.module.css";
import { GroceryList } from "../types";

type NewListDialogProps = {
  onSubmit: (newList: GroceryList) => void;
  onCancel: () => void;
};

function NewListDialog({ onSubmit, onCancel }: NewListDialogProps) {
  const [name, setName] = useState("");

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    onSubmit({
      id: Date.now(),
      name,
    });
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div className={styles.dialog} role="dialog">
      <form onSubmit={handleSubmit} className={styles.inner}>
        <div>
          <label htmlFor="name" className={styles.label}>
            Provide a name for this grocery list:
          </label>
          <input
            type="text"
            id="name"
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <footer className={styles.footer}>
          <button type="button" className={styles["secondary-button"]} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles["primary-button"]}>
            Okay
          </button>
        </footer>
      </form>
    </div>
  );
}

export default NewListDialog;
