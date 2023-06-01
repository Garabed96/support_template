import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#route-handlers

// middleware.ts runs immediately before each route is rendered. Next.js only provides read access to cookies in
// Server Components, therefore, Middleware is used to refresh the user's session before loading Server Component routes
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
}
