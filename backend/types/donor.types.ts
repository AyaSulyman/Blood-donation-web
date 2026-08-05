// src/types/donor.ts
import { BloodType, UrgencyLevel } from './enums';

export interface DonorSearchQuery {
  bloodType?: BloodType | 'Any';
  address?: string;
  urgency?: UrgencyLevel;
}

// 💡 Export alias so code importing DonorSearchParams won't break
export type DonorSearchParams = DonorSearchQuery;

export interface DonorSearchResult {
  _id?: string;
  id: string;
  name: string;
  address: string;
  bloodType: BloodType;
  lastDonated: string;
  // Optional fields for populated user objects
  _id?: string;
  userId?: any;
}

// 💡 Export alias so code importing Donor won't break
export type Donor = DonorSearchResult;

export { BloodType, UrgencyLevel };