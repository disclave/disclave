import React from "react";
import { FieldErrors, RegisterOptions, useFormContext } from "react-hook-form";
import { useFormError } from "./useFormError";

type RegisterWithRef<T> = (
  element: T | null,
  options?: RegisterOptions
) => void;

export interface FormInputChildProps<T> {
  options?: RegisterOptions;
  name: string;
}

export interface InputProps {
  className?: string;
  children: React.ReactElement;
  name: string;
}

export const Input: React.VFC<InputProps> = ({ className, children, name }) => {
  const { errors } = useFormContext();
  const error = useFormError(name, errors);

  const wrapperClassName = ["flex flex-col", className || ""].join(" ");

  const childClassName = [
    "border rounded focus:outline-none",
    error ? "border-red-700" : "border-gray-400 focus:border-gray-600",
    "transition-colors",
    "px-3 py-1.5",
    children.props.className || "",
  ].join(" ");

  return (
    <div className={wrapperClassName}>
      {React.cloneElement(children, {
        ...children.props,
        className: childClassName,
      })}
      <span className="text-red-700">{error?.message}</span>
    </div>
  );
};
