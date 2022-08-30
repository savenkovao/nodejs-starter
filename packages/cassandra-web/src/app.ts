import {fastify} from "fastify";
import {Logger} from "base";
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";
import postController from "./controllers/post-controller";

const server = fastify({logger: Logger}).withTypeProvider<TypeBoxTypeProvider>();

server.register(postController);

export default server;