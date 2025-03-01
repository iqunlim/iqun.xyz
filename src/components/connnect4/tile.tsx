import React from "react";

type TileState = "red" | "blue" | "empty";

export default function Tile({
  textValue,
  tileState,
  onClick,
}: {
  textValue?: string;
  tileState: TileState;
  onClick: () => void;
}) {
  const stateToStyle = (state: TileState): React.CSSProperties => {
    switch (state) {
      case "blue":
        return { backgroundColor: "oklch(0.623 0.214 259.815)" };
      case "empty":
        return {
          backgroundColor: "#000",
          border: "solid 1px white",
          borderColor: "#fff",
          color: "#fff",
        };
      case "red":
        return { backgroundColor: "oklch(0.637 0.237 25.331)" };
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
