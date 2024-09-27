// middleware.ts
import { getCookie } from "@/utils/utils";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("middleware");
  const token = await getCookie("token");
  if (token === null || token === undefined) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  // try {
  // if (!mongoose.connection.readyState) {
  //     const mongo = new Mongo();
  //     await mongo.connect();
  // }
  // } catch (error) {
  // console.error("Error connecting to the database:", error);
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "//:path*",
    "/hotel-list/:path",
    "/booking-list/:path",
    "/trains/:path",
    "/train-detail/:path",
    "/modal-form/:path",
    "/sample-form/:path",
    ],
};
