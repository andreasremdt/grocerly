import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import GroceryContextProvider from "./GroceryContext";
import "./index.css";

render(
  <React.StrictMode>
    <BrowserRouter>
      <GroceryContextProvider>
        <App />
      </GroceryContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
