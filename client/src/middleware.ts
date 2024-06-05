import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const pathName = request.nextUrl.pathname;
  if (
    pathName.startsWith("/auth/login") ||
    pathName.startsWith("/_next") ||
    pathName.startsWith("/static") ||
    PUBLIC_FILE.test(pathName)
  ) {
    return response;
  }
  console.log("passei");

  const token = request.cookies.get("auth_token");
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  const fetchAuth = await fetch("http://localhost:3333/auth", {
    headers: { Authorization: `Bearer ${token.value}` },
  });
  if (fetchAuth.status == 401) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return response;
}
