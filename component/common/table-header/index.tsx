/*
* This is used for table head and sorting 

*/

"use client";
import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

type TableHeaderProps = {
  Order: string;
  updateFilterModal: (newFilter: any) => void; // Function prop to update filters
  children: React.ReactNode;
  columnKey: string;
  keyValue: string;
};

const TableHeader = ({
  columnKey,
  Order,
  updateFilterModal,
  children,
  keyValue,
}: TableHeaderProps) => {
  const onChangeOrder = (OrderArgs: string) => {
    updateFilterModal({ Order: OrderArgs, Key: keyValue });
  };
  return (
    <th
      className="cursor-pointer"
      onClick={() => onChangeOrder(Order === "A" ? "D" : "A")}
    >
      <span className="flex items-center justify-center">
        {children}
        {keyValue === columnKey && (
          <div>{Order === "A" ? <FaAngleUp /> : <FaAngleDown />}</div>
        )}
      </span>
    </th>
  );
};

export default TableHeader;
