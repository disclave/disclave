import React from "react";
import { useTranslation } from "@/i18n";

export const Loading = () => {
  const { t } = useTranslation("common");

  return <>{t("loading.default")}</>;
};
