import React from "react";
import { useState } from "react";
import { Button } from "../../../../button";
import { useTranslation } from "react-i18next";
import { Input } from "../../../../forms/input";

export interface RegisterUsernameFormProps {
  onSubmit: (name: string) => Promise<void>;
}

export const RegisterUsernameForm: React.VFC<RegisterUsernameFormProps> = (
  props
) => {
  const [name, setName] = useState("");
  const { t } = useTranslation("auth");

  const onButtonClick = async () => {
    // TODO: add error handling
    // TODO: verify for valid name characters
    await props.onSubmit(name);

    setName("");
  };

  return (
    <div className="flex flex-col space-y-4">
      <Input
        value={name}
        onChange={setName}
        placeholder={t("register.username.name.placeholder")}
        type="email"
      />
      <div className="flex justify-end">
        <Button onClick={onButtonClick}>{t("register.username.button")}</Button>
      </div>
    </div>
  );
};
