import { fireEvent, render, screen, act } from "@testing-library/react";

import App from "./App";

window.navigator.vibrate = jest.fn();

beforeEach(() => {
  localStorage.clear();
});

test("the app structure is rendered correctly", () => {
  const { container } = render(<App />);

  expect(container).toMatchSnapshot();
});

test("toggles the settings page and switches colors", () => {
  const { rerender } = render(<App />);

  expect(screen.queryByText(/theme color/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByTitle(/toggle settings/i));
  expect(screen.getByText(/theme color/i)).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText(/orange/i));
  expect(document.body.style.getPropertyValue("--primary-color")).toEqual("var(--orange)");
  expect(localStorage.getItem("color")).toEqual("orange");
  fireEvent.click(screen.getByLabelText(/blue/i));
  expect(document.body.style.getPropertyValue("--primary-color")).toEqual("var(--blue)");
  expect(localStorage.getItem("color")).toEqual("blue");

  rerender(<App />);

  expect(document.body.style.getPropertyValue("--primary-color")).toEqual("var(--blue)");
  expect(screen.getByLabelText(/blue/i)).toBeChecked();
});

test("switches the language", () => {
  render(<App />);

  expect(localStorage.getItem("language")).toEqual("en");
  fireEvent.click(screen.getByTitle(/toggle settings/i));
  fireEvent.change(screen.getByTestId("language-select"), { target: { value: "de" } });
  expect(screen.queryByText(/nothing here, yet/i)).not.toBeInTheDocument();
  expect(screen.getByText(/diese liste ist noch leer./i)).toBeInTheDocument();
  expect(localStorage.getItem("language")).toEqual("de");
});

test("toggles the form", () => {
  render(<App />);

  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/eggs/i)).toHaveFocus();
  fireEvent.click(screen.getByTitle(/toggle form/i));
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  fireEvent.click(screen.getByTitle(/toggle form/i));
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/eggs/i)).toHaveFocus();
});

test("items are persisted in local storage", () => {
  Element.prototype.scrollTo = jest.fn();

  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/eggs/i), { target: { value: "tomatoes" } });
  fireEvent.change(screen.getByPlaceholderText(/qt/i), { target: { value: "3" } });
  fireEvent.click(screen.getByTestId("submit"));

  expect(JSON.parse(localStorage.getItem("data")!)[0]).toMatchObject(
    expect.objectContaining({
      amount: "3",
      name: "tomatoes",
    })
  );

  fireEvent.change(screen.getByPlaceholderText(/eggs/i), { target: { value: "water" } });
  fireEvent.change(screen.getByPlaceholderText(/qt/i), { target: { value: "1" } });
  fireEvent.click(screen.getByLabelText(/^l$/i));
  fireEvent.click(screen.getByTestId("submit"));

  expect(JSON.parse(localStorage.getItem("data")!).length).toEqual(2);
  fireEvent.click(screen.getAllByTitle(/delete item/i)[0]);
  expect(JSON.parse(localStorage.getItem("data")!).length).toEqual(1);
});

test("adds, updates, and removes items", () => {
  Element.prototype.scrollTo = jest.fn();
  jest.useFakeTimers();

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

  fireEvent.click(screen.getByTestId("item"), {
    detail: 1,
  });

  act(() => {
    jest.advanceTimersByTime(300);
  });

  expect(screen.getByTestId("item")).toHaveStyle("text-decoration: line-through");

  fireEvent.click(screen.getByTestId("item"), {
    detail: 1,
  });

  act(() => {
    jest.advanceTimersByTime(300);
  });

  expect(screen.getByTestId("item")).toHaveStyle("text-decoration: none");
  fireEvent.dblClick(screen.getByTestId("item"));
  expect(screen.getByPlaceholderText(/eggs/i)).toHaveValue("milk");
  expect(screen.getByPlaceholderText(/qt/i)).toHaveValue(100);
  expect(screen.getByLabelText(/ml/i)).toBeChecked();
  fireEvent.change(screen.getByPlaceholderText(/eggs/i), { target: { value: "bread" } });
  fireEvent.click(screen.getByTestId("submit"));

  expect(screen.getByText(/100ml/i)).toBeInTheDocument();
  expect(screen.queryByText(/milk/i)).not.toBeInTheDocument();
  expect(screen.getByText(/bread/i)).toBeInTheDocument();

  fireEvent.click(screen.getByTitle(/delete item/i));
  expect(screen.getByText(/nothing here, yet/i)).toBeInTheDocument();
  expect(Element.prototype.scrollTo).toHaveBeenCalledTimes(1);

  jest.useRealTimers();
});
