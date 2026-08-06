import { FastifyRequest, FastifyReply } from "fastify";
import User from "../models/user.model";
import BloodRecipients from "../models/recipient.model";

interface RecipientBody {
  user: string;
  patientName: string;
  bloodType: string;
  bloodUnits: string;
}

export async function createBloodRecipientHandler(
  request: FastifyRequest<{ Body: RecipientBody }>,
  reply: FastifyReply,
) {
  const { user } = request.body;
  const existingUserById = await User.findOne({ _id: user });
  console.log("Existing User by ID:", user);
  if (!existingUserById) {
    return reply.code(401).send({ message: "Login First" });
  }
  const newRecipient = await BloodRecipients.create({
    ...request.body,
  });
  const createdRecipient = { id: newRecipient._id };
  return reply.code(201).send({
    message: "Recipient created successfully",
    user: createdRecipient,
  });
}