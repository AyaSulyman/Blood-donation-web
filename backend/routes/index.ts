import { FastifyInstance } from "fastify";
import donorRoutes from "./donor.routes.ts";

export async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(donorRoutes, { prefix: "/api/donors" });
}
