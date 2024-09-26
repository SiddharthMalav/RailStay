import { Mongo } from "@/config/db-connection";
import LoginUserModel from "@/schemas/loginUsers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Connection } from "mongoose";
import { NextApiResponse } from "next";

export async function POST(req: any, res: NextApiResponse) {
  try {
    const connect = new Mongo();
    connect.connect();
    const { emailOrUsername, password } = await req.json();
    const user = await LoginUserModel.findOne({
      $or: [{ name: emailOrUsername }, { email: emailOrUsername }],
    });
    if (!user) {
      return new Response(
        JSON.stringify({
          message: "Invalid credentials",
          status: 401,
        })
      );
    }

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return new Response(
        JSON.stringify({
          message: "Invalid credentials",
          status: 401,
        })
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.name, email: user.email },
      process.env.JWT_SECRET!, // Exclamation mark asserts that JWT_SECRET is defined
      { expiresIn: "1h" }
    );

    return new Response(
      JSON.stringify({
        message: "Successfully Login",
        status: 200,
        token: token,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "error:- " + error,
        status: 500,
      })
    );
  }
}
