import { FastifyInstance } from "fastify";
import { createBloodRecipientHandler } from "../controllers/recipients.controller";
import { recipientSchema } from "../schemas/recipients.schema";

export default async function recipientsRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/create-blood-recipient",
    { onRequest: [(fastify as any).authenticate], schema: recipientSchema },
    createBloodRecipientHandler,
  );
}
