import mongoose from "mongoose";

// Define the schema for person details
const personDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    // required: true
  },
  age: {
    type: String,
    // required: true
  },
  mobileNumber: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
  },
  dob: {
    type: Date,
  },
});

// Define the schema for luggage details
const luggageSchema = new mongoose.Schema({
  numberOfBags: {
    type: String,
    // required: true
  },
  weight: {
    type: String,
    // required: true
  },
});

// Define the combined schema for train details
const trainDetailsSchema = new mongoose.Schema({
  trainDetails: {
    trainNumber: {
      type: String,
      // unique: true,
      // required: true
    },
    PNRNumber: {
      type: String,
      // required: true
    },

    journeyStart: {
      type: Date,
      // required: true
    },
    departureTime: {
      type: Date,
      // required: true
    },
    ticketPrice: {
      type: Number,
      // required: true
    },
  },

  personDetail: [personDetailSchema],  
  luggage: [luggageSchema],  
});

 
export const trainPassangerRouteDetail =
  mongoose.models.trainPassangerRouteDetail ||
  mongoose.model("trainPassangerRouteDetail", trainDetailsSchema);
