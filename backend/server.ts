import Fastify from "fastify";
import dbPlugin from "./plugins/db.ts";
import productRoutes from "./routes/products.route.ts";
import process from "process";

const fastify = Fastify({ logger: true });
await fastify.register(dbPlugin);
await fastify.register(productRoutes, { prefix: "/api" });
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
