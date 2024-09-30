/**
 * Renders the landing page, ensuring the MONGODB_URI environmental variable is defined.
 * This is Landing Page
 * TODO: UI not implement yet
 */
"use server";
import ArrowTop from "@/component/common/arrow-top";
import { MONGODB_URI } from "@/config/env";
import { isAuthLogin } from "@/utils/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import { redirect } from "next/navigation";

import "reflect-metadata";
// Dynamically import the Carousel component with no SSR
const Carousel = dynamic(() => import("@/component/common/carousel"), {
  ssr: false,
});
export default async function Home() {
  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }
  const isAuthLoginUser = await isAuthLogin();
  if (!isAuthLoginUser) {
    redirect("/sign-in");
  }
  const items = [
    <Image
      key="1"
      className="object-cover"
      src="/assets/images/train1.jpg"
      width={1200} // set width value
      height={480} // set height value
      alt="Train 1"
      style={{ width: "100%", height: "30rem" }}
    />,
    <Image
      key="4"
      className="object-cover"
      src="/assets/images/hotel2.jpg"
      width={1200}
      height={480}
      alt="Hotel 2"
      style={{ width: "100%", height: "30rem" }}
    />,
    <Image
      key="5"
      className="object-cover"
      src="/assets/images/train3.jpg"
      width={1200}
      height={480}
      alt="Train 3"
      style={{ width: "100%", height: "30rem" }}
    />,
    <Image
      key="6"
      className="object-cover"
      src="/assets/images/hotel3.jpg"
      width={1200}
      height={480}
      alt="Hotel 3"
      style={{ width: "100%", height: "30rem" }}
    />,
  ];

  return (
    <main className="">
      <Carousel items={items} />

      {/* // cards for details */}
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Hotel Details
            </h2>
            <p className="mt-4 text-gray-500">
              Located in the heart of the city, our hotel offers luxurious
              accommodations with breathtaking views and world-class amenities.
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Location</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  123 Main Street, Downtown, City, Country
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Room Types</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  Luxury Suites, Deluxe Rooms, Executive Suites
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Amenities</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  Spa, Fitness Center, Rooftop Bar, Gourmet Dining
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Services</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  24/7 Room Service, Business Center, Concierge
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Parking</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  On-site parking available for guests
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">
                  Additional Features
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  Smoke-free property, Pet-friendly options
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <Image
              src="/assets/images/hotel-5.jpg"
              alt="Luxurious hotel room with city view"
              className="rounded-lg bg-gray-100"
              width={500}
              height={500}
            />
            <Image
              src="/assets/images/hotel-6.jpg"
              alt="Spa and wellness center in the hotel"
              className="rounded-lg bg-gray-100"
              width={500}
              height={500}
            />
            <Image
              src="/assets/images/hotel-9.jpg"
              alt="Gourmet dining restaurant in the hotel"
              className="rounded-lg bg-gray-100"
              width={500}
              height={500}
            />
            <Image
              src="/assets/images/hotel-8.jpg"
              alt="Business center facilities in the hotel"
              className="rounded-lg bg-gray-100"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      {/* // for train ticket  */}
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 pb-24 sm:px-6 sm:pb-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <Image
              src="/assets/images/train-5.jpg"
              alt="Interior view of a modern train compartment"
              className="rounded-lg bg-gray-100"
              width={500}
              height={500}
            />
            <Image
              src="/assets/images/train-6.jpg"
              alt="View of train platform with passengers boarding"
              className="rounded-lg bg-gray-100"
              width={500}
              height={500}
            />
            <Image
              src="/assets/images/train-7.jpg"
              alt="Train dining car with tables and passengers"
              className="rounded-lg bg-gray-100"
              width={500}
              height={500}
            />
            <Image
              src="/assets/images/train-8.jpg"
              alt="Train ticket counter with passengers buying tickets"
              className="rounded-lg bg-gray-100"
              width={500}
              height={500}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Train Ticket Details
            </h2>
            <p className="mt-4 text-gray-500">
              Enjoy a comfortable journey aboard our modern trains with scenic
              views and excellent onboard services.
            </p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Route</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  From City A to City B
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Departure Time</dt>
                <dd className="mt-2 text-sm text-gray-500">12:00 PM</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Arrival Time</dt>
                <dd className="mt-2 text-sm text-gray-500">3:00 PM</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Train Type</dt>
                <dd className="mt-2 text-sm text-gray-500">Express Train</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Class</dt>
                <dd className="mt-2 text-sm text-gray-500">First Class</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">Seat Number</dt>
                <dd className="mt-2 text-sm text-gray-500">A23</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      
    </main>
  );
}
