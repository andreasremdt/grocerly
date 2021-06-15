import { fireEvent, render } from "@testing-library/react";

import Header from "./Header";

test("displays the app name", () => {
  const { getByText } = render(
    <Header onDeleteAll={jest.fn()} onToggleForm={jest.fn()} isFormVisible={true} />
  );

  expect(getByText(/grocery list/i)).toBeInTheDocument();
});

test("calls the `onDeleteAll` function to delete all items", () => {
  const spy = jest.fn();
  const { getByTitle } = render(
    <Header onDeleteAll={spy} onToggleForm={jest.fn()} isFormVisible={true} />
  );

  fireEvent.click(getByTitle(/delete all items/i));
  expect(spy).toHaveBeenCalled();
});

test("calls the `onToggleAll` function to toggle the form", () => {
  const spy = jest.fn();
  const { getByTitle } = render(
    <Header onDeleteAll={jest.fn()} onToggleForm={spy} isFormVisible={true} />
  );

  fireEvent.click(getByTitle(/toggle form/i));
  expect(spy).toHaveBeenCalled();
});
