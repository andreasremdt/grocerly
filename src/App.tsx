import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import List from "./components/List";
import Settings from "./components/Settings";
import ListOverview from "./components/ListOverview";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<ListOverview />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/list/:listId" element={<List />} />
      </Routes>
    </>
  );
}

export default App;
