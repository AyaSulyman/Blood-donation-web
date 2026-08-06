import { FastifySchema } from "fastify";

export const recipientSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["user", "patientName", "bloodType", "bloodUnits"],
    properties: {
      user: { type: "string", minLength: 1 },
      patientName: { type: "string", minLength: 1 },
      bloodType: {
        type: "string",
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      },
      bloodUnits: { type: "string", minLength: 1 },
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
          },
        },
      },
    },
  },
};