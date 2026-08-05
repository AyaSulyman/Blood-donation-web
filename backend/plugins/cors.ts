// cors.ts
import fastifyCors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

export async function registerCors(fastify: FastifyInstance) {
  await fastify.register(fastifyCors, {
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow both 3000 and 5173
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
}