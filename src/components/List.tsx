import Item from "./Item";
import styles from "./List.module.css";
import { Grocery } from "../types";

type ListProps = {
  groceries: Grocery[];
  onDelete: (payload: Grocery) => void;
  onToggle: (payload: Grocery) => void;
};

function List({ groceries, onDelete, onToggle }: ListProps) {
  return (
    <main className={styles.wrapper}>
      {groceries.length ? (
        <ul className={styles.list}>
          {groceries.map((item) => (
            <Item key={item.id} onDelete={onDelete} onToggle={onToggle} item={item} />
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <img src="/shopping-cart.svg" width="250" alt="" />
          <p>
            Nothing here, yet.
            <br />
            Start adding items to your shopping list below.
          </p>
        </div>
      )}
    </main>
  );
}

export default List;
