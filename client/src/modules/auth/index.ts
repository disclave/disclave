import { onAuthStateChanged } from "../../auth";
import { updateUserCookie } from "./client";

export const enableUserCookieUpdates = () => {
  onAuthStateChanged(async () => {
    await updateUserCookie();
  });
};

export { login, logout } from "./client";
