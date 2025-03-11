import { useRef, useState } from "react";
import Dropdown from "./Dropdown/Dropdown";
import DropdownItem from "./DropdownItem/DropdownItem";
import clsx from "clsx";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { DropdownContext } from "./Context";
import { useFadeIn } from "@/hooks/hooks";

export default function CustomDropDownExampleComponent() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8];
  const [checked, setChecked] = useState<CheckedState | undefined>(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState<string>();

  const containerRef = useRef(null);
  const fadeinStyle = useFadeIn([containerRef]);

  return (
    <div
      ref={containerRef}
      style={fadeinStyle}
      className={clsx({
        "bg-accent relative flex h-[calc(100vh-200px)] w-1/2 flex-col items-center gap-2 rounded-md pb-2":
          true,
        "justify-center": !checked,
        "justify-end": checked,
      })}
    >
      <p>{text || "Click an Item!"}</p>
      <div className="bg-background flex items-center justify-center gap-2 rounded-sm px-4 py-2 shadow-sm">
        <Checkbox
          id="bottomofDiv"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <label htmlFor="bottomofDiv">Set dropdown to bottom</label>
      </div>
      <DropdownContext.Provider value={{ open, setOpen }}>
        <Dropdown buttonText="Dropdown Button">
          <>
            {items.map((item) => (
              <DropdownItem
                key={item}
                onClick={() => {
                  setText(`Clicked Item ${item}`);
                  setOpen(false);
                }}
              >
                <span>{`Item ${item}`}</span>
              </DropdownItem>
            ))}
          </>
        </Dropdown>
      </DropdownContext.Provider>
    </div>
  );
}
