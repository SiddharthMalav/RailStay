/**
 * Mongoose schema for managing booking details.
 * Defines fields for hotel room reservation, payment history, and amenities.
 */
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
  },
  facility: {
    SPA: {
      included: {
        type: Boolean,
        required: true,
      },
      period: {
        type: {
          start: {
            type: Date,
            required: false,
          },
          end: {
            type: Date,
            required: false,
          },
        },
        required: false,
      },
    },
    pool: {
      included: {
        type: Boolean,
        required: true,
      },
      period: {
        type: {
          start: {
            type: Date,
            required: false,
          },
          end: {
            type: Date,
            required: false,
          },
        },
        required: false,
      },
    },
    GYM: {
      included: {
        type: Boolean,
        required: true,
      },
      period: {
        type: {
          start: {
            type: Date,
            required: false,
          },
          end: {
            type: Date,
            required: false,
          },
        },
        required: false,
      },
    },
    conferenceHall: {
      included: {
        type: Boolean,
        required: true,
      },
      period: {
        type: {
          start: {
            type: Date,
            required: false,
          },
          end: {
            type: Date,
            required: false,
          },
        },
        required: false,
      },
    },
    breakfast: {
      included: {
        type: Boolean,
        required: true,
      },
      period: {
        type: {
          start: {
            type: Date,
            required: false,
          },
          end: {
            type: Date,
            required: false,
          },
        },
        required: false,
      },
    },
  },
  payments: [
    {
      paymentDate: {
        type: Date,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
      paymentMethod: {
        type: String,
        required: true,
      },
    },
  ],
});

const BookingModel =
  mongoose.models.BookingData || mongoose.model("BookingData", bookingSchema);
export default BookingModel;
