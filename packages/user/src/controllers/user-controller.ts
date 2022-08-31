import passport from "@fastify/passport";
import { Type } from "@sinclair/typebox";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { UserSchema, UserType } from "../schemas/user.schema";
import userService from "../services/user-service";

const isTest = process.env.NODE_ENV === "test"

const UserController: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get('/users', {
        preValidation: passport.authenticate(isTest ? "bearer-mock" : "bearer"),
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

    server.post<{Body: UserType}>('/users', {
        preValidation: passport.authenticate(isTest ? "bearer-mock" : "bearer"),
        schema: {
            description: "This is an endpoint for user creation",
            tags: ["users"],
            body: UserSchema,
            response: {
                200: {
                    description: "Successful response",
                    type: "string"
                },
                500: {
                    description: "Server error",
                    type: "object",
                    properties: {
                        msg: {type: "string"}
                    }
                }
            }
        }
    }, async (request, reply) => {
        try {
            await userService.createUser(request.body);

            return reply.code(200).send("Kafka message sent");
        } catch(err) {
            request.log.error(err);
            return reply.code(500).send({msg: "Server error"});
        }
    })
}

export default fp(UserController);