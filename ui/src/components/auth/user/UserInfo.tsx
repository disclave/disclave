import React from "react";
import { UserProfileModel } from "../UserProfileModel";
import { Button } from "@/components/button";
import { useTranslation } from "@/i18n";

export interface UserInfoProps {
  userProfile: UserProfileModel;
  onLogout: () => Promise<void>;
}

export const UserInfo: React.VFC<UserInfoProps> = (props) => {
  const { t } = useTranslation("auth");

  const logout = async () => {
    await props.onLogout();
    // TODO: add error handling
  };

  return (
    <div className="flex flex-row items-center">
      <div>{t("user info.hello", { name: props.userProfile.name })}</div>
      <Button onClick={logout} flat>
        {t("logout.button")}
      </Button>
    </div>
  );
};
