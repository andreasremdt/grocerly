import { Grocery } from "./types";

type GroceryActions =
  | { type: "ADD_ITEM"; payload: Grocery }
  | { type: "DELETE_ITEM"; payload: Grocery }
  | { type: "TOGGLE_CHECK_ITEM"; payload: Grocery }
  | { type: "DELETE_ALL" };

function reducer(groceries: Grocery[], action: GroceryActions) {
  switch (action.type) {
    case "ADD_ITEM":
      return [...groceries, action.payload];
    case "DELETE_ITEM":
      return groceries.filter((grocery) => grocery.id !== action.payload.id);
    case "DELETE_ALL":
      return [];
    case "TOGGLE_CHECK_ITEM":
      return groceries.map((grocery) => {
        if (grocery.id === action.payload.id) {
          return { ...grocery, checked: !grocery.checked };
        }

        return grocery;
      });
    default:
      return groceries;
  }
}

export default reducer;
