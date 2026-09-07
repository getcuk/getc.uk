import type { Components } from "react-markdown";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { LessonSegment } from "@/lib/content/lesson-body";
import { extractYoutubeId } from "@/lib/content/lesson-body";
import { lessonHighlightOptions } from "@/lib/content/lesson-highlight";
import { GistEmbed } from "@/components/lessons/gist-embed";
import { YoutubeEmbed } from "@/components/lessons/youtube-embed";

function plainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return plainText(props?.children);
  }
  return "";
}

function slugifyHeading(children: ReactNode): string {
  return plainText(children)
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const components: Components = {
  h1: ({ children }) => {
    const id = slugifyHeading(children);
    return (
      <h2
        id={id}
        className="mt-10 mb-3 scroll-mt-24 font-display text-2xl font-medium tracking-tight text-md-on-surface"
      >
        {children}
      </h2>
    );
  },
  h2: ({ children }) => {
    const id = slugifyHeading(children);
    return (
      <h2
        id={id}
        className="mt-10 mb-3 scroll-mt-24 font-display text-2xl font-medium tracking-tight text-md-on-surface"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugifyHeading(children);
    return (
      <h3
        id={id}
        className="mt-8 mb-2 scroll-mt-24 font-mono text-base font-semibold text-md-on-surface"
      >
        {children}
      </h3>
    );
  },
  h4: ({ children }) => {
    const id = slugifyHeading(children);
    return (
      <h4
        id={id}
        className="mt-6 mb-2 scroll-mt-24 text-base font-semibold text-md-on-surface"
      >
        {children}
      </h4>
    );
  },
  p: ({ children }) => {
    // Bare YouTube URL left inside markdown → promote to embed.
    if (
      Array.isArray(children) &&
      children.length === 1 &&
      typeof children[0] === "object" &&
      children[0] !== null &&
      "props" in children[0]
    ) {
      const child = children[0] as {
        props?: { href?: string; children?: unknown };
      };
      const href = child.props?.href;
      const id = href ? extractYoutubeId(href) : null;
      if (id) return <YoutubeEmbed id={id} />;
    }

    return (
      <p className="mb-4 text-[1.05rem] leading-relaxed text-md-on-surface">
        {children}
      </p>
    );
  },
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-[1.05rem] leading-relaxed text-md-on-surface">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-[1.05rem] leading-relaxed text-md-on-surface">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-md-on-surface">
      {children}
    </strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => {
    const id = href ? extractYoutubeId(href) : null;
    // Standalone autolink whose label is the URL itself → embed.
    if (
      id &&
      typeof children === "string" &&
      /youtube\.com|youtu\.be/.test(children)
    ) {
      return <YoutubeEmbed id={id} />;
    }

    return (
      <a
        href={href}
        className="font-medium text-md-primary underline decoration-md-primary/35 underline-offset-2 hover:decoration-md-primary"
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-5 rounded-r-xl border-l-[3px] border-md-primary bg-md-primary-container/40 pl-4 text-md-on-surface-variant italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-md-outline-variant" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl outline outline-1 outline-md-outline-variant">
      <table className="min-w-full border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-md-surface-container-high text-md-on-surface">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="border-b border-md-outline-variant px-3 py-2 font-mono text-xs font-semibold tracking-wide uppercase">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-md-outline-variant/50 px-3 py-2 font-mono text-sm text-md-on-surface">
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="my-6 h-auto w-full rounded-xl outline outline-1 outline-md-outline-variant"
      loading="lazy"
    />
  ),
  code: ({ className, children }) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return (
        <code
          className={`font-mono text-[0.85rem] leading-relaxed text-md-code-on-surface ${className ?? ""}`}
        >
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-md-surface-container-high px-1.5 py-0.5 font-mono text-[0.9em] text-md-on-surface">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="lesson-code mb-5 rounded-xl bg-md-code-surface p-4 text-md-code-on-surface">
      {children}
    </pre>
  ),
};

type LessonBodyProps = {
  segments: LessonSegment[];
  className?: string;
};

export function LessonBody({ segments, className = "mt-8" }: LessonBodyProps) {
  return (
    <div className={`lesson-body ${className}`.trim()}>
      {segments.map((segment, index) => {
        if (segment.type === "gist") {
          return (
            <GistEmbed
              key={`gist-${segment.id}-${index}`}
              user={segment.user}
              id={segment.id}
            />
          );
        }

        if (segment.type === "youtube") {
          return (
            <YoutubeEmbed key={`yt-${segment.id}-${index}`} id={segment.id} />
          );
        }

        return (
          <ReactMarkdown
            key={`md-${index}`}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, lessonHighlightOptions]]}
            components={components}
          >
            {segment.value}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}
