export type Teams = "red" | "blue";

export type TileState = Teams | "empty";

export type BoardState = {
  turn: Teams;
  last?: [number, number];
  winner?: Teams | "NOBODY";
  grid: Array<Array<BoardGridTile>>;
};

export type BoardGridTile = {
  element: TileProps;
  state: TileState;
};

export type TileProps = {
  row: number;
  col: number;
  textValue?: string;
  tileState: TileState;
  glowing?: boolean;
  onClick: () => void;
};
