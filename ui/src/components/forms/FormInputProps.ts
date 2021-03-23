import React from "react";
import { FieldErrors, RegisterOptions } from "react-hook-form";

type RegisterWithRef<T> = (
  element: T | null,
  options?: RegisterOptions
) => void;

export interface FormInputProps<T> {
  register?: RegisterWithRef<T>;
  options?: RegisterOptions;
  errors?: FieldErrors;
  name: string;
}
