import { useContext } from "react";
import cx from "classnames";

import { GroceryContext } from "../GroceryContext";
import { GroceryList } from "../types";
import { getItemsByList } from "../utils/helpers";
import styles from "./ListCard.module.css";

type ListCardProps = {
  list: GroceryList;
};

function ListCard({ list }: ListCardProps) {
  const { groceries, dispatch } = useContext(GroceryContext);
  const items = getItemsByList(list.id, groceries);

  return (
    <button
      className={styles.list}
      onClick={() => dispatch({ type: "SET_ACTIVE_LIST", payload: list.id })}
    >
      <span className={styles.title}>{list.name}</span>
      {items.length > 0 ? (
        <ul className={styles.items}>
          {items.slice(0, 10).map((item) => (
            <li key={item.id} className={cx({ [styles.checked]: item.checked }, styles.item)}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <span className={styles.italic}>No items in this list</span>
      )}
    </button>
  );
}

export default ListCard;
