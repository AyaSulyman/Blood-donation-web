export const createMessageSchema = {
  body: {
    type: 'object',
    required: ['fullName', 'email', 'subject', 'message'],
    properties: {
      fullName: {
        type: 'string',
        minLength: 2,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      subject: {
        type: 'string',
        minLength: 2,
      },
      message: {
        type: 'string',
        minLength: 1,
        maxLength: 1000,
      },
    },
  },
} as const;

export const createMessageResponseSchema = {
  201: {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
} as const;