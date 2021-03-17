import { useContext } from 'react';
import { UserContext } from '../../modules/auth/UserContext';
import { login, logout } from '../../modules/auth/auth';
import { LoginFormContainer } from '@webchat/ui';

const Login = () => {
  const user = useContext(UserContext);

  if (!user) {
    const onLogin = async (email: string, password: string) => {
      await login(email, password);
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
