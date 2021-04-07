import classNames from "classnames";
import React from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { useFormError } from "./useFormError";

export interface FormInputChildProps<T> {
  className?: string;
  options?: RegisterOptions;
  name: string;
}

export interface InputProps {
  className?: string;
  children: React.ReactElement;
  name: string;
  options?: RegisterOptions;
}

export const Input: React.VFC<InputProps> = ({
  className,
  children,
  name,
  options,
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const error = useFormError(name, errors);

  const wrapperClassName = ["flex flex-col", className || ""].join(" ");

  const childClassName = classNames(
    "border rounded focus:outline-none",
    error ? "border-red-700" : "border-gray-400 focus:border-gray-600",
    "transition-colors",
    "px-3 py-1.5",
    children.props.className
  );

  const { ref, ...rest } = register(name, options);

  const element = React.cloneElement(children, {
    ...children.props,
    className: childClassName,
    ...rest,
    ref: (node: any) => {
      if (ref) {
        if (typeof ref === "function") ref(node);
      }

      (children as any).ref?.(node);
    },
  });

  return (
    <div className={wrapperClassName}>
      {element}
      <span className="text-red-700">{error?.message}</span>
    </div>
  );
};
