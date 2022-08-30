import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { PostCreateType, PostGetParams } from "../interfaces/post";
import postService from "../services/post-service";

const PostController: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get('/posts', {}, async (request, reply) => {
        try {
            const posts = await postService.getAllPosts()

            return reply.code(200).send(posts);
        } catch(err: any) {
            request.log.error(err);
			return reply.code(500).send({message: err?.message});
        }
    });

    server.get<{Params: PostGetParams}>('/posts/:id', {}, async (request, reply) => {
        try {
            const {id} = request.params;

            const post = await postService.getPostById(id);

            return reply.code(200).send(post);
        } catch(err: any) {
            request.log.error(err);
            return reply.code(500).send({message: err?.message});
        }
    });

    server.post<{Body: PostCreateType}>('/posts', {}, async (request, reply) => {
        try {
            const {body} = request;
            await postService.createPost(body);

            return reply.code(200).send({message: "Post created successfully"});
        } catch(err: any) {
            request.log.error(err);
            return reply.code(500).send({message: err?.message});
        }
    })
}

export default fp(PostController);