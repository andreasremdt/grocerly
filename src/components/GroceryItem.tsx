import { Grocery } from "../types";

type GroceryProps = {
  item: Grocery;
  onDelete: (payload: Grocery) => void;
  onToggle: (payload: Grocery) => void;
};

function GroceryItem({ item, onDelete, onToggle }: GroceryProps) {
  return (
    <li
      style={{ textDecoration: item.checked ? "line-through" : "none" }}
      onClick={() => onToggle(item)}
    >
      {item.amount || ""}
      {item.unit}
      {item.name}
      <button type="button" onClick={() => onDelete(item)}>
        &times;
      </button>
    </li>
  );
}

export default GroceryItem;
