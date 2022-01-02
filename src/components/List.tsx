import { useContext, useEffect, useRef } from "react";

import { GroceryContext } from "../GroceryContext";
import Item from "./Item";
import __ from "../utils/translate";
import styles from "./List.module.css";
import { getItemsByList } from "../utils/helpers";

function List() {
  const { groceries, activeList, language } = useContext(GroceryContext);
  const mainRef = useRef<HTMLDivElement>(null);
  const groceriesRef = useRef(groceries);
  const items = getItemsByList(activeList!, groceries);

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
      {items.length ? (
        items.map((item) => <Item key={item.id} item={item} />)
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
