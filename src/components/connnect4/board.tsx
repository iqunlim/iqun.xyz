import { JSX, useEffect, useState } from "react";
import Tile from "./tile";
import { Button } from "../ui/button";

type BoardGrid = {
  turn: "red" | "blue";
  last?: [number, number];
  winner?: "red" | "blue" | "NOBODY";
  grid: Array<Array<BoardEntry>>;
};

type BoardEntry = {
  element: JSX.Element;
  state: "empty" | "red" | "blue";
};

export default function Board({ rows, cols }: { rows: number; cols: number }) {
  const setupBoard = (rows: number, cols: number) => {
    const boardGrid = new Array<Array<BoardEntry>>();
    for (let i = 0; i < rows; i++) {
      boardGrid[i] = [];
      for (let j = 0; j < cols; j++) {
        boardGrid[i][j] = {
          state: "empty",
          element: <Tile tileState={"empty"} onClick={() => addToCol(j)} />,
        };
      }
    }
    return { turn: "red", grid: boardGrid } as BoardGrid;
  };

  const [boardState, setBoardState] = useState<BoardGrid>(
    setupBoard(rows, cols),
  );

  function addToCol(col: number) {
    setBoardState((prevGrid) => {
      // If we have a winner, do not allow any updates
      if (prevGrid.winner) {
        return prevGrid;
      }
      const newGrid = prevGrid.grid.map((r) => [...r]);
      const newTurn = prevGrid.turn === "red" ? "blue" : "red";
      for (let i = 0; i < newGrid.length; i++) {
        if (i === 0 && newGrid[i][col].state !== "empty") {
          return prevGrid;
        }

        if (newGrid[i][col].state !== "empty") {
          newGrid[i - 1][col] = {
            state: prevGrid.turn,
            element: (
              <Tile tileState={prevGrid.turn} onClick={() => addToCol(col)} />
            ),
          };
          return {
            last: [i - 1, col],
            turn: newTurn,
            grid: newGrid,
          };
        }
        if (i + 1 === rows) {
          newGrid[i][col] = {
            state: prevGrid.turn,
            element: (
              <Tile tileState={prevGrid.turn} onClick={() => addToCol(col)} />
            ),
          };
          return {
            last: [i, col],
            turn: newTurn,
            grid: newGrid,
          };
        }
      }
      return prevGrid;
    });
  }

  function CheckLastWinner() {
    if (!boardState.last) return;
    function dfs(
      location: [number, number],
      orientation:
        | "left"
        | "right"
        | "down"
        | "upleft"
        | "upright"
        | "downleft"
        | "downright",
      iterator: number,
    ): number {
      if (!boardState.last) return 0;
      if (
        location[0] < 0 ||
        location[1] < 0 ||
        location[0] >= boardState.grid.length ||
        location[1] >= boardState.grid[location[0]].length
      )
        return iterator;

      if (
        boardState.grid[location[0]][location[1]].state ===
        boardState.grid[boardState.last[0]][boardState.last[1]].state
      ) {
        // check based on orientation

        return dfs(
          helper(location[0], location[1], orientation),
          orientation,
          iterator + 1,
        );
      }
      return iterator;
    }
    //-1 because we dont use a visited array so it re-visits the first one each dfs
    const dfsResults = [
      dfs(boardState.last, "down", 0),
      dfs(boardState.last, "left", 0) + dfs(boardState.last, "right", 0) - 1,
      dfs(boardState.last, "upleft", 0) +
        dfs(boardState.last, "downright", 0) -
        1,
      dfs(boardState.last, "upright", 0) +
        dfs(boardState.last, "downleft", 0) -
        1,
    ];

    // Check if any value is 4
    if (dfsResults.some((val) => val >= 4)) {
      const winner =
        boardState.grid[boardState.last[0]][boardState.last[1]].state;
      if (winner !== "red" && winner !== "blue") {
        throw new Error("Invalid winner! Error!");
      }
      setBoardState((prevState) => ({
        ...prevState,
        winner: winner,
      }));
    }
  }

  if (!boardState.winner) CheckLastWinner();

  if (
    boardState.grid.flat().every((tile) => tile.state !== "empty") &&
    !boardState.winner
  ) {
    setBoardState((prevState) => ({
      ...prevState,
      winner: "NOBODY",
    }));
  }

  return (
    <div className="bg-accent relative flex flex-col items-center rounded-md p-2">
      {boardState.winner && (
        <div className="flex w-full flex-col items-center">
          WINNER: {boardState.winner}
          <Button
            className="w-full"
            onClick={() => setBoardState(setupBoard(rows, cols))}
          >
            Reset
          </Button>
        </div>
      )}
      {!boardState.winner && <h1>{boardState.turn}'s turn</h1>}
      <div
        style={{
          gridTemplateRows: `repeat(${rows}, 100px)`,
          gridTemplateColumns: `repeat(${cols}, 100px)`,
        }}
        className="m-4 grid rounded-md bg-black"
      >
        {boardState.grid.flat().map((cell, index) => (
          <div key={index}>{cell.element}</div>
        ))}
      </div>
    </div>
  );
}

const helper = (
  row: number,
  col: number,
  orientation: string,
): [number, number] => {
  switch (orientation) {
    case "left":
      return [row, col - 1];
    case "right":
      return [row, col + 1];
    case "down":
      return [row + 1, col];
    case "upleft":
      return [row - 1, col - 1];
    case "upright":
      return [row - 1, col + 1];
    case "downleft":
      return [row + 1, col - 1];
    case "downright":
      return [row + 1, col + 1];
    default:
      return [row, col];
  }
};
