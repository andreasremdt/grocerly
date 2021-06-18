import { useContext, useEffect, useRef } from "react";

import { GroceryContext } from "../GroceryContext";
import Item from "./Item";
import styles from "./List.module.css";

function List() {
  const { groceries } = useContext(GroceryContext);
  const mainRef = useRef<HTMLDivElement>(null);
  const groceriesRef = useRef(groceries);

  useEffect(() => {
    if (groceries.length > groceriesRef.current.length) {
      mainRef.current?.scrollTo({
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    groceriesRef.current = groceries;
  }, [groceries]);

  return (
    <main className={styles.wrapper} ref={mainRef}>
      {groceries.length ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {groceries.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.empty}>
          <svg>
            <use xlinkHref="/shopping-cart.svg#img"></use>
          </svg>
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
