import { view } from 'paper';

export type EmitOnViewType =
  | 'event:add-item'
  | 'event:add-item::flush'
  | 'event:add-segment'
  | 'event:add-segment::flush';

export interface CustomViewEvent {
  id: string;
  drawing: string;
  data: string;
}

export interface AddItemEvent extends CustomViewEvent {}
export interface AddSegmentEvent extends CustomViewEvent {}

export const emitOnView = <E extends CustomViewEvent>(
  type: EmitOnViewType,
  event: E,
  flush: boolean = false
) => {
  const eventType: EmitOnViewType = flush
    ? (`${type}::flush` as EmitOnViewType)
    : type;

  view.emit(eventType, event);
};

export const registerViewEvent = <E extends CustomViewEvent>(
  type: EmitOnViewType,
  callback: (event: E) => void
) => {
  view.on(type, callback);
};
