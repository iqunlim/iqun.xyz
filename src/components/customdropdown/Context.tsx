import { createContext } from "react";

interface DropdownContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);
