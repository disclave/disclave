import React from "react";
import { FieldErrors, RegisterOptions } from "react-hook-form";
import { useFormError } from "./useFormError";

type RegisterWithRef<T> = (
  element: T | null,
  options?: RegisterOptions
) => void;

export interface FormInputChildProps<T> {
  register?: RegisterWithRef<T>;
  options?: RegisterOptions;
  errors?: FieldErrors;
  name: string;
}

export interface InputProps {
  children: React.ReactElement;
  errors?: FieldErrors;
  name: string;
}

export const Input: React.VFC<InputProps> = ({ children, errors, name }) => {
  const error = useFormError(name, errors);

  const className = [
    "border rounded focus:outline-none",
    error ? "border-red-700" : "border-gray-400 focus:border-gray-600",
    "transition-colors",
    "px-3 py-1.5",
    children.props.className || "",
  ].join(" ");

  return (
    <div className="flex flex-col">
      {React.cloneElement(children, {
        ...children.props,
        className: className,
      })}
      <span className="text-red-700">{error?.message}</span>
    </div>
  );
};
