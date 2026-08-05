import { FastifyInstance } from "fastify";
import { DonorController } from "../controllers/donor.controller.ts";

const donorController = new DonorController();

export default async function donorRoutes(fastify: FastifyInstance) {
  // Matches GET /api/donors/search
  fastify.get("/", donorController.searchDonors.bind(donorController));

  // Matches GET /api/donors/:id
  fastify.get("/:id", donorController.getDonorById.bind(donorController));
}