import { fastify } from "fastify";
import { Logger } from "base";
import passport from "@fastify/passport";
import fastifySecureSession from "@fastify/secure-session";
import fs from "fs";
import path from "path";
import authController from "./controllers/auth-controller";
import userController from "./controllers/user-controller";
import swagger from "./swagger";
import defaultPathController from "./controllers/default-path-controller";
import "./authentication/strategy";

const server = fastify({ logger: Logger });

server.register(swagger);

server.register(fastifySecureSession, {
  key: fs.readFileSync(path.join(__dirname, "../secret-key")),
});

server.register(passport.initialize());
server.register(passport.secureSession());

server.register(authController);
server.register(userController);
server.register(defaultPathController);

export default server;
