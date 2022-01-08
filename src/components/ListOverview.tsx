import { useState, useContext } from "react";

import { GroceryContext } from "../GroceryContext";
import { GroceryList } from "../types";
import NewListDialog from "./NewListDialog";
import ListCard from "./ListCard";
import { DocumentAddIcon } from "@heroicons/react/outline";

function ListOverview() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { lists, dispatch } = useContext(GroceryContext);

  function handleSubmit(newList: GroceryList) {
    setIsDialogOpen(false);
    dispatch({ type: "ADD_LIST", payload: newList });
  }

  return (
    <main className="max-w-xl mx-auto p-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
      <button
        type="button"
        className="bg-gradient-to-br from-indigo-200 to-purple-200 h-[250px] flex flex-col items-center justify-center text-indigo-800 rounded-md shadow-md shadow-purple-100"
        onClick={() => setIsDialogOpen(true)}
      >
        <DocumentAddIcon className="w-12 h-12" />
        New grocery list
      </button>

      {lists.map((list) => (
        <ListCard key={list.id} list={list} />
      ))}

      {isDialogOpen && (
        <NewListDialog onCancel={() => setIsDialogOpen(false)} onSubmit={handleSubmit} />
      )}
    </main>
  );
}

export default ListOverview;
