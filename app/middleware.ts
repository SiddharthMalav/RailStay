// middleware.ts
import { Mongo } from "@/config/db-connection";
import { isAuthLogin } from "@/utils";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    if (!mongoose.connection.readyState) {
      const mongo = new Mongo();
      await mongo.connect();
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }

  //This is check a valid user login or not and redirect to the login page
  const isAuthLoginUser = isAuthLogin();

  if (!isAuthLoginUser) {
    redirect("/sign-in");
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image).*)"],
};
