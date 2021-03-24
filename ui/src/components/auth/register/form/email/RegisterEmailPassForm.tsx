import React from "react";
import { Button } from "../../../../button";
import { useTranslation } from "react-i18next";
import { FormFactory, TextField } from "../../../../forms";
import { useLoading } from "../../../../../hooks";

const FormField = {
  email: "email",
  pass: "pass",
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
  const [loading, , runWithLoading] = useLoading(false);

  const onSubmit = async (data: FormData) => {
    const [, error] = await runWithLoading(() =>
      props.onSubmit(data.email, data.pass)
    );
    if (error) {
      // TODO: add error handling
      console.error(error);
    }
  };

  const Form = FormFactory<FormData>();

  return (
    <Form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <TextField
        disabled={loading}
        name={FormField.email}
        options={{ required: true }}
        placeholder={t("register.email-password.email.placeholder")}
        type="email"
      />
      <TextField
        disabled={loading}
        name={FormField.pass}
        options={{ required: true }}
        placeholder={t("register.email-password.password.placeholder")}
        type="password"
      />
      <div className="flex justify-end space-x-2">
        <Button href={props.loginHref} flat disabled={loading}>
          {t("register.email-password.button.login")}
        </Button>
        <Button type="submit" disabled={loading}>
          {t("register.email-password.button.register")}
        </Button>
      </div>
    </Form>
  );
};
