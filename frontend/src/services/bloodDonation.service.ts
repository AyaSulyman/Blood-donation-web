import { http } from "./http";

export interface BloodDonationPayload {
  user: string;
  bloodType: string;
  bloodUnits: string;
}

export const createBloodDonation = async (
  payload: BloodDonationPayload
) => {
  const { data } = await http.post(
    "/bloodDonations/create-blood-donation",
    payload
  );

  return data;
};