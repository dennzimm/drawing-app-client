export enum StrokeCapType {
  ROUND = "round",
  SQUARE = "square",
  BUTT = "butt",
}

export enum StrokeJoinType {
  MITER = "miter",
  ROUND = "round",
  BEVEL = "bevel",
}

export interface Path {
  strokeWidth: number;
  strokeColor?: Nullable<string>;
  fillColor?: Nullable<string>;
  strokeJoin?: Nullable<string>;
  strokeCap?: Nullable<string>;
}

export interface Point {
  x: number;
  y: number;
}
