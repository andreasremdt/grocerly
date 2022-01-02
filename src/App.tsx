import { useContext } from "react";

import Header from "./components/Header";
import List from "./components/List";
import Form from "./components/Form";
import Settings from "./components/Settings";
import ListOverview from "./components/ListOverview";
import { GroceryContext } from "./GroceryContext";

function App() {
  const { activeList } = useContext(GroceryContext);

  return (
    <>
      <Header />
      <Form />
      <Settings />
      {activeList ? <List /> : <ListOverview />}
    </>
  );
}

export default App;
