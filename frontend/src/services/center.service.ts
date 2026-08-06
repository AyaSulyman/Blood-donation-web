import { http } from "./http";

export interface DonationCenter {
    _id: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    latitude: number;
    longitude: number;
}

export async function fetchCenters(): Promise<DonationCenter[]> {
    const { data } = await http.get<{
        success: boolean;
        count: number;
        centers: DonationCenter[];
    }>("/centers");
    console.log(data);
    return data.centers;
}