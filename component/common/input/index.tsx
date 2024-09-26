import clsx from "clsx"; // Optional utility for managing class names (can also just use template literals)
import React from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  name: string;
  register?: any;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  register,
  autoComplete = "off",
  onChange,
  value,
  className,
}) => {
  // Default class names
  const defaultClasses = "border-2 rounded-lg border-slate-300 p-2";

  return (
    <input
      className={clsx(defaultClasses, className)} // Combine default and passed class names
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      {...(register ? register(name) : {})}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
