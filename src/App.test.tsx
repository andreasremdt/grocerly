import { fireEvent, render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "./App";
import { LocalStorage } from "./utils/constants";

window.navigator.vibrate = jest.fn();

beforeEach(() => {
  localStorage.clear();
});

test("switches the language", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(localStorage.getItem(LocalStorage.Language)).toEqual("en");
  expect(screen.getByText(/nothing here, yet/i)).toBeInTheDocument();
  fireEvent.click(screen.getByTitle(/open menu/i));
  fireEvent.click(screen.getByText(/settings/i));
  fireEvent.change(screen.getByTestId("language-select"), { target: { value: "de" } });
  fireEvent.click(screen.getByTitle(/zurück/i));
  expect(screen.getByText(/keine einkaufslisten vorhanden/i)).toBeInTheDocument();
  expect(screen.queryByText(/nothing here, yet/i)).not.toBeInTheDocument();
  expect(localStorage.getItem(LocalStorage.Language)).toEqual("de");
});

test("creates, displays, and removes shopping lists", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByTitle(/create new list/i)).toBeInTheDocument();
  fireEvent.click(screen.getByTitle(/create new list/i));
  expect(screen.getByText(/provide a name for this grocery list:/i)).toBeInTheDocument();
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "List #1" } });
  fireEvent.click(screen.getByTitle(/create list/i));
  expect(screen.getByText(/nothing here, yet/i)).toBeInTheDocument();
  expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  expect(screen.getByRole("banner")).toHaveTextContent(/list #1/i);
  fireEvent.click(screen.getByTitle(/back/i));
  expect(screen.getByText(/list #1/i)).toBeInTheDocument();
  expect(screen.getByText(/this list is empty/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("link"));
  fireEvent.click(screen.getByTitle(/open menu/i));
  fireEvent.click(screen.getByText(/delete list/i));
  expect(screen.getByRole("dialog")).toHaveTextContent(/delete list/i);
  fireEvent.click(screen.getByTitle(/submit/i));

  await act(async () => {
    await Promise.resolve();
  });

  expect(screen.getByTitle(/create new list/i)).toBeInTheDocument();
  expect(screen.getByText(/start creating your first shopping/i)).toBeInTheDocument();
});

test("toggles the form", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByTitle(/create new list/i));
  fireEvent.click(screen.getByTitle(/create list/i));
  expect(screen.getByRole("banner")).toHaveTextContent(/untitled list/i);
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/eggs/i)).toHaveFocus();
  fireEvent.click(screen.getByTitle(/toggle form/i));
  expect(localStorage.getItem(LocalStorage.FormVisible)).toEqual("false");
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  fireEvent.click(screen.getByTitle(/toggle form/i));
  expect(localStorage.getItem(LocalStorage.FormVisible)).toEqual("true");
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/eggs/i)).toHaveFocus();
});

test("items are persisted in local storage", async () => {
  Element.prototype.scrollTo = jest.fn();

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByTitle(/create new list/i));
  fireEvent.click(screen.getByTitle(/create list/i));
  fireEvent.change(screen.getByPlaceholderText(/eggs/i), { target: { value: "tomatoes" } });
  fireEvent.change(screen.getByPlaceholderText(/qt/i), { target: { value: "3" } });
  fireEvent.click(screen.getByTestId("submit"));
  expect(JSON.parse(localStorage.getItem(LocalStorage.Groceries)!)[0]).toMatchObject(
    expect.objectContaining({
      amount: "3",
      name: "tomatoes",
    })
  );
  expect(JSON.parse(localStorage.getItem(LocalStorage.Lists)!)[0]).toMatchObject(
    expect.objectContaining({
      name: "Untitled list",
    })
  );
  fireEvent.change(screen.getByPlaceholderText(/eggs/i), { target: { value: "water" } });
  fireEvent.change(screen.getByPlaceholderText(/qt/i), { target: { value: "1" } });
  fireEvent.click(screen.getByLabelText(/^l$/i));
  fireEvent.click(screen.getByTestId("submit"));
  expect(JSON.parse(localStorage.getItem(LocalStorage.Groceries)!).length).toEqual(2);

  jest.useFakeTimers();
  fireEvent.pointerDown(screen.getByText(/water/i));

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(screen.getByRole("dialog")).toHaveTextContent(/delete item/i);
  fireEvent.click(screen.getByTitle(/submit/i));

  await act(async () => {
    await Promise.resolve();
  });

  expect(JSON.parse(localStorage.getItem(LocalStorage.Groceries)!).length).toEqual(1);

  jest.useRealTimers();
});

test("adds, updates, and removes items", async () => {
  Element.prototype.scrollTo = jest.fn();
  jest.useFakeTimers();

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByTitle(/create new list/i));
  fireEvent.click(screen.getByTitle(/create list/i));
  fireEvent.change(screen.getByPlaceholderText(/eggs/i), { target: { value: "milk" } });
  fireEvent.change(screen.getByPlaceholderText(/qt/i), { target: { value: "100" } });
  fireEvent.click(screen.getByLabelText(/ml/i));
  fireEvent.click(screen.getByTestId("submit"));

  expect(screen.getByText(/100ml/i)).toBeInTheDocument();
  expect(screen.getByText(/milk/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/eggs/i)).toHaveFocus();
  expect(screen.getByPlaceholderText(/eggs/i)).toHaveValue("");
  expect(screen.getByPlaceholderText(/qt/i)).toHaveValue(null);
  expect(screen.queryByLabelText(/ml/i)).not.toBeChecked();
  expect(Element.prototype.scrollTo).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole("checkbox"));
  expect(screen.getAllByRole("heading")[1]).toHaveClass("line-through");
  fireEvent.click(screen.getByRole("checkbox"));
  expect(screen.getAllByRole("heading")[1]).not.toHaveClass("line-through");
  fireEvent.pointerDown(screen.getByText(/milk/i));

  jest.advanceTimersByTime(100);

  fireEvent.pointerUp(screen.getByText(/milk/i));
  expect(screen.getByPlaceholderText(/eggs/i)).toHaveValue("milk");
  expect(screen.getByPlaceholderText(/qt/i)).toHaveValue(100);
  expect(screen.getByLabelText(/ml/i)).toBeChecked();
  fireEvent.change(screen.getByPlaceholderText(/eggs/i), { target: { value: "bread" } });
  fireEvent.click(screen.getByTestId("submit"));
  expect(screen.getByText(/100ml/i)).toBeInTheDocument();
  expect(screen.queryByText(/milk/i)).not.toBeInTheDocument();
  expect(screen.getByText(/bread/i)).toBeInTheDocument();
  fireEvent.pointerDown(screen.getByText(/bread/i));

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(screen.getByRole("dialog")).toHaveTextContent(/delete item/i);
  fireEvent.click(screen.getByTitle(/submit/i));

  await act(async () => {
    await Promise.resolve();
  });

  expect(screen.getByText(/nothing here, yet/i)).toBeInTheDocument();
  expect(Element.prototype.scrollTo).toHaveBeenCalledTimes(1);

  jest.useRealTimers();
});

test("initializes state with data from localStorage", () => {
  localStorage.setItem(
    LocalStorage.Lists,
    JSON.stringify([
      {
        id: 1,
        name: "List from localStorage",
      },
    ])
  );
  localStorage.setItem(
    LocalStorage.Groceries,
    JSON.stringify([
      {
        id: 1,
        name: "tomatoes from localStorage",
        unit: "",
        amount: "2",
        checked: false,
        listId: 1,
      },
    ])
  );

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole("link")).toHaveTextContent(/list from localStorage/i);
  fireEvent.click(screen.getByRole("link"));
  expect(screen.getByText(/tomatoes from localStorage/i)).toBeInTheDocument();
});
