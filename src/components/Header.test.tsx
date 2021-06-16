import { render, fireEvent } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import Header from "./Header";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("displays the app name", () => {
  const { getByText } = render(<Header onToggleForm={jest.fn()} isFormVisible={true} />);

  expect(getByText(/grocery list/i)).toBeInTheDocument();
});

test("calls the `onDeleteAll` function to delete all items", () => {
  const spy = jest.fn();
  const { getByTitle } = renderWithContext(
    <Header onToggleForm={jest.fn()} isFormVisible={true} />,
    {
      dispatch: spy,
    }
  );

  fireEvent.click(getByTitle(/delete all items/i));
  expect(spy).toHaveBeenCalledWith({ type: "DELETE_ALL" });
});

test("calls the `onToggleAll` function to toggle the form", () => {
  const spy = jest.fn();
  const { getByTitle } = render(<Header onToggleForm={spy} isFormVisible={true} />);

  fireEvent.click(getByTitle(/toggle form/i));
  expect(spy).toHaveBeenCalled();
});
