import React from "react";
import { TileProps, TileState } from "./types";

export default function Tile({
  row,
  // col, Current unused property, but perhaps there will be use for it later...
  textValue,
  tileState,
  glowing,
  onClick,
}: TileProps) {
  // This variable is to calculate the piece position BEFORE it is dropped down
  const Y = Math.floor(600 / 7) * (row + 1);

  const stateToStyle = (state: TileState): React.CSSProperties => {
    switch (state) {
      case "blue":
        return {
          transform: `translateY(0)`,
          backgroundColor: "oklch(0.623 0.214 259.815)",
          border: glowing ? "solid 4px yellow" : "",
        };
      case "empty":
        return {
          visibility: "hidden",
          color: "#fff",
          transform: `translateY(-${Y}px)`,
        };
      case "red":
        return {
          transform: `translateY(0)`,
          backgroundColor: "oklch(0.637 0.237 25.331)",
          border: glowing ? "solid 4px yellow" : "",
        };
      default:
        return {
          color: "#fff",
          backgroundColor: "#000",
          border: "solid 1px white",
          borderColor: "#fff",
        };
    }
  };

  //  size = 600 / 7
  // size * 6
  // translateY(-size*6)

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
