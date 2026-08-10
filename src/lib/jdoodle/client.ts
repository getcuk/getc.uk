import {
  JDOODLE_C_LANGUAGE,
  JDOODLE_C_VERSION_INDEX,
  type JDoodleExecutePayload,
  type JDoodleExecuteResponse,
  type RunResult,
} from "@/lib/jdoodle/types";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function jdoodleExecuteUrl(): string {
  return (
    process.env.JDOODLE_API_URL?.replace(/\/$/, "") ||
    "https://api.jdoodle.com/v1/execute"
  );
}

function jdoodleLanguage(): string {
  return process.env.JDOODLE_LANGUAGE?.trim() || JDOODLE_C_LANGUAGE;
}

function jdoodleVersionIndex(): string {
  return process.env.JDOODLE_VERSION_INDEX?.trim() || JDOODLE_C_VERSION_INDEX;
}

export function buildJDoodlePayload(
  source: string,
  stdin = "",
): JDoodleExecutePayload {
  return {
    clientId: requireEnv("JDOODLE_CLIENT_ID"),
    clientSecret: requireEnv("JDOODLE_CLIENT_SECRET"),
    script: source,
    language: jdoodleLanguage(),
    versionIndex: jdoodleVersionIndex(),
    stdin,
    compileOnly: false,
  };
}

function parseMemory(value: string | number | null | undefined): number | null {
  if (value == null || value === "") return null;
  const n = typeof value === "number" ? value : Number.parseInt(String(value), 10);
  return Number.isFinite(n) ? n : null;
}

function parseTime(value: string | number | null | undefined): string | null {
  if (value == null || value === "") return null;
  return String(value);
}

function looksLikeCompileError(text: string): boolean {
  return /error:|fatal error:|undefined reference|collect2:|ld returned/i.test(
    text,
  );
}

export function mapJDoodleResponse(data: JDoodleExecuteResponse): RunResult {
  const output = (data.output ?? "").toString();
  const apiError = (data.error ?? "").toString();
  const compiled = data.isCompiled !== false && !looksLikeCompileError(output);
  const success = data.isExecutionSuccess === true && compiled;

  let status: RunResult["status"];
  if (!compiled) {
    status = { id: 6, description: "Compilation Error" };
  } else if (success) {
    status = { id: 3, description: "Accepted" };
  } else if (data.statusCode && data.statusCode !== 200) {
    status = {
      id: data.statusCode,
      description: "Execution Failed",
    };
  } else {
    status = { id: 11, description: "Runtime Error" };
  }

  return {
    status,
    stdout: success ? output : "",
    stderr: apiError || (!success && compiled ? output : ""),
    compileOutput: !compiled ? output || apiError : "",
    message: "",
    time: parseTime(data.cpuTime),
    memory: parseMemory(data.memory),
  };
}

/**
 * Execute C source via JDoodle Compiler API.
 * Credentials stay server-side only.
 */
export async function executeCWithJDoodle(
  source: string,
  stdin = "",
): Promise<RunResult> {
  const payload = buildJDoodlePayload(source, stdin);

  const response = await fetch(jdoodleExecuteUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const rawText = await response.text();
  let data: JDoodleExecuteResponse;
  try {
    data = JSON.parse(rawText) as JDoodleExecuteResponse;
  } catch {
    throw new Error(
      `JDoodle returned non-JSON (${response.status}): ${rawText.slice(0, 300)}`,
    );
  }

  if (!response.ok) {
    throw new Error(
      `JDoodle execute failed (${response.status}): ${rawText.slice(0, 300)}`,
    );
  }

  // Credit / auth style errors sometimes still return HTTP 200 with an error string.
  if (
    typeof data.error === "string" &&
    data.error &&
    data.output == null &&
    data.isExecutionSuccess == null
  ) {
    throw new Error(`JDoodle error: ${data.error}`);
  }

  return mapJDoodleResponse(data);
}
