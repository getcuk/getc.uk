const LINES = [
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
      { t: ")", c: "" },
    ],
  },
  {
    n: 8,
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
  {
    n: 9,
    parts: [
      { t: "  ", c: "" },
      { t: "return", c: "tok-kw" },
      { t: " ", c: "" },
      { t: "0", c: "tok-num" },
      { t: ";", c: "" },
    ],
  },
  { n: 10, parts: [{ t: "}", c: "" }] },
] as const;

export function HeroTerminal() {
  return (
    <div
      className="hero-terminal relative h-full min-h-[22rem] w-full overflow-hidden lg:min-h-0"
      aria-hidden="true"
    >
      <div className="hero-terminal-scan" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-2.5 rounded-sm bg-[#ff8a1f]/60" />
          <span className="font-mono text-[0.7rem] tracking-wide text-white/50">
            getc.c — read a character
          </span>
          <span className="ml-auto font-mono text-[0.65rem] text-[#ff8a1f]/90">
            RESULT: PASSED
          </span>
        </div>
        <pre className="flex-1 overflow-hidden px-4 py-5 font-mono text-[0.75rem] leading-6 sm:text-[0.85rem] sm:leading-7">
          {LINES.map((line) => (
            <div key={line.n} className="flex gap-4">
              <span className="w-5 shrink-0 select-none text-right text-white/25">
                {line.n}
              </span>
              <code className="text-white/85">
                {line.parts.length === 0
                  ? "\u00a0"
                  : line.parts.map((part, i) =>
                      part.c ? (
                        <span key={i} className={part.c}>
                          {part.t}
                        </span>
                      ) : (
                        <span key={i}>{part.t}</span>
                      ),
                    )}
              </code>
            </div>
          ))}
          <div className="mt-1 flex gap-4">
            <span className="w-5 shrink-0" />
            <span className="hero-cursor inline-block h-5 w-2 translate-y-0.5 bg-[#ff8a1f]" />
          </div>
        </pre>
        <div className="border-t border-white/10 px-4 py-3 font-mono text-[0.7rem] text-white/45">
          <span className="text-[#ff8a1f]">$</span> ./a.out
          <span className="mt-1 block text-white/55">hello, world</span>
          <span className="block text-white/70">hello, world</span>
        </div>
      </div>
    </div>
  );
}
