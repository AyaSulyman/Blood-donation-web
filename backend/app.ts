// src/app.ts — no DB plugin registered here
import Fastify from 'fastify';
import { registerCors } from './plugins/cors';
import './models/User';
import registerRoutes from './routes';

export function buildApp() {
  const app = Fastify({ logger: true });

  registerCors(app);
  app.register(registerRoutes);

  return app;
}