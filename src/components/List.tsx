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
        <ul className={styles.list}>
          {groceries.map((item) => (
            <Item key={item.id} item={item} />
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
