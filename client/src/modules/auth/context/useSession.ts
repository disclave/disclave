import { useContext } from "react";
import { SessionContext } from "./SessionContext";
import { SessionModel } from "../models";
import { UserProfileModel } from "../../users";

type Logout = () => Promise<void>;
type UseSession = {
  isLoading: boolean;
  profile: UserProfileModel | null;
  session: SessionModel | null;
  logout: Logout;
};

export const useSession = (): UseSession => {
  const { session, logout } = useContext(SessionContext);

  return {
    isLoading: session == undefined,
    profile: session ? session.profile : null,
    session: session ?? null,
    logout: logout,
  };
};
