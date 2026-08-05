import { FastifyInstance } from 'fastify';
import { searchDonorsHandler } from '../controllers/donor.controller';
import { donorSearchQuerySchema, donorSearchResponseSchema } from '../schemas/donor.schema';

export default async function donorRoutes(fastify: FastifyInstance) {
  fastify.get('/donors/search', {
    schema: {
      querystring: donorSearchQuerySchema,
      response: donorSearchResponseSchema
    }
  }, searchDonorsHandler);
}