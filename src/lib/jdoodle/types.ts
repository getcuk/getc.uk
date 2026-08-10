export const MAX_SOURCE_CHARS = 64_000;
export const MAX_STDIN_CHARS = 16_000;

/** Default: C / GCC 5.3.0 — override with JDOODLE_VERSION_INDEX */
export const JDOODLE_C_LANGUAGE = "c";
export const JDOODLE_C_VERSION_INDEX = "0";

export type RunRequestBody = {
  source: string;
  stdin?: string;
};

/** Normalized shape returned by /api/run to the frontend. */
export type RunResult = {
  status: {
    id: number;
    description: string;
  };
  stdout: string;
  stderr: string;
  compileOutput: string;
  message: string;
  time: string | null;
  memory: number | null;
};

export type JDoodleExecutePayload = {
  clientId: string;
  clientSecret: string;
  script: string;
  language: string;
  versionIndex: string;
  stdin: string;
  compileOnly: boolean;
};

export type JDoodleExecuteResponse = {
  output?: string | null;
  error?: string | null;
  statusCode?: number;
  memory?: string | number | null;
  cpuTime?: string | number | null;
  compilationStatus?: number | null;
  isExecutionSuccess?: boolean;
  isCompiled?: boolean;
  projectKey?: string | null;
};
