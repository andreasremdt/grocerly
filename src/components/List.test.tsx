import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";
import List from "./List";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(
    <MemoryRouter initialEntries={["/list/123"]}>
      <GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>
    </MemoryRouter>
  );
};

test("always displays the form", () => {
  renderWithContext(<List />, {
    groceries: [],
    language: "en",
    isFormVisible: true,
    dispatch: jest.fn(),
  });

  expect(screen.getByPlaceholderText(/eggs, milk/i)).toBeInTheDocument();
});

test("displays an empty state if no items exist", () => {
  renderWithContext(<List />, {
    groceries: [],
    language: "en",
  });

  expect(screen.getByText(/nothing here, yet/i)).toBeInTheDocument();
  expect(screen.getByTestId("shopping-cart-icon")).toBeInTheDocument();
});

test("displays a list of items belonging to the list", () => {
  const groceries = [
    {
      id: Date.now(),
      name: "milk",
      amount: "1",
      unit: "l",
      checked: false,
      listId: 123,
    },
    {
      id: Date.now() + 1,
      name: "bread",
      amount: "",
      unit: "",
      checked: false,
      listId: 123,
    },
    {
      id: Date.now() + 2,
      name: "eggs",
      amount: "2",
      unit: "",
      checked: false,
      listId: 321,
    },
  ];

  renderWithContext(<List />, {
    groceries,
  });

  expect(screen.getByText(/milk/i)).toBeInTheDocument();
  expect(screen.getByText(/bread/i)).toBeInTheDocument();
  expect(screen.queryByText(/eggs/i)).not.toBeInTheDocument();
});
