import * as React from "react";

interface InputProps {
  type: string;
  name?: string;
  value: string;
  onChange?: (value: string) => void;
}

export const Input: React.VFC<InputProps> = (props) => {
  const onInputValChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(event.target.value);
  };

  return (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={onInputValChange}
    />
  );
};
