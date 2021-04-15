import { onAuthStateChanged } from "../../auth";
import { updateUserCookie, login } from "./client";

export const enableUserCookieUpdates = () => {
  onAuthStateChanged(async (user) => {
    await updateUserCookie();
    const idToken = await user.getIdToken();
    await login(idToken);
  });
};

export { login, logout } from "./client";
