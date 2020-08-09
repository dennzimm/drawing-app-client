import { nanoid } from "nanoid";
import { paperProvider } from "../providers";
import { CreateHelper } from "../@types";

export const createPath = (props: CreateHelper = {}) => {
  const { name = nanoid(), options = {} } = props;
  const path = new paperProvider.scope.Path({ name, ...options });

  return path;
};
