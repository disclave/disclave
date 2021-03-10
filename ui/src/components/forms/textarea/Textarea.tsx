import React from "react";

import "./Textarea.css";

export interface TextareaProps {
  cols?: number;
  name?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  resizable?: boolean;
  rows?: number;
  value: string;
}

export const Textarea: React.VFC<TextareaProps> = ({
  cols,
  name,
  onChange,
  placeholder,
  resizable = true,
  rows,
  value,
}) => {
  const onInputValChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event.target.value);
  };

  const classes = ["form-input", resizable ? "resize" : "resize-none"].join(
    " "
  );

  return (
    <textarea
      className={classes}
      cols={cols}
      name={name}
      onChange={onInputValChange}
      placeholder={placeholder}
      rows={rows}
      value={value}
    />
  );
};
