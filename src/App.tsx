import GroceryContextProvider from "./GroceryContext";
import Header from "./components/Header";
import List from "./components/List";
import Form from "./components/Form";
import Settings from "./components/Settings";

function App() {
  return (
    <GroceryContextProvider>
      <Header />
      <Form />
      <Settings />
      <List />
    </GroceryContextProvider>
  );
}

export default App;
