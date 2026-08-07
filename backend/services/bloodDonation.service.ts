import BloodDonation from "../models/BloodDonation.ts";


const BASE_URL = "http://localhost:3000/api/blood-donations";

export async function getBloodDonations() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch donations: ${response.status}`);
  }

  return response.json(); // [{ id, centerName, date, units }, ...]
}

export async function getBloodDonationById(id: string) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch donation: ${response.status}`);
  }

  return response.json(); // { id, centerName, donationDate, units }
}