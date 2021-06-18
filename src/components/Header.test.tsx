import { render, fireEvent } from "@testing-library/react";
import { ReactNode } from "react";

import { GroceryContext } from "../GroceryContext";
import Header from "./Header";

const renderWithContext = (ui: ReactNode, props: any) => {
  return render(<GroceryContext.Provider value={{ ...props }}>{ui}</GroceryContext.Provider>);
};

test("displays the app name", () => {
  const { getByText } = render(
    <Header
      onToggleForm={jest.fn()}
      onSettingsToggle={jest.fn()}
      isFormVisible={true}
      isSettingsVisible={false}
    />
  );

  expect(getByText(/grocerly/i)).toBeInTheDocument();
});

test("calls dispatch to delete all items", () => {
  const spy = jest.fn();
  const { getByTitle } = renderWithContext(
    <Header
      onToggleForm={jest.fn()}
      onSettingsToggle={jest.fn()}
      isFormVisible={true}
      isSettingsVisible={false}
    />,
    {
      dispatch: spy,
      language: "en",
    }
  );

  fireEvent.click(getByTitle(/delete all items/i));
  expect(spy).toHaveBeenCalledWith({ type: "DELETE_ALL" });
});

test("calls the `onToggleAll` function to toggle the form", () => {
  const spy = jest.fn();
  const { getByTitle } = renderWithContext(
    <Header
      onToggleForm={spy}
      onSettingsToggle={jest.fn()}
      isFormVisible={true}
      isSettingsVisible={false}
    />,
    {
      language: "en",
    }
  );

  fireEvent.click(getByTitle(/toggle form/i));
  expect(spy).toHaveBeenCalled();
});

test("calls the `onSettingsToggle` function", () => {
  const spy = jest.fn();
  const { getByTitle } = renderWithContext(
    <Header
      onToggleForm={jest.fn()}
      onSettingsToggle={spy}
      isFormVisible={true}
      isSettingsVisible={false}
    />,
    {
      language: "en",
    }
  );

  fireEvent.click(getByTitle(/toggle settings/i));
  expect(spy).toHaveBeenCalled();
});
