import { UserCookieContent } from "../auth";
import cookie from "cookie";

const sessionCookieName = "session";

// export const setUserCookie = (content: UserCookieContent | null, res: any) => {
//   let userCookie;
//
//   const options = {
//     httpOnly: true,
//     secure: true,
//     sameSite: "none",
//     path: "/",
//   };
//
//   if (!content) {
//     userCookie = cookie.serialize(userCookieName, "", {
//       ...options,
//       expires: new Date("Thu, 01 Jan 1970 00:00:00 GMT"),
//     });
//   } else {
//     userCookie = cookie.serialize(
//       userCookieName,
//       JSON.stringify(content, null, 0),
//       {
//         ...options,
//         maxAge: 60 * 60 * 24 * 7, // 1 week
//       }
//     );
//   }
//
//   res.setHeader("Set-Cookie", userCookie);
// };

// TODO: remove
// export const getUserCookie = (req: any): UserCookieContent | null => {
//   const parsed = cookie.parse(req.headers?.cookie || "");
//   const userCookie = parsed[userCookieName];
//   if (!userCookie) return null;
//
//   return JSON.parse(userCookie) as UserCookieContent;
// };

export const getSessionCookie = (req: any): string | null => {
  const parsed = cookie.parse(req.headers?.cookie || "");
  const sessionCookie = parsed[sessionCookieName];
  if (!sessionCookie) return null;

  return sessionCookie;
};
