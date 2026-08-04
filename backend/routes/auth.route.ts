// routes/auth.route.ts
import { FastifyInstance } from "fastify";
import { registerHandler } from "../controllers/auth.controller";
import { registerSchema } from "../schemas/auth.schema";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", { schema: registerSchema }, registerHandler);
}
