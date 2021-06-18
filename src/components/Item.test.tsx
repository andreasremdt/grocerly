import { render, fireEvent } from "@testing-library/react";
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
  const { getByText } = render(<Item item={getItem()} />, {
    container: tbody,
  });

  expect(getByText(/1l/i)).toBeInTheDocument();
  expect(getByText(/milk/i)).toBeInTheDocument();
});

test("an item is striked-through when checked", () => {
  const { container, rerender } = render(<Item item={getItem()} />, {
    container: tbody,
  });

  expect(container.firstElementChild).toHaveStyle("text-decoration: none");
  rerender(<Item item={{ ...getItem(), checked: true }} />);
  expect(container.firstElementChild).toHaveStyle("text-decoration: line-through");
});

test("calls the `onDelete` function", () => {
  const spy = jest.fn();
  const item = getItem();
  const { getByTitle } = renderWithContext(<Item item={item} />, {
    dispatch: spy,
    language: "en",
  });

  fireEvent.click(getByTitle(/delete item/i));
  expect(spy).toHaveBeenCalledWith({ type: "DELETE_ITEM", payload: item });
});

test("calls the `onSelect` function to edit an item", () => {
  const spy = jest.fn();
  const item = getItem();
  const { container } = renderWithContext(<Item item={item} />, {
    dispatch: spy,
  });

  fireEvent.click(container.firstElementChild!);
  expect(spy).not.toHaveBeenCalled();
  fireEvent.dblClick(container.firstElementChild!);
  expect(spy).toHaveBeenCalledWith({ type: "SELECT_ITEM", payload: item });
});

test("calls the `onToggle` function to check/uncheck an item", () => {
  jest.useFakeTimers("modern");
  window.navigator.vibrate = jest.fn();

  const spy = jest.fn();
  const item = getItem();
  const { container } = renderWithContext(<Item item={item} />, {
    dispatch: spy,
  });

  fireEvent.touchStart(container.firstElementChild!);
  expect(spy).not.toHaveBeenCalled();
  jest.runAllTimers();
  expect(spy).toHaveBeenCalledWith({ type: "TOGGLE_CHECK_ITEM", payload: item });
  expect(window.navigator.vibrate).toHaveBeenCalledWith(100);
});
