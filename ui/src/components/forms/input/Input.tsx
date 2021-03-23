import React from "react";
import { FieldError, FieldErrors, RegisterOptions } from "react-hook-form";

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
  const className = [
    "border rounded border-gray-400 focus:border-gray-600 focus:outline-none",
    "transition-colors",
    "px-3 py-1.5",
    children.props.className || "",
  ].join(" ");

  const error: FieldError | undefined = errors ? errors[name] : undefined;
  const errorMessage = error ? error.message || error.type : undefined; // TODO: use translations for type

  return (
    <div className="flex flex-col">
      {React.cloneElement(children, {
        ...children.props,
        className: className,
      })}
      {errorMessage}
    </div>
  );
};
