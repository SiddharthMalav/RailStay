/**
 * Mongoose schema for managing hotel details.
 * Defines fields for hotel properties, rooms, and location.
 */
import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  totalRooms: {
    type: String,
    required: true,
  },
  availableRooms: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
});

// Create models using the schemas
const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", stateSchema);
export default Hotel;
