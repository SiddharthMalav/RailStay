/**
 * Mongoose schema for managing train details.
 * Defines fields for train related data.
 */
import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    unique: true,
    // required: true
  },
  status: {
    type: String,
    enum: ["Running", "Not Running", "Hold"], // Enum for train status
    // required: true
  },
  from: {
    type: String,
    // required: true
  },
  to: {
    type: String,
    // required: true
  },
});

// Create a model using the schema
export const trains =
  (mongoose.models.trains as any) || mongoose.model("trains", trainSchema);
