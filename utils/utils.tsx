"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getCookie(name: string) {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get(name)?.value;
  return cookieValue || undefined;
}
export async function isAuthLogin(): Promise<any> {
  const token = await getCookie("token");

  if (!token) {
    return false;
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string); // Ensure the secret matches
    return !!decodedToken;
  } catch (error) {
    console.error("JWT token has expired or is invalid");
    return false;
  }
}

export async function removeCookie(cookieName: string) {
  const cookieStore = cookies();
  cookieStore.delete(cookieName);
}
