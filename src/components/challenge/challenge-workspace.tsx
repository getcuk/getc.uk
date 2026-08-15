"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { InstructionsPanel } from "@/components/challenge/instructions-panel";
import { OutputDrawer } from "@/components/challenge/output-drawer";
import { gradeStdout } from "@/lib/challenges/grade";
import type { Challenge } from "@/lib/content/challenges";
import type { RunResult } from "@/lib/jdoodle/types";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-zinc-100 font-mono text-sm text-zinc-500 dark:bg-[#1e1e1e]">
      Loading editor…
    </div>
  ),
});

type ChallengeWorkspaceProps = {
  challenge: Challenge;
};

type RunTone = "default" | "success" | "error";

type ApiRunResponse = RunResult & {
  error?: string;
  detail?: string;
};

function formatRunOutput(
  result: RunResult,
  expectedStdout: string,
  source: string,
): { text: string; tone: RunTone } {
  const lines = [
    `$ gcc main.c -o main && ./main`,
    `compiler: ${result.status.description} (${result.status.id})`,
  ];

  if (result.time != null) {
    lines.push(`time: ${result.time}s`);
  }
  if (result.memory != null) {
    lines.push(`memory: ${result.memory} KB`);
  }

  const ranOk =
    !result.compileOutput.trim() &&
    (result.status.id === 3 ||
      result.status.description === "Accepted" ||
      (!result.status.description.toLowerCase().includes("error") &&
        result.status.id !== 6));

  if (result.compileOutput.trim()) {
    lines.push("", "[compile error]", result.compileOutput.trimEnd());
  }
  if (result.stderr.trim()) {
    lines.push("", "[stderr]", result.stderr.trimEnd());
  }
  if (result.message.trim()) {
    lines.push("", "[message]", result.message.trimEnd());
  }

  if (!ranOk) {
    lines.push("", "RESULT: FAILED", "Program did not run successfully.");
    return { text: lines.join("\n"), tone: "error" };
  }

  const grade = gradeStdout(result.stdout, expectedStdout, source);
  lines.push("", `RESULT: ${grade.label}`);
  for (const reason of grade.reasons) {
    lines.push(`- ${reason}`);
  }

  if (result.stdout.length > 0) {
    lines.push("", "Your program printed:", result.stdout.replace(/\n$/, "\n⏎"));
  } else {
    lines.push("", "Your program printed:", "(nothing)");
  }

  return {
    text: lines.join("\n"),
    tone: grade.passed ? "success" : "error",
  };
}

export function ChallengeWorkspace({ challenge }: ChallengeWorkspaceProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState(challenge.starterCode);
  const codeRef = useRef(challenge.starterCode);
  const abortRef = useRef<AbortController | null>(null);

  const [output, setOutput] = useState("");
  const [tone, setTone] = useState<RunTone>("default");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editorTheme =
    mounted && resolvedTheme === "light" ? "light" : "vs-dark";

  const updateCode = useCallback((value: string) => {
    codeRef.current = value;
    setCode(value);
  }, []);

  const runCode = useCallback(async () => {
    const source = codeRef.current;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsRunning(true);
    setDrawerOpen(true);
    setTone("default");
    setOutput("$ POST /api/run …\nwaiting for compiler…");

    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source }),
        signal: controller.signal,
      });

      const data = (await response.json()) as ApiRunResponse;

      if (!response.ok) {
        setTone("error");
        setOutput(
          [
            "$ POST /api/run",
            `error: ${data.error ?? "Request failed"}`,
            data.detail ? `detail: ${data.detail}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        );
        return;
      }

      const formatted = formatRunOutput(
        data,
        challenge.expectedStdout,
        source,
      );
      setTone(formatted.tone);
      setOutput(formatted.text);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setTone("error");
      setOutput(
        [
          "$ POST /api/run",
          "error: Could not reach /api/run",
          error instanceof Error ? error.message : String(error),
        ].join("\n"),
      );
    } finally {
      if (abortRef.current === controller) {
        setIsRunning(false);
      }
    }
  }, [challenge.expectedStdout]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        if (!isRunning) {
          void runCode();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isRunning, runCode]);

  return (
    <div className="flex h-full min-h-0 flex-col md:flex-row">
      <div className="h-[32%] min-h-0 shrink-0 md:h-full md:w-[42%] md:max-w-xl md:shrink">
        <InstructionsPanel markdown={challenge.instructionsMarkdown} />
      </div>

      <div className="flex min-h-[40vh] flex-1 flex-col bg-white dark:bg-[#1e1e1e] md:min-h-0">
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-zinc-200 px-3 dark:border-zinc-800">
          <p className="font-mono text-xs text-zinc-500">
            main.c
            <span className="ml-3 hidden text-zinc-400 sm:inline dark:text-zinc-600">
              ⌘/Ctrl+Enter to run
            </span>
          </p>
          <button
            type="button"
            onClick={() => void runCode()}
            disabled={isRunning}
            className="inline-flex h-8 shrink-0 items-center rounded bg-emerald-500 px-3 font-mono text-xs font-semibold text-zinc-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRunning ? "Running…" : "Run Code"}
          </button>
        </div>

        <div className="min-h-0 flex-1">
          <MonacoEditor
            height="100%"
            defaultLanguage="c"
            theme={editorTheme}
            value={code}
            onChange={(value) => updateCode(value ?? "")}
            options={{
              fontSize: 14,
              fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              insertSpaces: true,
              wordWrap: "on",
              padding: { top: 12 },
            }}
          />
        </div>

        <OutputDrawer
          output={output}
          open={drawerOpen}
          onToggle={() => setDrawerOpen((current) => !current)}
          isRunning={isRunning}
          tone={tone}
        />
      </div>
    </div>
  );
}
