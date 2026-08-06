// routes/auth.route.ts
import { FastifyInstance } from "fastify";
import { getUserHandler, loginHandler, registerHandler } from "../controllers/user.controller";
import { registerSchema, loginSchema } from "../schemas/user.schema";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", { schema: registerSchema }, registerHandler);
  fastify.post("/login", { schema: loginSchema }, loginHandler);
}
