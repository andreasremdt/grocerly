import { fireEvent, render } from "@testing-library/react";

import Header from "./Header";

test("displays the app name", () => {
  const { getByText } = render(<Header onDeleteAll={jest.fn()} />);

  expect(getByText(/grocery list/i)).toBeInTheDocument();
});

test("calls the `onDeleteAll` function", () => {
  const spy = jest.fn();
  const { getByTitle } = render(<Header onDeleteAll={spy} />);

  fireEvent.click(getByTitle(/delete all items/i));
  expect(spy).toHaveBeenCalled();
});
