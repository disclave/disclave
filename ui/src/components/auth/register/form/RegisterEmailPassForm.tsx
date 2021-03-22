import React from "react";
import { useState } from "react";
import { Button } from "../../../button";
import { useTranslation } from "react-i18next";
import { Input } from "../../../forms/input";

export interface RegisterEmailPassFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export const RegisterEmailPassForm: React.VFC<RegisterEmailPassFormProps> = (
  props
) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation("auth");

  const onButtonClick = async () => {
    // TODO: add error handling
    await props.onSubmit(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col space-y-4">
      <Input
        value={email}
        onChange={setEmail}
        placeholder={t("register.email.placeholder")}
        type="email"
      />
      <Input
        value={password}
        onChange={setPassword}
        placeholder={t("register.password.placeholder")}
        type="password"
      />
      <div className="flex justify-end">
        <Button onClick={onButtonClick}>{t("register.button")}</Button>
      </div>
    </div>
  );
};
