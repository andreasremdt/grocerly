import { useState, useContext } from "react";

import { GroceryContext } from "../GroceryContext";
import { GroceryList } from "../types";
import NewListDialog from "./NewListDialog";
import ListCard from "./ListCard";

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
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-1"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
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
