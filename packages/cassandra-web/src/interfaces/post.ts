import {Static, Type} from "@sinclair/typebox";

export const PostCreate = Type.Object({
  title: Type.String(),
  description: Type.String() 
});

export type PostCreateType = Static<typeof PostCreate>;

export type PostGetParams = {
  id: string
};