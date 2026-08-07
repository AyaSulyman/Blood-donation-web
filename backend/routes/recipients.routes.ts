import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createBloodRecipientHandler } from "../controllers/recipients.controller";
import { recipientSchema } from "../schemas/recipients.schema";
import BloodRecipients from "../models/recipient.model";

export default async function recipientsRoutes(fastify: FastifyInstance) {
  // POST - Create recipient (authenticated)
  fastify.post(
    "/create-blood-recipient",
    { onRequest: [(fastify as any).authenticate], schema: recipientSchema },
    createBloodRecipientHandler,
  );

  // GET - All recipients for the logged-in user
  fastify.get(
    "/receiptList",
    { onRequest: [(fastify as any).authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = (request as any).user;
        console.log('🔍 Looking for recipients with user ID:', id);
        
        // Try both ObjectId and String formats
        const recipients = await BloodRecipients.find({
          $or: [
            { user: id },
            { user: id.toString() }
          ]
        }).populate("user", "name phone");
        
        console.log('✅ Found recipients:', recipients.length);
        return reply.code(200).send({
          receiptList: recipients,
        });
      } catch (error) {
        console.error('Error fetching recipients:', error);
        return reply.code(500).send({
          message: 'Failed to fetch recipients',
        });
      }
    },
  );

  // GET - ALL recipients (public - no authentication)
  // Make sure this route is registered BEFORE the /:id route if you have one
  fastify.get(
    "/all",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const recipients = await BloodRecipients.find()
          .populate("user", "name phone email")
          .sort({ createdAt: -1 });
        
        console.log('✅ All recipients fetched:', recipients.length);
        return reply.code(200).send({
          success: true,
          count: recipients.length,
          recipients: recipients,
        });
      } catch (error) {
        console.error('Error fetching all recipients:', error);
        return reply.code(500).send({
          message: 'Failed to fetch recipients',
        });
      }
    },
  );
}