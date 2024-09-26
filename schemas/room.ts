/**
 * Mongoose schema for managing individual hotel rooms.
 * Defines fields for room identification, type, status, and pricing.
 */
import mongoose from "mongoose";
const stateSchema = new mongoose.Schema({
  hotelId: {
    type: String,
    required: true,
  },
  roomNo: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});
// Create models using the schemas
const Room = mongoose.models.Room || mongoose.model("Room", stateSchema);
export default Room;