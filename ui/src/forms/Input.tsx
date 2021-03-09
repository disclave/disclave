import * as React from "react";

export type InputType = "text" | "email" | "password";

export interface InputProps {
  type?: InputType;
  name?: string;
  value: string;
  onChange?: (value: string) => void;
}

export const Input: React.VFC<InputProps> = ({
  type = "text",
  name,
  value,
  onChange,
}) => {
  const onInputValChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <input type={type} name={name} value={value} onChange={onInputValChange} />
  );
};
