import { NextResponse } from "next/server";
import { getAllLessons } from "@/lib/content/lessons";

export async function GET() {
  return NextResponse.json({
    lessons: getAllLessons(),
  });
}
