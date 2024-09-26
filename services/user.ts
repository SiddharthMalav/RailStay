/**
 * Service class for managing booking-related operations.
 */
import { eHTTPStatusCode } from "@/enums/shared-enums";
import UserModel from "@/schemas/user";
import { TUser } from "@/types/shared-types";

export class UserService {
  async getUserList(data: any) {
    try {
      const itemPerPage = 10;
      const { currentPage = 1, searchQuery = "" } = data;
      const users = await UserModel.aggregate([
        {
          $project: {
            name: true,
            address: true,
            number: true,
            gender: true,
            age: true,
            email: true,
            pincode: true,
          },
        },
        ...(searchQuery &&
          ([
            {
              $match: {
                $or: [
                  { name: { $regex: searchQuery, $options: "i" } },
                  { address: { $regex: searchQuery, $options: "i" } },
                  { number: { $regex: searchQuery, $options: "i" } },
                  { email: { $regex: searchQuery, $options: "i" } },
                  { gender: { $regex: searchQuery, $options: "i" } },
                ],
              },
            },
          ] as any)),
        {
          $skip: ((currentPage as number) - 1) * itemPerPage,
        },
        {
          $limit: itemPerPage,
        },
      ]);
      const totalUsers = await UserModel.aggregate([
        {
          $project: {
            name: true,
            address: true,
            number: true,
            gender: true,
            age: true,
            email: true,
            pincode: true,
          },
        },
      ]);
      return {
        message: "Successfully Fetched",
        status: eHTTPStatusCode.OK,
        data: users,
        totalItems: totalUsers.length,
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error while fetching",
        status: eHTTPStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
  async addUser(newUserPayload: TUser) {
    try {
      await UserModel.create(newUserPayload);
      return {
        message: "Successfully added",
        status: eHTTPStatusCode.OK,
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error while adding user",
        status: eHTTPStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
  async getUserById(_id: string) {
    try {
      const res = await UserModel.findById(_id);
      return {
        message: "Successfully Fetched",
        status: eHTTPStatusCode.OK,
        data: res,
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error while fetching",
        status: eHTTPStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
  async deleteUser(id: string) {
    try {
      await UserModel.deleteOne({ _id: id });
      return {
        message: "Successfully deleted",
        status: eHTTPStatusCode.OK,
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error while deleting",
        status: eHTTPStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
  async updateUser(newUserPayload: any) {
    try {
      await UserModel.updateOne(
        { _id: newUserPayload._id },
        { $set: newUserPayload }
      );
      return {
        message: "Successfully Updated",
        status: eHTTPStatusCode.OK,
      };
    } catch (error) {
      console.log("error", error);
      return {
        message: "Error while updating user",
        status: eHTTPStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
