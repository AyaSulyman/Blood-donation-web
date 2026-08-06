import { FastifyInstance } from "fastify";
import { createBloodDonationHandler } from "../controllers/bloodDonations.controller";
import {BloodDonationsSchema } from "../schemas/bloodDonations.schema";

export default async function bloodDonationsRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/create-blood-donation",
    { onRequest: [(fastify as any).authenticate], schema: BloodDonationsSchema },
    createBloodDonationHandler,
  );
}
    