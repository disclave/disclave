import React from "react";
import { useTranslation } from "react-i18next";
import { UserProfileModel } from "../../UserProfileModel";
import { Button } from "../../../button";

export interface LoginUserInfoProps {
  userProfile: UserProfileModel;
  onLogout: () => Promise<void>;
}

export const LoginUserInfo: React.VFC<LoginUserInfoProps> = (props) => {
  const { t } = useTranslation("auth");

  const logout = async () => {
    await props.onLogout();
    // TODO: add error handling
  };

  return (
    <div className="flex flex-row items-center">
      <div>{t("login.user info.hello", { name: props.userProfile.name })}</div>
      <Button onClick={logout} flat>
        {t("logout.button")}
      </Button>
    </div>
  );
};
