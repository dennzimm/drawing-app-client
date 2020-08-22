export interface CreateHelperProps<T = Record<any, any>> {
  name?: string;
  options?: T;
}

export interface CreateLayerProps extends CreateHelperProps {}
export interface CreateGroupProps extends CreateHelperProps {}
export interface CreatePathProps extends CreateHelperProps {}
export interface CreateCircleProps extends CreateHelperProps {}

export interface CreateRoundLinecapProps {
  name?: string;
  point: paper.Point;
  color: paper.Color | string;
  width: number;
}

export type CreateHelper<P extends CreateHelperProps, R = paper.Item> = (
  props: P
) => R;
