import Donor from '../models/Donor';
import BloodDonation from '../models/BloodDonation';
import { DonorSearchQuery, DonorSearchResult } from '../types/donor.types';

function formatRelativeMonths(date: Date | null): string {
  if (!date) return 'No record yet';
  const months = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));
  if (months <= 0) return 'This month';
  return months === 1 ? '1 month ago' : `${months} months ago`;
}

interface PopulatedUser {
  _id: unknown;
  name: string;
  address: string;
}

export async function searchDonors(query: DonorSearchQuery): Promise<DonorSearchResult[]> {
  const filter: Record<string, unknown> = {};

  if (query.bloodType && query.bloodType !== 'Any') {
    filter.bloodType = query.bloodType;
  }

  // Donor has no `city` field — it lives on the linked User (userId -> address)
  let donors = await Donor.find(filter)
    .populate<{ userId: PopulatedUser }>('userId', 'name address')
    .lean();
console.log("DONORS COUNT:", donors.length);
console.log(JSON.stringify(donors, null, 2));
  if (query.city) {
    const cityLower = query.city.toLowerCase();
    donors = donors.filter((d) =>
      d.userId?.address?.toLowerCase().includes(cityLower)
    );
  }

  // NOTE: `query.urgency` is validated by the route schema but not applied
  // here — nothing in Donor/BloodDonation/User currently models urgency.
  // See enums.ts comment for the same flag.

  const results: DonorSearchResult[] = await Promise.all(
    donors.map(async (d) => {
      const lastDonation = await BloodDonation.findOne({ donorId: d._id })
        .sort({ createdAt: -1 })
        .lean();

      return {
        id: String(d._id),
        name: d.userId?.name ?? 'Unknown',
        city: d.userId?.address ?? 'Unknown',
        bloodType: d.bloodType,
        lastDonated: formatRelativeMonths(
          lastDonation ? new Date(lastDonation.createdAt) : null
        ),
      };
    })
  );

  return results;
}