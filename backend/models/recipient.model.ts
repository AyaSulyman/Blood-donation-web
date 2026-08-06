import mongoose, { Schema, model } from "mongoose";

export interface IBloodRecipients {
  user: mongoose.Types.ObjectId;
  patientName: string;
  bloodType: string;
  bloodUnits: string;
}
const recipientSchema = new Schema<IBloodRecipients>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "ID is required"],
    },
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
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

const BloodRecipients = model<IBloodRecipients>("BloodRecipients", recipientSchema);

export default BloodRecipients;