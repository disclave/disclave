import { useRouter } from 'next/router';
import { applyActionCode } from '@disclave/client';
import { useEffect } from 'react';
import { Loading, useLoading } from '@disclave/ui';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const EmailActionHandler = () => {
  const { t } = useTranslation('auth');
  const [loading, runWithLoading, error] = useLoading(true);

  const router = useRouter();
  const mode = router.query.mode as string;
  const actionCode = router.query.oobCode as string;
  const continueUrl = router.query.continueUrl as string | undefined;

  let successText = '';

  const processAction = async () => {
    switch (mode) {
      case 'resetPassword':
        throw 'Reset password not supported yet.';
      case 'recoverEmail':
        throw 'Recover email not supported yet.';
      case 'verifyEmail':
        await verifyEmail();
        break;
      default:
        throw 'Invalid mode.';
    }
  };

  const verifyEmail = async () => {
    await applyActionCode(actionCode);
    await redirect();
    successText = t('email verification.success message');
  };

  const redirect = async () => {
    if (!continueUrl) return;
    await router.push(continueUrl);
  };

  useEffect(() => {
    if (!mode) return;

    runWithLoading(() => processAction());
  }, [mode]);

  return (
    <div className="w-full">
      <div className="mx-auto w-max border rounded mt-6 p-4">
        {loading ? <Loading /> : error ? error : successText}
      </div>
    </div>
  );
};
export default EmailActionHandler;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'auth']))
  }
});
