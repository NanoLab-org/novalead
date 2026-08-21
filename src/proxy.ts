import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// This Next renamed `middleware` -> `proxy`. next-intl ships its locale routing
// as a middleware handler, so we run it from here (same NextRequest/Response model).
const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  // Skip api, Next internals, and any file with an extension (static assets).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
