import { fastify } from "fastify";
import pino from "pino";
import sequelize from "./db-connection";
import startConsumer from "./kafka-consumer";

const PORT =  Number(process.env.PORT) || 5000;
const server = fastify({
  logger: pino({ level: "info" })
});

const start = async () => {
  try {
    await sequelize.authenticate();
    server.log.info("DB authenticated");

    await sequelize.sync();

    await server.listen({port: PORT, host: '0.0.0.0'});
    await startConsumer(["user_service"]);

    server.log.info(`Server running on port = ${PORT}`);
  } catch(e) {
    server.log.error(e);
    process.exit(1);      
  }
};

start();
