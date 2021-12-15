import { render, fireEvent, screen } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import Item from "./Item";

const getItem = () => ({
  id: Date.now(),
  name: "milk",
  amount: "1",
  unit: "l",
  checked: false,
});

const table = document.createElement("table");
const tbody = document.createElement("tbody");
table.appendChild(tbody);
document.body.appendChild(table);

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>, {
    container: tbody,
  });
};

test("displays the correct item data", () => {
  render(<Item item={getItem()} />, {
    container: tbody,
  });

  expect(screen.getByText(/1l/i)).toBeInTheDocument();
  expect(screen.getByText(/milk/i)).toBeInTheDocument();
});

test("an item is striked-through when checked", () => {
  const { rerender } = render(<Item item={getItem()} />, {
    container: tbody,
  });

  expect(screen.getByRole("row")).toHaveStyle("text-decoration: none");
  rerender(<Item item={{ ...getItem(), checked: true }} />);
  expect(screen.getByRole("row")).toHaveStyle("text-decoration: line-through");
});

test("deletes an item when clicking the delete button", () => {
  const spy = jest.fn();
  const item = getItem();
  renderWithContext(<Item item={item} />, {
    dispatch: spy,
    language: "en",
  });

  fireEvent.click(screen.getByTitle(/delete item/i));
  expect(spy).toHaveBeenCalledWith({ type: "DELETE_ITEM", payload: item });
});

test("edits an item with a doubleclick", () => {
  const spy = jest.fn();
  const item = getItem();
  renderWithContext(<Item item={item} />, {
    dispatch: spy,
  });

  fireEvent.click(screen.getByRole("row"));
  expect(spy).not.toHaveBeenCalled();
  fireEvent.dblClick(screen.getByRole("row"));
  expect(spy).toHaveBeenCalledWith({ type: "SELECT_ITEM", payload: item });
});

test("toggles an item on or off with a single click", () => {
  jest.useFakeTimers("modern");
  window.navigator.vibrate = jest.fn();

  const spy = jest.fn();
  const item = getItem();
  renderWithContext(<Item item={item} />, {
    dispatch: spy,
  });

  fireEvent.click(screen.getByRole("row"), {
    detail: 1,
  });

  expect(spy).not.toHaveBeenCalled();
  jest.runAllTimers();
  expect(spy).toHaveBeenCalledWith({ type: "TOGGLE_CHECK_ITEM", payload: item });
  expect(window.navigator.vibrate).toHaveBeenCalledWith(50);
});
