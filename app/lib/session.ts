"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

interface SessionContent {
  id?: number;
}

export default async function getSession() {
  return getIronSession<SessionContent>(await cookies(), {
    cookieName: "askit-session",
    password: process.env.SESSION_SECRET!,
  });
}
