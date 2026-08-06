import { FastifyRequest, FastifyReply } from "fastify";
import User from "../models/user.model";
import BloodDonation from "../models/BloodDonation";

interface BloodDonationBody {
  user: string;
 
  bloodType: string;
  bloodUnits: string;
}

export async function createBloodDonationHandler(
  request: FastifyRequest<{ Body: BloodDonationBody }>,
  reply: FastifyReply,
) {
  const { user } = request.body;
  const existingUserById = await User.findOne({ _id: user });
  console.log("Existing User by ID:", user);
  if (!existingUserById) {
    return reply.code(401).send({ message: "Login First" });
  }
  const newBloodDonation = await BloodDonation.create({
    ...request.body,
  });
  const createdBloodDonation = { id: newBloodDonation._id };
  return reply.code(201).send({
    message: "Blood donation created successfully",
    user: createdBloodDonation,
  });
}