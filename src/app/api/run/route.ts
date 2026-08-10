import { NextResponse } from "next/server";
import { executeCWithJDoodle } from "@/lib/jdoodle/client";
import {
  MAX_SOURCE_CHARS,
  MAX_STDIN_CHARS,
  type RunRequestBody,
} from "@/lib/jdoodle/types";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseBody(value: unknown): RunRequestBody | null {
  if (!isRecord(value)) return null;

  const source = value.source ?? value.source_code;
  if (typeof source !== "string") return null;

  const stdin =
    value.stdin === undefined
      ? ""
      : typeof value.stdin === "string"
        ? value.stdin
        : null;

  if (stdin === null) return null;

  return { source, stdin };
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const body = parseBody(json);
  if (!body) {
    return NextResponse.json(
      {
        error:
          'Expected JSON like { "source": "<c code>", "stdin": "<optional>" }.',
      },
      { status: 400 },
    );
  }

  if (!body.source.trim()) {
    return NextResponse.json(
      { error: "Source code must not be empty." },
      { status: 400 },
    );
  }

  if (body.source.length > MAX_SOURCE_CHARS) {
    return NextResponse.json(
      {
        error: `Source code exceeds limit of ${MAX_SOURCE_CHARS} characters.`,
      },
      { status: 413 },
    );
  }

  const stdin = body.stdin ?? "";
  if (stdin.length > MAX_STDIN_CHARS) {
    return NextResponse.json(
      { error: `stdin exceeds limit of ${MAX_STDIN_CHARS} characters.` },
      { status: 413 },
    );
  }

  try {
    const result = await executeCWithJDoodle(body.source, stdin);

    return NextResponse.json({
      status: result.status,
      stdout: result.stdout,
      stderr: result.stderr,
      compileOutput: result.compileOutput,
      message: result.message,
      time: result.time,
      memory: result.memory,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to run code.";

    const status = message.includes("Missing required environment variable")
      ? 503
      : 502;

    return NextResponse.json(
      {
        error: "Code execution failed.",
        detail: message,
      },
      { status },
    );
  }
}
