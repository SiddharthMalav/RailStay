import React from "react";
import { sizeClasses } from "@/enums/enums";

type customLabelProps = {
  children: React.ReactNode;
  size?: "sm" | "xl" | "md" | "lg";
  className?: string;
};

const CustomLabel = (props: customLabelProps) => {
  const { children, size = "md", className = "" } = props; // default className to an empty string

  return (
    <label
      className={`text-black font-semibold ${sizeClasses[size]} ${className}`}
    >
      {children}
    </label>
  );
};

export default CustomLabel;
