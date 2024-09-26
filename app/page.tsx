/**
 * Renders the landing page, ensuring the MONGODB_URI environmental variable is defined.
 * This is Landing Page
 * TODO: UI not implement yet
 */
"use server";
import { MONGODB_URI } from "@/config/env";
import { isAuthLogin } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import "reflect-metadata";
import dynamic from "next/dynamic";
// Dynamically import the Carousel component with no SSR
const Carousel = dynamic(() => import("@/component/common/carousel"), {
  ssr: false,
});
export default async function Home() {
  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }
  const isAuthLoginUser = isAuthLogin();
  if (!isAuthLoginUser) {
    redirect("/sign-in");
  }
  const items = [
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key="1"
      src="/assets/images/train1.jpg"
      style={{ width: "100%", height: "100vh" }}
      alt="Picture of the author"
    />,
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key="2"
      src="/assets/images/hotel1.jpg"
      style={{ width: "100%", height: "100vh" }}
      alt="Picture of the author"
    />, // eslint-disable-next-line @next/next/no-img-element
    <img
      key="3"
      src="/assets/images/train2.jpg"
      style={{ width: "100%", height: "100vh" }}
      alt="Picture of the author"
    />,
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key="4"
      src="/assets/images/hotel2.jpg"
      style={{ width: "100%", height: "100vh" }}
      alt="Picture of the author"
    />,
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key="5"
      src="/assets/images/train3.jpg"
      style={{ width: "100%", height: "100vh" }}
      alt="Picture of the author"
    />,
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key="6"
      src="/assets/images/hotel3.jpg"
      style={{ width: "100%", height: "100vh" }}
      alt="Picture of the author"
    />,
  ];

  return (
    <main className="flex h-screen items-center justify-center ">
      <Carousel items={items} />
      {/* <div className="text-6xl font-bold">Landing Page</div> */}
    </main>
  );
}
