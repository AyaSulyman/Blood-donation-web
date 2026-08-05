import Fastify from "fastify";
import cors from "@fastify/cors";
import dbPlugin from "./plugins/db.ts";
import jwtPlugin from "./plugins/jwt.ts";
import authRoutes from "./routes/auth.route.ts";
import centerRoutes from "./routes/centerRoutes.ts";
import recipientsRoutes from "./routes/recipients.route.ts";

const fastify = Fastify({
  logger: true,
});
await fastify.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
});

await fastify.register(dbPlugin);
await fastify.register(jwtPlugin);

fastify.get("/", async () => {
  return {
    message: "Blood Donation API is running",
  };
});

await fastify.register(centerRoutes, {
  prefix: "/api/centers",
});

await fastify.register(authRoutes, {
  prefix: "/api/auth",
});
await fastify.register(recipientsRoutes, {
  prefix: "/api/recipients",
});
try {
  await fastify.listen({
    port: 3000,
    host: "0.0.0.0",
  });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
