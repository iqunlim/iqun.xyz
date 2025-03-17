import clsx from "clsx";
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type DropdownButtonprops = {
  open: boolean;
  toggle: React.MouseEventHandler<HTMLDivElement>;
  children: React.JSX.Element;
};

const DropdownButton = React.forwardRef<HTMLDivElement, DropdownButtonprops>(
  ({ open, toggle, children }, ref) => {
    return (
      <div
        ref={ref}
        onClick={toggle}
        // style={open ? { border: "rgb(147, 197, 253) 2px solid" } : {}}
        className={clsx({
          "bg-background flex w-fit cursor-pointer items-center rounded-md p-4 shadow-md":
            true,
          "border-primary border-2": open,
        })}
        // className="bg-background flex w-fit cursor-pointer items-center rounded-sm p-4 shadow-md"
      >
        {children}
        <span className="ml-4 flex flex-col items-center justify-center">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
    );
  },
);

DropdownButton.displayName = "DropdownButton"; // Fixing displayname error for forwardrefs. Shouldnt be required anymore tbh

export default DropdownButton;
