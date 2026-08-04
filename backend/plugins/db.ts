import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface MockDb {
  products: Product[];
}
declare module "fastify" {
  interface FastifyInstance {
    db: MockDb;
  }
}
async function dbPlugin(fastify: FastifyInstance) {
  const mockDb: MockDb = {
    products: [
      { id: 1, name: "Wireless Mouse", price: 29.99 },
      { id: 2, name: "Mechanical Keyboard", price: 89.99 },
    ],
  };

  fastify.decorate("db", mockDb);
}

export default fp(dbPlugin);
