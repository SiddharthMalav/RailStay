import LoginUserModel from "@/schemas/loginUsers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import { Mongo } from "@/config/db-connection";
export async function POST(req: any, res: NextApiResponse) {
  const connect = new Mongo();
  connect.connect();
  const { userName, email, password } = await req.json();
  try {
    const existingUser = await LoginUserModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          message: "User Name or Email already exists",
          status: 400,
        })
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await LoginUserModel.create({
      name: userName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: newUser._id, userName: newUser.userName, email: newUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    return new Response(
      JSON.stringify({
        message: "Successfully Created",
        status: 201,
        token: token,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error while creating user" + error,
        status: 500,
      })
    );
  }
}
