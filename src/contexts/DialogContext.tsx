import { ReactNode, createContext, useReducer, Dispatch } from "react";

import dialogReducer from "../reducers/dialog-reducer";
import { DialogActions, DialogState } from "../types";

type DialogContextProviderProps = {
  children: ReactNode;
};

type DialogContextState = DialogState & {
  dispatch: Dispatch<DialogActions>;
};

const INITIAL_STATE: DialogState = {
  open: false,
  title: "",
  content: null,
};

function DialogContextProvider({ children }: DialogContextProviderProps) {
  const [state, dispatch] = useReducer(dialogReducer, INITIAL_STATE);

  return <DialogContext.Provider value={{ ...state, dispatch }}>{children}</DialogContext.Provider>;
}

export default DialogContextProvider;
export const DialogContext = createContext<DialogContextState>({} as DialogContextState);
