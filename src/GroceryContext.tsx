import { createContext, Dispatch, ReactNode, useReducer, useEffect } from "react";

import reducer from "./reducer";
import { Grocery, GroceryActions } from "./types";

type GroceryContextState = {
  groceries: Grocery[];
  editing: Grocery | null;
  color: string;
  dispatch: Dispatch<GroceryActions>;
};

export const GroceryContext = createContext<GroceryContextState>({} as GroceryContextState);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      color: "gray",
      groceries: [],
      editing: null,
    },
    () => {
      const data = localStorage.getItem("data");
      const color = localStorage.getItem("color");

      return { editing: null, groceries: data ? JSON.parse(data) : [], color: color || "gray" };
    }
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state.groceries));
  }, [state.groceries]);

  useEffect(() => {
    localStorage.setItem("color", state.color);

    document.body.style.setProperty("--primary-color", `var(--${state.color})`);
  }, [state.color]);

  return (
    <GroceryContext.Provider value={{ ...state, dispatch }}>{children}</GroceryContext.Provider>
  );
};

export default ContextProvider;
