import React from "react";
import { Button } from "../../../../button";
import { useTranslation } from "react-i18next";
import { FormFactory, TextField } from "../../../../forms";

const nameField = "name";

interface FormData {
  [nameField]: string;
}

export interface RegisterUsernameFormProps {
  userEmail: string;
  onSubmit: (name: string) => Promise<void>;
  onLogout: () => Promise<void>;
}

export const RegisterUsernameForm: React.VFC<RegisterUsernameFormProps> = (
  props
) => {
  const { t } = useTranslation("auth");

  const onSubmit = async (data: FormData) => {
    // TODO: add error handling
    // TODO: verify for valid name characters
    await props.onSubmit(data[nameField]);
  };

  const onLogoutClick = async () => {
    // TODO: add error handling
    await props.onLogout();
  };

  const Form = FormFactory<FormData>();

  return (
    <Form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <div>
        {t("register.username.logged in as", { email: props.userEmail })}
      </div>
      <TextField
        name={nameField}
        placeholder={t("register.username.name.placeholder")}
        type="text"
        options={{ required: true }}
      />
      <div className="flex justify-end space-x-2">
        <Button onClick={onLogoutClick} flat>
          {t("register.username.button.use different account")}
        </Button>
        <Button type="submit">{t("register.username.button.save")}</Button>
      </div>
    </Form>
  );
};
