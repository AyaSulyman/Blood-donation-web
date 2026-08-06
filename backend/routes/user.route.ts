import { FastifyInstance } from "fastify";
import { getUserDonationListHandler, getUserHandler, getUserReceiptListHandler } from "../controllers/user.controller";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    { onRequest: [(fastify as any).authenticate] },
    getUserHandler,
  );
  fastify.get(
    "/donationList",
    { onRequest: [(fastify as any).authenticate] },
    getUserDonationListHandler,
  );
  fastify.get(
    "/receiptList",
    { onRequest: [(fastify as any).authenticate] },
    getUserReceiptListHandler,
  );
}
