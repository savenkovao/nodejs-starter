import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import postService from "../services/post-service";
import {
  PostCreateResponse,
  PostCreateType,
  PostGetParams,
  PostGetReponse,
} from "../schemas";

const PostController: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get<{ Reply: PostGetReponse }>(
    "/posts",
    {},
    async (request, reply) => {
      try {
        const posts = await postService.getAllPosts();

        return reply.code(200).send(posts);
      } catch (err: any) {
        request.log.error(err);
        return reply.code(500).send({ message: err?.message });
      }
    }
  );

  server.get<{ Params: PostGetParams; Reply: PostGetReponse }>(
    "/posts/:id",
    {},
    async (request, reply) => {
      try {
        const { id } = request.params;

        const post = await postService.getPostById(id);

        return reply.code(200).send(post);
      } catch (err: any) {
        request.log.error(err);
        return reply.code(500).send({ message: err?.message });
      }
    }
  );

  server.post<{ Body: PostCreateType; Reply: PostCreateResponse }>(
    "/posts",
    {},
    async (request, reply) => {
      try {
        const { body } = request;
        await postService.createPost(body);

        return reply.code(200).send({ message: "Post created successfully" });
      } catch (err: any) {
        request.log.error(err);
        return reply.code(500).send({ message: err?.message });
      }
    }
  );
};

export default fp(PostController);
