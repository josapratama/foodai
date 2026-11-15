import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const url = req.nextUrl.clone();
  const isLoginPage = url.pathname === "/login";
  const isRegisterPage = url.pathname === "/register";
  const isDashboardPage = url.pathname.startsWith("/dashboard");
  const isHomePage = url.pathname === "/";

  // Redirect logged-in users away from auth pages
  if (token && (isLoginPage || isRegisterPage || isHomePage)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Protect private dashboard pages
  if (!token && isDashboardPage) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/"],
};
