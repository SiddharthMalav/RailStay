/**
 *  This component renders a navigation bar with links to different pages and a sign-out button.
 */
"use client";

import { eHTTPStatusCode } from "@/enums/shared-enums";
import { getCookie, removeCookie } from "@/utils/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [userName, setUserName] = useState("");

  const handleSignOut = () => {
    removeCookie("token");
    router.push("/sign-in");
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
    getUserDetail();
  }, [pathName]);

  if (pathName == "/sign-in" || pathName == "/sign-up") {
    return null;
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-white text-xl font-bold">{userName}</span>
            </Link>
          </div>

          {/* Links Section */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/">
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </span>
              </Link>
              <Link href="/sample-form">
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Sample
                </span>
              </Link>
              <Link href="/sample-form-api">
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Sample Api
                </span>
              </Link>
              <Link href="/drawer-form">
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Drawer
                </span>
              </Link>
              <Link href="/modal-form">
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Modal
                </span>
              </Link>
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
