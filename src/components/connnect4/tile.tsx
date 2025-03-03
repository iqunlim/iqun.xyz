import React from "react";
import { TileProps, TileState } from "./types";

export default function Tile({
  textValue,
  tileState,
  glowing,
  onClick,
}: TileProps) {
  const stateToStyle = (state: TileState): React.CSSProperties => {
    switch (state) {
      case "blue":
        return {
          backgroundColor: "oklch(0.623 0.214 259.815)",
          border: glowing ? "solid 4px yellow" : "",
        };
      case "empty":
        return {
          backgroundColor: "#000",
          border: "solid 1px white",
          borderColor: "#fff",
          color: "#fff",
        };
      case "red":
        return {
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

  return (
    <div
      onClick={onClick}
      className="h-full w-full border border-white bg-black"
    >
      <div
        style={stateToStyle(tileState)}
        className="flex h-full w-full items-center justify-center rounded-full"
      >
        {textValue || ""}
      </div>
    </div>
  );
}
