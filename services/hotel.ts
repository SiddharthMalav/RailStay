/**
 * Service class for managing hotel-related operations.
 */
import { eHTTPStatusCode } from "@/enums/shared-enums";
import Room from "@/schemas/room";
import { THotelParams } from "@/types/shared-types";
import Hotel from "../schemas/hotelList";

export class HotelService {
  async getHotelListService(data: THotelParams) {
    const { currentPage = 1, occupancy = "", searchQuery = "" } = data;
    const itemPerPage = 10;
    try {
      const hotels = await Hotel.aggregate([
        {
          $project: {
            _id: true,
            name: true,
            pinCode: true,
            contactNumber: true,
            totalRooms: true,
            availableRooms: true,
            status: true,
            Location: true,
            occupancy: {
              $cond: [
                { $eq: ["$availableRooms", "$totalRooms"] },
                "Empty",
                {
                  $cond: [{ $eq: ["$availableRooms", 0] }, "Full", "Partial"],
                },
              ],
            },
          },
        },
        ...(searchQuery &&
          ([
            { $match: { name: { $regex: searchQuery, $options: "i" } } },
          ] as any)),
        ...(occupancy && ([{ $match: { occupancy: occupancy } }] as any)),
        {
          $skip: ((currentPage as number) - 1) * itemPerPage,
        },
        {
          $limit: itemPerPage,
        },
      ]);
      const hotelsFilterCount = await Hotel.aggregate([
        {
          $project: {
            _id: true,
            name: true,
            totalRooms: true,
            availableRooms: true,
            status: true,
            occupancy: {
              $cond: [
                { $eq: ["$availableRooms", "$totalRooms"] },
                "Empty",
                {
                  $cond: [{ $eq: ["$availableRooms", 0] }, "Full", "Partial"],
                },
              ],
            },
          },
        },
        ...(searchQuery &&
          ([
            { $match: { name: { $regex: searchQuery, $options: "i" } } },
          ] as any)),
        ...(occupancy && ([{ $match: { occupancy: occupancy } }] as any)),
      ]);
      return {
        message: "Successfully Fetched",
        status: eHTTPStatusCode.OK,
        data: hotels,
        totalItems: hotelsFilterCount.length,
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error while fetching",
        status: eHTTPStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getRoomByHotelIdService(id: string) {
    try {
      const rooms = await Room.find({ hotelId: id });
      return {
        message: "Successfully Fetched",
        status: eHTTPStatusCode.OK,
        data: rooms,
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
