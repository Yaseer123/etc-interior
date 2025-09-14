import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isAuthRoute = req.nextUrl.pathname.startsWith("/admin/signin");

    console.log(`Middleware: ${req.nextUrl.pathname}`, {
      hasToken: !!token,
      tokenRole: token?.role,
      tokenEmail: token?.email,
    });

    // If accessing admin routes without authentication, redirect to signin
    if (isAdminRoute && !token && !isAuthRoute) {
      console.log("Middleware: No token, redirecting to signin");
      return NextResponse.redirect(new URL("/admin/signin", req.url));
    }

    // If accessing admin routes and not admin role, redirect to signin
    if (isAdminRoute && token && token.role !== "ADMIN" && !isAuthRoute) {
      console.log(
        `Middleware: User ${token.email} has role ${token.role}, redirecting to signin`
      );
      return NextResponse.redirect(new URL("/admin/signin", req.url));
    }

    // If already signed in and trying to access signin page, redirect to admin dashboard
    if (isAuthRoute && token && token.role === "ADMIN") {
      console.log(
        `Middleware: User ${token.email} is ADMIN, redirecting to dashboard`
      );
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    console.log("Middleware: Allowing request to proceed");
    return NextResponse.next();
  },
  {
    callbacks: {
      // Allow access to the admin signin page without a token to prevent redirect loops
      authorized: async ({ req, token }) => {
        const pathname = req.nextUrl.pathname;
        const isAuthRoute = pathname.startsWith("/admin/signin");
        const isAdminRoute = pathname.startsWith("/admin");

        // Get the token directly using getToken for more reliable access
        const jwtToken = await getToken({
          req,
          secret: process.env.AUTH_SECRET,
        });

        console.log(`Authorized callback: ${pathname}`, {
          hasToken: !!jwtToken,
          tokenRole: jwtToken?.role,
          tokenEmail: jwtToken?.email,
        });

        // Always allow access to signin page
        if (isAuthRoute) return true;

        // For admin routes, require token and ADMIN role
        if (isAdminRoute) {
          if (!jwtToken) {
            console.log("Authorized: No token for admin route");
            return false;
          }
          if (jwtToken.role !== "ADMIN") {
            console.log(
              `Authorized: User ${jwtToken.email} has role ${jwtToken.role}, not ADMIN`
            );
            return false;
          }
          console.log(
            `Authorized: User ${jwtToken.email} is ADMIN, allowing access`
          );
          return true;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
