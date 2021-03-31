import React from "react";
import { Button } from "@/components/button";
import { FormFactory, TextField, FormErrorContainer } from "@/components/forms";
import { useLoading } from "@/hooks";
import { useTranslation } from "@/i18n";

const FormField = {
  email: "email",
  pass: "pass",
} as const;

interface FormData {
  [FormField.email]: string;
  [FormField.pass]: string;
}

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  registerHref: string;
}

const Form = FormFactory<FormData>();

export const LoginForm: React.VFC<LoginFormProps> = (props) => {
  const { t } = useTranslation("auth");
  const [loading, runWithLoading, error] = useLoading(false);

  const onSubmit = async (data: FormData) => {
    await runWithLoading(() => props.onSubmit(data.email, data.pass));
  };

  return (
    <Form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <TextField
        disabled={loading}
        name={FormField.email}
        options={{ required: true }}
        placeholder={t("login.email.placeholder")}
        type="email"
      />
      <TextField
        disabled={loading}
        name={FormField.pass}
        options={{ required: true }}
        placeholder={t("login.password.placeholder")}
        type="password"
      />
      <FormErrorContainer error={error} />
      <div className="flex justify-end space-x-2">
        <Button href={props.registerHref} flat disabled={loading}>
          {t("login.button.register")}
        </Button>
        <Button type="submit" disabled={loading}>
          {t("login.button.login")}
        </Button>
      </div>
    </Form>
  );
};
