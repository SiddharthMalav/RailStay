/**
 * Renders the landing page, ensuring the MONGODB_URI environmental variable is defined.
 * This is Landing Page
 * TODO: UI not implement yet
 */

import { MONGODB_URI } from "@/config/env";
import { isAuthLogin } from "@/utils";
import { redirect } from "next/navigation";
import "reflect-metadata";

export default async function Home() {
  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }
  const isAuthLoginUser = isAuthLogin();
  if (!isAuthLoginUser) {
    redirect("/sign-in");
  }

  return (
    <main className="flex h-screen items-center justify-center ">
      <div className="text-6xl font-bold">Landing Page</div>
    </main>
  );
}
