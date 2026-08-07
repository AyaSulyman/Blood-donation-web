// src/services/recipient.service.ts

import { http } from "./http";

export interface BloodRecipient {
  _id: string;
  user: {
    _id: string;
    name: string;
    phone: string;
    email?: string;
  } | string;
  patientName: string;
  bloodType: string;
  bloodUnits: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRecipientPayload {
  user: string;
  patientName: string;
  bloodType: string;
  bloodUnits: string;
}

// Fetch user's own recipients
export async function fetchUserRecipients(): Promise<BloodRecipient[]> {
  try {
    const { data } = await http.get<{ receiptList: BloodRecipient[] }>("/user/receiptList");
    console.log('✅ User recipients fetched:', data);
    return data.receiptList || [];
  } catch (error) {
    console.error('❌ Failed to fetch user recipients:', error);
    throw error;
  }
}

// Fetch ALL recipients (public)
export async function fetchAllRecipients(): Promise<BloodRecipient[]> {
  try {
    const { data } = await http.get<{ 
      success: boolean; 
      count: number; 
      recipients: BloodRecipient[] 
    }>("/recipients/all");
    console.log('✅ All recipients fetched:', data);
    return data.recipients || [];
  } catch (error) {
    console.error('❌ Failed to fetch all recipients:', error);
    throw error;
  }
}

// Create a new recipient
export async function createRecipient(payload: CreateRecipientPayload): Promise<BloodRecipient> {
  try {
    const { data } = await http.post<{ user: { newRecipient: BloodRecipient } }>(
      "/create-blood-recipient", 
      payload
    );
    console.log('✅ Recipient created:', data);
    return data.user.newRecipient;
  } catch (error) {
    console.error('❌ Failed to create recipient:', error);
    throw error;
  }
}