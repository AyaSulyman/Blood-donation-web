import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import BloodDonation from "../models/bloodDonation";

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
interface LoginBody {
  username: string;
  password: string;
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

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply,
) {
  const { username, password } = request.body;
  const existingUser = await User.findOne({ username }).select("+password");
  if (!existingUser) {
    return reply.code(404).send({ message: "Invalid username or password" });
  }
  const isMatchingPassword = await bcrypt.compare(
    password,
    existingUser.password,
  );
  if (!isMatchingPassword) {
    return reply.code(404).send({ message: "Invalid username or password" });
  }
  const token = await (reply as any).jwtSign(
    {
      id: existingUser._id,
      username: existingUser.username,
    },
    { expiresIn: "1h" },
  );
  return reply.code(201).send({
    message: "User logged in successfully",
    token,
  });
}
export async function getUserHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { username } = request.user as { username: string };
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return reply.code(404).send({ message: "Login First" });
  }
  return reply.code(200).send({
    existingUser,
  });
}
export async function getUserDonationListHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.user as { id: string };
  const existingUser = await BloodDonation.find({ user: id }).populate("center", "name address city phone");
  if (!existingUser) {
    return reply.code(404).send({ message: "Login First" });
  }
  return reply.code(200).send({
    donationList: existingUser,
  });
}
