import { DialogActions, DialogState } from "../types";

function dialogReducer(state: DialogState, action: DialogActions) {
  switch (action.type) {
    case "SHOW_DIALOG":
      return {
        open: true,
        title: action.payload.title,
        content: action.payload.content,
      };
    case "HIDE_DIALOG":
      return {
        open: false,
        title: "",
        content: null,
      };
    default:
      return state;
  }
}

export default dialogReducer;
