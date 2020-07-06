

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDrawing
// ====================================================

export interface CreateDrawing_createDrawing {
  drawingID: string;
}

export interface CreateDrawing {
  createDrawing: CreateDrawing_createDrawing;
}

export interface CreateDrawingVariables {
  createDrawingInput: DrawingInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateItem
// ====================================================

export interface CreateItem_createItem {
  itemID: string;
}

export interface CreateItem {
  createItem: CreateItem_createItem;
}

export interface CreateItemVariables {
  createItemInput: ItemInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateItem
// ====================================================

export interface UpdateItem_updateItem {
  itemID: string;
}

export interface UpdateItem {
  updateItem: UpdateItem_updateItem;
}

export interface UpdateItemVariables {
  updateItemInput: ItemInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddSegment
// ====================================================

export interface AddSegment_addSegment {
  segmentID: string;
}

export interface AddSegment {
  addSegment: AddSegment_addSegment;
}

export interface AddSegmentVariables {
  addSegmentInput: SegmentInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: OnNewItemData
// ====================================================

export interface OnNewItemData_newItemData {
  userID: string;
  drawingID: string;
  itemID: string;
  data: any;
}

export interface OnNewItemData {
  newItemData: OnNewItemData_newItemData;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: OnNewSegmentData
// ====================================================

export interface OnNewSegmentData_newSegmentData {
  userID: string;
  drawingID: string;
  itemID: string;
  data: any;
}

export interface OnNewSegmentData {
  newSegmentData: OnNewSegmentData_newSegmentData;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// null
export interface DrawingInput {
  data: any;
  userID: string;
  drawingID: string;
}

// null
export interface ItemInput {
  data: any;
  userID: string;
  drawingID: string;
  itemID: string;
}

// null
export interface SegmentInput {
  data: any;
  userID: string;
  drawingID: string;
  itemID: string;
  segmentID: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================