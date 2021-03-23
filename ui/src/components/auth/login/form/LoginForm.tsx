import React from "react";
import { useState } from "react";
import { Button } from "../../../button";
import { useTranslation } from "react-i18next";
import { Input } from "../../../forms/input";

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  registerHref: string;
}

export const LoginForm: React.VFC<LoginFormProps> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation("auth");

  const onLoginClick = async () => {
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
        placeholder={t("login.email.placeholder")}
        type="email"
      />
      <Input
        value={password}
        onChange={setPassword}
        placeholder={t("login.password.placeholder")}
        type="password"
      />
      <div className="flex justify-end space-x-2">
        <Button href={props.registerHref} flat>
          {t("login.button.register")}
        </Button>
        <Button onClick={onLoginClick}>{t("login.button.login")}</Button>
      </div>
    </div>
  );
};
