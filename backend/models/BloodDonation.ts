import mongoose, { Schema, model } from "mongoose";

export interface IBloodDonation extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  center: mongoose.Types.ObjectId;
}
const bloodDonationSchema = new Schema<IBloodDonation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "ID is required"],
    },
    center: {
      type: Schema.Types.ObjectId,
      required: [true, "Center ID is required"],
    },
  },
  { timestamps: true },
);

const BloodDonation = model<IBloodDonation>(
  "BloodDonation",
  bloodDonationSchema,
);

export default BloodDonation;