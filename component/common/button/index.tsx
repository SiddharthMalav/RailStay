import React from "react";

type CustomButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "outline"
    | "link";
  className?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  size = "md",
  variant = "primary",
  className = "",
}) => {
  // Define size classes for button
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-5 py-3 text-lg",
  };

  // Extended variant classes
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    warning: "bg-yellow-500 text-black hover:bg-yellow-600",
    info: "bg-teal-500 text-white hover:bg-teal-600",
    light: "bg-gray-200 text-black hover:bg-gray-300",
    dark: "bg-gray-800 text-white hover:bg-gray-900",
    outline:
      "border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white",
    link: "text-blue-500 hover:underline",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded ${sizeClasses[size]} ${
        variantClasses[variant]
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
