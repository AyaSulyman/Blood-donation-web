// src/plugins/db.ts
import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI ?? 'mongodb+srv://hamzamerie60_db_user:9OBc0EPqwh2i2AZx@cluster0.5u6bgxg.mongodb.net/bloodDonation?appName=Cluster0';

  mongoose.connection.on('connected', () => console.log('MongoDB connected'));
  mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000, // fail fast instead of hanging forever
  });
  console.log("Connected DB:", mongoose.connection.name);
console.log("Mongo URI:", process.env.MONGODB_URI);
}
