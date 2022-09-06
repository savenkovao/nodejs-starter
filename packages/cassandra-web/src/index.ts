import server from "./app";
import dbconnect, { client } from "./db/connection";

const PORT = Number(process.env.CASSANDRA_PORT) || 2000;

const start = async () => {
  try {
    await dbconnect();

    server.log.info(
      `Connected to ${client.hosts.length} nodes in the cluster: ${client.hosts
        .keys()
        .join(", ")}`
    );

    await server.ready();

    await server.listen({ port: PORT, host: "0.0.0.0" });
    server.log.info(`Server runnings on sport = ${PORT}`);
  } catch (err: any) {
    client.shutdown();
    server.log.error(err?.message);
    process.exit(1);
  }
};

start();
