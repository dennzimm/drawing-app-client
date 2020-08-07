

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

//==============================================================
// START Enums and Input Objects
//==============================================================

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