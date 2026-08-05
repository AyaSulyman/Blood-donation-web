import Fastify from "fastify";
import dbPlugin from "./plugins/db.ts";
import jwtPlugin from "./plugins/jwt.ts";
import productRoutes from "./routes/products.route.ts";
import authRoutes from "./routes/auth.route.ts";
import centerRoutes from "./routes/centerRoutes.ts";

const fastify = Fastify({
  logger: true,
});

await fastify.register(dbPlugin);
await fastify.register(jwtPlugin);

fastify.get("/", async () => {
  return {
    message: "Blood Donation API is running",
  };
});

await fastify.register(productRoutes, {
  prefix: "/api/products",
});

await fastify.register(centerRoutes, {
  prefix: "/api/centers",
});

await fastify.register(authRoutes, {
  prefix: "/api/auth",
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