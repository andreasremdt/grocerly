import { ReactNode, useContext } from "react";

import { DialogContext } from "../contexts/DialogContext";

let resolveCallback: (value: boolean) => void;

function useConfirm() {
  const { dispatch, ...state } = useContext(DialogContext);

  function onCancel() {
    dispatch({ type: "HIDE_DIALOG" });
    resolveCallback(false);
  }

  function onSubmit() {
    dispatch({ type: "HIDE_DIALOG" });
    resolveCallback(true);
  }

  function confirm(payload: { title: string; content?: string | ReactNode }) {
    dispatch({ type: "SHOW_DIALOG", payload });

    return new Promise<boolean>((resolve) => {
      resolveCallback = resolve;
    });
  }

  return { confirm, onSubmit, onCancel, state };
}

export default useConfirm;
