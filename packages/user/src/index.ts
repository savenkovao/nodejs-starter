import {fastify} from "fastify";
import pino from "pino";
import userController from "./controllers/user-controller";
import db from "./db-connection";

const PORT = Number(process.env.PORT) || 4000;

const server = fastify({
  logger: pino({level: "info"})
});

server.register(userController);

const start = async () => {
  try {
    await db.authenticate();
    await db.sync();
    server.log.info("Seccuesfull db connection");

    await server.listen({port: PORT, host: '0.0.0.0'});
    
    server.log.info(`Server running on port = ${PORT}`);
  } catch(e) {
    server.log.error(e);
    process.exit(1);     
  }
};

start();