import cookie from "cookie";

// TODO: rename cookie?
const sessionCookieName = "session";
const sessionCookieDefaultOptions = {
  httpOnly: true,
  secure: true,
  path: "/",
  sameSite: "none" as boolean | "none" | "lax" | "strict",
};

export const buildSessionCookie = (
  content: string,
  expiresIn: number
): string => {
  const options = {
    ...sessionCookieDefaultOptions,
    maxAge: expiresIn,
  };
  return cookie.serialize(sessionCookieName, content, options);
};

export const buildExpiredSessionCookie = (): string => {
  const options = {
    ...sessionCookieDefaultOptions,
    expires: new Date("Thu, 01 Jan 1970 00:00:00 GMT"),
  };
  return cookie.serialize(sessionCookieName, "", options);
};

export const getSessionCookie = (req: any): string | null => {
  const parsed = cookie.parse(req.headers?.cookie || "");
  const sessionCookie = parsed[sessionCookieName];
  if (!sessionCookie) return null;

  return sessionCookie;
};
