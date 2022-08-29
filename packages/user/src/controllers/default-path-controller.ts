import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const DefaultController: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get('/', {
        schema: {
            description: "Server alive request",
            response: {
                200: {
                    description: "Success Response",
                    type: "object",
                    properties: {
                        message: {type: "string"}
                    }
                }
            }
        }
    }, async () => {
        return {message: "Server is alive"};
    })
}

export default fp(DefaultController);