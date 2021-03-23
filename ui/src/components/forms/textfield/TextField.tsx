import React from "react";
import { Input } from "../input";
import { FormInputChildProps } from "../input/Input";

export type InputType = "text" | "email" | "password";

export interface TextFieldProps extends FormInputChildProps<HTMLInputElement> {
  type?: InputType;
  placeholder?: string;
}

export const TextField: React.VFC<TextFieldProps> = ({
  register,
  errors,
  options,
  type = "text",
  name,
  placeholder,
}) => {
  return (
    <Input errors={errors} name={name}>
      <input
        ref={(e) => register?.(e, options)}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </Input>
  );
};
