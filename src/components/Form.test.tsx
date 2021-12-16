import { render, fireEvent, screen } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import Form from "./Form";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("renders null if `isFormVisible` is falsy", () => {
  renderWithContext(<Form />, {
    language: "en",
    isFormVisible: false,
  });

  expect(screen.queryByRole("form")).not.toBeInTheDocument();
});

test("renders all form elements", () => {
  renderWithContext(<Form />, {
    language: "en",
    isFormVisible: true,
  });

  expect(screen.getByPlaceholderText(/eggs, milk/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/qt/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/kg/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/ml/i)).toBeInTheDocument();
  expect(screen.getAllByRole("radio").length).toEqual(5);
  expect(screen.getByTestId("submit")).toBeInTheDocument();
});

test("the submit button is disabled if no name is provided", () => {
  const spy = jest.fn();
  renderWithContext(<Form />, {
    dispatch: spy,
    language: "en",
    isFormVisible: true,
  });

  fireEvent.click(screen.getByTestId("submit"));

  expect(screen.getByTestId("submit")).toHaveAttribute("disabled");
  expect(spy).not.toHaveBeenCalled();
});

test("returns a new grocery object with only the name", () => {
  jest.spyOn(Date, "now").mockImplementation(() => 1487076708000);

  const spy = jest.fn();
  renderWithContext(<Form />, {
    dispatch: spy,
    language: "en",
    isFormVisible: true,
  });

  fireEvent.change(screen.getByPlaceholderText(/eggs/i), { target: { value: "bread" } });

  expect(screen.getByTestId("submit")).not.toHaveAttribute("disabled");

  fireEvent.click(screen.getByTestId("submit"));

  expect(screen.getByTestId("submit")).toHaveAttribute("disabled");
  expect(spy).toHaveBeenCalledWith({
    type: "ADD_ITEM",
    payload: {
      id: 1487076708000,
      name: "bread",
      amount: "",
      unit: "",
      checked: false,
    },
  });
});

test("all grocery inputs are submitted", () => {
  jest.spyOn(Date, "now").mockImplementation(() => 1487076708000);

  const spy = jest.fn();
  renderWithContext(<Form />, {
    dispatch: spy,
    language: "en",
    isFormVisible: true,
  });

  fireEvent.change(screen.getByPlaceholderText(/eggs/i), { target: { value: "milk" } });
  fireEvent.change(screen.getByPlaceholderText(/qt/i), { target: { value: 100 } });
  fireEvent.click(screen.getByLabelText(/ml/i));
  fireEvent.click(screen.getByTestId("submit"));

  expect(spy).toHaveBeenCalledWith({
    type: "ADD_ITEM",
    payload: {
      id: 1487076708000,
      name: "milk",
      amount: "100",
      unit: "ml",
      checked: false,
    },
  });

  expect(screen.getByPlaceholderText(/eggs/i)).toHaveFocus();
  expect(screen.getByPlaceholderText(/eggs/i)).toHaveValue("");
  expect(screen.getByPlaceholderText(/qt/i)).toHaveValue(null);
});

test("an existing item can be updated", () => {
  const editing = {
    id: 1,
    name: "milk",
    amount: "100",
    unit: "l",
    checked: false,
  };
  const spy = jest.fn();
  renderWithContext(<Form />, {
    editing,
    dispatch: spy,
    language: "en",
    isFormVisible: true,
  });

  expect(screen.getByPlaceholderText(/eggs/i)).toHaveValue("milk");
  expect(screen.getByPlaceholderText(/qt/i)).toHaveValue(100);
  expect((screen.getAllByLabelText(/l/i)[1] as HTMLInputElement).checked).toEqual(true);

  fireEvent.change(screen.getByPlaceholderText(/eggs/i), { target: { value: "bread" } });
  fireEvent.change(screen.getByPlaceholderText(/qt/i), { target: { value: 150 } });
  fireEvent.click(screen.getByTestId("submit"));

  expect(spy).toHaveBeenCalledWith({
    type: "UPDATE_ITEM",
    payload: {
      id: 1,
      name: "bread",
      amount: "150",
      unit: "l",
      checked: false,
    },
  });
});

test("when no amount is specified, the unit is not submitted", () => {
  jest.spyOn(Date, "now").mockImplementation(() => 1487076708000);

  const spy = jest.fn();
  renderWithContext(<Form />, {
    dispatch: spy,
    language: "en",
    isFormVisible: true,
  });

  fireEvent.change(screen.getByPlaceholderText(/eggs/i), { target: { value: "milk" } });
  fireEvent.click(screen.getByLabelText(/ml/i));
  fireEvent.click(screen.getByTestId("submit"));

  expect(spy).toHaveBeenCalledWith({
    type: "ADD_ITEM",
    payload: {
      id: 1487076708000,
      name: "milk",
      amount: "",
      unit: "",
      checked: false,
    },
  });
});
