import paperProvider from '../providers/paper.provider';

export enum EmitOnViewEvent {
  LAYER_ADDED = 'event::layer-added',
  ITEM_ADDED = 'event::item-added',
  SEGMENT_ADDED = 'event::segment-added',
  PATH_SIMPLIFIED = 'event::path-simplified',
}

export interface CustomViewEvent {
  drawingID: string;
}

export interface CustomViewDataEvent extends CustomViewEvent {
  data: string;
}

export interface LayerAddedEvent extends CustomViewDataEvent {
  layerID: string;
}

export interface ItemAddedEvent extends CustomViewDataEvent {
  itemID: string;
}

export interface PathSimplifiedEvent extends CustomViewEvent {
  itemID: string;
}

export interface SegmentAddedEvent {
  itemID: string;
  strokeColor?: number[] | string;
  fillColor?: number[];
  strokeWidth?: number;
  segmentData:
    | {
        x: number;
        y: number;
      }
    | string;
}

export const emitOnView = <E>(
  type: EmitOnViewEvent,
  event: E,
  // TODO: Fixme
  flush: boolean = false
) => {
  const eventType: EmitOnViewEvent = flush
    ? (`${type}::flush` as EmitOnViewEvent)
    : type;

  paperProvider.view.emit(eventType, {
    type,
    ...event,
  });
};

export const registerViewEvent = <E>(
  type: EmitOnViewEvent,
  callback: (event: E) => void
) => {
  paperProvider.view.on(type, callback);
};
