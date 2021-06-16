import { render } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import List from "./List";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("displays an empty state if no items exist", () => {
  const { getByText, getByAltText } = renderWithContext(<List />, {
    groceries: [],
  });

  expect(getByText(/nothing here, yet/i)).toBeInTheDocument();
  expect(getByAltText("")).toBeInTheDocument();
});

test("the table header displays quantity and name", () => {
  const groceries = [
    {
      id: Date.now(),
      name: "milk",
      amount: "1",
      unit: "l",
      checked: false,
    },
  ];

  const { getByText } = renderWithContext(<List />, {
    groceries,
  });

  expect(getByText(/quantity/i)).toBeInTheDocument();
  expect(getByText(/name/i)).toBeInTheDocument();
});

test("displays a list of items", () => {
  const groceries = [
    {
      id: Date.now(),
      name: "milk",
      amount: "1",
      unit: "l",
      checked: false,
    },
    {
      id: Date.now() + 1,
      name: "bread",
      amount: "",
      unit: "",
      checked: false,
    },
  ];

  const { getByText } = renderWithContext(<List />, {
    groceries,
  });

  expect(getByText(/milk/i)).toBeInTheDocument();
  expect(getByText(/bread/i)).toBeInTheDocument();
});
