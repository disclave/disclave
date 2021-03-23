import React from "react";
import { Button } from "../../button";
import { useTranslation } from "react-i18next";

export interface CommentAddAuthProps {
  loginHref: string;
  registerHref: string;
}

export const CommentAddAuth: React.VFC<CommentAddAuthProps> = (props) => {
  const { t } = useTranslation("comments");

  return (
    <div className="flex flex-row items-center justify-between bg-white py-1">
      <div>{t("add.auth.text")}</div>
      <div className="space-x-2">
        <Button href={props.registerHref}>
          {t("add.auth.button.register")}
        </Button>
        <Button href={props.loginHref}>{t("add.auth.button.login")}</Button>
      </div>
    </div>
  );
};
