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
        groceries.map((grocery) => <Item key={grocery.id} item={grocery} />)
      ) : (
        <div className={styles.empty}>
          <svg data-testid="shopping-cart-icon">
            <use xlinkHref="/shopping-cart.svg#img"></use>
          </svg>
          <p>
            <b>{__("emptyState.title", language)}</b>
            <br />
            {__("emptyState.subtitle", language)}
          </p>
        </div>
      )}
    </main>
  );
}

export default List;
