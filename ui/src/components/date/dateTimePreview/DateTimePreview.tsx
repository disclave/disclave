import React, { useContext } from "react";

import "./DateTimePreview.css";
import { LocaleContext } from "../../../context/localeContext";

export interface DateTimePreviewProps {
  iso: string;
  locales?: string | string[];
}

export const DateTimePreview: React.VFC<DateTimePreviewProps> = ({
  iso,
  locales,
}) => {
  const localeContext = useContext(LocaleContext);
  const dateLocales = locales ?? localeContext.locale;

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
