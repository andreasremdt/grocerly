import { ButtonHTMLAttributes, forwardRef, Ref } from "react";
import cx from "classnames";

const variants: { [key: string]: string } = {
  primary:
    "bg-purple-100 border-purple-200 text-purple-500 shadow-purple-100 hover:border-purple-300 focus:shadow-purple-200 focus:bg-purple-200 focus:border-purple-300 focus:text-purple-600 active:shadow-purple-200 active:bg-purple-200 active:border-purple-300 active:text-purple-600",
  secondary:
    "bg-gray-50 border-gray-200 hover:border-gray-300 focus:shadow-gray-100 focus:bg-gray-100 focus:border-gray-300 active:shadow-gray-100 active:bg-gray-100 active:border-gray-300",
};

const sizes: { [key: string]: string } = {
  small: "h-8",
  normal: "h-10 px-4",
};

type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "small" | "normal";
};

function Button(
  {
    className,
    variant = "primary",
    size = "normal",
    ...props
  }: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      ref={ref}
      className={cx(
        "rounded-sm outline-none shadow-sm border font-semibold uppercase text-xs cursor-pointer disabled:opacity-60 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
    />
  );
}

export default forwardRef(Button);
