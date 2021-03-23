import React from "react";
import { useState } from "react";
import { Button } from "../../../../button";
import { useTranslation } from "react-i18next";
import { Input } from "../../../../forms/input";

export interface RegisterUsernameFormProps {
  userEmail: string;
  onSubmit: (name: string) => Promise<void>;
  onLogout: () => Promise<void>;
}

export const RegisterUsernameForm: React.VFC<RegisterUsernameFormProps> = (
  props
) => {
  const [name, setName] = useState("");
  const { t } = useTranslation("auth");

  const onSaveClick = async () => {
    // TODO: add error handling
    // TODO: verify for valid name characters
    await props.onSubmit(name);

    setName("");
  };

  const onLogoutClick = async () => {
    // TODO: add error handling
    await props.onLogout();
  };

  return (
    <div className="flex flex-col space-y-4">
      <div>
        {t("register.username.logged in as", { email: props.userEmail })}
      </div>
      <Input
        value={name}
        onChange={setName}
        placeholder={t("register.username.name.placeholder")}
        type="text"
      />
      <div className="flex justify-end space-x-2">
        <Button onClick={onLogoutClick} flat>
          {t("register.username.button.use different account")}
        </Button>
        <Button onClick={onSaveClick}>
          {t("register.username.button.save")}
        </Button>
      </div>
    </div>
  );
};
