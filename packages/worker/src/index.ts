import { fastify } from "fastify";
import pino from "pino";

import userController from "./controllers/user-controller";

const PORT = 5000;
const server = fastify({
  logger: pino({ level: "info" })
});

server.register(userController);

const start = async () => {
  try {
    await server.listen({port: PORT, host: '0.0.0.0'});

    console.log(`Server running on port = ${PORT}`)
  } catch(e) {
    server.log.error(e);
    process.exit(1);      
  }
};

start();
