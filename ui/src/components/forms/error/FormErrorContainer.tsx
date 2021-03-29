import React from "react";
import { useTranslation } from "@/i18n";

export interface Error {
  code: string;
  message?: string;
}

export interface FormErrorContainerProps {
  error?: Error;
}

export const FormErrorContainer: React.VFC<FormErrorContainerProps> = ({
  error,
}) => {
  if (!error) return null;

  const { t } = useTranslation("form");

  const text = error.message ?? t("unknown error", { code: error.code });

  return <div className="bg-red-400 text-white p-4 rounded">{text}</div>;
};
