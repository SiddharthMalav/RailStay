import LoginUserModel from "@/schemas/loginUsers";
import { ObjectId } from "bson";
import { type NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    const userDetail = jwt.verify(authHeader, process.env.JWT_SECRET);
    const id = new ObjectId(userDetail.id);
    const data = await LoginUserModel.findOne({ _id: id });

    return NextResponse.json({
      message: "success",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      {
        error: "An error occurred while fetching user data",
      },
      { status: 500 }
    );
  }
}
