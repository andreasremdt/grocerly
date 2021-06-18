import { render, fireEvent } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import Settings, { COLORS } from "./Settings";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("renders all colors", () => {
  const { getByText, getByLabelText } = renderWithContext(<Settings />, { language: "en" });

  expect(getByText(/theme color/i)).toBeInTheDocument();
  COLORS.forEach((color) => {
    expect(getByLabelText(color)).toBeInTheDocument();
  });
});

test("lets a user change the theme color", () => {
  const spy = jest.fn();
  const { getByLabelText, getByText } = renderWithContext(<Settings />, {
    dispatch: spy,
    language: "en",
  });

  expect(getByText(/theme color/i)).toBeInTheDocument();
  fireEvent.click(getByLabelText(/green/i));
  expect(spy).toHaveBeenCalledWith({ type: "CHANGE_COLOR", payload: "green" });
});

test("lets a user change the language", () => {
  const spy = jest.fn();
  const { getByText, getByTestId, getAllByRole } = renderWithContext(<Settings />, {
    dispatch: spy,
    language: "en",
  });

  expect(getByText(/language/i)).toBeInTheDocument();
  expect(getAllByRole("option").length).toEqual(3);
  fireEvent.change(getByTestId("language-select"), { target: { value: "de" } });
  expect(spy).toHaveBeenCalledWith({ type: "CHANGE_LANGUAGE", payload: "de" });
});
