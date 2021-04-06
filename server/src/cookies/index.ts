import { UserCookieContent } from "../auth";

const userCookieName = "DISCLAVE_USER";

export const setUserCookie = (content: UserCookieContent | null, res: any) => {
  if (!content) {
    res.cookies.set(userCookieName, { maxAge: 0 });
  } else {
    res.cookie(userCookieName, JSON.stringify(content), {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  }
};

export const getUserCookie = (req: any): UserCookieContent | null => {
  const cookie = req.cookie(userCookieName);
  if (!cookie) return null;

  return JSON.parse(cookie) as UserCookieContent;
};
