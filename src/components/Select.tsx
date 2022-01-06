import { forwardRef, SelectHTMLAttributes, Ref } from "react";
import cx from "classnames";

function Input(
  { className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>,
  ref: Ref<HTMLSelectElement>
) {
  return (
    <select
      {...props}
      ref={ref}
      className={cx(
        "h-10 border border-gray-200 bg-white w-full rounded-sm px-2 outline-none focus:border-purple-200 shadow-sm focus:shadow-purple-100 focus:bg-purple-50 focus:text-purple-500",
        className
      )}
    >
      {children}
    </select>
  );
}

export default forwardRef(Input);
