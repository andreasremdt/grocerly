export type Grocery = {
  id: number;
  name: string;
  unit: string;
  amount: string;
  checked: boolean;
  listId: number;
};

export type GroceryList = {
  id: number;
  name: string;
};

export type GroceryState = {
  lists: GroceryList[];
  groceries: Grocery[];
  activeList: number | null;
  editing: Grocery | null;
  color: string;
  language: string;
  isFormVisible: boolean;
  isSettingsVisible: boolean;
};

export type GroceryActions =
  | { type: "ADD_ITEM"; payload: Grocery }
  | { type: "DELETE_ITEM"; payload: Grocery }
  | { type: "TOGGLE_CHECK_ITEM"; payload: Grocery }
  | { type: "SELECT_ITEM"; payload: Grocery }
  | { type: "UPDATE_ITEM"; payload: Grocery }
  | { type: "DELETE_ALL" }
  | { type: "CHANGE_COLOR"; payload: string }
  | { type: "CHANGE_LANGUAGE"; payload: string }
  | { type: "TOGGLE_FORM" }
  | { type: "TOGGLE_SETTINGS" }
  | { type: "ADD_LIST"; payload: GroceryList }
  | { type: "DELETE_LIST"; payload: number }
  | { type: "SET_ACTIVE_LIST"; payload: number | null };
