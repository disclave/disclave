import React from "react";
import { Button } from "@/components/button";
import { openPopupWindow } from "@/popups";
import { useTranslation } from "@/i18n";

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
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 bg-white py-1">
      <div>{t("add.auth.text")}</div>
      <div className="flex flex-row space-x-2">
        <Button href={loginButtonHref} onClick={loginButtonClick} outlined>
          {t("add.auth.button.login")}
        </Button>
        <Button href={registerButtonHref} onClick={registerButtonClick}>
          {t("add.auth.button.register")}
        </Button>
      </div>
    </div>
  );
};
