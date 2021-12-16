export type Grocery = {
  id: number;
  name: string;
  unit: string;
  amount: string;
  checked: boolean;
};

export type GroceryState = {
  groceries: Grocery[];
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
  | { type: "TOGGLE_SETTINGS" };
