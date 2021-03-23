import React from "react";
import { FieldError } from "react-hook-form";
import "./Input.css";
import { FormInputProps } from "../FormInputProps";

export type InputType = "text" | "email" | "password";

export interface InputProps extends FormInputProps<HTMLInputElement> {
  type?: InputType;
  placeholder?: string;
}

export const Input: React.VFC<InputProps> = ({
  register,
  errors,
  options,
  type = "text",
  name,
  placeholder,
}) => {
  const classes = `form-input`;

  const error: FieldError | undefined = errors ? errors[name] : undefined;
  const errorMessage = error ? error.message || error.type : undefined; // TODO: use translations for type

  return (
    <div className="flex flex-col">
      <input
        ref={(e) => register?.(e, options)}
        className={classes}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      {errorMessage}
    </div>
  );
};
