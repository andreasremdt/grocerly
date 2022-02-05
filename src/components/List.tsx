import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";
import Item from "./Item";
import Form from "./Form";
import __ from "../utils/translate";
import { getItemsByList, getListIdFromURL, getSortedItems } from "../utils/helpers";
import EmptyState from "./EmptyState";

function List() {
  const { pathname } = useLocation();
  const { groceries, settings } = useContext(GroceryContext);
  const mainRef = useRef<HTMLDivElement>(null);
  const groceriesRef = useRef(groceries);
  const items = getItemsByList(getListIdFromURL(pathname)!, groceries);
  const [uncheckedItems, checkedItems] = getSortedItems(items, settings.sortByChecked);

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
        {uncheckedItems.length > 0 && (
          <>
            {checkedItems.length > 0 && (
              <h4 className="max-w-xl mx-auto px-2 uppercase text-xs py-2 tracking-widest select-none">
                {__("list.uncheckedItems", settings.language)} ({uncheckedItems.length})
              </h4>
            )}
            {uncheckedItems.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </>
        )}

        {checkedItems.length > 0 && (
          <>
            <h4 className="max-w-xl mx-auto px-2 uppercase text-xs py-2 tracking-widest">
              {__("list.checkedItems", settings.language)} ({checkedItems.length})
            </h4>
            {checkedItems.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </>
        )}

        {items.length === 0 && (
          <EmptyState
            title={__("list.emptyState.title", settings.language)}
            text={__("list.emptyState.subtitle", settings.language)}
          />
        )}
      </main>
    </>
  );
}

export default List;
