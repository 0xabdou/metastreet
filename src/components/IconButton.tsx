import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = {
  icon: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const IconButton = (props: IconButtonProps) => {
  const { icon, className, ...rest } = props;
  return (
    <button
      type="button"
      className={classNames(
        "flex rounded-full p-2 hover:bg-gray-200",
        className
      )}
      {...rest}
    >
      <div className="flex h-6 w-6">{icon}</div>
    </button>
  );
};

export default IconButton;
