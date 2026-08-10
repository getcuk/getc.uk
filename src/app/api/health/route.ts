import { NextResponse } from "next/server";
import { SITE_NAME } from "@/lib/constants";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: SITE_NAME,
  });
}
