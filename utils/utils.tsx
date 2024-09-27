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
    const decodedToken: any = jwt.decode(token, { complete: true });
    const exp = decodedToken?.payload?.exp; // Expiration timestamp
    const currentTime = Math.floor(Date.now() / 1000);
    if (exp && exp < currentTime) {
      console.error("JWT token has expired");
      return false;
    }
    return true;
  } catch (error) {
    console.error("JWT token has expired or is invalid", error);
    return false;
  }
}

export async function removeCookie(cookieName: string) {
  const cookieStore = cookies();
  cookieStore.delete(cookieName);
}
