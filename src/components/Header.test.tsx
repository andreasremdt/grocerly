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

test("calls dispatch to delete the current list", () => {
  const spy = jest.fn();
  renderWithContext(<Header />, {
    dispatch: spy,
    language: "en",
    lists: [],
  });

  window.confirm = jest.fn(() => true);

  fireEvent.click(screen.getByTitle(/clear this list/i));
  expect(window.confirm).toHaveBeenCalledWith("Do you really want to clear this list?");
  expect(spy).toHaveBeenCalledWith({ type: "DELETE_LIST", payload: 1 });

  window.confirm = jest.fn(() => false);

  fireEvent.click(screen.getByTitle(/clear this list/i));
  expect(spy).toHaveBeenCalledTimes(1);
});

test("calls dispatch to toggle the form", () => {
  const spy = jest.fn();
  renderWithContext(<Header />, {
    dispatch: spy,
    language: "en",
    lists: [],
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

test("the form toggle and delete all button are hidden when the settings page is visible", () => {
  renderWithContext(<Header />, {
    language: "en",
  });

  expect(screen.queryByTitle(/clear this list/i)).not.toBeInTheDocument();
  expect(screen.queryByTitle(/toggle form/i)).not.toBeInTheDocument();
});
