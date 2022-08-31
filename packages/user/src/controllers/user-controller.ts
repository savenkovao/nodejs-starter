import passport from "@fastify/passport";
import { Type } from "@sinclair/typebox";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import userService from "../services/user-service";
import { 
    UserSchema,
    UserType, 
    UserGetResponse, 
    UserPostResponse, 
    UserPostResponseSchema 
} from "../schemas";

const authStrategy = process.env.NODE_ENV === "test" ? "bearer-mock" : "bearer";

const UserController: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get<{Reply: UserGetResponse}>('/users', {
        preValidation: passport.authenticate(authStrategy),
        schema: {
            description: "This is an endpoint for fetching all users",
            tags: ["users"],
            response: {
                200: {
                    description: "Success Response",
                    ...Type.Array(UserSchema)
                }
            }
        }
    }, async (request, reply) => {
        try {
            const users = await userService.getUsers();
            return reply.code(200).send(users);
        } catch(err: any) {
            request.log.error(err);
			return reply.code(500).send({message: err?.message});
        }
    });

    server.post<{Body: UserType, Reply: UserPostResponse}>('/users', {
        preValidation: passport.authenticate(authStrategy),
        schema: {
            description: "This is an endpoint for user creation",
            tags: ["users"],
            body: UserSchema,
            response: {
                200: {
                    description: "Successful response",
                    ...UserPostResponseSchema
                },
                500: {
                    description: "Server error",
                    ...UserPostResponseSchema
                }
            }
        }
    }, async (request, reply) => {
        try {
            await userService.createUser(request.body);

            return reply.code(200).send({message: "Kafka message sent"});
        } catch(err) {
            request.log.error(err);
            return reply.code(500).send({message: "Server error"});
        }
    })
}

export default fp(UserController);