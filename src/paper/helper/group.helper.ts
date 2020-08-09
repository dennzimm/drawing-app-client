import { nanoid } from "nanoid";
import { CreateHelper } from "../@types";
import { paperProvider } from "../providers";

export const createGroup = (props: CreateHelper = {}) => {
  const { name = nanoid(), options = {} } = props;
  const group = new paperProvider.scope.Group({ name, ...options });

  return group;
};
