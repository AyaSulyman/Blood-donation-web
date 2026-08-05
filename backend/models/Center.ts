import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Interface
export interface ICenter extends Document {
  name: string;
  address: string;
  phoneNb: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Schema
const CenterSchema = new Schema<ICenter>(
  {
    name: { 
      type: String, 
      required: [true, "Center name is required"], 
      trim: true 
    },
    address: { 
      type: String, 
      required: [true, "Center address is required"], 
      trim: true 
    },
    phoneNb: { 
      type: String, 
      required: [true, "Phone number is required"], 
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      lowercase: true, 
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
  },
  { 
    timestamps: true 
  }
);

// 3. Model
const Center: Model<ICenter> =
  mongoose.models.Center || mongoose.model<ICenter>("Center", CenterSchema);

export default Center;