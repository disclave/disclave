import { useTranslation, Trans } from "@/i18n";
import React from "react";

export interface PolicyInfoProps {
  usePolicyHref: string;
  privacyPolicyHref: string;
}

export const PolicyInfo: React.VFC<PolicyInfoProps> = ({
  privacyPolicyHref,
  usePolicyHref,
}) => {
  const { t } = useTranslation("auth");

  const PolicyLink: React.FC<{ href: string }> = ({ children, href }) => (
    <a href={href} target="_blank" className="text-primary hover:underline">
      {children}
    </a>
  );

  return (
    <div className="text-sm pb-4">
      <Trans t={t} i18nKey="legal.accept policies">
        agree to
        <PolicyLink href={usePolicyHref}>
          use
        </PolicyLink>
        and
        <PolicyLink href={privacyPolicyHref}>
          privacy
        </PolicyLink>
      </Trans>
    </div>
  );
};
