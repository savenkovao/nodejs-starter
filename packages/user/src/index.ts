import passport from "@fastify/passport";
import fastifySecureSession from '@fastify/secure-session';
import {fastify} from "fastify";
import fs from "fs";
import path from "path";
import {Logger} from "base";
import authController from "./controllers/auth-controller";
import userController from "./controllers/user-controller";
import swagger from "./swagger";
import db from "./db-connection";
import "./authentication/strategy";

const PORT = Number(process.env.PORT) || 4000;

const server = fastify({logger: Logger});

server.register(fastifySecureSession, { key: fs.readFileSync(path.join(__dirname, "../secret-key"))})

server.register(swagger);

server.register(authController);
server.register(userController);

server.register(passport.initialize());
server.register(passport.secureSession());

const start = async () => {
  try {
    await db.authenticate();
    await db.sync();
    server.log.info("Seccuesfull db connection");

    await server.ready()
    server.swagger();

    await server.listen({port: PORT, host: "0.0.0.0"});
    
    server.log.info(`Server running on port = ${PORT}`);
  } catch(e) {
    server.log.error(e);
    process.exit(1);     
  }
};

start();