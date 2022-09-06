import { fastify } from "fastify";
import { Logger } from "base";

import sequelize from "./db-connection";
import startConsumer from "./services/kafka-consumer";

const PORT = Number(process.env.WORKER_PORT) || 5000;
const server = fastify({ logger: Logger });

const start = async () => {
  try {
    await startConsumer(["user_service"]);

    server.log.info("Kafka consumer is running");

    await sequelize.authenticate();
    server.log.info("DB authenticated");

    await sequelize.sync();

    await server.listen({ port: PORT, host: "0.0.0.0" });

    server.log.info(`Server running on port = ${PORT}`);
  } catch (e) {
    server.log.error(e);
    process.exit(1);
  }
};

start();
