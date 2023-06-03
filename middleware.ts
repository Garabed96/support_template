import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  req.nextUrl.origin;
  const pathname = req.nextUrl.pathname;
  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const redirectUrl = req.nextUrl.clone();
  const origin = redirectUrl.origin;
  if (!session && req.nextUrl.pathname.match(origin)) {
    let red = (redirectUrl.pathname = "/");
    console.log(redirectUrl.origin);
    // return NextResponse.redirect(redirectUrl.origin);
    // const url = new URL(req.url);
    // url.pathname = "/login";
    // return NextResponse.rewrite(url);
  } else {
    // console.log("session data:", session);
  }

  return res;
}

//   // Check if a logged-in user is trying to access the login page
//   if (
//     req.nextUrl.pathname.startsWith("/login") &&
//     session?.session?.user?.email
//   ) {
//     // If they are, create a URL to redirect them to the home page
//     const redirectUrl = req.nextUrl.clone();
//     redirectUrl.pathname = "/";
//     // Return a response that redirects them to the home page
//     return NextResponse.redirect(redirectUrl);
//   }
//
//   // If a user is authenticated
//   if (session?.session?.user?.email) {
//     /* MFA Logic */
//     // Return the default response, allowing them to proceed
//     return res;
//   }
//
