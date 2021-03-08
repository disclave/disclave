import * as React from "react";

interface InputProps {
  type: string;
  name?: string;
  value: string;
  onChange?: (string) => void;
}

export const Input: React.VFC<InputProps> = (props) => {
  const onInputValChange = (event) => {
    props.onChange(event.target.value);
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
