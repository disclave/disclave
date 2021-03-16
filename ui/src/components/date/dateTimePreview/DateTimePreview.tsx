import React from "react";

import "./DateTimePreview.css";
import { getLanguage } from "../../../locales";

export interface DateTimePreviewProps {
  iso: string;
  locales?: string | string[];
}

export const DateTimePreview: React.VFC<DateTimePreviewProps> = ({
  iso,
  locales,
}) => {
  const dateLocales = locales ?? getLanguage();

  const date = new Date(iso);

  const dateTimeStr = date.toLocaleString(dateLocales);
  const dateStr = date.toLocaleDateString(dateLocales);
  const timeStr = date.toLocaleTimeString(dateLocales, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <time dateTime={iso} title={dateTimeStr}>
      {dateStr} {timeStr}
    </time>
  );
};
