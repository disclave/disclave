import React, { useEffect, useRef, useState } from "react";

import "./Textarea.css";

export interface TextareaProps {
  autoGrow?: boolean;
  className?: string;
  cols?: number;
  maxRows?: number;
  minRows?: number;
  name?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  resizable?: boolean;
  rows?: number;
  value: string;
}

export const Textarea: React.VFC<TextareaProps> = ({
  autoGrow = false,
  className = "",
  cols,
  maxRows = 5,
  minRows = 1,
  name,
  onChange,
  placeholder,
  resizable = true,
  rows,
  value,
}) => {
  const [rowsNum, setRowsNum] = useState(rows);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoGrow) {
      autoGrowResize();
    }
  }, [autoGrow, minRows, rows, value]);

  const onInputValChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (autoGrow) {
      autoGrowResize();
    }

    onChange?.(event.target.value);
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
    <textarea
      ref={textAreaRef}
      className={classes}
      cols={cols}
      name={name}
      onChange={onInputValChange}
      placeholder={placeholder}
      rows={rowsNum}
      value={value}
    />
  );
};
