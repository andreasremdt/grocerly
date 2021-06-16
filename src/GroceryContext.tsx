import { createContext, Dispatch, ReactNode, useReducer, useEffect } from "react";

import reducer from "./reducer";
import { Grocery, GroceryActions } from "./types";

type GroceryContextState = {
  groceries: Grocery[];
  editing: Grocery | null;
  dispatch: Dispatch<GroceryActions>;
};

export const GroceryContext = createContext<GroceryContextState>({} as GroceryContextState);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    reducer,
    {
      groceries: [],
      editing: null,
    },
    () => {
      const data = localStorage.getItem("data");

      return { editing: null, groceries: data ? JSON.parse(data) : [] };
    }
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state.groceries));
  }, [state.groceries]);

  return (
    <GroceryContext.Provider value={{ ...state, dispatch }}>{children}</GroceryContext.Provider>
  );
};

export default ContextProvider;
