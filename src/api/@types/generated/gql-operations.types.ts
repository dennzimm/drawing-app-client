

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsOnline
// ====================================================

export interface IsOnline {
  isOnline: boolean;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PencilDraw
// ====================================================

export interface PencilDraw {
  pencilDraw: boolean;
}

export interface PencilDrawVariables {
  user: UserIdInput;
  drawing: DrawingNameInput;
  data: PencilDrawInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BrushDraw
// ====================================================

export interface BrushDraw {
  brushDraw: boolean;
}

export interface BrushDrawVariables {
  user: UserIdInput;
  drawing: DrawingNameInput;
  data: BrushDrawInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Erase
// ====================================================

export interface Erase {
  erase: boolean;
}

export interface EraseVariables {
  user: UserIdInput;
  drawing: DrawingNameInput;
  data: EraseInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: DrawingActionPublished
// ====================================================

export interface DrawingActionPublished_drawingActionPublished_node_PencilDraw_point {
  __typename: "Point";
  x: number;
  y: number;
}

export interface DrawingActionPublished_drawingActionPublished_node_PencilDraw_path {
  __typename: "Path";
  strokeWidth: number;
  strokeColor: string | null;
}

export interface DrawingActionPublished_drawingActionPublished_node_PencilDraw {
  __typename: "PencilDraw";
  layerID: string;
  itemID: string;
  point: DrawingActionPublished_drawingActionPublished_node_PencilDraw_point;
  path: DrawingActionPublished_drawingActionPublished_node_PencilDraw_path;
}

export interface DrawingActionPublished_drawingActionPublished_node_BrushDraw_delta {
  __typename: "Point";
  x: number;
  y: number;
  angle: number | null;
  angleInRadians: number | null;
  length: number | null;
  quadrant: number | null;
}

export interface DrawingActionPublished_drawingActionPublished_node_BrushDraw_middlePoint {
  __typename: "Point";
  x: number;
  y: number;
  angle: number | null;
  angleInRadians: number | null;
  length: number | null;
  quadrant: number | null;
}

export interface DrawingActionPublished_drawingActionPublished_node_BrushDraw_singlePoint {
  __typename: "Point";
  x: number;
  y: number;
}

export interface DrawingActionPublished_drawingActionPublished_node_BrushDraw_path {
  __typename: "Path";
  strokeWidth: number;
  fillColor: string | null;
  closed: boolean | null;
}

export interface DrawingActionPublished_drawingActionPublished_node_BrushDraw {
  __typename: "BrushDraw";
  layerID: string;
  itemID: string;
  delta: DrawingActionPublished_drawingActionPublished_node_BrushDraw_delta | null;
  middlePoint: DrawingActionPublished_drawingActionPublished_node_BrushDraw_middlePoint | null;
  singlePoint: DrawingActionPublished_drawingActionPublished_node_BrushDraw_singlePoint | null;
  path: DrawingActionPublished_drawingActionPublished_node_BrushDraw_path;
}

export interface DrawingActionPublished_drawingActionPublished_node_Erase_point {
  __typename: "Point";
  x: number;
  y: number;
}

export interface DrawingActionPublished_drawingActionPublished_node_Erase_path {
  __typename: "Path";
  strokeWidth: number;
}

export interface DrawingActionPublished_drawingActionPublished_node_Erase {
  __typename: "Erase";
  layerID: string;
  itemID: string;
  point: DrawingActionPublished_drawingActionPublished_node_Erase_point;
  path: DrawingActionPublished_drawingActionPublished_node_Erase_path;
}

export type DrawingActionPublished_drawingActionPublished_node = DrawingActionPublished_drawingActionPublished_node_PencilDraw | DrawingActionPublished_drawingActionPublished_node_BrushDraw | DrawingActionPublished_drawingActionPublished_node_Erase;

export interface DrawingActionPublished_drawingActionPublished {
  __typename: "DrawingAction";
  action: ActionType;
  node: DrawingActionPublished_drawingActionPublished_node;
}

export interface DrawingActionPublished {
  drawingActionPublished: DrawingActionPublished_drawingActionPublished;
}

export interface DrawingActionPublishedVariables {
  userId: string;
  drawingName: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PointCoordinates
// ====================================================

export interface PointCoordinates {
  __typename: "Point";
  x: number;
  y: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AllPointData
// ====================================================

export interface AllPointData {
  __typename: "Point";
  x: number;
  y: number;
  angle: number | null;
  angleInRadians: number | null;
  length: number | null;
  quadrant: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PencilDrawData
// ====================================================

export interface PencilDrawData_point {
  __typename: "Point";
  x: number;
  y: number;
}

export interface PencilDrawData_path {
  __typename: "Path";
  strokeWidth: number;
  strokeColor: string | null;
}

export interface PencilDrawData {
  __typename: "PencilDraw";
  layerID: string;
  itemID: string;
  point: PencilDrawData_point;
  path: PencilDrawData_path;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BrushDrawData
// ====================================================

export interface BrushDrawData_delta {
  __typename: "Point";
  x: number;
  y: number;
  angle: number | null;
  angleInRadians: number | null;
  length: number | null;
  quadrant: number | null;
}

export interface BrushDrawData_middlePoint {
  __typename: "Point";
  x: number;
  y: number;
  angle: number | null;
  angleInRadians: number | null;
  length: number | null;
  quadrant: number | null;
}

export interface BrushDrawData_singlePoint {
  __typename: "Point";
  x: number;
  y: number;
}

export interface BrushDrawData_path {
  __typename: "Path";
  strokeWidth: number;
  fillColor: string | null;
  closed: boolean | null;
}

export interface BrushDrawData {
  __typename: "BrushDraw";
  layerID: string;
  itemID: string;
  delta: BrushDrawData_delta | null;
  middlePoint: BrushDrawData_middlePoint | null;
  singlePoint: BrushDrawData_singlePoint | null;
  path: BrushDrawData_path;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EraseData
// ====================================================

export interface EraseData_point {
  __typename: "Point";
  x: number;
  y: number;
}

export interface EraseData_path {
  __typename: "Path";
  strokeWidth: number;
}

export interface EraseData {
  __typename: "Erase";
  layerID: string;
  itemID: string;
  point: EraseData_point;
  path: EraseData_path;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ActionType {
  BRUSH_DRAW = "BRUSH_DRAW",
  ERASE = "ERASE",
  PENCIL_DRAW = "PENCIL_DRAW",
}

// null
export interface UserIdInput {
  userId: string;
}

// null
export interface DrawingNameInput {
  drawingName: string;
}

// null
export interface PencilDrawInput {
  layerID: string;
  groupID?: string | null;
  itemID: string;
  path: PathInput;
  point: PointInput;
}

// null
export interface PathInput {
  strokeWidth: number;
  closed?: boolean | null;
  strokeColor?: string | null;
  fillColor?: string | null;
  strokeJoin?: string | null;
  strokeCap?: string | null;
  blendMode?: string | null;
}

// null
export interface PointInput {
  x: number;
  y: number;
  angle?: number | null;
  angleInRadians?: number | null;
  length?: number | null;
  quadrant?: number | null;
}

// null
export interface BrushDrawInput {
  layerID: string;
  groupID?: string | null;
  itemID: string;
  path: PathInput;
  delta?: PointInput | null;
  middlePoint?: PointInput | null;
  singlePoint?: PointInput | null;
}

// null
export interface EraseInput {
  layerID: string;
  groupID?: string | null;
  itemID: string;
  path: PathInput;
  point: PointInput;
}

//==============================================================
// END Enums and Input Objects
//==============================================================