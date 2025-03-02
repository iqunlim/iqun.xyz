import { JSX, useState } from "react";
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
        // If row is full, aka the top piece is filled
        if (i === 0 && newGrid[i][col].state !== "empty") {
          return prevGrid;
        }

        // Look for the first spot where you can drop it
        // and then set i-1 (which should inherently be empty because of
        // how connect 4 works) to the players piece
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
        // If it's at the bottom, set the bottom piece
        // i + 1 because base-0 arrays are funny
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
      elements: Set<[number, number]>,
    ): { elements: Set<[number, number]>; iterator: number } {
      if (!boardState.last) return { elements: elements, iterator: 0 };
      if (
        location[0] < 0 ||
        location[1] < 0 ||
        location[0] >= boardState.grid.length ||
        location[1] >= boardState.grid[location[0]].length
      )
        return { elements, iterator };

      if (
        boardState.grid[location[0]][location[1]].state ===
        boardState.grid[boardState.last[0]][boardState.last[1]].state
      ) {
        // check based on orientation
        elements.add(location);

        return dfs(
          iterateInOrientation(location[0], location[1], orientation),
          orientation,
          iterator + 1,
          elements,
        );
      }
      return { elements, iterator };
    }

    // Visit all possible directions you can "win" from
    const down = dfs(boardState.last, "down", 0, new Set());
    const left = dfs(boardState.last, "left", 0, new Set());
    const right = dfs(boardState.last, "right", 0, new Set());
    const upleft = dfs(boardState.last, "upleft", 0, new Set());
    const downright = dfs(boardState.last, "downright", 0, new Set());
    const upright = dfs(boardState.last, "upright", 0, new Set());
    const downleft = dfs(boardState.last, "downleft", 0, new Set());

    // Holding the elements here for when we want to highlight all winning circles
    const dfsResults = {
      down: { ...down },
      horizontal: {
        elements: [...left.elements, ...right.elements],
        iterator: left.iterator + right.iterator - 1,
      },
      diagonal1: {
        elements: [...upleft.elements, ...downright.elements],
        iterator: upleft.iterator + downright.iterator - 1,
      },
      diagonal2: {
        elements: [...upright.elements, ...downleft.elements],
        iterator: upright.iterator + downleft.iterator - 1,
      },
    };

    Object.values(dfsResults).forEach((value) => {
      if (value.iterator >= 4) {
        if (!boardState.last) return;
        const winner =
          boardState.grid[boardState.last[0]][boardState.last[1]].state;
        if (winner !== "red" && winner !== "blue") {
          throw new Error("Invalid winner! Error!");
        }
        setBoardState((prevBoardState) => {
          const newBoardState = { ...prevBoardState };
          value.elements.forEach(([row, col]) => {
            newBoardState.grid[row][col].element = (
              <Tile glowing {...prevBoardState.grid[row][col].element.props} />
            );
          });

          return {
            ...newBoardState,
            winner: winner,
          };
        });
      }
    });
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

const iterateInOrientation = (
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
