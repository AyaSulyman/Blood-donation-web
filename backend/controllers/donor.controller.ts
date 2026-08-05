import { FastifyRequest, FastifyReply } from 'fastify';
import { searchDonors } from '../services/donor.service';
import { DonorSearchQuery } from '../types/donor.types';

export async function searchDonorsHandler(
  request: FastifyRequest<{ Querystring: DonorSearchQuery }>,
  reply: FastifyReply
) {
  try {
    const results = await searchDonors(request.query);
    return reply.send(results);
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ message: 'Failed to fetch donors' });
  }
}