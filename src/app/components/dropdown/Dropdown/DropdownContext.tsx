import { useContext, useState } from "react";
import { DropdownContext } from "../Context";

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  const [open, setOpen] = useState(false);
  if (!context) {
    return { open, setOpen };
  }
  return context;
};
