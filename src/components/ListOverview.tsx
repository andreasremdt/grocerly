import { useContext } from "react";
import cx from "classnames";

import { GroceryContext } from "../contexts/GroceryContext";
import ListCard from "./ListCard";
import EmptyState from "./EmptyState";
import __ from "../utils/translate";

function ListOverview() {
  const { lists, language } = useContext(GroceryContext);

  return (
    <main
      className={cx("max-w-xl mx-auto p-2 w-full", {
        "grid grid-cols-2 sm:grid-cols-3 gap-2": lists.length > 0,
      })}
    >
      {lists.length > 0 ? (
        lists.map((list) => <ListCard key={list.id} list={list} />)
      ) : (
        <EmptyState
          title={__("card.emptyState.title", language)}
          text={__("card.emptyState.subtitle", language)}
        />
      )}
    </main>
  );
}

export default ListOverview;
