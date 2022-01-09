import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import List from "./components/List";
import Settings from "./components/Settings";
import ListOverview from "./components/ListOverview";
import NewListDialog from "./components/NewListDialog";
import ConfirmDialog from "./components/ConfirmDialog";
import GroceryContextProvider from "./GroceryContext";
import DialogContextProvider from "./contexts/DialogContext";

function App() {
  return (
    <GroceryContextProvider>
      <DialogContextProvider>
        <Header />

        <Routes>
          <Route path="/" element={<ListOverview />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/list/:listId" element={<List />} />
        </Routes>

        <NewListDialog />
        <ConfirmDialog />
      </DialogContextProvider>
    </GroceryContextProvider>
  );
}

export default App;
