import { useContext, useEffect, useRef } from "react";

import { GroceryContext } from "../GroceryContext";
import Item from "./Item";
import __ from "../utils/translate";
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
    <main ref={mainRef} className="flex-1 overflow-x-auto">
      {items.length ? (
        items.map((item) => <Item key={item.id} item={item} />)
      ) : (
        <div className="text-center flex items-center flex-col pt-10">
          <svg data-testid="shopping-cart-icon" className="mb-4">
            <use xlinkHref="/shopping-cart.svg#img"></use>
          </svg>
          <h2 className="font-semibold text-indigo-800">{__("emptyState.title", language)}</h2>
          <p>{__("emptyState.subtitle", language)}</p>
        </div>
      )}
    </main>
  );
}

export default List;
