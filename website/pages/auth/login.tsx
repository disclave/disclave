import { useContext } from 'react';
import { UserContext } from '../../modules/auth/UserContext';
import { login, logout } from '../../modules/auth/auth';
import { LoginFormContainer } from '@webchat/ui';
import { useRouter } from 'next/router';

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
  const redirect: string | undefined = router.query.redirect as string;

  const onLogin = async (email: string, password: string) => {
    await login(email, password);

    if (redirect) await router.push(redirect);
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
