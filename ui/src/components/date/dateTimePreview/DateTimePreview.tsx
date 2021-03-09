import React from "react";

import "./DateTimePreview.css";

export interface DateTimePreviewProps {
  iso: string;
}

export const DateTimePreview: React.VFC<DateTimePreviewProps> = ({ iso }) => {
  const date = new Date(iso);
  const str = date.toLocaleString();

  // TODO: modify formatting (remove seconds, etc.)
  // TODO: use HTML date tag
  // TODO: add preview on hover (if not build in HTML)
  return <span>{str}</span>;
};
