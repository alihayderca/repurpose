import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that don't require auth
  publicRoutes: [
    "/",
    "/privacy",
    "/terms",
    "/twitter-thread-generator",
    "/linkedin-post-generator",
    "/threads-post-generator",
    "/success",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
