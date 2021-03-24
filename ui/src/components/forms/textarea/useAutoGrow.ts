import React, { useEffect, useState } from "react";

export const useAutoGrow = (
  defaultRows: number | undefined,
  autoGrow: boolean,
  minRows: number,
  maxRows: number,
  textareaRef: React.RefObject<HTMLTextAreaElement | undefined>
): number | undefined => {
  const [rowsNum, setRowsNum] = useState<number | undefined>(defaultRows);
  const lineHeight = 24; // TODO: get from styles

  const calculateRowsNum = (target: HTMLTextAreaElement) => {
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

  useEffect(() => {
    if (!textareaRef.current || !autoGrow) return;
    calculateRowsNum(textareaRef.current);
  }, [minRows, defaultRows]);

  useEffect(() => {
    const target = textareaRef.current;
    if (!target || !autoGrow) return;

    const onChangeEventName = "input";
    const onChange = () => {
      calculateRowsNum(target);
    };

    target.addEventListener(onChangeEventName, onChange);

    return () => {
      target.removeEventListener(onChangeEventName, onChange);
    };
  }, [textareaRef]);

  return rowsNum;
};
