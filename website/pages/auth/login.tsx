import { LoginForm } from '../../modules/auth/components/LoginForm';
import { useContext } from 'react';
import { UserContext } from '../../modules/auth/UserContext';
import { login, logout } from '../../modules/auth/auth';

const Login = () => {
  const user = useContext(UserContext);

  if (!user) {
    const onLogin = async (email: string, password: string) => {
      await login(email, password);
    };

    return (
      <div>
        <LoginForm onLogin={onLogin} />
      </div>
    );
  }

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
