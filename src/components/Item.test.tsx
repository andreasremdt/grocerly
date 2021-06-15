import { render, fireEvent } from "@testing-library/react";

import Item from "./Item";

const getItem = () => ({
  id: Date.now(),
  name: "milk",
  amount: "1",
  unit: "l",
  checked: false,
});

test("displays the correct item data", () => {
  const { getByText } = render(
    <Item onDelete={jest.fn()} onSelect={jest.fn()} onToggle={jest.fn()} item={getItem()} />
  );

  expect(getByText(/1l/i)).toBeInTheDocument();
  expect(getByText(/milk/i)).toBeInTheDocument();
});

test("an item is striked-through when checked", () => {
  const { container, rerender } = render(
    <Item onDelete={jest.fn()} onToggle={jest.fn()} onSelect={jest.fn()} item={getItem()} />
  );

  expect(container.firstElementChild).toHaveStyle("text-decoration: none");
  rerender(
    <Item
      onDelete={jest.fn()}
      onToggle={jest.fn()}
      onSelect={jest.fn()}
      item={{ ...getItem(), checked: true }}
    />
  );
  expect(container.firstElementChild).toHaveStyle("text-decoration: line-through");
});

test("calls the `onDelete` function", () => {
  const spy = jest.fn();
  const item = getItem();
  const { getByTitle } = render(
    <Item onDelete={spy} onSelect={jest.fn()} onToggle={jest.fn()} item={item} />
  );

  fireEvent.click(getByTitle(/delete item/i));
  expect(spy).toHaveBeenCalledWith(item);
});

test("calls the `onSelect` function to edit an item", () => {
  const spy = jest.fn();
  const item = getItem();
  const { container } = render(
    <Item onDelete={jest.fn()} onSelect={spy} onToggle={jest.fn()} item={item} />
  );

  fireEvent.click(container.firstElementChild!);
  expect(spy).not.toHaveBeenCalled();
  fireEvent.dblClick(container.firstElementChild!);
  expect(spy).toHaveBeenCalledWith(item);
});

test("calls the `onToggle` function to check/uncheck an item", () => {
  jest.useFakeTimers("modern");
  window.navigator.vibrate = jest.fn();

  const spy = jest.fn();
  const item = getItem();
  const { container } = render(
    <Item onDelete={jest.fn()} onSelect={jest.fn()} onToggle={spy} item={item} />
  );

  fireEvent.touchStart(container.firstElementChild!);
  expect(spy).not.toHaveBeenCalled();
  jest.runAllTimers();
  expect(spy).toHaveBeenCalledWith(item);
  expect(window.navigator.vibrate).toHaveBeenCalledWith(100);
});
