import { FastifySchema } from "fastify";

export const CreateBloodDonationSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["centerId", "donationDate", "units"],
    additionalProperties: false,
    properties: {
      // The Center document's _id — this is how centerName gets resolved.
      centerId: {
        type: "string",
        minLength: 24,
        maxLength: 24,
      },
      donationDate: {
        type: "string",
        format: "date", // "YYYY-MM-DD"
      },
      units: {
        type: "integer",
        minimum: 1,
      },
    },
  },

  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "string" },
        donorId: { type: "string" },
        centerName: { type: "string" },
        donationDate: { type: "string" },
        units: { type: "number" },
        createdAt: { type: "string" },
      },
    },
    401: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const GetBloodDonationsSchema: FastifySchema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          centerName: { type: "string" },
          date: { type: "string" },
          units: { type: "number" },
        },
      },
    },
  },
};

export const GetBloodDonationSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },

  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        centerName: { type: "string" },
        donationDate: { type: "string" },
        units: { type: "number" },
      },
    },
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
