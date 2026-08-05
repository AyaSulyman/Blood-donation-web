import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IBloodDonation extends Document {
  donorId: Types.ObjectId;
  centerId: Types.ObjectId;
  createdAt: Date; // the donation date/time — provided automatically by `timestamps`
  updatedAt: Date;
}

const BloodDonationSchema = new Schema<IBloodDonation>(
  {
    donorId: { type: Schema.Types.ObjectId, ref: "Donor", required: true },
    centerId: { type: Schema.Types.ObjectId, ref: "Center", required: true },
  },
  { timestamps: true }
);

// Speeds up "most recent donation for this donor" lookups (used to compute
// "Last donated: X months ago" on the donor search cards).
BloodDonationSchema.index({ donorId: 1, createdAt: -1 });

const BloodDonation: Model<IBloodDonation> =
  mongoose.models.BloodDonation || mongoose.model<IBloodDonation>("BloodDonation", BloodDonationSchema);

export default BloodDonation;
