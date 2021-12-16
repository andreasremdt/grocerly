import { createContext, Dispatch, ReactNode, useReducer, useEffect } from "react";

import reducer from "./reducer";
import { GroceryActions, GroceryState } from "./types";

type GroceryContextState = GroceryState & {
  dispatch: Dispatch<GroceryActions>;
};

const INITIAL_STATE = {
  language: "en",
  color: "gray",
  groceries: [],
  editing: null,
  isFormVisible: true,
  isSettingsVisible: false,
};

function initState(initialState: GroceryState) {
  const groceries = localStorage.getItem("data");
  const color = localStorage.getItem("color");
  const language = localStorage.getItem("language");
  const isFormVisible = localStorage.getItem("form_visible");

  return {
    editing: null,
    groceries: groceries ? JSON.parse(groceries) : [],
    color: color || initialState.color,
    language: language || initialState.language,
    isFormVisible: isFormVisible === "true" || isFormVisible === null,
    isSettingsVisible: false,
  };
}

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, initState);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state.groceries));
  }, [state.groceries]);

  useEffect(() => {
    localStorage.setItem("form_visible", String(state.isFormVisible));
  }, [state.isFormVisible]);

  useEffect(() => {
    localStorage.setItem("color", state.color);

    document.body.style.setProperty("--primary-color", `var(--${state.color})`);
    document.body.style.setProperty("--primary-color-dark", `var(--${state.color}-dark)`);
  }, [state.color]);

  useEffect(() => {
    localStorage.setItem("language", state.language);

    document.head.lang = state.language;
  }, [state.language]);

  return (
    <GroceryContext.Provider value={{ ...state, dispatch }}>{children}</GroceryContext.Provider>
  );
};

export const GroceryContext = createContext<GroceryContextState>({} as GroceryContextState);

export default ContextProvider;
