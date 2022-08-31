import {Type, Static} from "@sinclair/typebox";

export const DefaultResponseSchema = Type.Object({
    message: Type.String()
});

export type DefaultResponse = Static<typeof DefaultResponseSchema>;