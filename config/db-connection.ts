/**
 * Handles the connection to the MongoDB database using Mongoose.
 */

import mongoose from "mongoose";
import { MONGODB_URI } from "./env";

export class Mongo {

  async connect() {
    try {
      await mongoose.connect(MONGODB_URI, {
        autoIndex: false,
        serverSelectionTimeoutMS: 30000,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error(
        `Failed to connect to MongoDB. Error details: ${JSON.stringify(error)}`
      );
    }
  }
}
