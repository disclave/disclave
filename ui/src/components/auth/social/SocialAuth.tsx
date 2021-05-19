import { FormErrorContainer } from "@/components/forms";
import { useLoading } from "@/hooks";
import React from "react";
import { FacebookBtn } from "./FacebookBtn";
import { GoogleBtn } from "./GoogleBtn";

export interface SocialAuthProps {
  onAuthFacebook: () => Promise<void>;
  onAuthGoogle: () => Promise<void>;
}

export const SocialAuth: React.VFC<SocialAuthProps> = (props) => {
  const [loading, runWithLoading, error] = useLoading(false);

  const onAuthFacebook = async () => {
    await runWithLoading(props.onAuthFacebook);
  };

  const onAuthGoogle = async () => {
    await runWithLoading(props.onAuthGoogle);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row justify-center space-x-2">
        <GoogleBtn onClick={onAuthGoogle} disabled={loading} />
        <FacebookBtn onClick={onAuthFacebook} disabled={loading} />
      </div>
      <FormErrorContainer error={error} />
    </div>
  );
};
