import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";
import ListOverview from "./ListOverview";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(
    <MemoryRouter>
      <GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>
    </MemoryRouter>
  );
};

test("it displays all lists", () => {
  renderWithContext(<ListOverview />, {
    lists: [
      { id: 1, name: "List #1" },
      { id: 2, name: "List #2" },
      { id: 3, name: "List #3" },
    ],
    groceries: [],
  });

  expect(screen.getAllByRole("link")).toHaveLength(3);
  expect(screen.getAllByRole("link")[0]).toHaveTextContent(/list #1/i);
});
