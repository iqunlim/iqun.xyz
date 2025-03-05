import React from "react";

const DropdownItem = ({
  children,
  onClick,
}: {
  children: React.JSX.Element;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className="hover:bg-accent m-[0.1rem] w-full cursor-pointer p-2 pl-4"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
