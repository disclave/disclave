import React from "react";
import { Button } from "@/components/button";
import { FormFactory, TextField, FormErrorContainer } from "@/components/forms";
import { useLoading } from "@/hooks";
import { useTranslation } from "@/i18n";

const FormField = {
  token: "token",
} as const;

interface FormData {
  [FormField.token]: string;
}

export interface LoginVerificationCodeFormProps {
  onSubmit: (token: string) => Promise<void>;
  userEmail: string;
}

const Form = FormFactory<FormData>();

export const LoginVerificationCodeForm: React.VFC<LoginVerificationCodeFormProps> = (
  props
) => {
  const { t } = useTranslation("auth");
  const [loading, runWithLoading, error] = useLoading(false);

  const onSubmit = async (data: FormData) => {
    await runWithLoading(() => props.onSubmit(data.token));
  };

  return (
    <Form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <p className="p-4 text-white text-lg bg-green-500 rounded">
        {t("login.verification code.information", {
          email: props.userEmail,
        })}
      </p>
      <TextField
        disabled={loading}
        name={FormField.token}
        options={{ required: true }}
        placeholder={t("login.verification code.code.placeholder")}
        type="text"
      />
      <FormErrorContainer error={error} />
      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={loading}>
          {t("login.verification code.button.confirm")}
        </Button>
      </div>
    </Form>
  );
};
