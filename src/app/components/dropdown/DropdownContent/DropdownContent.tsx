import React, { forwardRef } from "react";
import "./DropdownContent.css";

type DropdownProps = {
  top: number | null;
  open: boolean;
  children: React.JSX.Element;
};

const DropdownContent = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, open, top }, ref) => {
    return (
      <div
        ref={ref}
        style={{ top: top ? `${top}px` : "100%" }}
        className={`bg-background border-primary no-scrollbar absolute mt-2 flex max-h-[40vh] min-w-full flex-col items-center divide-y overflow-y-scroll rounded-md border opacity-0 ${open ? "dd dd-open" : "dd"}`}
      >
        {children}
      </div>
    );
  },
);

DropdownContent.displayName = "DropdownContent";

export default DropdownContent;
