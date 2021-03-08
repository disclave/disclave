import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { Form } from '../../ui/Form';

export interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    await props.onLogin(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <Form onSubmit={handleLogin}>
      <label>
        Email:
        <Input type="email" name="email" value={email} onChange={setEmail} />
      </label>
      <label>
        Password:
        <Input type="password" name="password" value={password} onChange={setPassword} />
      </label>
      <Input type="submit" value="Login" />
    </Form>
  );
};
