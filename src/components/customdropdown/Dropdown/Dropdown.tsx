import React, { useState, useEffect, useRef } from "react";
import DropdownButton from "../DopdownButton/DropdownButton";
import DropdownContent from "../DropdownContent/DropdownContent";

const Dropdown = ({
  buttonText,
  content,
}: {
  buttonText: string;
  content: React.JSX.Element;
}) => {
  const [open, setOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!open) {
      const spaceRemaining =
        window.innerHeight -
        (buttonRef.current?.getBoundingClientRect().bottom || 0);
      const contentHeight = contentRef.current?.clientHeight || 0;

      const topPosition =
        spaceRemaining > contentHeight ? null : spaceRemaining - contentHeight;

      setDropdownTop(topPosition);
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        //https://stackoverflow.com/questions/28900077/why-is-event-target-not-element-in-typescript is there a better way?
        !dropdownRef.current.contains(e.target as Node) //Required to assert here for functionality to work
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <DropdownButton ref={buttonRef} toggle={toggleDropdown} open={open}>
        <span>{buttonText}</span>
      </DropdownButton>
      <DropdownContent top={dropdownTop} ref={contentRef} open={open}>
        {content}
      </DropdownContent>
    </div>
  );
};

export default Dropdown;
