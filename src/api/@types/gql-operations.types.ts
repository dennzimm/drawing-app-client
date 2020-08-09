

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDrawing
// ====================================================

export interface CreateDrawing_createDrawing {
  __typename: "Drawing";
  id: string;
}

export interface CreateDrawing {
  createDrawing: CreateDrawing_createDrawing;
}

export interface CreateDrawingVariables {
  createDrawingData: CreateDrawingInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateItem
// ====================================================

export interface CreateItem_createItem {
  __typename: "Item";
  id: string;
}

export interface CreateItem {
  createItem: CreateItem_createItem;
}

export interface CreateItemVariables {
  createItemData: CreateItemInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteItem
// ====================================================

export interface DeleteItem_deleteItem {
  __typename: "Item";
  id: string;
}

export interface DeleteItem {
  deleteItem: DeleteItem_deleteItem;
}

export interface DeleteItemVariables {
  userID: string;
  drawingID: string;
  itemID: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddSegment
// ====================================================

export interface AddSegment_addSegment {
  __typename: "Segment";
  itemID: string;
}

export interface AddSegment {
  addSegment: AddSegment_addSegment;
}

export interface AddSegmentVariables {
  segmentData: SegmentInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsServerOnline
// ====================================================

export interface IsServerOnline {
  isOnline: boolean;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDrawing
// ====================================================

export interface GetDrawing_drawing_items {
  __typename: "Item";
  data: string;
}

export interface GetDrawing_drawing {
  __typename: "Drawing";
  items: GetDrawing_drawing_items[];
}

export interface GetDrawing {
  drawing: GetDrawing_drawing;
}

export interface GetDrawingVariables {
  id: string;
  userID: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDrawings
// ====================================================

export interface GetDrawings_drawings_items {
  __typename: "Item";
  id: string;
  data: string;
}

export interface GetDrawings_drawings {
  __typename: "Drawing";
  id: string;
  items: GetDrawings_drawings_items[];
}

export interface GetDrawings {
  drawings: GetDrawings_drawings[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: DrawingDataPublished
// ====================================================

export interface DrawingDataPublished_drawingDataPublished_node_point {
  __typename: "Point";
  x: number;
  y: number;
}

export interface DrawingDataPublished_drawingDataPublished_node_path {
  __typename: "Path";
  strokeWidth: number;
  strokeColor: string | null;
}

export interface DrawingDataPublished_drawingDataPublished_node {
  __typename: "Segment";
  layerID: string | null;
  groupID: string | null;
  itemID: string;
  point: DrawingDataPublished_drawingDataPublished_node_point;
  path: DrawingDataPublished_drawingDataPublished_node_path;
}

export interface DrawingDataPublished_drawingDataPublished {
  __typename: "SegmentAdded";
  node: DrawingDataPublished_drawingDataPublished_node;
}

export interface DrawingDataPublished {
  drawingDataPublished: DrawingDataPublished_drawingDataPublished;
}

export interface DrawingDataPublishedVariables {
  userID: string;
  drawingID: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ItemMutated
// ====================================================

export interface ItemMutated_itemMutated_node {
  __typename: "Item";
  id: string;
  data: string;
}

export interface ItemMutated_itemMutated {
  __typename: "ItemMutation";
  mutation: MutationType;
  node: ItemMutated_itemMutated_node;
}

export interface ItemMutated {
  itemMutated: ItemMutated_itemMutated;
}

export interface ItemMutatedVariables {
  userID: string;
  drawingID: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SegmentAddedPayload
// ====================================================

export interface SegmentAddedPayload_node_point {
  __typename: "Point";
  x: number;
  y: number;
}

export interface SegmentAddedPayload_node_path {
  __typename: "Path";
  strokeWidth: number;
  strokeColor: string | null;
}

export interface SegmentAddedPayload_node {
  __typename: "Segment";
  layerID: string | null;
  groupID: string | null;
  itemID: string;
  point: SegmentAddedPayload_node_point;
  path: SegmentAddedPayload_node_path;
}

export interface SegmentAddedPayload {
  __typename: "SegmentAdded";
  node: SegmentAddedPayload_node;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum MutationType {
  CREATED = "CREATED",
  DELETED = "DELETED",
  UPDATED = "UPDATED",
}

// null
export interface CreateDrawingInput {
  userID: string;
  id: string;
}

// null
export interface CreateItemInput {
  userID: string;
  drawingID: string;
  id: string;
  data: string;
}

// null
export interface SegmentInput {
  userID: string;
  drawingID: string;
  layerID?: string | null;
  groupID?: string | null;
  itemID: string;
  point: PointInput;
  path: PathInput;
}

// null
export interface PointInput {
  x: number;
  y: number;
}

// null
export interface PathInput {
  strokeWidth: number;
  strokeColor?: string | null;
  fillColor?: string | null;
  strokeJoin?: string | null;
  strokeCap?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================