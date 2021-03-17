import React from "react";
import { LoginForm } from "./form";
import { UserProfileModel } from "../UserProfileModel";
import { LoginUserInfo } from "./user";

export interface LoginFormContainerProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  userProfile?: UserProfileModel | null;
}

export const LoginFormContainer: React.VFC<LoginFormContainerProps> = (
  props
) => {
  const Wrapper: React.FC = ({ children }) => (
    <div className="max-w-sm border rounded p-6">{children}</div>
  );

  if (props.userProfile === undefined) return <Wrapper>Loading...</Wrapper>; // TODO: use loading component

  if (props.userProfile === null)
    return (
      <Wrapper>
        <LoginForm onSubmit={props.onLogin} />
      </Wrapper>
    );

  return (
    <Wrapper>
      <LoginUserInfo
        userProfile={props.userProfile}
        onLogout={props.onLogout}
      />
    </Wrapper>
  );
};
