// routes/auth.route.ts
import { FastifyInstance } from "fastify";
import { loginHandler, registerHandler } from "../controllers/auth.controller";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", { schema: registerSchema }, registerHandler);
  fastify.post("/login", { schema: loginSchema }, loginHandler);
}
