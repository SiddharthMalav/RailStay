/**
 * This file handles the POST request for fetching paginated user data.
 * It supports searching and pagination by interacting with the UserModel schema.
 */

import UserModel from "@/schemas/user";

export async function POST(request: any) {
  const data = await request.json();
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
    return new Response(
      JSON.stringify({
        message: "Successfully Fetched",
        status: 200,
        data: users,
        totalItems: totalUsers.length,
      })
    );
  } catch (error) {
    console.log("error", error);
  }
}
