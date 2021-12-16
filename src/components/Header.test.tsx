import { render, fireEvent, screen } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import Header from "./Header";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("displays the app name", () => {
  render(<Header />);

  expect(screen.getByText(/grocerly/i)).toBeInTheDocument();
});

test("calls dispatch to delete all items", () => {
  const spy = jest.fn();
  renderWithContext(<Header />, {
    dispatch: spy,
    language: "en",
  });

  fireEvent.click(screen.getByTitle(/delete all items/i));
  expect(spy).toHaveBeenCalledWith({ type: "DELETE_ALL" });
});

test("calls dispatch to toggle the form", () => {
  const spy = jest.fn();
  renderWithContext(<Header />, {
    dispatch: spy,
    language: "en",
  });

  fireEvent.click(screen.getByTitle(/toggle form/i));
  expect(spy).toHaveBeenCalledWith({ type: "TOGGLE_FORM" });
});

test("calls dispatch to toggle the settings page", () => {
  const spy = jest.fn();
  renderWithContext(<Header />, {
    dispatch: spy,
    language: "en",
  });

  fireEvent.click(screen.getByTitle(/toggle settings/i));
  expect(spy).toHaveBeenCalledWith({ type: "TOGGLE_SETTINGS" });
});
