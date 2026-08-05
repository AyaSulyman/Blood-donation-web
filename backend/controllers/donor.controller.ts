import { FastifyRequest, FastifyReply } from "fastify";
import { DonorService } from "../services/donor.service.ts"; // 👈 Import your DonorService

const donorService = new DonorService();

interface DonorQuery {
  bloodType?: string;
  address?: string; // 👈 Destructure address properly
  city?: string;    // 👈 Keep city as optional fallback
  urgency?: string;
}

export class DonorController {
  async searchDonors(
    request: FastifyRequest<{ Querystring: DonorQuery }>,
    reply: FastifyReply
  ) {
    try {
      // Pass the query straight to DonorService
      // It will handle the address/city fallback and user population filtering safely
      const donors = await donorService.searchDonors(request.query);

      return reply.code(200).send(donors);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ message: "Failed to fetch donors", error });
    }
  }

  async getDonorById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const donor = await donorService.getDonorById(id);

      if (!donor) {
        return reply.code(404).send({ message: "Donor not found" });
      }

      return reply.code(200).send(donor);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ message: "Error fetching donor", error });
    }
  }
}