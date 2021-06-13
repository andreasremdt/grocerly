import { render, fireEvent } from "@testing-library/react";

import Form from "./Form";

test("renders all form elements", () => {
  const { getAllByText, getByText, getByPlaceholderText } = render(<Form onSubmit={jest.fn()} />);

  expect(getByPlaceholderText(/eggs, milk/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/quantity/i)).toBeInTheDocument();
  expect(getAllByText(/gram/i).length).toEqual(2);
  expect(getAllByText(/litres/i).length).toEqual(2);
  expect(getByText(/add/i)).toBeInTheDocument();
});

test("it does nothing if no name is provided", () => {
  const spy = jest.fn();
  const { getByText } = render(<Form onSubmit={spy} />);

  fireEvent.click(getByText(/add/i));

  expect(spy).not.toHaveBeenCalled();
});

test("returns a new grocery object with only the name", () => {
  jest.spyOn(Date, "now").mockImplementation(() => 1487076708000);

  const spy = jest.fn();
  const { getByText, getByPlaceholderText } = render(<Form onSubmit={spy} />);

  fireEvent.change(getByPlaceholderText(/eggs/i), { target: { value: "bread" } });
  fireEvent.click(getByText(/add/i));

  expect(spy).toHaveBeenCalledWith({
    id: 1487076708000,
    name: "bread",
    amount: NaN,
    unit: "",
    checked: false,
  });
});

test("all grocery properties are reflected", () => {
  jest.spyOn(Date, "now").mockImplementation(() => 1487076708000);

  const spy = jest.fn();
  const { getByText, getByPlaceholderText, getByTestId } = render(<Form onSubmit={spy} />);

  fireEvent.change(getByPlaceholderText(/eggs/i), { target: { value: "milk" } });
  fireEvent.change(getByPlaceholderText(/quantity/i), { target: { value: 100 } });
  fireEvent.change(getByTestId("unit"), { target: { value: "ml" } });
  fireEvent.click(getByText(/add/i));

  expect(spy).toHaveBeenCalledWith({
    id: 1487076708000,
    name: "milk",
    amount: 100,
    unit: "ml",
    checked: false,
  });

  expect(getByPlaceholderText(/eggs/i)).toHaveFocus();
  expect(getByPlaceholderText(/eggs/i)).toHaveValue("");
  expect(getByPlaceholderText(/quantity/i)).toHaveValue(null);
});
