import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { ReactNode } from "react";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
  className?: string;
};

const CustomDialog = (props: DialogProps) => {
  const { open, onClose, title, description, children, className } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
    >
      <div
        className={classNames(
          "max-w-screen relative z-20 flex flex-col rounded-xl bg-white p-4",
          className
        )}
      >
        <button onClick={onClose} className="absolute right-4 top-4">
          <XIcon className="h-5 w-5" />
        </button>
        <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
        <Dialog.Description className="mb-2">{description}</Dialog.Description>
        {children}
      </div>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black opacity-30" />
    </Dialog>
  );
};

export default CustomDialog;
