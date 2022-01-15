import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";
import Item from "./Item";
import Form from "./Form";
import __ from "../utils/translate";
import { getItemsByList, getListIdFromURL } from "../utils/helpers";
import EmptyState from "./EmptyState";

function List() {
  const { pathname } = useLocation();
  const { groceries, language } = useContext(GroceryContext);
  const mainRef = useRef<HTMLDivElement>(null);
  const groceriesRef = useRef(groceries);
  const items = getItemsByList(getListIdFromURL(pathname)!, groceries);

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
    <>
      <Form />

      <main ref={mainRef} className="flex-1 overflow-x-auto">
        {items.length > 0 ? (
          items.map((item) => <Item key={item.id} item={item} />)
        ) : (
          <EmptyState
            title={__("list.emptyState.title", language)}
            text={__("list.emptyState.subtitle", language)}
          />
        )}
      </main>
    </>
  );
}

export default List;
