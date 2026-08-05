import type { FastifyPluginAsync } from "fastify";

import {
  createCenter,
  deleteCenter,
  getAllCenters,
  getCenterById,
  updateCenter,
} from "../controllers/centerController";

import {
  centerIdSchema,
  createCenterSchema,
  updateCenterSchema,
} from "../schemas/centerSchema";

const centerRoutes: FastifyPluginAsync = async (
  fastify,
) => {
  fastify.get("/", getAllCenters);

  fastify.get(
    "/:id",
    {
      schema: centerIdSchema,
    },
    getCenterById,
  );

  fastify.post(
    "/",
    {
      schema: createCenterSchema,
    },
    createCenter,
  );

  fastify.put(
    "/:id",
    {
      schema: {
        ...centerIdSchema,
        ...updateCenterSchema,
      },
    },
    updateCenter,
  );

  fastify.delete(
    "/:id",
    {
      schema: centerIdSchema,
    },
    deleteCenter,
  );
};

export default centerRoutes;