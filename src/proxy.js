import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const pathname = request.nextUrl.pathname;
  if (
    !session &&
    (pathname.startsWith("/backpack") || pathname.startsWith("/purchase"))
  )
    return NextResponse.redirect(new URL("/login", request.url));
  if (
    session &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  )
    return NextResponse.redirect(new URL("/", request.url));
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/backpack/:path*", "/purchase/:path*", "/login", "/register"],
};
