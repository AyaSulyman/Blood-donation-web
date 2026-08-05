import mongoose, { Schema, model } from "mongoose";

export interface IBloodDonation extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  patientName: string;
  bloodType: string;
  bloodUnits: string;
}
const bloodDonationSchema = new Schema<IBloodDonation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "ID is required"],
    },
   
    bloodType: {
      type: String,
      required: [true, "Blood type is required"],
      trim: true,
    },
    bloodUnits: {
      type: String,
      required: [true, "Blood units is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

const BloodDonation = model<IBloodDonation>("BloodDonation", bloodDonationSchema);

export default BloodDonation;