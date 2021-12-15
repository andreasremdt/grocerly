import { render, fireEvent, screen } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import Settings, { COLORS } from "./Settings";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("renders all colors", () => {
  renderWithContext(<Settings />, { language: "en" });

  expect(screen.getByText(/theme color/i)).toBeInTheDocument();
  COLORS.forEach((color) => {
    expect(screen.getByLabelText(color)).toBeInTheDocument();
  });
});

test("lets a user change the theme color", () => {
  const spy = jest.fn();
  renderWithContext(<Settings />, {
    dispatch: spy,
    language: "en",
  });

  expect(screen.getByText(/theme color/i)).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText(/green/i));
  expect(spy).toHaveBeenCalledWith({ type: "CHANGE_COLOR", payload: "green" });
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
