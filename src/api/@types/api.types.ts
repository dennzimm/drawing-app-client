export enum ActionType {
  PENCIL_DRAW = "pencilDraw",
  BRUSH_DRAW = "brushDraw",
  ERASE = "erase",
}

export enum MutationType {
  CREATED = "created",
  UPDATED = "updated",
  DELETED = "deleted",
}

export enum SubscriptionType {
  DRAWING_ACTION = "drawingActionPublished",
  ITEM_MUTATED = "itemMutated",
}
