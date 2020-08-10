export interface CreateHelper<T = Record<string, unknown>> {
  name?: string;
  options?: T;
}

export interface CreateLayerProps extends CreateHelper {}
export interface CreateGroupProps extends CreateHelper {}
export interface CreatePathProps extends CreateHelper {}

export interface CreateRoundLinecapProps {
  name?: string;
  point: paper.Point;
  color: paper.Color | string;
  width: number;
}
