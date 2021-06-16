import { useState } from "react";

import GroceryContextProvider from "./GroceryContext";
import Header from "./components/Header";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  const [isFormVisible, setIsFormVisible] = useState(true);

  return (
    <GroceryContextProvider>
      <Header onToggleForm={() => setIsFormVisible(!isFormVisible)} isFormVisible={isFormVisible} />
      {isFormVisible && <Form />}
      <List />
    </GroceryContextProvider>
  );
}

export default App;
