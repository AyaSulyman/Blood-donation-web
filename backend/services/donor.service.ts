import BloodDonation from "../models/BloodDonation.ts";
import User from "../models/user.model.ts"; // Ensures User schema is registered

export class DonorService {
  async searchDonors(filters: any) {
    const query: any = {};

    // 1. Treat 'address' and 'city' as identical inputs for user match
    const rawLocation = filters.address || "";
    const locationQuery =
      typeof rawLocation === "string" ? rawLocation.trim() : "";

    // 2. Build match conditions for populated User fields (bloodType, address)
    const userMatchConditions: any = {};

    // Filter by bloodType on User document
    if (
      filters.bloodType &&
      filters.bloodType !== "Any" &&
      filters.bloodType !== "Any Blood Type"
    ) {
      userMatchConditions.bloodType = filters.bloodType;
    }

    // Filter by address/city on User document
    if (locationQuery !== "") {
      userMatchConditions.address = { $regex: locationQuery, $options: "i" };
    }

    // 3. Execute Aggregation
    const groupedDonors = await BloodDonation.aggregate([
      // Step 1: Match BloodDonation query filters (if any)
      { $match: query },

      // Step 2: Group by user ID & aggregate donation counts/records
      {
        $group: {
          _id: "$user", // Ensure this matches your BloodDonation schema field (e.g., "$user" or "$userID")
          totalDonations: { $sum: 1 },
          lastDonationDate: { $max: "$createdAt" },
          records: { $push: "$$ROOT" },
        },
      },

      // Step 3: Populate User details from 'users' collection
      {
        $lookup: {
          from: "users", // Must match the exact collection name in MongoDB
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },

      // Step 4: Convert user array to an object
      { $unwind: "$user" },

      // Step 5: Filter by User fields (bloodType and address) after lookup
      ...(Object.keys(userMatchConditions).length > 0
        ? [
            {
              $match: Object.keys(userMatchConditions).reduce(
                (acc: any, key) => {
                  acc[`user.${key}`] = userMatchConditions[key];
                  return acc;
                },
                {},
              ),
            },
          ]
        : []),

      // Step 6: Sort by total donations (highest first)
      { $sort: { totalDonations: -1, lastDonationDate: -1 } },

      // Step 7: Format output structure and explicitly project user.bloodType
      {
        $project: {
          _id: 0,
          userId: "$_id",
          totalDonations: 1,
          lastDonationDate: 1,
          user: {
            _id: "$user._id",
            name: "$user.name",
            email: "$user.email",
            phone: "$user.phone",
            bloodType: "$user.bloodType", // Populated directly from User schema
            address: "$user.address",
          },
          records: 1,
        },
      },
    ]);

    return groupedDonors;
  }

  async getDonorById(id: string) {
    return await User.findById(id);
  }
}