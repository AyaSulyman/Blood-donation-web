// src/services/donation.ts

import { http } from "./http";

export interface CreateDonationPayload {
  centerId: string;  // Must be a valid 24-character MongoDB ObjectId
  donationDate: string;  // Format: "YYYY-MM-DD"
  units: number;  // Must be >= 1
  // NO status field - it's not accepted by the backend
}

export const getDonations = async () => {
  const { data } = await http.get("/blood-donations");
  return data;
};

export const getDonationDetails = async (id: string) => {
  const { data } = await http.get(`/blood-donations/${id}`);
  return data;
};

export const createDonation = async (payload: CreateDonationPayload) => {
  console.log('📤 Sending donation payload:', payload);
  const { data } = await http.post("/blood-donations", payload);
  return data;
};