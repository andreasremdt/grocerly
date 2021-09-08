import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

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
  const { getByTitle, getByText, queryByText, getByLabelText, rerender } = render(<App />);

  expect(queryByText(/theme color/i)).not.toBeInTheDocument();
  fireEvent.click(getByTitle(/toggle settings/i));
  expect(getByText(/theme color/i)).toBeInTheDocument();
  fireEvent.click(getByLabelText(/orange/i));
  expect(document.body.style.getPropertyValue("--primary-color")).toEqual("var(--orange)");
  expect(localStorage.getItem("color")).toEqual("orange");
  fireEvent.click(getByLabelText(/blue/i));
  expect(document.body.style.getPropertyValue("--primary-color")).toEqual("var(--blue)");
  expect(localStorage.getItem("color")).toEqual("blue");

  rerender(<App />);

  expect(document.body.style.getPropertyValue("--primary-color")).toEqual("var(--blue)");
  expect((getByLabelText(/blue/i) as HTMLInputElement).checked).toEqual(true);
});

test("switches the language", () => {
  const { getByTestId, getByTitle, getByText, queryByText } = render(<App />);

  expect(localStorage.getItem("language")).toEqual("en");
  fireEvent.click(getByTitle(/toggle settings/i));
  fireEvent.change(getByTestId("language-select"), { target: { value: "de" } });
  expect(queryByText(/nothing here, yet/i)).not.toBeInTheDocument();
  expect(getByText(/diese liste ist noch leer./i)).toBeInTheDocument();
  expect(localStorage.getItem("language")).toEqual("de");
});

test("toggles the form", () => {
  const { getByRole, getByTitle, queryByRole, getByPlaceholderText } = render(<App />);

  expect(getByRole("textbox")).toBeInTheDocument();
  expect(getByPlaceholderText(/eggs/i)).toHaveFocus();
  fireEvent.click(getByTitle(/toggle form/i));
  expect(queryByRole("textbox")).not.toBeInTheDocument();
  fireEvent.click(getByTitle(/toggle form/i));
  expect(getByRole("textbox")).toBeInTheDocument();
  expect(getByPlaceholderText(/eggs/i)).toHaveFocus();
});

test("items are persisted in local storage", () => {
  Element.prototype.scrollTo = jest.fn();

  const { getByPlaceholderText, getByLabelText, getByText, getAllByTitle } = render(<App />);

  fireEvent.change(getByPlaceholderText(/eggs/i), { target: { value: "tomatoes" } });
  fireEvent.change(getByPlaceholderText(/qt/i), { target: { value: "3" } });
  fireEvent.click(getByText(/^add$/i));

  expect(JSON.parse(localStorage.getItem("data")!)[0]).toMatchObject(
    expect.objectContaining({
      amount: "3",
      name: "tomatoes",
    })
  );

  fireEvent.change(getByPlaceholderText(/eggs/i), { target: { value: "water" } });
  fireEvent.change(getByPlaceholderText(/qt/i), { target: { value: "1" } });
  fireEvent.click(getByLabelText(/^l$/i));
  fireEvent.click(getByText(/^add$/i));

  expect(JSON.parse(localStorage.getItem("data")!).length).toEqual(2);
  fireEvent.click(getAllByTitle(/delete item/i)[0]);
  expect(JSON.parse(localStorage.getItem("data")!).length).toEqual(1);
});

test("adds, updates, and removes items", () => {
  Element.prototype.scrollTo = jest.fn();
  jest.useFakeTimers("modern");

  const { getByPlaceholderText, getByLabelText, getByText, queryByText, getByTitle } = render(
    <App />
  );

  expect(getByText(/nothing here, yet/i)).toBeInTheDocument();

  fireEvent.change(getByPlaceholderText(/eggs/i), { target: { value: "milk" } });
  fireEvent.change(getByPlaceholderText(/qt/i), { target: { value: "100" } });
  fireEvent.click(getByLabelText(/ml/i));
  fireEvent.click(getByText(/^add$/i));

  expect(getByText(/100ml/i)).toBeInTheDocument();
  expect(getByText(/milk/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/eggs/i)).toHaveFocus();
  expect((getByPlaceholderText(/eggs/i) as HTMLInputElement).value).toEqual("");
  expect((getByPlaceholderText(/qt/i) as HTMLInputElement).value).toEqual("");
  expect((getByLabelText(/ml/i) as HTMLInputElement).checked).toBeFalsy();
  expect(Element.prototype.scrollTo).toHaveBeenCalledTimes(1);

  act(() => {
    fireEvent.click(getByText(/milk/i).parentElement!, {
      detail: 1,
    });
    jest.runAllTimers();
  });

  expect(getByText(/milk/i).parentElement!).toHaveStyle("text-decoration: line-through");

  act(() => {
    fireEvent.click(getByText(/milk/i).parentElement!, {
      detail: 1,
    });
    jest.runAllTimers();
  });

  expect(getByText(/milk/i).parentElement!).toHaveStyle("text-decoration: none");
  fireEvent.dblClick(getByText(/milk/i).parentElement!);
  expect((getByPlaceholderText(/eggs/i) as HTMLInputElement).value).toEqual("milk");
  expect((getByPlaceholderText(/qt/i) as HTMLInputElement).value).toEqual("100");
  expect((getByLabelText(/ml/i) as HTMLInputElement).checked).toBeTruthy();
  fireEvent.change(getByPlaceholderText(/eggs/i), { target: { value: "bread" } });
  fireEvent.click(getByText(/^add$/i));

  expect(getByText(/100ml/i)).toBeInTheDocument();
  expect(queryByText(/milk/i)).not.toBeInTheDocument();
  expect(getByText(/bread/i)).toBeInTheDocument();

  fireEvent.click(getByTitle(/delete item/i));
  expect(getByText(/nothing here, yet/i)).toBeInTheDocument();
  expect(Element.prototype.scrollTo).toHaveBeenCalledTimes(1);
});
