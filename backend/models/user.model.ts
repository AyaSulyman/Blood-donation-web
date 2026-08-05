import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  bloodType: string;
}
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    bloodType: {
      type: String,
      required: [true, "Blood type is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

const User = model<IUser>("User", userSchema);

export default User;
