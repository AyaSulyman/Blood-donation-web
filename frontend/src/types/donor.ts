export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type UrgencyLevel = 'normal' | 'high' | 'critical';

export interface Donor {
  id: string;
  name: string;
  city: string;
  bloodType: BloodType;
  lastDonated: string;
}

export interface DonorSearchParams {
  bloodType?: BloodType | 'Any';
  city?: string;
  urgency?: UrgencyLevel;
}