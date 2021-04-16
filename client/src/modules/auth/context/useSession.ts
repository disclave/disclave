import { useContext } from "react";
import { SessionContext } from "./SessionContext";
import { SessionModel } from "../models";
import { UserProfileModel } from "../../users";

type UseSession = {
  isLoading: boolean;
  profile: UserProfileModel | null;
  session: SessionModel | null;
};

export const useSession = (): UseSession => {
  const session = useContext<SessionModel | null | undefined>(SessionContext);

  return {
    isLoading: session == undefined,
    profile: session ? session.profile : null,
    session: session ?? null,
  };
};
