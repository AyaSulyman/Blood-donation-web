import { FastifyInstance } from 'fastify';
import donorRoutes from './donor.routes';

export default async function registerRoutes(fastify: FastifyInstance) {
  fastify.register(donorRoutes, { prefix: '/api' });
  // fastify.register(userRoutes, { prefix: '/api' });
  // fastify.register(centerRoutes, { prefix: '/api' });
}