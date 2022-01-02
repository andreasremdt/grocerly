import { render, fireEvent, screen } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import ListCard from "./ListCard";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("renders a button with the list title and items", () => {
  renderWithContext(<ListCard list={{ id: 1, name: "List #1" }} />, {
    groceries: [
      { id: 1, listId: 1, name: "Item #1", checked: false },
      { id: 2, listId: 1, name: "Item #2", checked: true },
      { id: 3, listId: 2, name: "Item #3", checked: false },
    ],
  });

  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText(/list #1/i)).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
  expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(/item #1/i);
  expect(screen.getAllByRole("listitem")[1]).toHaveTextContent(/item #2/i);
  expect(screen.getAllByRole("listitem")[0]).not.toHaveClass("checked");
  expect(screen.getAllByRole("listitem")[1]).toHaveClass("checked");
});

test("doesn't render more than 10 items", () => {
  renderWithContext(<ListCard list={{ id: 1, name: "List #1" }} />, {
    groceries: [
      { id: 1, listId: 1, name: "Item #1" },
      { id: 2, listId: 1, name: "Item #2" },
      { id: 3, listId: 1, name: "Item #3" },
      { id: 4, listId: 1, name: "Item #4" },
      { id: 5, listId: 1, name: "Item #5" },
      { id: 6, listId: 1, name: "Item #6" },
      { id: 7, listId: 1, name: "Item #7" },
      { id: 8, listId: 1, name: "Item #8" },
      { id: 9, listId: 1, name: "Item #9" },
      { id: 10, listId: 1, name: "Item #10" },
      { id: 11, listId: 1, name: "Item #11" },
    ],
  });

  expect(screen.getAllByRole("listitem")).toHaveLength(10);
});

test("displays an empty state", () => {
  renderWithContext(<ListCard list={{ id: 1, name: "List #1" }} />, {
    groceries: [],
  });

  expect(screen.getByText(/no items in this list/i)).toBeInTheDocument();
  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
});

test("clicking on the button opens the list", () => {
  const spy = jest.fn();

  renderWithContext(<ListCard list={{ id: 1, name: "List #1" }} />, {
    dispatch: spy,
    groceries: [],
  });

  fireEvent.click(screen.getByRole("button"));

  expect(spy).toHaveBeenCalledWith({ type: "SET_ACTIVE_LIST", payload: 1 });
});
