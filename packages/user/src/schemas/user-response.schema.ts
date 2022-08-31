import {Type, Static} from "@sinclair/typebox";
import { UserSchema } from "./user.schema";

export const UserGetResponseSchema = Type.Union([
    Type.Array(UserSchema),
    Type.Object({
        message: Type.String()
    })
]);

export type UserGetResponse = Static<typeof UserGetResponseSchema>;

export const UserPostResponseSchema = Type.Object({
    message: Type.String()
});

export type UserPostResponse = Static<typeof UserPostResponseSchema>;
