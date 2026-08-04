import {
  getProductsHandler,
  createProductHandler,
} from "../controllers/products.controller.ts";
import { createProductSchema } from "../schemas/products.schema.ts";

export default async function productRoutes(fastify: any, options: any) {
  fastify.get("/products", getProductsHandler);
  fastify.post("/products", createProductSchema, createProductHandler);
}
