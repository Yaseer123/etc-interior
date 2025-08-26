import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isAuthRoute = req.nextUrl.pathname.startsWith("/admin/signin");

    // If accessing admin routes without authentication, redirect to signin
    if (isAdminRoute && !token && !isAuthRoute) {
      return NextResponse.redirect(new URL("/admin/signin", req.url));
    }

    // If accessing admin routes and not admin role, redirect to signin
    if (isAdminRoute && token && token.role !== "ADMIN" && !isAuthRoute) {
      return NextResponse.redirect(new URL("/admin/signin", req.url));
    }

    // If already signed in and trying to access signin page, redirect to admin dashboard
    if (isAuthRoute && token && token.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Allow access to the admin signin page without a token to prevent redirect loops
      authorized: ({ req, token }) => {
        const pathname = req.nextUrl.pathname;
        const isAuthRoute = pathname.startsWith("/admin/signin");
        if (isAuthRoute) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
