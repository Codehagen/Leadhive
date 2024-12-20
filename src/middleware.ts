import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/blog(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/pricing(.*)",
  "/help(.*)",
  "/oauth-callback",
  "/privacy(.*)",
  "/property(.*)",
  "/compare(.*)",
  "/sitemap.xml",
  "/robots.txt",
  "/integrations(.*)",
  "/terms(.*)",
  "/au/landscaping(.*)",
  "/au/real-estate(.*)",
  "/au/construction(.*)",
  "/customers(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    // Protect all routes except public ones
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  }
  //   { debug: process.env.NODE_ENV === "development" }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
