import { act } from "react-dom/test-utils";

import { render, fireEvent, screen } from "../test-utils";
import AppMenu from "./AppMenu";

test("opens and closes the menu", () => {
  render(<AppMenu />);

  expect(screen.getByTitle(/open menu/i)).toBeInTheDocument();
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("menu")).toBeInTheDocument();
  fireEvent.keyDown(document.body, { key: "Escape" });
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
});

test("always displays the `Settings` entry and navigates to the page", () => {
  render(<AppMenu />, {}, { withRoutes: true });

  fireEvent.click(screen.getByRole("button"));
  expect(screen.queryByText(/delete list/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/clear all items/i)).not.toBeInTheDocument();
  expect(screen.getByText(/settings/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/settings/i));
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent(/settings page/i);
});

test("clears all items from a list", async () => {
  const spy = jest.fn();
  render(<AppMenu />, { dispatch: spy }, { initialEntries: ["/list/123"], withRoutes: true });

  fireEvent.click(screen.getByRole("button"));
  fireEvent.click(screen.getByText(/clear all items/i));
  expect(screen.getByRole("dialog")).toHaveTextContent(/clear all items/i);
  fireEvent.click(screen.getByTitle(/cancel/i));
  expect(spy).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole("button"));
  fireEvent.click(screen.getByText(/clear all items/i));
  fireEvent.click(screen.getByTitle(/submit/i));

  await Promise.resolve();

  expect(spy).toHaveBeenCalledWith({ type: "CLEAR_LIST", payload: 123 });
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent(/list page/i);
});

test("deletes a list and navigates to the homepage", async () => {
  const spy = jest.fn();
  render(<AppMenu />, { dispatch: spy }, { initialEntries: ["/list/123"], withRoutes: true });

  fireEvent.click(screen.getByRole("button"));
  fireEvent.click(screen.getByText(/delete list/i));
  expect(screen.getByRole("dialog")).toHaveTextContent(/delete list/i);
  fireEvent.click(screen.getByTitle(/cancel/i));
  expect(spy).not.toHaveBeenCalled();

  fireEvent.click(screen.getByRole("button"));
  fireEvent.click(screen.getByText(/delete list/i));
  fireEvent.click(screen.getByTitle(/submit/i));

  await act(async () => {
    await Promise.resolve();
  });

  expect(spy).toHaveBeenCalledWith({ type: "DELETE_LIST", payload: 123 });
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  expect(screen.getByRole("heading")).toHaveTextContent(/home page/i);
});
