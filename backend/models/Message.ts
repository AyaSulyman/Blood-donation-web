import mongoose, { Schema, Document, Model, Types } from "mongoose";

// 1. Interface
export interface IMessage extends Document {
  userId: Types.ObjectId;
  message: string;
  createdAt?: Date; // Optional: auto-managed by timestamps
  updatedAt?: Date; // Optional: auto-managed by timestamps
}

// 2. Schema
const MessageSchema = new Schema<IMessage>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "User ID is required"] 
    },
    message: { 
      type: String, 
      required: [true, "Message content cannot be empty"], 
      trim: true,
      minlength: [1, "Message must contain at least 1 character"],
      maxlength: [2000, "Message cannot exceed 2000 characters"] // Adjust limit as needed
    },
  },
  { 
    timestamps: true 
  }
);

// Indexes
// Speeds up fetching messages sent by a specific user sorted by time
MessageSchema.index({ userId: 1, createdAt: -1 });

// 3. Model
const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;