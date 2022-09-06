import { Static, Type } from "@sinclair/typebox";

export const AuthResponseSchema = Type.Object({
  token: Type.Optional(Type.String()),
  message: Type.String(),
});

export type AuthResponseType = Static<typeof AuthResponseSchema>;
