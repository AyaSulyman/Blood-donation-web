import { FastifyRequest, FastifyReply } from "fastify";
import mongoose from "mongoose";
import BloodDonation from "../models/BloodDonation";
import Center from "../models/Center";

interface CreateBloodDonationBody {
  centerId: string;
  donationDate: string;
  units: number;
}

function toDateOnly(date: Date | undefined | null): string | null {
  if (!date) return null;
  return new Date(date).toISOString().split("T")[0];
}

/**
 * CREATE DONATION
 * POST /api/blood-donations
 */
export async function createBloodDonationHandler(
  request: FastifyRequest<{ Body: CreateBloodDonationBody }>,
  reply: FastifyReply,
) {
  const donorId = (request.user as any)?.id ?? (request.user as any)?._id;

  if (!donorId) {
    return reply.code(401).send({
      message: "Login First",
    });
  }

  const { centerId, donationDate, units } = request.body;

  if (!mongoose.isValidObjectId(centerId)) {
    return reply.code(404).send({
      message: "Donation center not found",
    });
  }

  const center = await Center.findById(centerId);

  if (!center) {
    return reply.code(404).send({
      message: "Donation center not found",
    });
  }

  const newBloodDonation = await BloodDonation.create({
    user: donorId,
    center: center._id,
    donationDate: new Date(donationDate),
    units,
  });

  return reply.code(201).send({
    id: newBloodDonation._id.toString(),
    donorId: donorId.toString(),
    centerName: center.name,
    donationDate: toDateOnly(newBloodDonation.donationDate),
    units: newBloodDonation.units,
    createdAt: newBloodDonation.createdAt.toISOString(),
  });
}

/**
 * GET ALL DONATIONS
 * GET /api/blood-donations
 */
export async function getBloodDonationsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const donations = await BloodDonation.find().populate("center", "name");

  // Falls back to createdAt / null so old documents (saved under a
  // previous schema version, missing donationDate/units) don't 500 the
  // whole list. Re-POST those donations to get them onto the new shape.
  const response = donations.map((donation: any) => ({
    id: donation._id.toString(),
    centerName: donation.center?.name ?? null,
    date: toDateOnly(donation.donationDate ?? donation.createdAt),
    units: typeof donation.units === "number" ? donation.units : null,
  }));

  return reply.code(200).send(response);
}

/**
 * GET DONATION DETAILS
 * GET /api/blood-donations/:id
 */
export async function getBloodDonationByIdHandler(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply,
) {
  const donation = await BloodDonation.findById(request.params.id).populate(
    "center",
    "name",
  );

  if (!donation) {
    return reply.code(404).send({
      message: "Donation not found",
    });
  }

  const d = donation as any;

  return reply.code(200).send({
    id: d._id.toString(),
    centerName: d.center?.name ?? null,
    donationDate: toDateOnly(d.donationDate ?? d.createdAt),
    units: typeof d.units === "number" ? d.units : null,
  });
}
