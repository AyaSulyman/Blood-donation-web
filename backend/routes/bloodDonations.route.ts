import { FastifyInstance } from "fastify";

import {
  createBloodDonationHandler,
  getBloodDonationsHandler,
  getBloodDonationByIdHandler,
} from "../controllers/bloodDonations.controller";

import {
  CreateBloodDonationSchema,
  GetBloodDonationsSchema,
  GetBloodDonationSchema,
} from "../schemas/bloodDonations.schema";

// Register this plugin with prefix "/api/v1/donations" (see routes/index.ts)
export default async function bloodDonationsRoutes(
  fastify: FastifyInstance,
) {
  /**
   * Create Donation
   * POST /api/v1/donations
   */
  fastify.post(
    "/",
    {
      onRequest: [(fastify as any).authenticate],
      schema: CreateBloodDonationSchema,
    },
    createBloodDonationHandler,
  );

  /**
   * Get All Donations
   * GET /api/v1/donations
   */
  fastify.get(
    "/",
    {
      // onRequest: [(fastify as any).authenticate],
      schema: GetBloodDonationsSchema,
    },
    getBloodDonationsHandler,
  );

  /**
   * Get Donation Details
   * GET /api/v1/donations/:id
   */
  fastify.get(
    "/:id",
    {
      // onRequest: [(fastify as any).authenticate],
      schema: GetBloodDonationSchema,
    },
    getBloodDonationByIdHandler,
  );
}
