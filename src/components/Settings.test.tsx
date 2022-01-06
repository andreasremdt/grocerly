import { render, fireEvent, screen } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import Settings from "./Settings";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("renders null if `isSettingsVisible` is falsy", () => {
  renderWithContext(<Settings />, {
    language: "en",
  });

  expect(screen.queryByRole("form")).not.toBeInTheDocument();
});

test("lets a user change the language", () => {
  const spy = jest.fn();
  renderWithContext(<Settings />, {
    dispatch: spy,
    language: "en",
  });

  expect(screen.getByText(/language/i)).toBeInTheDocument();
  expect(screen.getAllByRole("option").length).toEqual(3);
  fireEvent.change(screen.getByTestId("language-select"), { target: { value: "de" } });
  expect(spy).toHaveBeenCalledWith({ type: "CHANGE_LANGUAGE", payload: "de" });
});
