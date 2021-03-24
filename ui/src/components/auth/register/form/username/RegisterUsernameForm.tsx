import React from "react";
import { Button } from "../../../../button";
import { useTranslation } from "react-i18next";
import { FormFactory, TextField, FormErrorContainer } from "../../../../forms";
import { useLoading } from "../../../../../hooks";

const FormField = {
  name: "name",
} as const;

interface FormData {
  [FormField.name]: string;
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
  const [loading, runWithLoading, error] = useLoading(false);

  const onSubmit = async (data: FormData) => {
    // TODO: verify for valid name characters
    await runWithLoading(() => props.onSubmit(data.name));
  };

  const onLogoutClick = async () => {
    await runWithLoading(() => props.onLogout());
  };

  const Form = FormFactory<FormData>();

  return (
    <Form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <div>
        {t("register.username.logged in as", { email: props.userEmail })}
      </div>
      <TextField
        disabled={loading}
        name={FormField.name}
        options={{ required: true }}
        placeholder={t("register.username.name.placeholder")}
        type="text"
      />
      <FormErrorContainer error={error} />
      <div className="flex justify-end space-x-2">
        <Button onClick={onLogoutClick} flat disabled={loading}>
          {t("register.username.button.use different account")}
        </Button>
        <Button type="submit" disabled={loading}>
          {t("register.username.button.save")}
        </Button>
      </div>
    </Form>
  );
};
