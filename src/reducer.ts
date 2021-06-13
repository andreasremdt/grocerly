import { GroceryState, GroceryActions } from "./types";

function reducer(state: GroceryState, action: GroceryActions): GroceryState {
  switch (action.type) {
    case "ADD_ITEM":
      const existing = state.groceries.find(
        (grocery) => grocery.name === action.payload.name && grocery.unit === action.payload.unit
      );

      if (existing) {
        return {
          ...state,
          groceries: state.groceries.map((grocery) => {
            if (existing.id === grocery.id) {
              return { ...grocery, amount: grocery.amount + action.payload.amount };
            }

            return grocery;
          }),
        };
      }

      return { ...state, groceries: [...state.groceries, action.payload] };
    case "UPDATE_ITEM":
      return {
        editing: null,
        groceries: state.groceries.map((grocery) => {
          if (grocery.id === action.payload.id) {
            return action.payload;
          }

          return grocery;
        }),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        groceries: state.groceries.filter((grocery) => grocery.id !== action.payload.id),
      };
    case "DELETE_ALL":
      return { ...state, groceries: [] };
    case "SELECT_ITEM":
      return { ...state, editing: action.payload };
    case "TOGGLE_CHECK_ITEM":
      return {
        ...state,
        groceries: state.groceries.map((grocery) => {
          if (grocery.id === action.payload.id) {
            return { ...grocery, checked: !grocery.checked };
          }

          return grocery;
        }),
      };
    default:
      return state;
  }
}

export default reducer;
