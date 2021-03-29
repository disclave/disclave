import React from "react";
import { Input } from "../input";
import { FormInputChildProps } from "../input/Input";
import { useTranslation } from "@/i18n";

export type InputType = "text" | "email" | "password";

export interface TextFieldProps extends FormInputChildProps<HTMLInputElement> {
  disabled?: boolean;
  placeholder?: string;
  type?: InputType;
}

export const TextField: React.VFC<TextFieldProps> = ({
  className,
  disabled,
  name,
  options,
  placeholder,
  type = "text",
}) => {
  const { t } = useTranslation("form");

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
    <Input className={className} name={name} options={options}>
      <input
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </Input>
  );
};
