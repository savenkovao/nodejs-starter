import {fastify} from "fastify";
import pino from "pino";
import userController from "./controllers/user-controller";
import db from "./db-connection";
import ConsumerFactory from "./services/kafka-consumer";

const PORT = Number(process.env.PORT) || 4000;

const server = fastify({
  logger: pino({level: "info"})
});

server.register(userController);

const consumer = new ConsumerFactory();

const start = async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log("Seccuesfull db conneection");
    await server.listen({port: PORT, host: '0.0.0.0'});
    await consumer.startBatchConsumer();
    
    console.log(`Server running on port = ${PORT}`)
  } catch(e) {
    server.log.error(e);
    process.exit(1);     
  }
};

start();