import { createContext, Dispatch, ReactNode, useReducer, useEffect } from "react";

import reducer from "./reducer";
import { LocalStorage } from "./utils/constants";
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
  lists: [],
  activeList: null,
};

function initState(initialState: GroceryState) {
  const groceries = localStorage.getItem(LocalStorage.Groceries);
  const lists = localStorage.getItem(LocalStorage.Lists);
  const activeList = localStorage.getItem(LocalStorage.ActiveList);
  const color = localStorage.getItem(LocalStorage.Color);
  const language = localStorage.getItem(LocalStorage.Language);
  const isFormVisible = localStorage.getItem(LocalStorage.FormVisible);

  return {
    editing: null,
    groceries: groceries ? JSON.parse(groceries) : [],
    lists: lists ? JSON.parse(lists) : [],
    activeList: activeList !== "null" ? Number(activeList) : initialState.activeList,
    color: color || initialState.color,
    language: language || initialState.language,
    isFormVisible: isFormVisible === "true" || isFormVisible === null,
    isSettingsVisible: false,
  };
}

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, initState);

  useEffect(() => {
    localStorage.setItem(LocalStorage.Groceries, JSON.stringify(state.groceries));
  }, [state.groceries]);

  useEffect(() => {
    localStorage.setItem(LocalStorage.FormVisible, String(state.isFormVisible));
  }, [state.isFormVisible]);

  useEffect(() => {
    localStorage.setItem(LocalStorage.Color, state.color);

    document.body.style.setProperty("--primary-color", `var(--${state.color})`);
    document.body.style.setProperty("--primary-color-dark", `var(--${state.color}-dark)`);
  }, [state.color]);

  useEffect(() => {
    localStorage.setItem(LocalStorage.Language, state.language);

    document.head.lang = state.language;
  }, [state.language]);

  useEffect(() => {
    localStorage.setItem(LocalStorage.ActiveList, String(state.activeList));
  }, [state.activeList]);

  useEffect(() => {
    localStorage.setItem(LocalStorage.Lists, JSON.stringify(state.lists));
  }, [state.lists]);

  return (
    <GroceryContext.Provider value={{ ...state, dispatch }}>{children}</GroceryContext.Provider>
  );
};

export const GroceryContext = createContext<GroceryContextState>({} as GroceryContextState);

export default ContextProvider;
