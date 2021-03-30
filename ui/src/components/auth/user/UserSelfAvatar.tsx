import React from "react";
import { Menu } from "@/components/menu";
import { Button } from "@/components/button";
import { useTranslation } from "@/i18n";

export interface UserSelfAvatarProps {
  userProfile: { name: string };
  top?: boolean;
  left?: boolean;
  onLogout: () => Promise<void>;
}

export const UserSelfAvatar: React.VFC<UserSelfAvatarProps> = ({
  userProfile,
  top = false,
  left = false,
  onLogout,
}) => {
  const { t } = useTranslation("auth");

  // TODO: get first letter, not first character
  let avatarText = userProfile.name[0];

  const avatar = (
    <button className="rounded-full w-8 h-8 bg-primary flex focus:outline-none z-0">
      <span className="m-auto uppercase text-white text-md font-semibold">
        {avatarText}
      </span>
    </button>
  );

  return (
    <Menu activator={avatar} top={top} left={left}>
      <div className="bg-white p-2 my-1 border rounded">
        <div>{userProfile.name}</div>
        <Button onClick={onLogout} flat>
          {t("logout.button")}
        </Button>
      </div>
    </Menu>
  );
};
