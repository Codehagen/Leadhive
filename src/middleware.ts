import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/blog(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/pricing(.*)",
  "/help(.*)",
  "/oauth-callback",
  "/contact(.*)",
  "/privacy(.*)",
  "/property(.*)",
  "/legal(.*)",
  "/changelog(.*)",
  "/compare(.*)",
  "/sitemap.xml",
  "/robots.txt",
  "/integrations(.*)",
  "/terms(.*)",
  "/au/landscaping(.*)",
  "/au/loans(.*)",
  "/au/real-estate(.*)",
  "/au/construction(.*)",
  "/au/electrical(.*)",
  "/au/healthcare(.*)",
  "/no/landscaping(.*)",
  "/no/loans(.*)",
  "/no/real-estate(.*)",
  "/no/construction(.*)",
  "/no/electrical(.*)",
  "/no/healthcare(.*)",
  "/no/eiendomsmegler(.*)",
  "/no/boliglan(.*)",
  "/no/forsikring(.*)",
  "/no/strom(.*)",
  "/no/varmepumpe(.*)",
  "/no/advokat(.*)",
  "/no/mobilabonnement(.*)",
  "/customers(.*)",
  "/no",
]);

// Middleware function to handle locale detection and redirection
async function localeMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip locale detection for API routes and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Skip if already on a localized route
  if (pathname.startsWith("/no") || pathname.startsWith("/au")) {
    return NextResponse.next();
  }

  // Get country from Geolocation API
  const country = request.geo?.country || "";

  // Redirect to Norwegian version if user is from Norway
  if (country === "NO") {
    const url = request.nextUrl.clone();
    url.pathname = `/no${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Combined middleware that handles both locale and authentication
export default clerkMiddleware(async (auth, req) => {
  const request = req as unknown as NextRequest;

  // First handle locale detection
  const localeResponse = await localeMiddleware(request);
  if (localeResponse.status !== 200) {
    return localeResponse;
  }

  // Then handle authentication
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
