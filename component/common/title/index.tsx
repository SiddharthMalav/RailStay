import { sizes } from "@/enums/shared-enums";
import React from "react";

type TitleProps = {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const Title = (props: TitleProps) => {
  const { children, size = "lg", className } = props;

  return (
    <h1 className={`text-black font-bold ${sizes[size]} ${className}`}>
      {children}
    </h1>
  );
};

export default Title;
