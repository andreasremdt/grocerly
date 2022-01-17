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
  editing: Grocery | null;
  language: string;
  isFormVisible: boolean;
  isNewListDialogVisible: boolean;
};

export type GroceryActions =
  | { type: "ADD_ITEM"; payload: Grocery }
  | { type: "DELETE_ITEM"; payload: Grocery }
  | { type: "TOGGLE_CHECK_ITEM"; payload: Grocery }
  | { type: "SELECT_ITEM"; payload: Grocery }
  | { type: "DESELECT_ITEM" }
  | { type: "UPDATE_ITEM"; payload: Grocery }
  | { type: "DELETE_ALL" }
  | { type: "CHANGE_LANGUAGE"; payload: string }
  | { type: "TOGGLE_FORM" }
  | { type: "TOGGLE_NEW_LIST_DIALOG" }
  | { type: "ADD_LIST"; payload: GroceryList }
  | { type: "DELETE_LIST"; payload: number }
  | { type: "CLEAR_LIST"; payload: number };
