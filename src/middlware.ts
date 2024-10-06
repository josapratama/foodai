import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const url = req.nextUrl.clone();
  const isLoginPage = url.pathname === "/login";
  const isRegisterPage = url.pathname === "/register";
  const isDashboardPage = url.pathname.startsWith("/dashboard");
  const isHomePage = url.pathname === "/";

  if (token && (isLoginPage || isRegisterPage || isHomePage)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (!token && isDashboardPage) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token) {
    try {
      verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/"],
};
