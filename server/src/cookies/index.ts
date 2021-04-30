import { UserCookieContent } from "@/modules/auth";
import cookie from "cookie";
import { IncomingMessage } from "http";

const userCookieName = "DISCLAVE_USER";

const expiredCookieDate = new Date("Thu, 01 Jan 1970 00:00:00 GMT");

export const setUserCookie = (content: UserCookieContent | null, res: any) => {
  let userCookie;

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as boolean | "none" | "lax" | "strict",
    path: "/",
  };

  if (!content) {
    userCookie = cookie.serialize(userCookieName, "", {
      ...options,
      expires: expiredCookieDate,
    });
  } else {
    userCookie = cookie.serialize(
      userCookieName,
      JSON.stringify(content, null, 0),
      {
        ...options,
        maxAge: 60 * 60 * 24 * 30, // 30 days
      }
    );
  }

  res.setHeader("Set-Cookie", userCookie);
};

export const getUserCookie = (
  req: IncomingMessage
): UserCookieContent | null => {
  const parsed = cookie.parse(req.headers.cookie || "");
  const userCookie = parsed[userCookieName];
  if (!userCookie) return null;

  return JSON.parse(userCookie) as UserCookieContent;
};
