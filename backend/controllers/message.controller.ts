import { FastifyReply, FastifyRequest } from "fastify";
import Message from "../models/Message";

interface CreateMessageBody {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export async function createMessageHandler(
  request: FastifyRequest<{ Body: CreateMessageBody }>,
  reply: FastifyReply,
) {
  const newMessage = await Message.create({
    ...request.body,
  });

  return reply.code(201).send({
    message: "Message sent successfully",
    id: newMessage._id,
  });
}