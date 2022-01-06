import { ButtonHTMLAttributes } from "react";
import cx from "classnames";

function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cx(
        "h-10 rounded-sm px-4 outline-none bg-gray-50 shadow-sm border border-gray-200 active:shadow-purple-100 active:bg-purple-50 active:text-purple-500 active:border-purple-200",
        className
      )}
    />
  );
}

export default Button;
