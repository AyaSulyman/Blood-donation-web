import { FastifyInstance } from "fastify";
import donorRoutes from "./donor.routes.ts";
import bloodDonationsRoutes from "./bloodDonations.route";

export async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(donorRoutes, { prefix: "/api/donors" });
  await fastify.register(bloodDonationsRoutes, {
    prefix: "/api/blood-donations",
  });
}
