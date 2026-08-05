import { BloodType, UrgencyLevel } from './enums';

export interface DonorSearchQuery {
  bloodType?: BloodType | 'Any';
  city?: string;
  urgency?: UrgencyLevel; // accepted, not yet used to filter — see donor.service.ts
}

export interface DonorSearchResult {
  id: string;
  name: string;
  city: string;
  bloodType: BloodType;
  lastDonated: string;
}