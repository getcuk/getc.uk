"use client";

import { useEffect, useMemo, useState } from "react";

type Part = { t: string; c: string };

const LINES: { n: number; parts: Part[] }[] = [
  {
    n: 1,
    parts: [
      { t: "#include", c: "tok-pre" },
      { t: " ", c: "" },
      { t: "<stdio.h>", c: "tok-str" },
    ],
  },
  { n: 2, parts: [] },
  {
    n: 3,
    parts: [
      { t: "int", c: "tok-kw" },
      { t: " ", c: "" },
      { t: "main", c: "tok-fn" },
      { t: "(", c: "" },
      { t: "void", c: "tok-kw" },
      { t: ")", c: "" },
    ],
  },
  { n: 4, parts: [{ t: "{", c: "" }] },
  {
    n: 5,
    parts: [
      { t: "  ", c: "" },
      { t: "int", c: "tok-kw" },
      { t: " ", c: "" },
      { t: "c", c: "" },
      { t: ";", c: "" },
    ],
  },
  { n: 6, parts: [] },
  {
    n: 7,
    parts: [
      { t: "  ", c: "" },
      { t: "while", c: "tok-kw" },
      { t: " ((", c: "" },
      { t: "c", c: "" },
      { t: " = ", c: "" },
      { t: "getc", c: "tok-fn" },
      { t: "(", c: "" },
      { t: "stdin", c: "tok-kw" },
      { t: ")) != ", c: "" },
      { t: "EOF", c: "tok-kw" },
      { t: ") {", c: "" },
    ],
  },
  {
    n: 8,
    parts: [
      { t: "    ", c: "" },
      { t: "if", c: "tok-kw" },
      { t: " (c >= ", c: "" },
      { t: "'a'", c: "tok-str" },
      { t: " && c <= ", c: "" },
      { t: "'z'", c: "tok-str" },
      { t: ")", c: "" },
    ],
  },
  {
    n: 9,
    parts: [
      { t: "      c = c - ", c: "" },
      { t: "'a'", c: "tok-str" },
      { t: " + ", c: "" },
      { t: "'A'", c: "tok-str" },
      { t: ";", c: "" },
    ],
  },
  {
    n: 10,
    parts: [
      { t: "    ", c: "" },
      { t: "putc", c: "tok-fn" },
      { t: "(", c: "" },
      { t: "c", c: "" },
      { t: ", ", c: "" },
      { t: "stdout", c: "tok-kw" },
      { t: ");", c: "" },
    ],
  },
  { n: 11, parts: [{ t: "  }", c: "" }] },
  {
    n: 12,
    parts: [
      { t: "  ", c: "" },
      { t: "return", c: "tok-kw" },
      { t: " ", c: "" },
      { t: "0", c: "tok-num" },
      { t: ";", c: "" },
    ],
  },
  { n: 13, parts: [{ t: "}", c: "" }] },
];

type TypedChar = { ch: string; c: string; lineIndex: number };

function buildTypedChars(): TypedChar[] {
  const chars: TypedChar[] = [];
  LINES.forEach((line, lineIndex) => {
    if (line.parts.length === 0) {
      // Empty line still advances the typewriter briefly
      chars.push({ ch: "", c: "", lineIndex });
      return;
    }
    for (const part of line.parts) {
      for (const ch of part.t) {
        chars.push({ ch, c: part.c, lineIndex });
      }
    }
  });
  return chars;
}

const TYPED_CHARS = buildTypedChars();
const CHAR_MS = 22;
const EMPTY_LINE_MS = 90;
const COMMAND = "./a.out";
const INPUT = "hello, world";
const OUTPUT = "HELLO, WORLD";

type RunPhase =
  | "idle"
  | "command"
  | "compiling"
  | "running"
  | "output"
  | "done";

export function HeroTerminal() {
  const total = TYPED_CHARS.length;
  const [count, setCount] = useState(0);
  const [runPhase, setRunPhase] = useState<RunPhase>("idle");
  const [commandChars, setCommandChars] = useState(0);
  const codeDone = count >= total;
  const runDone = runPhase === "done";

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setCount(total);
      setCommandChars(COMMAND.length);
      setRunPhase("done");
      return;
    }

    setCount(0);
    setCommandChars(0);
    setRunPhase("idle");
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      i += 1;
      setCount(i);
      if (i >= total) return;
      const next = TYPED_CHARS[i];
      const delay =
        next && next.ch === "" && TYPED_CHARS[i - 1]?.ch === ""
          ? EMPTY_LINE_MS
          : next?.ch === ""
            ? EMPTY_LINE_MS
            : CHAR_MS;
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [total]);

  useEffect(() => {
    if (!codeDone) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cmd = 0;

    const typeCommand = () => {
      if (cancelled) return;
      cmd += 1;
      setCommandChars(cmd);
      if (cmd < COMMAND.length) {
        timers.push(setTimeout(typeCommand, 40));
        return;
      }
      // Command entered — then compile, run, print I/O, pass
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setRunPhase("compiling");
          timers.push(
            setTimeout(() => {
              if (cancelled) return;
              setRunPhase("running");
              timers.push(
                setTimeout(() => {
                  if (cancelled) return;
                  setRunPhase("output");
                  timers.push(
                    setTimeout(() => {
                      if (cancelled) return;
                      setRunPhase("done");
                    }, 500),
                  );
                }, 450),
              );
            }, 700),
          );
        }, 220),
      );
    };

    setRunPhase("command");
    timers.push(setTimeout(typeCommand, 350));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [codeDone]);

  const visibleByLine = useMemo(() => {
    const revealed = TYPED_CHARS.slice(0, count);
    const lines: { n: number; chars: TypedChar[]; started: boolean }[] =
      LINES.map((line) => ({
        n: line.n,
        chars: [],
        started: false,
      }));

    for (const char of revealed) {
      lines[char.lineIndex].started = true;
      if (char.ch !== "") lines[char.lineIndex].chars.push(char);
    }

    // Show a line once typing has reached it (including empty lines)
    const activeLine = revealed.length
      ? revealed[revealed.length - 1].lineIndex
      : -1;

    return lines.map((line, index) => ({
      ...line,
      visible: line.started || index <= activeLine,
      isCursorLine: !codeDone && index === activeLine,
    }));
  }, [count, codeDone]);

  const statusLabel =
    runPhase === "compiling"
      ? "compiling…"
      : runPhase === "running" || runPhase === "output"
        ? "running…"
        : runPhase === "done"
          ? "RESULT: PASSED"
          : null;

  const showInput =
    runPhase === "running" || runPhase === "output" || runDone;
  const showOutput = runPhase === "output" || runDone;

  return (
    <div
      className="hero-terminal relative w-full overflow-hidden"
      aria-hidden="true"
    >
      <div className="hero-terminal-scan" />
      <div className="relative z-10 flex flex-col">
        <div className="hero-terminal-chrome flex min-w-0 items-center gap-2 px-5 py-3">
          <span className="size-2.5 shrink-0 rounded-sm bg-[#ff8a1f]/60" />
          <span className="min-w-0 truncate font-mono text-[0.7rem] tracking-wide text-white/50">
            <span className="sm:hidden">getc.c</span>
            <span className="hidden sm:inline">
              getc.c · uppercase each character · drafted by AI
            </span>
          </span>
          <span
            className={`ml-auto shrink-0 font-mono text-[0.65rem] transition-opacity duration-300 ${
              runDone
                ? "text-[#ff8a1f]/90 opacity-100"
                : statusLabel
                  ? "text-white/40 opacity-100"
                  : "opacity-0"
            }`}
          >
            {statusLabel ?? "\u00a0"}
          </span>
        </div>
        <pre className="hero-terminal-code overflow-x-auto px-4 py-5 font-mono text-[0.75rem] leading-6 sm:text-[0.85rem] sm:leading-7">
          {visibleByLine.map((line) => (
            <div
              key={line.n}
              className={`flex min-h-6 gap-4 sm:min-h-7 ${line.visible ? "" : "invisible"}`}
            >
              <span className="w-5 shrink-0 select-none text-right text-white/25">
                {line.n}
              </span>
              <code className="text-white/85">
                {line.chars.length === 0 ? (
                  line.isCursorLine ? null : (
                    "\u00a0"
                  )
                ) : (
                  line.chars.map((char, i) =>
                    char.c ? (
                      <span key={i} className={char.c}>
                        {char.ch}
                      </span>
                    ) : (
                      <span key={i}>{char.ch}</span>
                    ),
                  )
                )}
                {line.isCursorLine ? (
                  <span className="hero-cursor ml-0.5 inline-block h-[1.05em] w-2 translate-y-0.5 bg-[#ff8a1f] align-text-bottom" />
                ) : null}
              </code>
            </div>
          ))}
          <div
            className={`mt-1 flex min-h-6 gap-4 sm:min-h-7 ${codeDone ? "" : "invisible"}`}
          >
            <span className="w-5 shrink-0" />
            <span className="hero-cursor inline-block h-5 w-2 translate-y-0.5 bg-[#ff8a1f]" />
          </div>
        </pre>
        <div className="hero-terminal-out px-5 py-3 font-mono text-[0.7rem] text-md-code-on-surface/50">
          <p className="mb-2 font-mono text-[0.6rem] tracking-[0.14em] text-white/35 uppercase">
            Terminal
          </p>
          <div className="flex min-h-5 items-center gap-2">
            <span className="text-[#ff8a1f]">$</span>
            <span className="text-white/70">
              {COMMAND.slice(0, commandChars)}
            </span>
          </div>
          <div className="hero-terminal-io mt-1">
            <span
              className={`block text-white/55 ${showInput ? "" : "invisible"}`}
            >
              {INPUT}
            </span>
            <span
              className={`block text-white/70 ${showOutput ? "" : "invisible"}`}
            >
              {OUTPUT}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
