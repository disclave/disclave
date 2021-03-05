import React, {useState} from "react";
import {Input} from "../../ui/Input";
import {Form} from "../../ui/Form";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setEmail('')
    setPassword('')
  }

  return (
    <Form onSubmit={handleLogin}>
      <label>
        Email:
        <Input type="email" name="email" value={email} onChange={setEmail}/>
      </label>
      <label>
        Password:
        <Input type="password" name="password" value={password} onChange={setPassword}/>
      </label>
      <Input type="submit" value="Login" />
    </Form>
  )
}