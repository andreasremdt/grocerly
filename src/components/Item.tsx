import styles from "./Item.module.css";
import { Grocery } from "../types";

type ItemProps = {
  item: Grocery;
  onDelete: (payload: Grocery) => void;
  onToggle: (payload: Grocery) => void;
};

function Item({ item, onDelete, onToggle }: ItemProps) {
  return (
    <li
      style={{ textDecoration: item.checked ? "line-through" : "none" }}
      onDoubleClick={() => onToggle(item)}
      className={styles.wrapper}
    >
      <span className={styles.amount}>
        {item.amount || ""}
        {item.unit}
      </span>
      <span className={styles.name}>{item.name}</span>
      <button
        type="button"
        title="Delete item"
        onClick={() => onDelete(item)}
        className={styles.button}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </li>
  );
}

export default Item;
