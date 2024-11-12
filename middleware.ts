export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/report/new", "/actant/new", "/relationship/new"],
};
