import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  if (!session) {
    if (pathname === "/backpack" || pathname.startsWith("/backpack")) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    if (pathname === "/purchase" || pathname.startsWith("/purchase"))
      return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (session) {
    if (pathname === "/login" || pathname.startsWith("/login"))
      return NextResponse.redirect(new URL("/", request.nextUrl));
    if (pathname === "/registration" || pathname.startsWith("/registration"))
      return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: [
    "/backpack",
    "/backpack/:path*",
    "/purchase",
    "/purchase/:path*",
    "/login",
    "/registration",
  ],
};
