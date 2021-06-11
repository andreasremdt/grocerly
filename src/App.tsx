import { useReducer } from "react";

import Header from "./components/Header";
import List from "./components/List";
import Form from "./components/Form";
import reducer from "./reducer";

import { Grocery } from "./types";

function App() {
  const [groceries, dispatch] = useReducer(reducer, []);

  const handleSubmit = (payload: Grocery) => dispatch({ type: "ADD_ITEM", payload });
  const handleDeleteAll = () => dispatch({ type: "DELETE_ALL" });
  const handleDelete = (payload: Grocery) => dispatch({ type: "DELETE_ITEM", payload });
  const handleToggle = (payload: Grocery) => dispatch({ type: "TOGGLE_CHECK_ITEM", payload });

  return (
    <>
      <Header onDeleteAll={handleDeleteAll} />
      <List groceries={groceries} onDelete={handleDelete} onToggle={handleToggle} />
      <Form onSubmit={handleSubmit} />
    </>
  );
}

export default App;
