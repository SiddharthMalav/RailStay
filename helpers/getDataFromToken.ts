const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// Custom error class to include status code
class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const getDataFromToken = (request?: NextRequest) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || "";

    if (!token) {
      throw new CustomError("Token not found.", 401); // Handle missing token
    }

    // Verify the token and extract the payload
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Return the decoded token's ID
    return decodedToken.id;
  } catch (error: any) {
    console.log("error", error);

    if (error.name === "TokenExpiredError") {
      // Handle token expiration
      throw new CustomError("Token has expired.", 401);
    } else {
      // Handle other token verification errors
      throw new CustomError("Invalid token.", 401);
    }
  }
};
