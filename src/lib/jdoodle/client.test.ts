import { afterEach, describe, expect, it } from "vitest";
import { buildJDoodlePayload, mapJDoodleResponse } from "@/lib/jdoodle/client";

describe("mapJDoodleResponse", () => {
  it("maps a successful run", () => {
    const result = mapJDoodleResponse({
      output: "hello, world\n",
      isCompiled: true,
      isExecutionSuccess: true,
      cpuTime: "0.01",
      memory: "2048",
    });
    expect(result.status).toEqual({ id: 3, description: "Accepted" });
    expect(result.stdout).toBe("hello, world\n");
    expect(result.stderr).toBe("");
    expect(result.compileOutput).toBe("");
    expect(result.time).toBe("0.01");
    expect(result.memory).toBe(2048);
  });

  it("maps compiler errors from the output text", () => {
    const result = mapJDoodleResponse({
      output: "main.c:3:1: error: expected ';' before '}'",
      isCompiled: true,
      isExecutionSuccess: false,
    });
    expect(result.status.description).toBe("Compilation Error");
    expect(result.compileOutput).toMatch(/error:/);
    expect(result.stdout).toBe("");
  });

  it("maps runtime failures when compilation succeeded", () => {
    const result = mapJDoodleResponse({
      output: "Segmentation fault",
      isCompiled: true,
      isExecutionSuccess: false,
    });
    expect(result.status.description).toBe("Runtime Error");
    expect(result.stderr).toBe("Segmentation fault");
    expect(result.stdout).toBe("");
  });
});

describe("buildJDoodlePayload", () => {
  afterEach(() => {
    delete process.env.JDOODLE_CLIENT_ID;
    delete process.env.JDOODLE_CLIENT_SECRET;
  });

  it("requires API credentials", () => {
    expect(() => buildJDoodlePayload("int main(void) { return 0; }")).toThrow(
      /JDOODLE_CLIENT_ID/,
    );
  });

  it("builds a C execute payload", () => {
    process.env.JDOODLE_CLIENT_ID = "id";
    process.env.JDOODLE_CLIENT_SECRET = "secret";
    expect(buildJDoodlePayload("int main(void) { return 0; }", "1 2")).toEqual({
      clientId: "id",
      clientSecret: "secret",
      script: "int main(void) { return 0; }",
      language: "c",
      versionIndex: "0",
      stdin: "1 2",
      compileOnly: false,
    });
  });
});
