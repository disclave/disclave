import React, { useEffect, useRef, useState } from "react";

import "./Textarea.css";
import { FormInputProps } from "../FormInputProps";
import { FieldError } from "react-hook-form";

export interface TextareaProps extends FormInputProps<HTMLTextAreaElement> {
  autoGrow?: boolean;
  className?: string;
  cols?: number;
  maxRows?: number;
  minRows?: number;
  placeholder?: string;
  resizable?: boolean;
  rows?: number;
}

export const Textarea: React.VFC<TextareaProps> = ({
  register,
  errors,
  options,
  autoGrow = false,
  className = "",
  cols,
  maxRows = 5,
  minRows = 1,
  name,
  placeholder,
  resizable = true,
  rows,
}) => {
  const [rowsNum, setRowsNum] = useState(rows);
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const error: FieldError | undefined = errors ? errors[name] : undefined;
  const errorMessage = error ? error.message || error.type : undefined; // TODO: use translations for type

  useEffect(() => {
    if (autoGrow) {
      autoGrowResize();
    }
  }, [autoGrow, minRows, rows]);

  const onInputValChange = () => {
    if (autoGrow) {
      autoGrowResize();
    }
  };

  const autoGrowResize = () => {
    const target = textAreaRef.current;
    if (!target) return;

    const lineHeight = 24; // TODO: get from styles
    const prevRows = target.rows;
    target.rows = minRows;

    const currentRows = ~~(target.scrollHeight / lineHeight);
    if (currentRows === prevRows) {
      target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      target.rows = maxRows;
      target.scrollTop = target.scrollHeight;
    }

    setRowsNum(Math.min(currentRows, maxRows));
  };

  const classes = [
    "form-input",
    !autoGrow && resizable ? "resize" : "resize-none",
    className,
  ].join(" ");

  return (
    <div className="flex flex-col">
      <textarea
        ref={(e) => {
          register?.(e, options);
          textAreaRef.current = e ?? undefined;
        }}
        className={classes}
        cols={cols}
        name={name}
        onChange={onInputValChange}
        placeholder={placeholder}
        rows={rowsNum}
      />
      {errorMessage}
    </div>
  );
};
