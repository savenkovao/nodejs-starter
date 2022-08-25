import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { UserCreate } from '../interfaces/user.create';
import userService from '../services/user-service';

const AuthController: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.post<{Body: UserCreate}>('/login', {}, async (request, reply) => {
        try {
            const auth = await userService.getUserByCred(request.body);

            if (!auth.token)  {
                throw new Error("Authentication failed");
            }

            return reply.code(200).send(auth);
        } catch(err) {
            request.log.error(err);
            return reply.send(500);
        }
    })
}

export default fp(AuthController);