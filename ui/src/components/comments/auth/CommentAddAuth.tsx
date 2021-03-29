import React from "react";
import { Button } from "../../button";
import { openPopupWindow } from "../../../popups";
import { useTranslation } from "../../../i18n";

export interface CommentAddAuthProps {
  iframe?: boolean;
  loginHref: string;
  registerHref: string;
}

export const CommentAddAuth: React.VFC<CommentAddAuthProps> = (props) => {
  const { t } = useTranslation("comments");

  const registerButtonHref = !props.iframe ? props.registerHref : undefined;
  const loginButtonHref = !props.iframe ? props.loginHref : undefined;

  const registerButtonClick = props.iframe
    ? () => openPopupWindow(props.registerHref, "Disclave_register")
    : undefined;

  const loginButtonClick = props.iframe
    ? () => openPopupWindow(props.loginHref, "Disclave_login")
    : undefined;

  return (
    <div className="flex flex-row items-center justify-between bg-white py-1">
      <div>{t("add.auth.text")}</div>
      <div className="space-x-2">
        <Button href={registerButtonHref} onClick={registerButtonClick}>
          {t("add.auth.button.register")}
        </Button>
        <Button href={loginButtonHref} onClick={loginButtonClick}>
          {t("add.auth.button.login")}
        </Button>
      </div>
    </div>
  );
};
