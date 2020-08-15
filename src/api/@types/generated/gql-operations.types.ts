

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PublishPencilDrawing
// ====================================================

export interface PublishPencilDrawing {
  publishPencilDrawing: boolean;
}

export interface PublishPencilDrawingVariables {
  pencilDrawingData: PencilDrawingInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PublishBrushDrawing
// ====================================================

export interface PublishBrushDrawing {
  publishBrushDrawing: boolean;
}

export interface PublishBrushDrawingVariables {
  brushDrawingData: BrushDrawingInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PublishEraseDrawing
// ====================================================

export interface PublishEraseDrawing {
  publishEraseDrawing: boolean;
}

export interface PublishEraseDrawingVariables {
  eraseDrawingData: EraseDrawingInput;
}


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
// GraphQL mutation operation: CreateOrFindDrawing
// ====================================================

export interface CreateOrFindDrawing_createOrFindDrawing_items {
  __typename: "Item";
  id: string;
  data: string;
}

export interface CreateOrFindDrawing_createOrFindDrawing {
  __typename: "Drawing";
  id: string;
  items: CreateOrFindDrawing_createOrFindDrawing_items[];
}

export interface CreateOrFindDrawing {
  createOrFindDrawing: CreateOrFindDrawing_createOrFindDrawing;
}

export interface CreateOrFindDrawingVariables {
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
// GraphQL mutation operation: UpdateItem
// ====================================================

export interface UpdateItem_updateItem {
  __typename: "Item";
  id: string;
}

export interface UpdateItem {
  updateItem: UpdateItem_updateItem;
}

export interface UpdateItemVariables {
  updateItemData: UpdateItemInput;
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

export interface DrawingDataPublished_drawingDataPublished_node_PencilDrawing_segment_point {
  __typename: "Point";
  x: number;
  y: number;
}

export interface DrawingDataPublished_drawingDataPublished_node_PencilDrawing_segment {
  __typename: "Segment";
  point: DrawingDataPublished_drawingDataPublished_node_PencilDrawing_segment_point;
}

export interface DrawingDataPublished_drawingDataPublished_node_PencilDrawing_path {
  __typename: "Path";
  strokeWidth: number;
  strokeColor: string | null;
  strokeJoin: string | null;
  strokeCap: string | null;
}

export interface DrawingDataPublished_drawingDataPublished_node_PencilDrawing {
  __typename: "PencilDrawing";
  layerID: string;
  itemID: string;
  segment: DrawingDataPublished_drawingDataPublished_node_PencilDrawing_segment;
  path: DrawingDataPublished_drawingDataPublished_node_PencilDrawing_path;
}

export interface DrawingDataPublished_drawingDataPublished_node_BrushDrawing_segments_point {
  __typename: "Point";
  x: number;
  y: number;
}

export interface DrawingDataPublished_drawingDataPublished_node_BrushDrawing_segments {
  __typename: "Segment";
  point: DrawingDataPublished_drawingDataPublished_node_BrushDrawing_segments_point;
}

export interface DrawingDataPublished_drawingDataPublished_node_BrushDrawing_path {
  __typename: "Path";
  strokeWidth: number;
  strokeColor: string | null;
}

export interface DrawingDataPublished_drawingDataPublished_node_BrushDrawing {
  __typename: "BrushDrawing";
  layerID: string;
  itemID: string;
  segments: DrawingDataPublished_drawingDataPublished_node_BrushDrawing_segments[];
  path: DrawingDataPublished_drawingDataPublished_node_BrushDrawing_path;
}

export interface DrawingDataPublished_drawingDataPublished_node_EraseDrawing_segment_point {
  __typename: "Point";
  x: number;
  y: number;
}

export interface DrawingDataPublished_drawingDataPublished_node_EraseDrawing_segment {
  __typename: "Segment";
  point: DrawingDataPublished_drawingDataPublished_node_EraseDrawing_segment_point;
}

export interface DrawingDataPublished_drawingDataPublished_node_EraseDrawing_path {
  __typename: "Path";
  strokeWidth: number;
}

export interface DrawingDataPublished_drawingDataPublished_node_EraseDrawing {
  __typename: "EraseDrawing";
  layerID: string;
  itemID: string;
  segment: DrawingDataPublished_drawingDataPublished_node_EraseDrawing_segment;
  path: DrawingDataPublished_drawingDataPublished_node_EraseDrawing_path;
}

export type DrawingDataPublished_drawingDataPublished_node = DrawingDataPublished_drawingDataPublished_node_PencilDrawing | DrawingDataPublished_drawingDataPublished_node_BrushDrawing | DrawingDataPublished_drawingDataPublished_node_EraseDrawing;

export interface DrawingDataPublished_drawingDataPublished {
  __typename: "PublishedDrawingData";
  action: DrawingDataActionType;
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
// GraphQL fragment: PencilDrawingPayload
// ====================================================

export interface PencilDrawingPayload_segment_point {
  __typename: "Point";
  x: number;
  y: number;
}

export interface PencilDrawingPayload_segment {
  __typename: "Segment";
  point: PencilDrawingPayload_segment_point;
}

export interface PencilDrawingPayload_path {
  __typename: "Path";
  strokeWidth: number;
  strokeColor: string | null;
  strokeJoin: string | null;
  strokeCap: string | null;
}

export interface PencilDrawingPayload {
  __typename: "PencilDrawing";
  layerID: string;
  itemID: string;
  segment: PencilDrawingPayload_segment;
  path: PencilDrawingPayload_path;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BrushDrawingPayload
// ====================================================

export interface BrushDrawingPayload_segments_point {
  __typename: "Point";
  x: number;
  y: number;
}

export interface BrushDrawingPayload_segments {
  __typename: "Segment";
  point: BrushDrawingPayload_segments_point;
}

export interface BrushDrawingPayload_path {
  __typename: "Path";
  strokeWidth: number;
  strokeColor: string | null;
}

export interface BrushDrawingPayload {
  __typename: "BrushDrawing";
  layerID: string;
  itemID: string;
  segments: BrushDrawingPayload_segments[];
  path: BrushDrawingPayload_path;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EraseDrawingPayload
// ====================================================

export interface EraseDrawingPayload_segment_point {
  __typename: "Point";
  x: number;
  y: number;
}

export interface EraseDrawingPayload_segment {
  __typename: "Segment";
  point: EraseDrawingPayload_segment_point;
}

export interface EraseDrawingPayload_path {
  __typename: "Path";
  strokeWidth: number;
}

export interface EraseDrawingPayload {
  __typename: "EraseDrawing";
  layerID: string;
  itemID: string;
  segment: EraseDrawingPayload_segment;
  path: EraseDrawingPayload_path;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum DrawingDataActionType {
  BRUSH_DRAWING = "BRUSH_DRAWING",
  ERASE_DRAWING = "ERASE_DRAWING",
  PENCIL_DRAWING = "PENCIL_DRAWING",
}

export enum MutationType {
  CREATED = "CREATED",
  DELETED = "DELETED",
  UPDATED = "UPDATED",
}

// null
export interface PencilDrawingInput {
  userID: string;
  drawingID: string;
  layerID: string;
  groupID?: string | null;
  itemID: string;
  segment: SegmentInput;
  path: PathInput;
}

// null
export interface SegmentInput {
  point: PointInput;
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
  blendMode?: string | null;
}

// null
export interface BrushDrawingInput {
  userID: string;
  drawingID: string;
  layerID: string;
  groupID?: string | null;
  itemID: string;
  segments: SegmentInput[];
  path: PathInput;
}

// null
export interface EraseDrawingInput {
  userID: string;
  drawingID: string;
  layerID: string;
  itemID: string;
  segment: SegmentInput;
  path: PathInput;
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
export interface UpdateItemInput {
  userID: string;
  drawingID: string;
  id: string;
  data: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================