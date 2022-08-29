import server from "./app";
import db from "./db-connection";

const PORT = Number(process.env.PORT) || 4000;

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