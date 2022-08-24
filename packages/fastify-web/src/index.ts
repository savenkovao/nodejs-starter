import {fastify} from 'fastify';
import pino from 'pino';

const PORT = Number(process.env.PORT) || 6000
const server = fastify({
  logger: pino({level: "info"})
});

const start = async () => {
  try {
    await server.listen({port: PORT, host: '0.0.0.0'});

    server.get('/ping', async (request, reply) => {
      return 'pong\n'
    });
    
    console.log(`Server running on port = ${PORT}`)
  } catch(e) {
    server.log.error(e);
    process.exit(1);      
  }
};

start();