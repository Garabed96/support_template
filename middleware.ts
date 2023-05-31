import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#route-handlers

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();
  return res;
}
