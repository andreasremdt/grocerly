import { render, fireEvent } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import Form from "./Form";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("renders all form elements", () => {
  const { getByLabelText, getAllByRole, getByText, getByPlaceholderText } = renderWithContext(
    <Form />,
    {
      language: "en",
    }
  );

  expect(getByPlaceholderText(/eggs, milk/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/quantity/i)).toBeInTheDocument();
  expect(getByLabelText(/kg/i)).toBeInTheDocument();
  expect(getByLabelText(/ml/i)).toBeInTheDocument();
  expect(getAllByRole("radio").length).toEqual(5);
  expect(getByText(/add/i)).toBeInTheDocument();
});

test("it does nothing if no name is provided", () => {
  const spy = jest.fn();
  const { getByText } = renderWithContext(<Form />, {
    dispatch: spy,
    language: "en",
  });

  fireEvent.click(getByText(/add/i));

  expect(spy).not.toHaveBeenCalled();
});

test("returns a new grocery object with only the name", () => {
  jest.spyOn(Date, "now").mockImplementation(() => 1487076708000);

  const spy = jest.fn();
  const { getByText, getByPlaceholderText } = renderWithContext(<Form />, {
    dispatch: spy,
    language: "en",
  });

  fireEvent.change(getByPlaceholderText(/eggs/i), { target: { value: "bread" } });
  fireEvent.click(getByText(/add/i));

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
  const { getByText, getByPlaceholderText, getByLabelText } = renderWithContext(<Form />, {
    dispatch: spy,
    language: "en",
  });

  fireEvent.change(getByPlaceholderText(/eggs/i), { target: { value: "milk" } });
  fireEvent.change(getByPlaceholderText(/quantity/i), { target: { value: 100 } });
  fireEvent.click(getByLabelText(/ml/i));
  fireEvent.click(getByText(/add/i));

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

  expect(getByPlaceholderText(/eggs/i)).toHaveFocus();
  expect(getByPlaceholderText(/eggs/i)).toHaveValue("");
  expect(getByPlaceholderText(/quantity/i)).toHaveValue(null);
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
  const { getByText, getByPlaceholderText, getAllByLabelText } = renderWithContext(<Form />, {
    editing,
    dispatch: spy,
    language: "en",
  });

  expect(getByPlaceholderText(/eggs/i)).toHaveValue("milk");
  expect(getByPlaceholderText(/quantity/i)).toHaveValue(100);
  expect((getAllByLabelText(/l/i)[1] as HTMLInputElement).checked).toEqual(true);

  fireEvent.change(getByPlaceholderText(/eggs/i), { target: { value: "bread" } });
  fireEvent.change(getByPlaceholderText(/quantity/i), { target: { value: 150 } });
  fireEvent.click(getByText(/add/i));

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
  const { getByText, getByPlaceholderText, getByLabelText } = renderWithContext(<Form />, {
    dispatch: spy,
    language: "en",
  });

  fireEvent.change(getByPlaceholderText(/eggs/i), { target: { value: "milk" } });
  fireEvent.click(getByLabelText(/ml/i));
  fireEvent.click(getByText(/add/i));

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
