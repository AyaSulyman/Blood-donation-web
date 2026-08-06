import { FastifyInstance } from "fastify";
import { createMessageHandler } from "../controllers/message.controller";
import {
  createMessageSchema,
  createMessageResponseSchema,
} from "../schemas/message.schema";

export default async function messageRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    {
      schema: {
        ...createMessageSchema,
        response: createMessageResponseSchema,
      },
    },
    createMessageHandler,
  );
}