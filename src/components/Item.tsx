import { useContext } from "react";

import { GroceryContext } from "../GroceryContext";
import { Grocery } from "../types";
import __ from "../utils/translate";
import styles from "./Item.module.css";

type ItemProps = {
  item: Grocery;
};

function Item({ item }: ItemProps) {
  const { dispatch, language } = useContext(GroceryContext);
  let timer: number;

  const handleTouchStart = () => {
    timer = window.setTimeout(() => {
      window.navigator.vibrate(100);

      dispatch({ type: "TOGGLE_CHECK_ITEM", payload: item });
    }, 500);
  };

  const handleTouchEnd = () => {
    if (timer) clearTimeout(timer);
  };

  return (
    <tr
      style={{ textDecoration: item.checked ? "line-through" : "none" }}
      onDoubleClick={() => dispatch({ type: "SELECT_ITEM", payload: item })}
      onMouseDown={handleTouchStart}
      onTouchStart={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onTouchEnd={handleTouchEnd}
      className={styles.row}
    >
      <td>
        {item.amount || ""}
        {item.unit}
      </td>
      <td>{item.name}</td>
      <td>
        <button
          type="button"
          title={__("list.delete", language)}
          onClick={() => dispatch({ type: "DELETE_ITEM", payload: item })}
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
      </td>
    </tr>
  );
}

export default Item;
