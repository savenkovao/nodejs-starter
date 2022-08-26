import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { UserCreate } from "../interfaces/user.create";
import userService from "../services/user-service";

const AuthController: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.post<{Body: UserCreate}>('/login', {
        schema: {
            description: "This is an endpoint for login user",
            tags: ["auth"],
            body: {
                type: "object",
                properties: {
                  username: { type: "string"},
                  password: { type: "string"}
                }
            },
            response: {
                200: {
                    description: "Succesful response",
                    type: "object",
                    properties: {
                        token: { type: "string" },
                        message: { type: "string" }
                    }
                },
                500: {
                    description: "Server error",
                    type: "object",
                    properties: {
                        message: {type: "string"}
                    }
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