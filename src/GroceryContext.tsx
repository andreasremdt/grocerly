import { createContext, Dispatch, ReactNode, useReducer, useEffect } from "react";

import reducer from "./reducer";
import { GroceryActions, GroceryState } from "./types";

type GroceryContextState = GroceryState & {
  dispatch: Dispatch<GroceryActions>;
};

export const GroceryContext = createContext<GroceryContextState>({} as GroceryContextState);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      language: "en",
      color: "gray",
      groceries: [],
      editing: null,
    },
    () => {
      const data = localStorage.getItem("data");
      const color = localStorage.getItem("color");
      const language = localStorage.getItem("language");

      return {
        editing: null,
        groceries: data ? JSON.parse(data) : [],
        color: color || "gray",
        language: language || "en",
      };
    }
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state.groceries));
  }, [state.groceries]);

  useEffect(() => {
    localStorage.setItem("color", state.color);

    document.body.style.setProperty("--primary-color", `var(--${state.color})`);
  }, [state.color]);

  useEffect(() => {
    localStorage.setItem("language", state.language);

    document.head.lang = state.language;
  }, [state.language]);

  return (
    <GroceryContext.Provider value={{ ...state, dispatch }}>{children}</GroceryContext.Provider>
  );
};

export default ContextProvider;
