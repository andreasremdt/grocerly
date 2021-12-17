import { useContext, useRef } from "react";
import cx from "classnames";

import { GroceryContext } from "../GroceryContext";
import { Grocery } from "../types";
import __ from "../utils/translate";
import Checkbox from "./Checkbox";
import styles from "./Item.module.css";

type ItemProps = {
  item: Grocery;
};

function Item({ item }: ItemProps) {
  const { dispatch, language } = useContext(GroceryContext);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const hasFired = useRef(false);

  function reset() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
      hasFired.current = false;
    }
  }

  function handlePointerDown() {
    timer.current = setTimeout(() => {
      window.navigator.vibrate(100);

      if (window.confirm(__("list.deleteItem", language))) {
        dispatch({ type: "DELETE_ITEM", payload: item });
      }

      hasFired.current = true;
    }, 500);
  }

  function handlePointerUp() {
    reset();

    if (!hasFired.current) {
      dispatch({ type: "SELECT_ITEM", payload: item });
      hasFired.current = false;
    }
  }

  return (
    <article data-testid="item" className={styles.item}>
      <button
        type="button"
        className={styles.button}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={reset}
      >
        <h2 className={cx(styles.name, { [styles.checked]: item.checked })}>{item.name}</h2>
        {item.amount && (
          <div className={styles.details}>
            {item.amount || ""}
            {item.unit}
          </div>
        )}
      </button>

      <Checkbox
        checked={item.checked}
        onChange={() => dispatch({ type: "TOGGLE_CHECK_ITEM", payload: item })}
        aria-label={__(item.checked ? "list.uncheck" : "list.check", language)}
        className={styles.checkbox}
      />
    </article>
  );
}

export default Item;
