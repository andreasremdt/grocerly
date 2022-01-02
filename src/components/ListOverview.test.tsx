import { render, fireEvent, screen } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import ListOverview from "./ListOverview";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("displays a button to create a new list", () => {
  renderWithContext(<ListOverview />, {
    lists: [],
  });

  expect(screen.getByRole("button")).toHaveTextContent(/new grocery list/i);
});

test("creates a new list via the dialog", () => {
  const spy = jest.fn();
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01").getTime());

  renderWithContext(<ListOverview />, {
    lists: [],
    dispatch: spy,
  });

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "List #1" } });
  fireEvent.click(screen.getByText(/okay/i));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(spy).toHaveBeenCalledWith({
    type: "ADD_LIST",
    payload: { name: "List #1", id: 1577836800000 },
  });

  jest.useRealTimers();
});

test("it displays all lists", () => {
  renderWithContext(<ListOverview />, {
    lists: [
      { id: 1, name: "List #1" },
      { id: 2, name: "List #2" },
      { id: 3, name: "List #3" },
    ],
    groceries: [],
  });

  expect(screen.getAllByRole("button")).toHaveLength(4);
  expect(screen.getAllByRole("button")[1]).toHaveTextContent(/list #1/i);
  expect(screen.getAllByRole("button")[1]).toHaveTextContent(/no items in this list/i);
});
