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
      <ul className={styles.list}>
        {groceries.map((item) => (
          <Item key={item.id} onDelete={onDelete} onToggle={onToggle} item={item} />
        ))}
      </ul>
    </main>
  );
}

export default List;
