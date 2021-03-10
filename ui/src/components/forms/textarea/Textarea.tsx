import React from "react";

import "./Textarea.css";

export interface TextareaProps {
  name?: string;
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Textarea: React.VFC<TextareaProps> = (props) => {
  const onInputValChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange?.(event.target.value);
  };

  const classes = `form-input`;

  return (
    <textarea
      className={classes}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={onInputValChange}
    />
  );
};
