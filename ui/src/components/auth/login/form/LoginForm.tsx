import React, { useState } from "react";
import { Button } from "../../../button";
import { useTranslation } from "react-i18next";
import { FormFactory, TextField } from "../../../forms";

const FormField = {
  email: "email" as const,
  pass: "pass" as const,
} as const;

interface FormData {
  [FormField.email]: string;
  [FormField.pass]: string;
}

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  registerHref: string;
}

export const LoginForm: React.VFC<LoginFormProps> = (props) => {
  const { t } = useTranslation("auth");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await props.onSubmit(data.email, data.pass);
    } catch (e) {
      // TODO: add error handling
      console.error(e);
    }
    setLoading(false);
  };

  const Form = FormFactory<FormData>();

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
