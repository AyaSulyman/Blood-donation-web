import { http } from "./http";

export interface CreateMessageRequest {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export async function createMessage(payload: CreateMessageRequest) {
  const { data } = await http.post("/messages", payload);
  return data;
}