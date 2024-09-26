import React from "react";
import { Controller, Control } from "react-hook-form";

type CustomInputControllerProps = {
  name: string;
  control: Control<any>;
  placeholder?: string;
  className?: string;
  type?: string;
  defaultValue?: any;
};

const CustomInputController: React.FC<CustomInputControllerProps> = ({
  name,
  control,
  placeholder = "",
  className = "border-2 border-black border-solid rounded-md p-0.5", // Default styles
  type = "text",
  defaultValue = "",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <input
          {...field}
          type={type}
          className={className}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default CustomInputController;
