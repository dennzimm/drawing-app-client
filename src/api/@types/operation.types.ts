import { DocumentNode } from "graphql";

export interface OperationType {
  name: string;
}

export interface FragmentType extends OperationType {
  fragment: DocumentNode;
}

export interface QueryOperationType extends OperationType {
  query: DocumentNode;
}

export interface MutationOperationType extends OperationType {
  mutation: DocumentNode;
}

export interface SubscriptionOperationType extends OperationType {
  subscription: DocumentNode;
}
