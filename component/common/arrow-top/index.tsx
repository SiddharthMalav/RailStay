"use client";
import React, { useCallback } from "react";
import { FaAngleUp } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import useScrollTrigger from "@/hooks/scrollTrigger";

const ArrowTop = () => {
  const pathname = usePathname();
  const scroll = useScrollTrigger();
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  if (pathname !== "/") {
    return null;
  }

  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-[20px] left-[95%] cursor-pointer bg-sky-400 rounded-full w-[40px] h-[40px] flex items-center justify-center transition-opacity duration-500 ease-in-out ${
        scroll ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <FaAngleUp className="fill-white stroke-[10px] h-[25px] w-[25px]" />
    </div>
  );
};

export default ArrowTop;
