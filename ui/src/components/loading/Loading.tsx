import React from "react";
import { useTranslation } from "react-i18next";

export const Loading = () => {
  const { t } = useTranslation("common");

  return <>{t("loading.default")}</>;
};
