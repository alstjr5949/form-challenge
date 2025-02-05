import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req);

  return NextResponse.json({ message: "success" });
}

export async function POST(req: NextRequest) {
  const { email, id, password } = await req.json();

  return NextResponse.json({ email, id, password });
}
