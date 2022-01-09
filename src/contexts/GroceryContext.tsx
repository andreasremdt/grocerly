import { createContext, Dispatch, ReactNode, useReducer, useEffect } from "react";

import stateReducer from "../reducers/state-reducer";
import { LocalStorage } from "../utils/constants";
import { GroceryActions, GroceryState } from "../types";

type GroceryContextState = GroceryState & {
  dispatch: Dispatch<GroceryActions>;
};

const INITIAL_STATE: GroceryState = {
  language: "en",
  groceries: [],
  editing: null,
  isFormVisible: true,
  isNewListDialogVisible: false,
  lists: [],
};

function initState(initialState: GroceryState): GroceryState {
  const groceries = localStorage.getItem(LocalStorage.Groceries);
  const lists = localStorage.getItem(LocalStorage.Lists);
  const language = localStorage.getItem(LocalStorage.Language);
  const isFormVisible = localStorage.getItem(LocalStorage.FormVisible);

  return {
    editing: null,
    groceries: groceries ? JSON.parse(groceries) : [],
    lists: lists ? JSON.parse(lists) : [],
    language: language || initialState.language,
    isFormVisible: isFormVisible === "true" || isFormVisible === null,
    isNewListDialogVisible: false,
  };
}

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE, initState);

  useEffect(() => {
    localStorage.setItem(LocalStorage.Groceries, JSON.stringify(state.groceries));
  }, [state.groceries]);

  useEffect(() => {
    localStorage.setItem(LocalStorage.FormVisible, String(state.isFormVisible));
  }, [state.isFormVisible]);

  useEffect(() => {
    localStorage.setItem(LocalStorage.Language, state.language);

    document.head.lang = state.language;
  }, [state.language]);

  useEffect(() => {
    localStorage.setItem(LocalStorage.Lists, JSON.stringify(state.lists));
  }, [state.lists]);

  return (
    <GroceryContext.Provider value={{ ...state, dispatch }}>{children}</GroceryContext.Provider>
  );
};

export default ContextProvider;
export const GroceryContext = createContext<GroceryContextState>({} as GroceryContextState);
