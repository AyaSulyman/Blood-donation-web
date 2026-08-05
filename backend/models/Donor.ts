import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { BLOOD_TYPES, BloodType } from "../types/enums";

// 1. Interfaces
export interface IDonorAvailability {
  date: Date;
  time: string; // e.g. "14:00" — display value
}

export interface IDonor extends Document {
  userId: Types.ObjectId;
  bloodType: BloodType;
  availability?: IDonorAvailability;
  lastdonation?: Date; 
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Schema
const DonorSchema = new Schema<IDonor>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "User ID is required"], 
      unique: true 
    },
    bloodType: { 
      type: String, 
      enum: {
        values: BLOOD_TYPES,
        message: "{VALUE} is not a valid blood type",
      }, 
      required: [true, "Blood type is required"] 
    },
    availability: {
      date: { type: Date },
      time: { 
        type: String,
        trim: true,
        match: [
          /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          "Please provide time in HH:MM format (e.g. 14:00)",
        ],
      },
    },
    lastdonation: { type: Date }, 
  },
  { 
    timestamps: true 
  }
);

// Indexes
DonorSchema.index({ bloodType: 1 });
DonorSchema.index({ bloodType: 1, "availability.date": 1 });

// 3. Model
const Donor: Model<IDonor> =
  mongoose.models.Donor || mongoose.model<IDonor>("Donor", DonorSchema);

export default Donor;