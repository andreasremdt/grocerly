import { useContext } from "react";

import Header from "./components/Header";
import List from "./components/List";
import Form from "./components/Form";
import Settings from "./components/Settings";
import ListOverview from "./components/ListOverview";
import { GroceryContext } from "./GroceryContext";

function App() {
  const { activeList, isSettingsVisible } = useContext(GroceryContext);

  return (
    <>
      <Header />

      {isSettingsVisible ? (
        <Settings />
      ) : (
        <>
          <Form />
          {activeList ? <List /> : <ListOverview />}
        </>
      )}
    </>
  );
}

export default App;
