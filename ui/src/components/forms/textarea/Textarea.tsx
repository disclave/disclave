import React, { useEffect, useRef, useState } from "react";

import { FormInputChildProps, Input } from "../input/Input";

export interface TextareaProps
  extends FormInputChildProps<HTMLTextAreaElement> {
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
    !autoGrow && resizable ? "resize" : "resize-none",
    className,
  ].join(" ");

  return (
    <Input errors={errors} name={name}>
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
    </Input>
  );
};
