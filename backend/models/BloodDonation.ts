import mongoose, { Schema, model } from "mongoose";
import { Model } from "mongoose";

export interface IBloodDonation extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  center: mongoose.Types.ObjectId;
}
const bloodDonationSchema = new Schema<IBloodDonation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "ID is required"],
    },
    center: {
      type: Schema.Types.ObjectId,
      ref: "Center",
      required: [true, "Center ID is required"],
    },
  },
  { timestamps: true },
);

export const BloodDonation: Model<IBloodDonation> = 
  mongoose.models.BloodDonation || 
  mongoose.model<IBloodDonation>('BloodDonation', bloodDonationSchema);

export default BloodDonation;