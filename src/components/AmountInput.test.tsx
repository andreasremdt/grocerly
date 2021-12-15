import { render, fireEvent, screen } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import AmountInput from "./AmountInput";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("the amount can be controlled via buttons", () => {
  const spy = jest.fn();
  const { rerender } = renderWithContext(<AmountInput value="" onChange={spy} />, {
    language: "en",
  });

  expect(screen.getByPlaceholderText(/qt/i)).not.toHaveValue();
  fireEvent.click(screen.getByText("+"));
  expect(spy).toHaveBeenCalledWith("1");

  rerender(<AmountInput value="10" onChange={spy} />);

  expect(screen.getByRole("spinbutton")).toHaveValue(10);
  fireEvent.click(screen.getByText("+"));
  expect(spy).toHaveBeenCalledWith("20");

  rerender(<AmountInput value="150" onChange={spy} />);

  expect(screen.getByRole("spinbutton")).toHaveValue(150);
  fireEvent.click(screen.getByText("+"));
  expect(spy).toHaveBeenCalledWith("200");

  fireEvent.click(screen.getByText("-"));
  expect(spy).toHaveBeenCalledWith("100");

  rerender(<AmountInput value="36" onChange={spy} />);

  fireEvent.click(screen.getByText("-"));
  expect(spy).toHaveBeenCalledWith("20");

  fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "100" } });
  expect(spy).toHaveBeenCalledWith("100");
});
