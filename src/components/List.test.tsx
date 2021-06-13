import { render } from "@testing-library/react";

import List from "./List";

test("displays an empty state if no items exist", () => {
  const { getByText, getByAltText } = render(
    <List onDelete={jest.fn()} onToggle={jest.fn()} groceries={[]} />
  );

  expect(getByText(/nothing here, yet/i)).toBeInTheDocument();
  expect(getByAltText("")).toBeInTheDocument();
});

test("displays a list of items", () => {
  const groceries = [
    {
      id: Date.now(),
      name: "milk",
      amount: 1,
      unit: "l",
      checked: false,
    },
    {
      id: Date.now() + 1,
      name: "bread",
      amount: NaN,
      unit: "",
      checked: false,
    },
  ];

  const { getByText } = render(
    <List onDelete={jest.fn()} onToggle={jest.fn()} groceries={groceries} />
  );

  expect(getByText(/milk/i)).toBeInTheDocument();
  expect(getByText(/bread/i)).toBeInTheDocument();
});
