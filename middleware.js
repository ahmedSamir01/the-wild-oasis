import { auth } from "./app/_lib/auth";

/*
 On a request to /account, Next.js calls auth(). That function checks the session, runs authorized, and uses the boolean to allow the page or redirect to sign-in.
*/
export const middleware = auth;

export const config = {
  matcher: "/account",
};
