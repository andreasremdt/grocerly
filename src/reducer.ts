import { Grocery } from "./types";

type GroceryActions =
  | { type: "ADD_ITEM"; payload: Grocery }
  | { type: "DELETE_ITEM"; payload: Grocery }
  | { type: "TOGGLE_CHECK_ITEM"; payload: Grocery }
  | { type: "DELETE_ALL" };

function reducer(groceries: Grocery[], action: GroceryActions): Grocery[] {
  switch (action.type) {
    case "ADD_ITEM":
      const existing = groceries.find(
        (grocery) => grocery.name === action.payload.name && grocery.unit === action.payload.unit
      );

      if (existing) {
        return groceries.map((grocery) => {
          if (existing.id === grocery.id) {
            return { ...grocery, amount: grocery.amount + action.payload.amount };
          }

          return grocery;
        });
      }

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
