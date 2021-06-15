import { useEffect, useState, useReducer } from "react";

import Header from "./components/Header";
import List from "./components/List";
import Form from "./components/Form";
import reducer from "./reducer";

import { Grocery } from "./types";

function App() {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [state, dispatch] = useReducer(
    reducer,
    {
      groceries: [],
      editing: null,
    },
    () => {
      const data = localStorage.getItem("data");

      if (data) {
        return { editing: null, groceries: JSON.parse(data) };
      }

      return { editing: null, groceries: [] };
    }
  );

  const handleSubmit = (payload: Grocery) => dispatch({ type: "ADD_ITEM", payload });
  const handleDeleteAll = () => dispatch({ type: "DELETE_ALL" });
  const handleDelete = (payload: Grocery) => dispatch({ type: "DELETE_ITEM", payload });
  const handleToggle = (payload: Grocery) => dispatch({ type: "TOGGLE_CHECK_ITEM", payload });
  const handleSelect = (payload: Grocery) => dispatch({ type: "SELECT_ITEM", payload });
  const handleUpdate = (payload: Grocery) => dispatch({ type: "UPDATE_ITEM", payload });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state.groceries));
  }, [state.groceries]);

  return (
    <>
      <Header
        onDeleteAll={handleDeleteAll}
        onToggleForm={() => setIsFormVisible(!isFormVisible)}
        isFormVisible={isFormVisible}
      />
      {isFormVisible && (
        <Form onSubmit={handleSubmit} onUpdate={handleUpdate} editing={state.editing} />
      )}
      <List
        groceries={state.groceries}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onSelect={handleSelect}
      />
    </>
  );
}

export default App;
