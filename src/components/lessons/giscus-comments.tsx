"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

const REPO = process.env.NEXT_PUBLIC_GISCUS_REPO;
const REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

const configured = Boolean(REPO && REPO_ID && CATEGORY && CATEGORY_ID);

export function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const { resolvedTheme } = useTheme();
  const giscusTheme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    if (!configured) return;
    const container = containerRef.current;
    if (!container || loadedRef.current) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", REPO!);
    script.setAttribute("data-repo-id", REPO_ID!);
    script.setAttribute("data-category", CATEGORY!);
    script.setAttribute("data-category-id", CATEGORY_ID!);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", giscusTheme);
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    container.appendChild(script);
    loadedRef.current = true;
  }, [giscusTheme]);

  useEffect(() => {
    if (!configured || !loadedRef.current) return;
    const iframe = containerRef.current?.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame",
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: giscusTheme } } },
      "https://giscus.app",
    );
  }, [giscusTheme]);

  return (
    <section className="mt-12 border-t border-zinc-200 pt-10 dark:border-zinc-800">
      <h2 className="font-display text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Leave a comment
      </h2>
      {!configured ? (
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          Comments coming soon — set the{" "}
          <code className="font-mono text-xs text-zinc-600 dark:text-zinc-300">
            NEXT_PUBLIC_GISCUS_*
          </code>{" "}
          env vars after enabling GitHub Discussions and Giscus.
        </p>
      ) : (
        <div ref={containerRef} className="giscus mt-4" />
      )}
    </section>
  );
}
