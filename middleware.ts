import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicRoutes: Routes = {
  "/": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();

  const exists = publicRoutes[request.nextUrl.pathname];

  if (!session.id && !exists) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (session.id && exists) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
