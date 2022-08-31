import {Type, Static} from "@sinclair/typebox";

export const UserSchema = Type.Object({
    id: Type.Optional(Type.Number()),
    username: Type.String(),
    password: Type.String()
});

export type UserType = Static<typeof UserSchema>;