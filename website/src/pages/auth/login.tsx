import { valuesToParamsArray } from '@/modules/redirect';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { signIn } from 'next-auth/client';
import { Button, FormFactory, TextField } from '@disclave/ui';
import { useRouter } from 'next/router';

export const loginHref = (redirectPath?: string, redirectPathParamToEncode?: string): string => {
  let path = '/auth/login';

  const params = valuesToParamsArray(redirectPath, redirectPathParamToEncode);
  if (params.length) path += '?' + params.join('&');

  return path;
};

const EmailFormField = {
  email: 'email'
} as const;

interface EmailFormData {
  [EmailFormField.email]: string;
}

const EmailForm = FormFactory<EmailFormData>();

const VerificationFormField = {
  code: 'code'
} as const;

interface VerificationFormData {
  [VerificationFormField.code]: string;
}

const VerificationForm = FormFactory<VerificationFormData>();

const Login = () => {
  // TODO: fixme
  // return <LoginPage />;

  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const emailSignIn = async (data: EmailFormData) => {
    setEmail(data.email);
    // TODO: handle result
    const result = await signIn('email', { email: data.email, redirect: false });
    setEmailSent(true);
  };

  const verify = async (data: VerificationFormData) => {
    const url = `/api/auth/callback/email?email=${encodeURIComponent(
      email
    )}&token=${encodeURIComponent(data.code)}`;

    await router.push(url);

    // // TODO: handle result
    // await fetch(url, {
    //   method: 'POST'
    // });
  };

  if (emailSent) {
    return (
      <div>
        <div>Confirm {email}</div>
        <div>
          <VerificationForm className="flex flex-col space-y-4" onSubmit={verify}>
            <TextField name={VerificationFormField.code} options={{ required: true }} type="text" />
            <Button type="submit">Btn</Button>
          </VerificationForm>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>Login</div>
      <div>
        <EmailForm className="flex flex-col space-y-4" onSubmit={emailSignIn}>
          <TextField name={EmailFormField.email} options={{ required: true }} type="email" />
          <Button type="submit">Btn</Button>
        </EmailForm>
      </div>
    </div>
  );
};
export default Login;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});
