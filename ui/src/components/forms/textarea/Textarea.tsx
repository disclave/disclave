import React, { useEffect, useState } from "react";

import "./Textarea.css";

export interface TextareaProps {
  autoGrow?: boolean;
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

  useEffect(() => {
    if (autoGrow && !rows) {
      setRowsNum(minRows);
    }
  }, [autoGrow, minRows, rows]);

  const onInputValChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (autoGrow) {
      const lineHeight = 24; // TODO: get from styles
      const prevRows = event.target.rows;
      event.target.rows = minRows;

      const currentRows = ~~(event.target.scrollHeight / lineHeight);
      if (currentRows === prevRows) {
        event.target.rows = currentRows;
      }

      if (currentRows >= maxRows) {
        event.target.rows = maxRows;
        event.target.scrollTop = event.target.scrollHeight;
      }

      setRowsNum(Math.min(currentRows, maxRows));
    }

    onChange?.(event.target.value);
  };

  const classes = [
    "form-input",
    !autoGrow && resizable ? "resize" : "resize-none",
  ].join(" ");

  return (
    <textarea
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
