import { withIronSession } from "next-iron-session";

export function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "karen-user-data",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production"
    }
  });
}
