import React from "react";
import { useLoading } from "@/hooks";
import { useTranslation } from "@/i18n";

export interface EmailVerificationFormProps {
  onSendEmailVerification: () => Promise<void>;
  onLogout: () => Promise<void>;
}

// TODO: add stories
export const EmailVerificationForm: React.VFC<EmailVerificationFormProps> = (
  props
) => {
  const { t } = useTranslation("auth");
  const [loading, runWithLoading, error] = useLoading(false);

  const onSubmit = async () => {
    // // TODO: verify for valid name characters
    // await runWithLoading(() => props.onSubmit(data.name));
  };

  const onLogoutClick = async () => {
    await runWithLoading(() => props.onLogout());
  };

  // TODO: finish HTML
  return (
    <div>
      <p>Display info to check email</p>
      <p>Allow to send again (button)</p>
      <p>Allow to logout (button)</p>
    </div>
  );
};
