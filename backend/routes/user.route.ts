import { FastifyInstance } from "fastify";
import { getUserHandler } from "../controllers/user.controller";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    { onRequest: [(fastify as any).authenticate] },
    getUserHandler,
  );
}
