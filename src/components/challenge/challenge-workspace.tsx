"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { InstructionsPanel } from "@/components/challenge/instructions-panel";
import {
  defineGetcEditorTheme,
  GETC_EDITOR_THEME,
} from "@/components/challenge/monaco-theme";
import { OutputDrawer } from "@/components/challenge/output-drawer";
import { gradeStdout } from "@/lib/challenges/grade";
import type { Challenge } from "@/lib/content/challenges";
import type { RunResult } from "@/lib/jdoodle/types";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-md-code-surface font-mono text-sm text-md-code-on-surface/50">
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
  const [code, setCode] = useState(challenge.starterCode);
  const codeRef = useRef(challenge.starterCode);
  const abortRef = useRef<AbortController | null>(null);

  const [output, setOutput] = useState("");
  const [tone, setTone] = useState<RunTone>("default");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

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

      <div className="challenge-code-pane flex min-h-[40vh] flex-1 flex-col md:min-h-0">
        <div className="challenge-code-chrome flex h-12 shrink-0 items-center justify-between gap-3 px-4">
          <p className="flex min-w-0 items-center gap-2 font-mono text-[0.7rem] tracking-wide text-white/50">
            <span className="size-2.5 shrink-0 rounded-sm bg-md-primary/60" />
            <span className="truncate">main.c</span>
            <span className="hidden text-white/35 sm:inline">
              ⌘/Ctrl+Enter to run
            </span>
          </p>
          <button
            type="button"
            onClick={() => void runCode()}
            disabled={isRunning}
            className="challenge-run-btn md-interactive"
          >
            {isRunning ? "Running…" : "Run Code"}
          </button>
        </div>

        <div className="challenge-editor min-h-0 flex-1">
          <MonacoEditor
            height="100%"
            defaultLanguage="c"
            theme={GETC_EDITOR_THEME}
            beforeMount={defineGetcEditorTheme}
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
              padding: { top: 16, bottom: 12 },
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              renderLineHighlight: "line",
              scrollbar: {
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
              },
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
