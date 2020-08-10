declare type Nullable<T> = T | null;

declare type OmitDistributive<T, K extends PropertyKey> = T extends any
  ? T extends object
    ? Id<OmitRecursively<T, K>>
    : T
  : never;

declare type Id<T> = {} & { [P in keyof T]: T[P] }; // Cosmetic use only makes the tooltips expad the type can be removed

declare type OmitRecursively<T extends any, K extends PropertyKey> = Omit<
  { [P in keyof T]: OmitDistributive<T[P], K> },
  K
>;
