import React from "react";

import "./DateTimePreview.css";

export interface DateTimePreviewProps {
  iso: string;
  locales?: string | string[];
}

export const DateTimePreview: React.VFC<DateTimePreviewProps> = ({
  iso,
  locales,
}) => {
  const date = new Date(iso);

  const dateTimeStr = date.toLocaleString(locales);
  const dateStr = date.toLocaleDateString(locales);
  const timeStr = date.toLocaleTimeString(locales, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <time dateTime={iso} title={dateTimeStr}>
      {dateStr} {timeStr}
    </time>
  );
};
