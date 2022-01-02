import { render, fireEvent, screen } from "@testing-library/react";

import NewListDialog from "./NewListDialog";

test("renders a form with a label, input, and buttons", () => {
  render(<NewListDialog onCancel={jest.fn()} onSubmit={jest.fn()} />);

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByText(/provide a name/i)).toBeInTheDocument();
  expect(screen.getAllByRole("button")[0]).toHaveTextContent(/cancel/i);
  expect(screen.getAllByRole("button")[1]).toHaveTextContent(/okay/i);
});

test("it calls the `onSubmit` prop when submitting the form", () => {
  jest.useFakeTimers().setSystemTime(new Date("2020-01-01").getTime());
  const spy = jest.fn();

  render(<NewListDialog onCancel={jest.fn()} onSubmit={spy} />);

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "List #1" } });
  fireEvent.click(screen.getByText(/okay/i));
  expect(spy).toHaveBeenCalledWith({ name: "List #1", id: 1577836800000 });

  jest.useRealTimers();
});

test("it calls the `onCancel` prop when clicking the cancel button or pressing ESC", () => {
  const spy = jest.fn();

  render(<NewListDialog onCancel={spy} onSubmit={jest.fn()} />);

  fireEvent.click(screen.getByText(/cancel/i));
  expect(spy).toHaveBeenCalled();
  fireEvent.keyDown(document, { key: "Escape" });
  fireEvent.keyDown(document, { key: "Enter" });
  expect(spy).toHaveBeenCalledTimes(2);
});
