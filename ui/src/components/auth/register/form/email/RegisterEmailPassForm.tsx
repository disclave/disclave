import React from "react";
import { Button } from "../../../../button";
import { useTranslation } from "react-i18next";
import { FormFactory, TextField } from "../../../../forms";

const FormField = {
  email: "email" as const,
  pass: "pass" as const,
} as const;

interface FormData {
  [FormField.email]: string;
  [FormField.pass]: string;
}

export interface RegisterEmailPassFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loginHref: string;
}

export const RegisterEmailPassForm: React.VFC<RegisterEmailPassFormProps> = (
  props
) => {
  const { t } = useTranslation("auth");

  const onSubmit = async (data: FormData) => {
    // TODO: add error handling
    await props.onSubmit(data.email, data.pass);
  };

  const Form = FormFactory<FormData>();

  return (
    <Form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <TextField
        name={FormField.email}
        placeholder={t("register.email-password.email.placeholder")}
        type="email"
        options={{ required: true }}
      />
      <TextField
        name={FormField.pass}
        placeholder={t("register.email-password.password.placeholder")}
        type="password"
        options={{ required: true }}
      />
      <div className="flex justify-end space-x-2">
        <Button href={props.loginHref} flat>
          {t("register.email-password.button.login")}
        </Button>
        <Button type="submit">
          {t("register.email-password.button.register")}
        </Button>
      </div>
    </Form>
  );
};
