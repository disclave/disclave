import React from "react";
import { LoginForm } from "./form";

export interface LoginFormContainerProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export const LoginFormContainer: React.VFC<LoginFormContainerProps> = (
  props
) => {
  return (
    <div className="max-w-md">
      <LoginForm onSubmit={props.onSubmit} />
    </div>
  );
};
