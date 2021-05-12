import React, { useEffect } from 'react';
import { FormErrorContainer, Loading, useLoading } from '@disclave/ui';
import { Layout } from '@/modules/layout';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { applyActionCode } from '@disclave/client';
import {
  EAHInvalidMode,
  EAHMissingActionCode,
  EAHRecoverEmailNotSupported,
  EAHResetPasswordNotSupported
} from '@/modules/layout/auth/email-action-handler/exceptions';

export const EmailActionHandlerPage: React.VFC = () => {
  const { t } = useTranslation('auth');
  const [loading, runWithLoading, error] = useLoading(true);

  const router = useRouter();
  const mode = router.query.mode as string | undefined;
  const actionCode = router.query.oobCode as string | undefined;
  const continueUrl = router.query.continueUrl as string | undefined;

  let successText = '';

  const processAction = async () => {
    switch (mode) {
      case 'resetPassword':
        throw EAHResetPasswordNotSupported('Reset password not supported yet.');
      case 'recoverEmail':
        throw EAHRecoverEmailNotSupported('Recover email not supported yet.');
      case 'verifyEmail':
        await verifyEmail();
        break;
      default:
        throw EAHInvalidMode('Invalid mode.');
    }
  };

  const verifyEmail = async () => {
    if (!actionCode) throw EAHMissingActionCode('Missing required action code parameter.');

    await applyActionCode(actionCode);
    await redirect();
    successText = t('email verification.success message');
  };

  const redirect = async () => {
    if (!continueUrl) return;
    window.location.assign(continueUrl);
  };

  useEffect(() => {
    if (!mode) return;

    runWithLoading(() => processAction());
  }, [mode]);

  return (
    <Layout>
      <section className="container mx-auto my-8 lg:mt-24 max-w-max">
        <div className="mx-auto w-max border rounded mt-6 p-4">
          {loading ? <Loading /> : error ? <FormErrorContainer error={error} /> : successText}
        </div>
      </section>
    </Layout>
  );
};
