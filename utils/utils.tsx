"use server";
import { cookies } from "next/headers";

export async function getCookie(name: string) {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get(name)?.value;
  return cookieValue || undefined;
}
export async function isAuthLogin() {
  const token = getCookie("token");
  if (!token) {
    return false;
  }
  return true;
}
export async function removeCookie(cookieName: string) {
  const cookieStore = cookies();
  cookieStore.delete(cookieName);
}

