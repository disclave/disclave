import React from "react";
import { Input } from "../input";
import { FormInputChildProps } from "../input/Input";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";

export type InputType = "text" | "email" | "password";

export interface TextFieldProps extends FormInputChildProps<HTMLInputElement> {
  disabled?: boolean;
  placeholder?: string;
  type?: InputType;
}

export const TextField: React.VFC<TextFieldProps> = ({
  disabled,
  name,
  options,
  placeholder,
  type = "text",
}) => {
  const { t } = useTranslation("form");
  const { register } = useFormContext();

  if (type == "email") {
    options = {
      pattern: {
        value: /^\S+@\S+$/i,
        message: t("input validation error.email"),
      },
      ...options,
    };
  }

  return (
    <Input name={name}>
      <input
        ref={(e) => register?.(e, options)}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </Input>
  );
};
