import {fastify} from "fastify";
import pino from "pino";
import ConsumerFactory from "./services/kafka-consumer";

const PORT = 4000;

const server = fastify({
  logger: pino({level: "info"})
});

const consumer = new ConsumerFactory();

const start = async () => {
  try {
    await server.listen({port: PORT, host: '0.0.0.0'});
    await consumer.startBatchConsumer();
    
    console.log(`Server running on port = ${PORT}`)
  } catch(e) {
    server.log.error(e);
    process.exit(1);      
  }
};

start();