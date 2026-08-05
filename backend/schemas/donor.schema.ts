import { BLOOD_TYPES, URGENCY_LEVELS } from '../types/enums';

export const donorSearchQuerySchema = {
  type: 'object',
  properties: {
    bloodType: { type: 'string', enum: [...BLOOD_TYPES, 'Any'] },
    city: { type: 'string' },
    urgency: { type: 'string', enum: URGENCY_LEVELS }
  }
} as const;

export const donorSearchResponseSchema = {
  200: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        city: { type: 'string' },
        bloodType: { type: 'string' },
        lastDonated: { type: 'string' }
      }
    }
  }
} as const;