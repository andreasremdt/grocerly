export type Grocery = {
  id: number;
  name: string;
  unit: string;
  amount: number;
  checked: boolean;
};

export type GroceryState = {
  groceries: Grocery[];
  editing: Grocery | null;
};

export type GroceryActions =
  | { type: "ADD_ITEM"; payload: Grocery }
  | { type: "DELETE_ITEM"; payload: Grocery }
  | { type: "TOGGLE_CHECK_ITEM"; payload: Grocery }
  | { type: "SELECT_ITEM"; payload: Grocery }
  | { type: "UPDATE_ITEM"; payload: Grocery }
  | { type: "DELETE_ALL" };
