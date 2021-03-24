import React, { useRef } from "react";

import { FormInputChildProps, Input } from "../input/Input";
import { useAutoGrow } from "./useAutoGrow";

export interface TextareaProps
  extends FormInputChildProps<HTMLTextAreaElement> {
  autoGrow?: boolean;
  cols?: number;
  disabled?: boolean;
  maxRows?: number;
  minRows?: number;
  placeholder?: string;
  resizable?: boolean;
  rows?: number;
}

export const TextArea: React.VFC<TextareaProps> = ({
  autoGrow = false,
  className,
  cols,
  disabled,
  maxRows = 5,
  minRows = 1,
  name,
  options,
  placeholder,
  resizable = true,
  rows,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const rowsNum = useAutoGrow(rows, autoGrow, minRows, maxRows, textAreaRef);

  const textareaClasses = !autoGrow && resizable ? "resize" : "resize-none";
  return (
    <Input className={className} name={name} options={options}>
      <textarea
        ref={(e) => (textAreaRef.current = e ?? undefined)}
        className={textareaClasses}
        cols={cols}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        rows={rowsNum}
      />
    </Input>
  );
};
