import passport from "@fastify/passport";
import { UserCreate } from "base";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

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
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "number"},
                            username: {type: "string"}
                        }
                    }
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

    server.post<{Body: UserCreate}>('/users', {
        preValidation: passport.authenticate(isTest ? "bearer-mock" : "bearer"),
        schema: {
            description: "This is an endpoint for user creation",
            tags: ["users"],
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