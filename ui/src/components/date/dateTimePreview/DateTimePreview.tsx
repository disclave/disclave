import React from "react";
import { getLanguage } from "@/i18n";

export interface DateTimePreviewProps {
  className?: string;
  iso: string;
  locales?: string | string[];
  hideTime?: boolean;
}

export const DateTimePreview: React.VFC<DateTimePreviewProps> = ({
  className,
  iso,
  locales,
  hideTime,
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
    <time
      className={className}
      dateTime={iso}
      title={hideTime ? dateStr : dateTimeStr}
    >
      {dateStr} {hideTime ? null : timeStr}
    </time>
  );
};
