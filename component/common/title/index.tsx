import { sizeClasses } from "@/enums/enums";
import React from "react";

type TitleProps = {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const CustomTitle = (props: TitleProps) => {
  const { children, size = "lg", className } = props;

  return (
    <h1 className={`text-black  font-bold ${sizeClasses[size]} ${className}`}>
      {children}
    </h1>
  );
};

export default CustomTitle;
