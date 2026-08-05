import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dbPlugin(fastify: FastifyInstance) {
  const mongoUri = process.env.MONGO_URI;
  const dbName = process.env.DB_NAME;

  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is missing!");
  }

  try {
    await mongoose.connect(mongoUri, { dbName: dbName });
  } catch (error) {
    fastify.log.error("MongoDB connection failed:");
    throw error;
  }
}

export default fp(dbPlugin);
