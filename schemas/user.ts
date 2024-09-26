/**
 * Mongoose schema for managing individual hotel rooms.
 * Defines fields for room identification, type, status, and pricing.
 */
import mongoose from "mongoose";
const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});
// Create models using the schemas
const UserModel = mongoose.models.User || mongoose.model("User", stateSchema);
export default UserModel;
