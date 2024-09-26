import { sizes } from "@/enums/shared-enums";
import React from "react";

type LabelProps = {
  children: React.ReactNode;
  size?: "sm" | "xl" | "md" | "lg";
  className?: string;
};

const Label = (props: LabelProps) => {
  const { children, size = "md", className = "" } = props; // default className to an empty string

  return (
    <label
      className={`text-black flex items-center font-semibold ${sizes[size]} ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
