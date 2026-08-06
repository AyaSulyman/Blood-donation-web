import mongoose, { Schema, Document } from "mongoose";

export interface IBloodDonation extends Document {
  user: mongoose.Types.ObjectId;
  center: mongoose.Types.ObjectId;
  donationDate: Date;
  units: number;
  createdAt: Date;
  updatedAt: Date;
}

const BloodDonationSchema = new Schema<IBloodDonation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reference to the Center document — centerName is populated from
    // Center.name at read time, never stored on this schema.
    center: {
      type: Schema.Types.ObjectId,
      ref: "Center",
      required: true,
    },

    donationDate: {
      type: Date,
      required: true,
    },

    units: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBloodDonation>(
  "BloodDonation",
  BloodDonationSchema
);
