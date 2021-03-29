import React from "react";
import { UserProfileModel } from "../UserProfileModel";
import { Menu } from "../../menu";
import { Button } from "../../button";
import { useTranslation } from "react-i18next";

export interface UserSelfAvatarProps {
  userProfile: UserProfileModel;
  top?: boolean;
  onLogout: () => Promise<void>;
}

export const UserSelfAvatar: React.VFC<UserSelfAvatarProps> = ({
  userProfile,
  top = false,
  onLogout,
}) => {
  const { t } = useTranslation("auth");

  // TODO: get first letter, not first character
  let avatarText = userProfile.name[0];

  const avatar = (
    <button className="rounded-full w-8 h-8 bg-primary flex focus:outline-none">
      <span className="m-auto uppercase text-white text-md font-semibold">
        {avatarText}
      </span>
    </button>
  );

  return (
    <Menu activator={avatar} top={top}>
      <div className="bg-white p-2 my-1 border rounded">
        <div>{userProfile.name}</div>
        <Button onClick={onLogout} flat>
          {t("logout.button")}
        </Button>
      </div>
    </Menu>
  );
};
