import LoginUserModel from "@/schemas/loginUsers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";

export async function POST(req: any, res: NextApiResponse) {
  const { userName, email, password } = await req.json();
  try {
    const existingUser = await LoginUserModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "userName or Email already exists" });
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
