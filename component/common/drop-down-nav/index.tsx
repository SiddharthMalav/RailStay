import React, { useState } from "react";
import Link from "next/link";
import { string } from "yup";

type dropDownNavProps = {
  children: React.ReactNode;
  navGroup: navGroupProps[];
};

type navGroupProps = {
  item: string;
  path: string;
};

const DropDownNav = (props: dropDownNavProps) => {
  const { children, navGroup } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
        {children}
      </span>
      {isOpen && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute mt-2 w-48 bg-white shadow-lg rounded-md z-10"
        >
          <div className="py-1">
            {navGroup.map((item, index) => (
              <Link className="cursor-pointer" key={index} href={item.path}>
                <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                  {item.item}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownNav;
