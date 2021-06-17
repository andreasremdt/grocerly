import { useState } from "react";

import GroceryContextProvider from "./GroceryContext";
import Header from "./components/Header";
import List from "./components/List";
import Form from "./components/Form";
import Settings from "./components/Settings";

function App() {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  return (
    <GroceryContextProvider>
      <Header
        onSettingsToggle={() => setIsSettingsVisible(!isSettingsVisible)}
        onToggleForm={() => setIsFormVisible(!isFormVisible)}
        isFormVisible={isFormVisible}
        isSettingsVisible={isSettingsVisible}
      />
      {isFormVisible && <Form />}
      {isSettingsVisible && <Settings />}
      <List />
    </GroceryContextProvider>
  );
}

export default App;
