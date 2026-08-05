import Donor from "../models/Donor.ts";
import User from "../models/user.model.ts"; // Ensures User schema is registered

export class DonorService {
  async searchDonors(filters: any) {
    const query: any = {};

    // 1. Filter by Blood Type on Donor document
    if (
      filters.bloodType && 
      filters.bloodType !== "Any" && 
      filters.bloodType !== "Any Blood Type"
    ) {
      query.bloodType = filters.bloodType;
    }

    // 2. Treat 'address' and 'city' as identical inputs
    const rawLocation = filters.address || filters.city || "";
    const locationQuery = typeof rawLocation === "string" ? rawLocation.trim() : "";

    // 3. Build populate match for User's address field
    const userPopulateMatch: any = {};
    if (locationQuery !== "") {
      userPopulateMatch.address = { $regex: locationQuery, $options: "i" };
    }

    // 4. Query Donors and populate User details
    let donors = await Donor.find(query).populate({
      path: "userId",
      model: User,
      select: "name email phone address",
      match: Object.keys(userPopulateMatch).length > 0 ? userPopulateMatch : undefined,
    });

    // 5. Filter out donors whose userId didn't match the location regex
    if (locationQuery !== "") {
      const regex = new RegExp(locationQuery, "i");
      donors = donors.filter((donor: any) => {
        return (
          donor.userId &&
          typeof donor.userId === "object" &&
          donor.userId.address &&
          regex.test(donor.userId.address)
        );
      });
    }

    return donors;
  }

  async getDonorById(id: string) {
    return await Donor.findById(id).populate({
      path: "userId",
      model: User,
      select: "name email phone address",
    });
  }
}