/**
 * Mongoose schema for managing individual Login Users.
 * Defines fields for room identification, type, status, and pricing.
 */
import mongoose from "mongoose";
const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});
// Create models using the schemas
const LoginUserModel =
  mongoose.models.LoginUserModel ||
  mongoose.model("LoginUserModel", stateSchema);
export default LoginUserModel;
