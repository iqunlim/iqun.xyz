import React, { useEffect, useState } from "react";
import { TileProps, TileState } from "./types";
import { remToPixels } from "@/lib/utils";

export default function Tile({
  row,
  // col, Current unused property, but perhaps there will be use for it later...
  totalRows, // I do not love that I have to pass this in. Perhaps a context for board row/col would be better?
  textValue,
  tileState,
  glowing,
  onClick,
}: TileProps) {
  // Calculate piece position providing it isnt already "dropped"
  const [width, setWidth] = useState(window.innerWidth);
  const widthBreakpoints = width >= remToPixels(40) ? 600 : 350; // sm breakpoints are 40rem, below that we want a 350px board
  const Y = Math.floor(widthBreakpoints / totalRows) * (row + 1); // calculating so that its in an extra grid-sized "space" above the board

  // This effect is a little bit overkill, as how often are users going to resize their window?
  // But this will handle resetting the location of where the pieces dropped if you resize the window
  // and the board sizes down (on breakpoint 40rem)
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stateToStyle = (state: TileState): React.CSSProperties => {
    switch (state) {
      case "blue":
        return {
          transform: `translateY(0)`,
          backgroundColor: "oklch(0.623 0.214 259.815)",
          border: glowing ? "solid 4px yellow" : "",
        };
      case "red":
        return {
          transform: `translateY(0)`,
          backgroundColor: "oklch(0.637 0.237 25.331)",
          border: glowing ? "solid 4px yellow" : "",
        };
      default: // case "empty"
        return {
          visibility: "hidden",
          color: "#fff",
          transform: `translateY(-${Y}px)`,
        };
    }
  };

  return (
    <div
      onClick={onClick}
      className="h-full w-full border border-white bg-black"
    >
      <div
        style={stateToStyle(tileState)}
        className={`box-border aspect-square h-full w-full items-center justify-center rounded-full transition-transform`}
      >
        {textValue || ""}
      </div>
    </div>
  );
}
