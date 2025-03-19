"use client";
import { useRef, useState } from "react";
import Tile from "./tile";
import { Button } from "../../../components/ui/button";
import { BoardGridTile, BoardState } from "./types";
import { useFadeIn } from "@/hooks/hooks";
import clsx from "clsx";

// Connect 4 component
// There is a lot of musings in here about what is actually good practice in react
// I may know these answers already in the future, and may laugh at this some time later.

export default function Board({ rows, cols }: { rows: number; cols: number }) {
  // Resetter function
  const setupBoard = (rows: number, cols: number) => {
    const boardGrid = new Array<Array<BoardGridTile>>();
    for (let i = 0; i < rows; i++) {
      boardGrid[i] = [];
      for (let j = 0; j < cols; j++) {
        boardGrid[i][j] = {
          state: "empty",
          element: {
            row: i,
            totalRows: rows,
            col: j,
            tileState: "empty",
            onClick: () => addPiecetoColumn(j),
          },
        };
      }
    }
    return { turn: "red", grid: boardGrid } as BoardState;
  };

  // Optimization: A callback function will only execute once
  // A function passed in to state will execute every single render
  // If its "expensive" (this isnt expensive but it is O(n^2) use a callback function)
  const [boardState, setBoardState] = useState<BoardState>(() =>
    setupBoard(rows, cols),
  );

  // Any piece clicked on a column adds it to the highest spot it can go to
  // (or nothing if its at the top)
  // (OR nothing if theres a game winner)
  function addPiecetoColumn(col: number) {
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
          // Do nothing and do not change the turn
          return prevGrid;
        }

        // Look for the first spot with a piece
        // and drop the piece in right above it
        if (newGrid[i][col].state !== "empty") {
          newGrid[i - 1][col] = {
            state: prevGrid.turn,
            element: {
              ...newGrid[i - 1][col].element,
              tileState: prevGrid.turn,
            },
          };
          return {
            last: [i - 1, col],
            turn: newTurn,
            grid: newGrid,
          };
        }
        // If it's at the bottom, set the bottom piece
        if (i + 1 === rows) {
          newGrid[i][col] = {
            state: prevGrid.turn,
            element: {
              ...newGrid[i][col].element,
              tileState: prevGrid.turn,
            },
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

  function CheckForWinningMove() {
    if (!boardState.last) return;

    // Search for X-in-a-row
    function dfs(
      current: [number, number],
      changeRow: number = 0,
      changeCol: number = 0,
      elements: Set<[number, number]> = new Set(),
    ): Set<[number, number]> {
      // Checking if out of bounds
      if (!boardState.last) return elements;
      const [row, col] = current;
      if (
        row < 0 ||
        col < 0 ||
        row >= boardState.grid.length ||
        col >= boardState.grid[row].length
      )
        return elements;

      // If the piece has the same player as whatever piece we just played
      if (
        boardState.grid[row][col].state ===
        boardState.grid[boardState.last[0]][boardState.last[1]].state
      ) {
        // Add the element to the "found elements" set
        elements.add(current);

        // search further in to whatever orientation we are moving down
        return dfs(
          [row + changeRow, col + changeCol],
          changeRow,
          changeCol,
          elements,
        );
      }
      // Didn't find it, piece was different / empty so return what we've found
      return elements;
    }

    // Visit all possible directions you can "win" from
    const down = dfs(boardState.last, 1, 0);
    const left = dfs(boardState.last, 0, -1);
    const right = dfs(boardState.last, 0, 1);
    const upleft = dfs(boardState.last, -1, -1);
    const downright = dfs(boardState.last, 1, 1);
    const upright = dfs(boardState.last, -1, 1);
    const downleft = dfs(boardState.last, 1, -1);

    // Holding the elements here for when we want to highlight all winning circles
    const dfsResults = {
      down: down,
      horizontal: new Set([...left, ...right]),
      diagonal1: new Set([...upleft, ...downright]),
      diagonal2: new Set([...upright, ...downleft]),
    };

    // Is updating state in a loop bad practice? It feels weird.
    // Maybe having "winner" and "highlightedElements" variables and then setting the state once at the end
    // Would be more ideal
    // But like, the amount of times it will set state more than once is so small...
    Object.values(dfsResults).forEach((elementSet) => {
      if (elementSet.size < 4 || !boardState.last) return;
      // Is there a better way to extrapolate the winner than...this?
      const winner =
        boardState.grid[boardState.last[0]][boardState.last[1]].state;
      // Because it causes this, which is the only thrown error...that would break the component
      if (winner !== "red" && winner !== "blue") {
        throw new TypeError(
          'TypeError: winner state was not in type Teams, expected "red" | "blue"',
        );
      }
      // Iterating through the found pairs of elements from the DFS
      // And setting them to be indicated so the players can see
      // Where the winning move was, and then setting the winner.
      setBoardState((prevBoardState) => {
        const newBoardState = { ...prevBoardState };
        elementSet.forEach(([row, col]) => {
          newBoardState.grid[row][col].element = {
            ...prevBoardState.grid[row][col].element,
            glowing: true,
          };
        });

        return {
          ...newBoardState,
          winner: winner,
        };
      });
    });
  }

  // Checking if every tile is filled and there is no winner
  if (
    boardState.grid.flat().every((tile) => tile.state !== "empty") &&
    !boardState.winner
  ) {
    setBoardState((prevState) => ({
      ...prevState,
      winner: "NOBODY",
    }));
  }

  // This is a bit hacky, if the winning move happens as the board is filled
  // We re-set the state later, changing the winner to the correct winner from "NOBODY" in the above function
  // I do not like this very much...
  if (!boardState.winner) CheckForWinningMove();

  const boardRef = useRef(null);
  const fadeinStyle = useFadeIn([boardRef]);

  return (
    <div
      style={fadeinStyle}
      ref={boardRef}
      className="bg-accent relative flex flex-col items-center rounded-md p-2"
    >
      <div className="flex w-full flex-col items-center"></div>
      <h1 className="flex w-full items-center justify-center">
        {boardState.turn.charAt(0).toUpperCase() + boardState.turn.slice(1)}
        &apos;s turn
      </h1>
      <div
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
        className="m-4 grid w-[350px] rounded-md bg-black transition-all sm:w-[600px]"
      >
        {boardState.grid.flat().map((cell, index) => (
          <Tile key={index} {...cell.element} />
        ))}
      </div>
      {
        <p className={clsx({ invisible: !boardState.winner })}>
          WINNER: {boardState.winner}
        </p>
      }
      <Button
        className={clsx({
          "w-full": true,
          invisible: !boardState.winner,
        })}
        // className="w-full"
        onClick={() => setBoardState(setupBoard(rows, cols))}
      >
        Reset
      </Button>
    </div>
  );
}
