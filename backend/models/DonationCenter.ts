import mongoose, { Schema, type InferSchemaType } from "mongoose";

const donationCenterSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Center name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      minlength: 5,
      maxlength: 200,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    openingHours: {
      type: String,
      required: [true, "Opening hours are required"],
      trim: true,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export type DonationCenterType = InferSchemaType<
  typeof donationCenterSchema
>;

const DonationCenter =
  mongoose.models.DonationCenter ||
  mongoose.model("DonationCenter", donationCenterSchema);

export default DonationCenter;