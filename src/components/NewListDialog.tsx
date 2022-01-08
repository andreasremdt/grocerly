import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import Button from "./Button";
import { GroceryContext } from "../GroceryContext";

function NewListDialog() {
  const navigate = useNavigate();
  const { dispatch, isNewListDialogVisible } = useContext(GroceryContext);
  const [name, setName] = useState("");

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const id = Date.now();

    dispatch({ type: "ADD_LIST", payload: { id, name } });
    navigate(`/list/${id}`);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        dispatch({ type: "TOGGLE_NEW_LIST_DIALOG" });
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  if (!isNewListDialogVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-gray-700/50 z-20 backdrop-blur-sm flex items-center justify-center"
      role="dialog"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-md drop-shadow-lg w-full max-w-xl mx-2 p-4"
      >
        <div>
          <label htmlFor="name" className="block">
            Provide a name for this grocery list:
          </label>
          <Input
            type="text"
            id="name"
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full my-2"
          />
        </div>
        <footer className="text-right">
          <Button
            type="button"
            className="mr-2"
            onClick={() => dispatch({ type: "TOGGLE_NEW_LIST_DIALOG" })}
          >
            Cancel
          </Button>
          <Button type="submit" className="">
            Okay
          </Button>
        </footer>
      </form>
    </div>
  );
}

export default NewListDialog;
