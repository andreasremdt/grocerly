import { useContext } from "react";

import { GroceryContext } from "../GroceryContext";
import ListCard from "./ListCard";

function ListOverview() {
  const { lists } = useContext(GroceryContext);

  return (
    <main className="max-w-xl mx-auto p-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
      {lists.map((list) => (
        <ListCard key={list.id} list={list} />
      ))}
    </main>
  );
}

export default ListOverview;
