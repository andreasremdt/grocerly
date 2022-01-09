import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";

import NewListDialog from "./NewListDialog";

const renderWithContext = (ui: ReactNode, props: any, initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <GroceryContext.Provider value={{ ...props }}>
        {ui}
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/list/:listId" element={<h1>List page</h1>} />
        </Routes>
      </GroceryContext.Provider>
    </MemoryRouter>
  );
};

test("renders a form with a label, input, and buttons", () => {
  renderWithContext(<NewListDialog />, { language: "en", isNewListDialogVisible: false });

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  cleanup();
  renderWithContext(<NewListDialog />, { language: "en", isNewListDialogVisible: true });

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByText(/provide a name/i)).toBeInTheDocument();
  expect(screen.getByTitle(/create list/i)).toBeInTheDocument();
  expect(screen.getByTitle(/cancel/i)).toBeInTheDocument();
});

test("it calls dispatch to create a new list", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01").getTime());
  const spy = jest.fn();

  renderWithContext(<NewListDialog />, {
    language: "en",
    dispatch: spy,
    isNewListDialogVisible: true,
  });

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "List #1" } });
  fireEvent.click(screen.getByTitle(/create list/i));
  expect(spy).toHaveBeenCalledWith({
    type: "ADD_LIST",
    payload: { name: "List #1", id: 1577836800000 },
  });

  jest.useRealTimers();
});

test("it calls dispatch to hide the dialog", () => {
  const spy = jest.fn();

  renderWithContext(<NewListDialog />, {
    language: "en",
    dispatch: spy,
    isNewListDialogVisible: true,
  });

  fireEvent.click(screen.getByTitle(/cancel/i));
  expect(spy).toHaveBeenCalledWith({ type: "TOGGLE_NEW_LIST_DIALOG" });
  fireEvent.keyDown(document, { key: "Escape" });
  fireEvent.keyDown(document, { key: "Enter" });
  expect(spy).toHaveBeenCalledTimes(2);
});
