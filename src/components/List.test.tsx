import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import List from "./List";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("displays an empty state if no items exist", () => {
  renderWithContext(<List />, {
    groceries: [],
    language: "en",
  });

  expect(screen.getByText(/nothing here, yet/i)).toBeInTheDocument();
  expect(screen.getByTestId("shopping-cart-icon")).toBeInTheDocument();
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

  renderWithContext(<List />, {
    groceries,
    language: "en",
  });

  expect(screen.getByText(/quantity/i)).toBeInTheDocument();
  expect(screen.getByText(/name/i)).toBeInTheDocument();
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

  renderWithContext(<List />, {
    groceries,
  });

  expect(screen.getByText(/milk/i)).toBeInTheDocument();
  expect(screen.getByText(/bread/i)).toBeInTheDocument();
});
