import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const pathname = request.nextUrl.pathname;

  if (!session) {
    if (pathname === "/backpack" || pathname.startsWith("/backpack/"))
      return NextResponse.redirect(new URL("/login", request.url));
    if (pathname === "/purchase" || pathname.startsWith("/purchase/"))
      return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session) {
    if (pathname === "/login" || pathname.startsWith("/login/"))
      return NextResponse.redirect(new URL("/", request.url));
    if (pathname === "/register" || pathname.startsWith("/register/"))
      return NextResponse.redirect(new URL("/", request.url));
  }
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
    "/register",
  ],
};
