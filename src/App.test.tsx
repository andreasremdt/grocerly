import { fireEvent, render, screen, act } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "./GroceryContext";
import App from "./App";
import { LocalStorage } from "./utils/constants";

window.navigator.vibrate = jest.fn();

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

beforeEach(() => {
  localStorage.clear();
});

test.skip("the app structure is rendered correctly", () => {
  renderWithContext(<App />, {
    activeList: 1,
    lists: [],
    groceries: [],
    isFormVisible: true,
    language: "en",
  });

  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  expect(screen.getByText(/nothing here/i)).toBeInTheDocument();
});

test.skip("toggles the settings page and switches colors", () => {
  const { rerender } = renderWithContext(<App />, {
    activeList: null,
    lists: [],
    language: "en",
  });

  expect(screen.queryByText(/theme color/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByTitle(/toggle settings/i));
  expect(screen.getByText(/theme color/i)).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText(/orange/i));
  expect(document.body.style.getPropertyValue("--primary-color")).toEqual("var(--orange)");
  expect(localStorage.getItem(LocalStorage.Color)).toEqual("orange");
  fireEvent.click(screen.getByLabelText(/blue/i));
  expect(document.body.style.getPropertyValue("--primary-color")).toEqual("var(--blue)");
  expect(localStorage.getItem(LocalStorage.Color)).toEqual("blue");

  rerender(<App />);

  expect(document.body.style.getPropertyValue("--primary-color")).toEqual("var(--blue)");
  expect(screen.getByLabelText(/blue/i)).toBeChecked();
});

test.skip("switches the language", () => {
  render(<App />);

  expect(localStorage.getItem(LocalStorage.Language)).toEqual("en");
  fireEvent.click(screen.getByTitle(/toggle settings/i));
  fireEvent.change(screen.getByTestId("language-select"), { target: { value: "de" } });
  expect(screen.queryByText(/nothing here, yet/i)).not.toBeInTheDocument();
  expect(screen.getByText(/diese liste ist noch leer./i)).toBeInTheDocument();
  expect(localStorage.getItem(LocalStorage.Language)).toEqual("de");
});

test.skip("toggles the form", () => {
  render(<App />);

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

test.skip("items are persisted in local storage", () => {
  Element.prototype.scrollTo = jest.fn();
  window.confirm = jest.fn(() => true);

  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/eggs/i), { target: { value: "tomatoes" } });
  fireEvent.change(screen.getByPlaceholderText(/qt/i), { target: { value: "3" } });
  fireEvent.click(screen.getByTestId("submit"));

  expect(JSON.parse(localStorage.getItem(LocalStorage.Groceries)!)[0]).toMatchObject(
    expect.objectContaining({
      amount: "3",
      name: "tomatoes",
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

  expect(JSON.parse(localStorage.getItem(LocalStorage.Groceries)!).length).toEqual(1);

  jest.useRealTimers();
});

test.skip("adds, updates, and removes items", () => {
  Element.prototype.scrollTo = jest.fn();
  jest.useFakeTimers();
  window.confirm = jest.fn(() => true);

  render(<App />);

  expect(screen.getByText(/nothing here, yet/i)).toBeInTheDocument();

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

  expect(screen.getAllByRole("heading")[1]).toHaveClass("checked");

  fireEvent.click(screen.getByRole("checkbox"));

  expect(screen.getAllByRole("heading")[1]).not.toHaveClass("checked");

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

  expect(window.confirm).toHaveBeenCalled();
  expect(screen.getByText(/nothing here, yet/i)).toBeInTheDocument();
  expect(Element.prototype.scrollTo).toHaveBeenCalledTimes(1);

  jest.useRealTimers();
});
