import { useContext } from 'react';
import { UserContext } from '../../modules/auth/UserContext';
import { login, logout } from '../../modules/auth/auth';
import { LoginFormContainer } from '@webchat/ui';
import { useRouter } from 'next/router';

const Login = () => {
  const user = useContext(UserContext);

  if (!user) {
    const router = useRouter();
    const redirect: string | undefined = router.query.redirect as string;

    const onLogin = async (email: string, password: string) => {
      await login(email, password);

      if (redirect) await router.push(redirect);
    };

    return (
      <div className="w-screen h-screen">
        <div className="mx-auto mt-16 max-w-max">
          <LoginFormContainer onSubmit={onLogin} />
        </div>
      </div>
    );
  }

  // TODO: refactor layout if user logged in
  return (
    <>
      <div>User: {JSON.stringify(user)}</div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};
export default Login;
