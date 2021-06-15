import { render, fireEvent } from "@testing-library/react";

import RadioButton from "./RadioButton";

test("renders the value correctly", () => {
  const { getByRole, getByLabelText } = render(
    <RadioButton onClick={jest.fn()} onChange={jest.fn()} value="mg" checked={false} />
  );

  expect(getByLabelText(/mg/i)).toBeInTheDocument();
  expect((getByRole("radio") as HTMLInputElement).value).toEqual("mg");
  expect((getByRole("radio") as HTMLInputElement).type).toEqual("radio");
});

test("calls the `onChange` and `onClick` functions", () => {
  const spy = jest.fn();
  const { getByRole } = render(
    <RadioButton onClick={spy} onChange={spy} value="mg" checked={false} />
  );

  fireEvent.click(getByRole("radio"));
  expect(spy).toHaveBeenCalledTimes(2);
});
