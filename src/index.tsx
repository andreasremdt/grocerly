import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import GroceryContextProvider from "./GroceryContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <GroceryContextProvider>
      <App />
    </GroceryContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
