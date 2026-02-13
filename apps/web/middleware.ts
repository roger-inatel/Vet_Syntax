import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isAuthRoute = request.nextUrl.pathname.startsWith("/login");
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
