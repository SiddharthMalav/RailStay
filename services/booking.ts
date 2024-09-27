/**
 * Service class for managing booking-related operations.
 */
import { eHTTPStatusCode } from "@/enums/shared-enums";
import BookingModel from "@/schemas/booking";
import { TBookingParams } from "@/types/shared-types";
import { ObjectId } from "mongodb";

export class BookingService {
  async getBookingListService(data: TBookingParams) {
    try {
      const itemPerPage = 10;
      const {
        currentPage = 1,
        endDate = "",
        startDate = "",
        searchQuery = "",
        Order,
        Key,
      } = data;
      const sortStage = {
        [Key]: Order === "A" ? 1 : -1, // Ascending (1) or Descending (-1)
      };
      const bookings = await BookingModel.aggregate([
        {
          $project: {
            name: true,
            address: true,
            number: true,
            checkIn: true,
            checkOut: true,
            facility: true,
            _id: true,
            roomId: true,
            hotelId: true,
          },
        },
        ...(searchQuery &&
          ([
            {
              $match: {
                $or: [
                  { name: { $regex: searchQuery, $options: "i" } },
                  { hotelId: { $regex: searchQuery, $options: "i" } },
                ],
              },
            },
          ] as any)),
        ...(startDate &&
          ([
            {
              $match: { checkIn: { $gte: new Date(startDate + "T00:00:00Z") } },
            },
          ] as any)),
        ...(endDate &&
          ([
            {
              $match: { checkOut: { $lte: new Date(endDate + "T23:59:59Z") } },
            },
          ] as any)),
        { $sort: sortStage },
        {
          $skip: ((currentPage as number) - 1) * itemPerPage,
        },
        {
          $limit: itemPerPage,
        },
      ]);
      const totalBooking = await BookingModel.aggregate([
        {
          $project: {
            name: true,
            address: true,
            number: true,
            checkIn: true,
            checkOut: true,
          },
        },
        ...(searchQuery &&
          ([
            {
              $match: {
                $or: [
                  { name: { $regex: searchQuery, $options: "i" } },
                  { hotelId: { $regex: searchQuery, $options: "i" } },
                ],
              },
            },
          ] as any)),
        ...(startDate &&
          ([
            {
              $match: { checkIn: { $gte: new Date(startDate + "T00:00:00Z") } },
            },
          ] as any)),
        ...(endDate &&
          ([
            {
              $match: { checkOut: { $lte: new Date(endDate + "T23:59:59Z") } },
            },
          ] as any)),
      ]);
      return {
        message: "Successfully Fetched",
        status: eHTTPStatusCode.OK,
        data: bookings,
        totalItems: totalBooking.length,
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error while fetching",
        status: eHTTPStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getBookingPaymentByIdService(id: string) {
    try {
      const payments = await BookingModel.aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $project: {
            payments: true,
          },
        },
      ]);
      return {
        message: "Successfully Fetched",
        status: eHTTPStatusCode.OK,
        data: payments,
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error while fetching",
        status: eHTTPStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
