import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import { FastifyInstance, FastifyPluginAsync } from "fastify";


const Swagger: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.register(swagger, {
        routePrefix: "/docs",
        swagger: {
            info: {
            title: "Glassbox documentation",
            description: "Glassbox fastify API with Postgres",
            version: "0.1.0"
            },
            tags: [
                {name: "users", description: "User related end-points"},
                {name: "auth", description: "Authorization related end-points"}
            ],
            externalDocs: {
                url: "https://swagger.io",
                description: "Find more info here"
            },
            host: "0.0.0.0:4000",
            schemes: ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
        },
        exposeRoute: true
    });
};

export default fp(Swagger);