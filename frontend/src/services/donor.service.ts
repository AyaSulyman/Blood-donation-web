import { http } from "./http";
import type { Donor, DonorSearchParams } from "@/types/donor";

export async function fetchDonors(params: DonorSearchParams): Promise<Donor[]> {
  // Filter out empty string/null values and "Any" selections from search params
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, v]) => v !== "" && v !== null && v !== undefined && v !== "Any"
    )
  );

  // Changed /donors/search to /donors to resolve the backend 404 error
  const { data } = await http.get<Donor[]>("/donors", { params: cleanParams });
  return data;
}

export async function fetchDonorById(id: string): Promise<Donor> {
  const { data } = await http.get<Donor>(`/donors/${id}`);
  return data;
}