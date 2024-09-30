import { isAuthLogin } from "@/utils/utils";
import mongoose from "mongoose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Mongo } from "./config/db-connection";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if user is authenticated
  const token = await isAuthLogin();

  // If the user is on /sign-in or /sign-up and already has a token, redirect to home page
  if (token && (path === "/sign-in" || path === "/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If no token is available and the user is not on /sign-in or /sign-up, redirect to /sign-in
  if (!token && path !== "/sign-in" && path !== "/sign-up") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  console.log("path", path, "token", token);

  // Connect to MongoDB if not connected
  if (mongoose && mongoose.connection && !mongoose.connection.readyState) {
    const mongo = new Mongo();
    await mongo.connect();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/hotel-list/:path*",
    "/booking-list/:path*",
    "/trains/:path*",
    "/train-detail/:path*",
    "/modal-form/:path*",
    "/sample-form/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
