import classNames from "classnames";
import { InputHTMLAttributes } from "react";

type InputProps = { error?: string } & InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  const { error, className, ...rest } = props;

  return (
    <input
      className={classNames(className, "rounded border px-2 py-2", {
        "border-gray-300": !error,
        "border-red-500": error,
      })}
      {...rest}
    />
  );
};
