import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { AuthResponseSchema, AuthResponseType } from "../schemas/auth-response.schema";
import { UserSchema, UserType } from "../schemas/user.schema";

import userService from "../services/user-service";

const AuthController: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.post<{Body: UserType, Reply: AuthResponseType}>('/login', {
        schema: {
            description: "This is an endpoint for login user",
            tags: ["auth"],
            body: UserSchema,
            response: {
                200: {
                    description: "Successful login",
                    ...AuthResponseSchema
                },
                500: {
                    description: "Server error",
                    ...AuthResponseSchema
                }
            }
        }
    }, async (request, reply) => {
        try {
            const auth = await userService.getUserByCred(request.body);

            if (!auth.token)  {
                throw new Error("Authentication failed");
            }

            return reply.code(200).send(auth);
        } catch(err: any) {
            request.log.error(err);
            return reply.code(500).send({message: err?.message});
        }
    })
}

export default fp(AuthController);