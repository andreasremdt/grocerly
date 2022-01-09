import { render, fireEvent, screen } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import AmountInput from "./AmountInput";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("the amount is changed by typing in the input", () => {
  const spy = jest.fn();
  renderWithContext(<AmountInput value="" onChange={spy} />, { language: "en" });

  expect(screen.getByPlaceholderText(/qt/i)).not.toHaveValue();
  fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "100" } });
  expect(spy).toHaveBeenCalledWith("100");
});

test("the amount is increased by 1 if it's smaller than 10", () => {
  const spy = jest.fn();
  renderWithContext(<AmountInput value="9" onChange={spy} />, { language: "en" });

  fireEvent.click(screen.getByTitle(/increase/i));
  expect(spy).toHaveBeenCalledWith("10");
});

test("the amount is increased by 10 if it's smaller than 100", () => {
  const spy = jest.fn();
  renderWithContext(<AmountInput value="23" onChange={spy} />, { language: "en" });

  fireEvent.click(screen.getByTitle(/increase/i));
  expect(spy).toHaveBeenCalledWith("30");
});

test("the amount is increased by 50 if it's bigger than 100", () => {
  const spy = jest.fn();
  renderWithContext(<AmountInput value="141" onChange={spy} />, { language: "en" });

  fireEvent.click(screen.getByTitle(/increase/i));
  expect(spy).toHaveBeenCalledWith("150");
});

test("the amount is decreased by 1 if it's smaller than 10", () => {
  const spy = jest.fn();
  renderWithContext(<AmountInput value="9" onChange={spy} />, { language: "en" });

  fireEvent.click(screen.getByTitle(/decrease/i));
  expect(spy).toHaveBeenCalledWith("8");
});

test("the amount is decreased by 10 if it's smaller than 100", () => {
  const spy = jest.fn();
  renderWithContext(<AmountInput value="40" onChange={spy} />, { language: "en" });

  fireEvent.click(screen.getByTitle(/decrease/i));
  expect(spy).toHaveBeenCalledWith("30");
});

test("the amount is decreased by 50 if it's bigger than 100", () => {
  const spy = jest.fn();
  renderWithContext(<AmountInput value="200" onChange={spy} />, { language: "en" });

  fireEvent.click(screen.getByTitle(/decrease/i));
  expect(spy).toHaveBeenCalledWith("150");
});
