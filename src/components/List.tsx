import { useContext, useEffect, useRef } from "react";

import { GroceryContext } from "../GroceryContext";
import Item from "./Item";
import __ from "../utils/translate";
import styles from "./List.module.css";

function List() {
  const { groceries, language } = useContext(GroceryContext);
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
              <th>{__("list.quantity", language)}</th>
              <th>{__("list.name", language)}</th>
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
            {__("emptyState.title", language)}
            <br />
            {__("emptyState.subtitle", language)}
          </p>
        </div>
      )}
    </main>
  );
}

export default List;
