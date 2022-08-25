import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { UserCreate } from '../interfaces/user.create';
import userService from '../services/user-service';

const UserController: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get('/users', {}, async (request, reply) => {
        try {
            const users = await userService.getUsers();
            
            return reply.code(200).send(users);
        } catch(err) {
            request.log.error(err);
			return reply.send(500);
        }
    });

    server.post<{Body: UserCreate}>('/users', {}, async (request, reply) => {
        try {
            const user = await userService.createUser(request.body);

            return reply.code(200).send(user);
        } catch(err) {
            request.log.error(err);
            return reply.send(500)
        }
    })
}

export default fp(UserController);