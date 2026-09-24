import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, decodeSession } from "@/lib/session-token";
import { ADMIN_APP_PATH } from "@/lib/admin-path";

const PUBLIC_PATHS = ["/login", "/register"];
const PUBLIC_API = ["/api/auth/login", "/api/auth/register", "/api/auth/logout"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/uploads") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Old /admin path — hide existence of the console
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const isPublicPage = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  const isPublicApi = PUBLIC_API.some((p) => pathname === p);
  const isApi = pathname.startsWith("/api/");
  const isAdminApp =
    pathname === ADMIN_APP_PATH || pathname.startsWith(`${ADMIN_APP_PATH}/`);

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = await decodeSession(token);

  if (pathname === "/") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const dest = session.role === "ADMIN" ? ADMIN_APP_PATH : "/mon-dossier";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (isPublicApi) {
    return NextResponse.next();
  }

  if (isPublicPage) {
    if (session) {
      const dest = session.role === "ADMIN" ? ADMIN_APP_PATH : "/mon-dossier";
      return NextResponse.redirect(new URL(dest, request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    if (isApi) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  if (isAdminApp || pathname.startsWith("/api/admin")) {
    if (session.role !== "ADMIN") {
      if (isApi) {
        return NextResponse.json({ error: "Accès admin requis." }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/mon-dossier", request.url));
    }
  }

  if (pathname.startsWith("/mon-dossier") && session.role === "ADMIN") {
    return NextResponse.redirect(new URL(ADMIN_APP_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/mon-dossier",
    "/mon-dossier/:path*",
    "/admin",
    "/admin/:path*",
    "/ops-revue-eef-k7m2",
    "/ops-revue-eef-k7m2/:path*",
    "/api/:path*",
  ],
};
