export const createProductSchema = {
  schema: {
    body: {
      type: "object",
      required: ["name", "price"],
      properties: {
        name: { type: "string", minLength: 2 },
        price: { type: "number", minimum: 0.01 },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          price: { type: "number" },
        },
      },
    },
  },
};
