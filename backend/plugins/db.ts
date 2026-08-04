import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import fastifyMongodb from "@fastify/mongodb";
import dotenv from "dotenv";
dotenv.config();
async function dbPlugin(fastify: FastifyInstance) {
  const mongoUri = process.env.MONGO_URI;
  const dbName = process.env.DB_NAME;
  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is missing!");
  }
  await fastify.register(fastifyMongodb, {
    forceClose: true,
    url: mongoUri,
    database: dbName,
  });
  try {
    const db = fastify.mongo.db;
    if (db) {
      await db.command({ ping: 1 });
      fastify.log.info("Successfully connected to MongoDB!");
    }
  } catch (err) {
    fastify.log.error(err, "Failed to connect to MongoDB");
    throw err;
  }
}
export default fp(dbPlugin);
