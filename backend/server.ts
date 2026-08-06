import Fastify from "fastify";
import cors from "@fastify/cors";
import dbPlugin from "./plugins/db.ts";
import jwtPlugin from "./plugins/jwt.ts";
import productRoutes from "./routes/products.route.ts";
import messageRoutes from "./routes/message.route";
import recipientsRoutes from "./routes/recipients.route.ts";
import authRoutes from "./routes/user.route.ts";
import centerRoutes from "./routes/centerRoutes.ts";
import donorRoutes from "./routes/donor.routes.ts"; 
import bloodDonationsRoutes from "./routes/bloodDonations.route.ts";
const fastify = Fastify({
  logger: true,
});
await fastify.register(cors, {
  origin: true, // Allows http://localhost:5173
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

await fastify.register(productRoutes, {
  prefix: "/api/products",
});

await fastify.register(centerRoutes, {
  prefix: "/api/centers",
});

await fastify.register(authRoutes, {
  prefix: "/api/auth",
});


await fastify.register(donorRoutes, {
  prefix: "/api/donors",
});

// await fastify.register(donorRoutes, {
//   prefix: "/api/donors/:id",
// });
fastify.register(bloodDonationsRoutes, {
  prefix: "/api/blood-donations",
});
await fastify.register(recipientsRoutes, {
  prefix: "/api/recipients",
});
await fastify.register(messageRoutes, {
  prefix: "/api/messages",
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
