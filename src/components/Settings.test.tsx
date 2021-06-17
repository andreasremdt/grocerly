import { render, fireEvent } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import Settings from "./Settings";

const COLORS = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "cyan",
  "blue",
  "purple",
  "pink",
];

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("renders all colors", () => {
  const { getByText, getByLabelText } = renderWithContext(<Settings />, {});

  expect(getByText(/theme color/i)).toBeInTheDocument();
  COLORS.forEach((color) => {
    expect(getByLabelText(color)).toBeInTheDocument();
  });
});

test("calls dispatch to change the color", () => {
  const spy = jest.fn();
  const { getByLabelText } = renderWithContext(<Settings />, {
    dispatch: spy,
  });

  fireEvent.click(getByLabelText(/green/i));

  expect(spy).toHaveBeenCalledWith({ type: "CHANGE_COLOR", payload: "green" });
});
