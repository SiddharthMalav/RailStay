import { useState, useEffect } from "react";

/**
 * Custom hook to determine if the user has scrolled past a certain point.
 * @param {number} threshold - The scroll position threshold to check.
 * @returns {boolean} - Returns true if the user has scrolled past the threshold, otherwise false.
 */
const useScrollTrigger = (threshold = 100) => {
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsScrolledPast(true);
      } else {
        setIsScrolledPast(false);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isScrolledPast;
};

export default useScrollTrigger;
