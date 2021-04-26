import React from "react";
import { Button } from "@/components/button";
import { FormFactory, TextField, FormErrorContainer } from "@/components/forms";
import { useLoading } from "@/hooks";
import { useTranslation } from "@/i18n";

const FormField = {
  email: "email",
} as const;

interface FormData {
  [FormField.email]: string;
}

export interface LoginEmailFormProps {
  onSubmit: (email: string) => Promise<void>;
}

const Form = FormFactory<FormData>();

export const LoginEmailForm: React.VFC<LoginEmailFormProps> = (props) => {
  const { t } = useTranslation("auth");
  const [loading, runWithLoading, error] = useLoading(false);

  const onSubmit = async (data: FormData) => {
    await runWithLoading(() => props.onSubmit(data.email));
  };

  return (
    <Form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <TextField
        disabled={loading}
        name={FormField.email}
        options={{ required: true }}
        placeholder={t("login.email.email.placeholder")}
        type="email"
      />
      <FormErrorContainer error={error} />
      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={loading}>
          {t("login.email.button.login")}
        </Button>
      </div>
    </Form>
  );
};
