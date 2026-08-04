import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import User from "../models/auth.model";

interface RegisterBody {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  bloodType: string;
  password: string;
  username: string;
}

export async function registerHandler(
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) {
  const { email, phone, username, password } = request.body;
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    return reply.code(409).send({ message: "Email already registered" });
  }
  const existingUserByPhone = await User.findOne({ phone });
  if (existingUserByPhone) {
    return reply.code(409).send({ message: "Phone number already registered" });
  }
  const existingUserByUsername = await User.findOne({ username });
  if (existingUserByUsername) {
    return reply.code(409).send({ message: "Username already registered" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...request.body,
    password: hashedPassword,
  });
  const createdUser = { id: newUser._id };
  return reply.code(201).send({
    message: "User registered successfully",
    user: createdUser,
  });

}
