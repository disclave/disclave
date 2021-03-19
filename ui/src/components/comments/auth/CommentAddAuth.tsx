import React from "react";
import { Button } from "../../button";
import { useTranslation } from "react-i18next";

export interface CommentAddAuthProps {
  loginHref: string;
}

export const CommentAddAuth: React.VFC<CommentAddAuthProps> = (props) => {
  const { t } = useTranslation("comments");

  return (
    <div className="flex flex-row items-center justify-between bg-white py-1">
      <div>{t("add.login.text")}</div>
      <Button href={props.loginHref}>{t("add.login.button")}</Button>
    </div>
  );
};
