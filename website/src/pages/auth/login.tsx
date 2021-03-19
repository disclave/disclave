import { useContext } from 'react';
import { UserContext } from '../../modules/auth/UserContext';
import { login, logout } from '../../modules/auth/auth';
import { LoginFormContainer } from '@webchat/ui';
import { useRouter } from 'next/router';

const QueryParams = {
  redirectPath: 'r',
  redirectPathParamToEncode: 'rpp'
};

export const loginHref = (redirectPath?: string, redirectPathParamToEncode?: string): string => {
  let path = '/auth/login';

  let params = [];
  if (redirectPath) params.push(`${QueryParams.redirectPath}=${redirectPath}`);
  if (redirectPathParamToEncode)
    params.push(`${QueryParams.redirectPathParamToEncode}=${redirectPathParamToEncode}`);

  if (params.length) path += '?' + params.join('&');

  return path;
};

const Login = () => {
  const user = useContext(UserContext);

  // TODO: get profile from global context
  let userProfile = undefined;
  if (user === null) userProfile = null;
  else if (!!user)
    userProfile = {
      uid: user.uid,
      email: user.email,
      name: user.email // TODO: get user name instead of email
    };

  const router = useRouter();
  const query = router.query;
  const redirectPath: string | undefined = query[QueryParams.redirectPath] as string | undefined;
  const redirectPathParamToEncode: string | undefined = query[
    QueryParams.redirectPathParamToEncode
  ] as string | undefined;

  const onLogin = async (email: string, password: string) => {
    await login(email, password);
    if (!redirectPath) return;

    let url = redirectPath;
    if (redirectPathParamToEncode) url += encodeURIComponent(redirectPathParamToEncode);
    await router.push(url);
  };

  const onLogout = async () => {
    await logout();
  };

  return (
    <div className="w-screen h-screen">
      <div className="mx-auto mt-16 max-w-max">
        <LoginFormContainer onLogin={onLogin} onLogout={onLogout} userProfile={userProfile} />
      </div>
    </div>
  );
};
export default Login;
