const centerProperties = {
  name: {
    type: "string",
    minLength: 2,
    maxLength: 100,
  },

  city: {
    type: "string",
    minLength: 2,
    maxLength: 50,
  },

  address: {
    type: "string",
    minLength: 5,
    maxLength: 200,
  },

  phone: {
    type: "string",
    minLength: 7,
    maxLength: 20,
    pattern: "^[0-9+()\\-\\s]+$",
  },

  openingHours: {
    type: "string",
    minLength: 3,
    maxLength: 100,
  },

  available: {
    type: "boolean",
  },
} as const;

export const createCenterSchema = {
  body: {
    type: "object",
    required: [
      "name",
      "city",
      "address",
      "phone",
      "openingHours",
    ],
    additionalProperties: false,
    properties: centerProperties,
  },
};

export const updateCenterSchema = {
  body: {
    type: "object",
    minProperties: 1,
    additionalProperties: false,
    properties: centerProperties,
  },
};

export const centerIdSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "string",
        minLength: 24,
        maxLength: 24,
      },
    },
  },
};