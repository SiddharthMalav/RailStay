/**
 *  This component renders a navigation bar with links to different pages and a sign-out button.
 */
"use client";

import { eHTTPStatusCode } from "@/enums/shared-enums";
import useScrollTrigger from "@/hooks/scrollTrigger";
import { getCookie, removeCookie } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DropDownNav from "../drop-down-nav";

const Navbar = () => {
  const pathName = usePathname();
  const [userName, setUserName] = useState("");
  const scroll = useScrollTrigger();

  const handleSignOut = () => {
    removeCookie("token");
    setTimeout(() => {
      window.open("/sign-in", "_self");
    }, 1000);
  };

  async function getUserDetail() {
    const token: string = (await getCookie("token")) as string;
    const response = await fetch("api/getUserDetails", {
      method: "GET",
      headers: {
        Authorization: token, // Send the token in the Authorization header
        "Content-Type": "application/json", // Optional, if you're expecting JSON response
      },
    });
    const res = await response.json();
    if (response.status === eHTTPStatusCode.OK) {
      setUserName(res.data.name);
    }
  }
  useEffect(() => {
    if (pathName != "/sign-in" && pathName != "/sign-up") {
      getUserDetail();
    }
  }, [pathName]);

  if (pathName == "/sign-in" || pathName == "/sign-up") {
    return null;
  }

  return (
    <nav
      className={`bg-${
        scroll || pathName != "/"
          ? "gray-800"
          : "bg-black bg-opacity-61 backdrop-filter backdrop-blur-lg"
      }  fixed w-full z-10 `}
    >
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex gap-4">
            <Link href="/">
              <Image
                src="/assets/images/image.png"
                alt=""
                className="rounded-lg bg-gray-100"
                width={40}
                height={40}
              />
            </Link>
            <div className="flex items-center text-white text-xl font-bold">
              {userName}
            </div>
          </div>

          {/* Links Section */}
          <div className="  flex items-center">
            <Link href="/">
              <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </span>
            </Link>
            <div className=" flex items-baseline ">
              <DropDownNav
                navGroup={[
                  { item: "Hotels", path: "/hotel-list" },
                  { item: "Bookings", path: "/booking-list" },
                ]}
              >
                Hotels
              </DropDownNav>

              <DropDownNav
                navGroup={[
                  { item: "Trains", path: "/trains" },
                  { item: "Trains-detail", path: "/train-detail" },
                ]}
              >
                Trains
              </DropDownNav>
              <DropDownNav
                navGroup={[
                  { item: "Sample", path: "/sample-form" },
                  { item: "Drawer", path: "/drawer-form" },
                  { item: "Modal", path: "/modal-form" },
                ]}
              >
                Container
              </DropDownNav>

              <button
                onClick={handleSignOut}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
