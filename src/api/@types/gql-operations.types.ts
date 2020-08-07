

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDrawing
// ====================================================

export interface CreateDrawing_createDrawing {
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
// GraphQL mutation operation: PublishNewSegment
// ====================================================

export interface PublishNewSegment_publishNewSegment {
  itemID: string;
}

export interface PublishNewSegment {
  publishNewSegment: PublishNewSegment_publishNewSegment;
}

export interface PublishNewSegmentVariables {
  newSegmentData: NewSegmentInput;
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
  data: string;
}

export interface GetDrawing_drawing {
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
  id: string;
  data: string;
}

export interface GetDrawings_drawings {
  id: string;
  items: GetDrawings_drawings_items[];
}

export interface GetDrawings {
  drawings: GetDrawings_drawings[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ItemMutated
// ====================================================

export interface ItemMutated_itemMutated_node {
  id: string;
  data: string;
}

export interface ItemMutated_itemMutated {
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
// GraphQL subscription operation: DrawingDataPublished
// ====================================================

export interface DrawingDataPublished_drawingDataPublished_node_segmentData {
  x: number;
  y: number;
}

export interface DrawingDataPublished_drawingDataPublished_node {
  layerID: string | null;
  groupID: string;
  itemID: string;
  strokeColor: string | null;
  fillColor: string | null;
  strokeWidth: number | null;
  segmentData: DrawingDataPublished_drawingDataPublished_node_segmentData;
}

export interface DrawingDataPublished_drawingDataPublished {
  __typename: "NewSegment";
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
// GraphQL fragment: NewSegmentData
// ====================================================

export interface NewSegmentData_node_segmentData {
  x: number;
  y: number;
}

export interface NewSegmentData_node {
  layerID: string | null;
  groupID: string;
  itemID: string;
  strokeColor: string | null;
  fillColor: string | null;
  strokeWidth: number | null;
  segmentData: NewSegmentData_node_segmentData;
}

export interface NewSegmentData {
  node: NewSegmentData_node;
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
export interface NewSegmentInput {
  userID: string;
  drawingID: string;
  layerID?: string | null;
  groupID: string;
  itemID: string;
  segmentData: SegmentDataInput;
  strokeColor?: string | null;
  fillColor?: string | null;
  strokeWidth?: number | null;
}

// null
export interface SegmentDataInput {
  x: number;
  y: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================