"use client";

import { useEffect, useState } from "react";

type GistFile = {
  filename: string;
  language: string | null;
  content: string;
};

type GistEmbedProps = {
  user: string;
  id: string;
};

function languageClass(filename: string, language: string | null): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "c" || ext === "h" || language === "C") return "language-c";
  if (ext === "sh" || language === "Shell") return "language-bash";
  if (ext === "md") return "language-markdown";
  return language ? `language-${language.toLowerCase()}` : "";
}

export function GistEmbed({ user, id }: GistEmbedProps) {
  const [files, setFiles] = useState<GistFile[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(`https://api.github.com/gists/${id}`, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!response.ok) throw new Error(`gist ${response.status}`);
        const data = (await response.json()) as {
          files?: Record<
            string,
            { filename?: string; language?: string; content?: string }
          >;
        };
        const next = Object.values(data.files ?? {}).map((file) => ({
          filename: file.filename ?? "file",
          language: file.language ?? null,
          content: file.content ?? "",
        }));
        if (!cancelled) {
          if (next.length === 0) setFailed(true);
          else setFiles(next);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="my-6 overflow-hidden rounded-xl outline outline-1 outline-md-outline-variant">
      {files ? (
        files.map((file) => (
          <div key={file.filename} className="border-b border-md-outline-variant last:border-b-0">
            <div className="border-b border-md-outline-variant bg-md-surface-container-high px-3 py-1.5 font-mono text-[0.7rem] text-md-on-surface-variant">
              {file.filename}
            </div>
            <pre className="lesson-code bg-md-code-surface p-4 text-md-code-on-surface">
              <code className={`font-mono text-[0.85rem] leading-relaxed ${languageClass(file.filename, file.language)}`}>
                {file.content}
              </code>
            </pre>
          </div>
        ))
      ) : (
        <div className="bg-md-surface-container px-4 py-6 font-mono text-sm text-md-on-surface-variant">
          {failed ? "Could not load code sample." : "Loading code…"}
        </div>
      )}
      <p className="border-t border-md-outline-variant px-3 py-2 font-mono text-[0.65rem] text-md-on-surface-variant">
        <a
          href={`https://gist.github.com/${user}/${id}`}
          className="hover:text-md-primary"
          target="_blank"
          rel="noreferrer"
        >
          Open gist
        </a>
      </p>
    </div>
  );
}
