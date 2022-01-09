import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";
import Header from "./Header";

const renderWithContext = (ui: ReactNode, props: any, initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <GroceryContext.Provider value={{ ...props }}>
        {ui}
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/settings" element={<h1>Settings page</h1>} />
          <Route path="/list/:listId" element={<h1>List page</h1>} />
        </Routes>
      </GroceryContext.Provider>
    </MemoryRouter>
  );
};

test("displays the app name on the homepage", () => {
  renderWithContext(<Header />, { language: "en" });

  expect(screen.getByText(/grocerly/i)).toBeInTheDocument();
});

test("displays the list title on the list page", () => {
  renderWithContext(<Header />, { language: "en", lists: [{ id: 123, name: "List #1" }] }, [
    "/list/123",
  ]);

  expect(screen.getByText(/list #1/i)).toBeInTheDocument();
  expect(screen.queryByText(/grocerly/i)).not.toBeInTheDocument();
});

test("displays the app menu", () => {
  renderWithContext(<Header />, { language: "en" }, ["/"]);

  expect(screen.getByTitle(/open menu/i)).toBeInTheDocument();
});

test("navigates from the list page to the homepage", () => {
  renderWithContext(<Header />, { language: "en", lists: [{ id: 123, name: "List #1" }] }, [
    "/list/123",
  ]);

  expect(screen.getByText(/list page/i)).toBeInTheDocument();
  fireEvent.click(screen.getByTitle(/back/i));
  expect(screen.getByText(/home page/i)).toBeInTheDocument();
  expect(screen.queryByText(/back/i)).not.toBeInTheDocument();
});

test("calls dispatch to toggle the form", () => {
  const spy = jest.fn();
  renderWithContext(<Header />, { dispatch: spy, language: "en" }, ["/list/123"]);

  fireEvent.click(screen.getByTitle(/toggle form/i));
  expect(spy).toHaveBeenCalledWith({ type: "TOGGLE_FORM" });

  cleanup();
  renderWithContext(<Header />, { language: "en" }, ["/settings"]);

  expect(screen.queryByTitle(/toggle form/i)).not.toBeInTheDocument();

  cleanup();
  renderWithContext(<Header />, { language: "en" }, ["/"]);

  expect(screen.queryByTitle(/toggle form/i)).not.toBeInTheDocument();
});

test("calls dispatch to show the `NewListDialog`", () => {
  const spy = jest.fn();
  renderWithContext(<Header />, { dispatch: spy, language: "en" }, ["/"]);

  fireEvent.click(screen.getByTitle(/create new list/i));
  expect(spy).toHaveBeenCalledWith({ type: "TOGGLE_NEW_LIST_DIALOG" });

  cleanup();
  renderWithContext(<Header />, { language: "en" }, ["/settings"]);

  expect(screen.queryByTitle(/create new list/i)).not.toBeInTheDocument();

  cleanup();
  renderWithContext(<Header />, { language: "en" }, ["/list/123"]);

  expect(screen.queryByTitle(/create new list/i)).not.toBeInTheDocument();
});
