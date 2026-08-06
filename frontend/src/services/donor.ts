import { http } from "./http";

export const getDonorById = async (id: string) => {
  const { data } = await http.get(`/donors/${id}`);
  return data;
};