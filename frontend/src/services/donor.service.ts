import type { Donor, DonorSearchParams } from "@/types/donor";
import { http } from "./http";

export async function fetchDonors(params: DonorSearchParams): Promise<Donor[]> {
  // Remove empty or undefined keys before building query string
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== '' && v !== null)
  );

  const { data } = await http.get<Donor[]>('/donors/search', { params: cleanParams });
  return data;
}