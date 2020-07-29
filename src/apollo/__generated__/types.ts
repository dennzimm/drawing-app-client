

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
// GraphQL subscription operation: ItemDataPublished
// ====================================================

export interface ItemDataPublished_itemDataPublished_segmentData {
  x: number;
  y: number;
}

export interface ItemDataPublished_itemDataPublished {
  __typename: "Segment";
  itemID: string;
  segmentData: ItemDataPublished_itemDataPublished_segmentData;
  strokeColor: string | null;
  fillColor: number[] | null;
  strokeWidth: number | null;
}

export interface ItemDataPublished {
  itemDataPublished: ItemDataPublished_itemDataPublished;
}

export interface ItemDataPublishedVariables {
  userID: string;
  drawingID: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// null
export interface NewSegmentInput {
  userID: string;
  drawingID: string;
  itemID: string;
  segmentData: SegmentDataInput;
  strokeColor?: string | null;
  fillColor?: number[] | null;
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