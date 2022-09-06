import { Static, Type } from "@sinclair/typebox";

export const PostSchema = Type.Object({
  id: Type.Optional(Type.String()),
  title: Type.String(),
  description: Type.String(),
});

export type PostCreateType = Static<typeof PostSchema>;

export type PostGetParams = {
  id: string;
};

export const PostGetResponseSchema = Type.Union([
  Type.Array(PostSchema),
  Type.Object({
    message: Type.String(),
  }),
  PostSchema,
]);

export type PostGetReponse = Static<typeof PostGetResponseSchema>;

export const PostCreateResponseSchema = Type.Object({
  message: Type.String(),
});

export type PostCreateResponse = Static<typeof PostCreateResponseSchema>;
