import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { DefaultResponse, DefaultResponseSchema } from "../schemas";

const DefaultController: FastifyPluginAsync = async (
  server: FastifyInstance
) => {
  server.get<{ Reply: DefaultResponse }>(
    "/",
    {
      schema: {
        description: "Server alive request",
        response: {
          200: DefaultResponseSchema,
        },
      },
    },
    async () => {
      return { message: "Server is alive" };
    }
  );
};

export default fp(DefaultController);
