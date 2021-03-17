import React from "react";
import { Button } from "../../button";
import { useTranslation } from "react-i18next";

export interface CommentAddAuthProps {
  onLogin: () => Promise<void>;
}

export const CommentAddAuth: React.VFC<CommentAddAuthProps> = (props) => {
  const { t } = useTranslation("comments");

  return (
    <div className="flex flex-row items-center justify-between">
      <div>{t("add.login.text")}</div>
      <Button onClick={props.onLogin}>{t("add.login.button")}</Button>
    </div>
  );
};
