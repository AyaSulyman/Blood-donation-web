import { FastifySchema } from "fastify";

export const registerSchema: FastifySchema = {
  body: {
    type: "object",
    required: [
      "name",
      "email",
      "phone",
      "address",
      "role",
      "bloodType",
      "password",
    ],
    properties: {
      name: { type: "string", minLength: 2 },
      email: { type: "string", format: "email" },
      phone: { type: "string", minLength: 8, maxLength: 8 },
      address: { type: "string", minLength: 1 },
      role: { type: "string", enum: ["donar", "recipient"] },
      bloodType: {
        type: "string",
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      },
      password: { type: "string", minLength: 8 },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
        user: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            name: { type: "string" },
          },
        },
      },
    },
  },
};