import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";
import AppMenu from "./AppMenu";

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

test("opens and closes the menu", () => {
  renderWithContext(<AppMenu />, {
    language: "en",
  });

  expect(screen.getByTitle(/open menu/i)).toBeInTheDocument();
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("menu")).toBeInTheDocument();
  fireEvent.keyDown(document.body, { key: "Escape" });
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
});

test("always displays the `Settings` entry and navigates to the page", () => {
  renderWithContext(<AppMenu />, {
    language: "en",
  });

  fireEvent.click(screen.getByRole("button"));
  expect(screen.queryByText(/delete list/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/clear all items/i)).not.toBeInTheDocument();
  expect(screen.getByText(/settings/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/settings/i));
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent(/settings page/i);
});

test("clears all items from a list", () => {
  const spy = jest.fn();
  window.confirm = jest.fn(() => false);
  renderWithContext(
    <AppMenu />,
    {
      language: "en",
      dispatch: spy,
    },
    ["/list/123"]
  );

  fireEvent.click(screen.getByRole("button"));
  fireEvent.click(screen.getByText(/clear all items/i));
  expect(spy).not.toHaveBeenCalled();

  window.confirm = jest.fn(() => true);
  fireEvent.click(screen.getByRole("button"));
  fireEvent.click(screen.getByText(/clear all items/i));
  expect(spy).toHaveBeenCalledWith({ type: "CLEAR_LIST", payload: 123 });
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent(/list page/i);
});

test("deletes a list and navigates to the homepage", () => {
  const spy = jest.fn();
  window.confirm = jest.fn(() => false);
  cleanup();
  renderWithContext(
    <AppMenu />,
    {
      language: "en",
      dispatch: spy,
    },
    ["/list/123"]
  );

  fireEvent.click(screen.getByRole("button"));
  fireEvent.click(screen.getByText(/delete list/i));
  expect(spy).not.toHaveBeenCalled();

  window.confirm = jest.fn(() => true);
  fireEvent.click(screen.getByRole("button"));
  fireEvent.click(screen.getByText(/delete list/i));
  expect(spy).toHaveBeenCalledWith({ type: "DELETE_LIST", payload: 123 });
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent(/home page/i);
});
