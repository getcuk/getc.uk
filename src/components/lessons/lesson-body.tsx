import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { LessonSegment } from "@/lib/content/lesson-body";
import { extractYoutubeId } from "@/lib/content/lesson-body";
import { GistEmbed } from "@/components/lessons/gist-embed";
import { YoutubeEmbed } from "@/components/lessons/youtube-embed";

const components: Components = {
  h1: ({ children }) => (
    <h2 className="mt-10 mb-3 font-display text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 mb-3 font-display text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-6 mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
      {children}
    </h4>
  ),
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
      <p className="mb-4 text-[1.05rem] leading-relaxed text-zinc-700 dark:text-zinc-300">
        {children}
      </p>
    );
  },
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-[1.05rem] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-[1.05rem] leading-relaxed text-zinc-700 dark:text-zinc-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-zinc-950 dark:text-zinc-50">
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
        className="font-medium text-[#ff8a1f] underline decoration-[#ff8a1f]/35 underline-offset-2 hover:decoration-[#ff8a1f]"
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-5 border-l-2 border-[#ff8a1f]/70 pl-4 text-zinc-600 italic dark:text-zinc-400">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="border-b border-zinc-200 px-3 py-2 font-mono text-xs font-semibold tracking-wide uppercase dark:border-zinc-800">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-zinc-100 px-3 py-2 font-mono text-sm text-zinc-700 dark:border-zinc-900 dark:text-zinc-300">
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="my-6 h-auto w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
      loading="lazy"
    />
  ),
  code: ({ className, children }) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return (
        <code className="font-mono text-[0.85rem] leading-relaxed text-zinc-100">
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mb-5 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-zinc-100">
      {children}
    </pre>
  ),
};

type LessonBodyProps = {
  segments: LessonSegment[];
};

export function LessonBody({ segments }: LessonBodyProps) {
  return (
    <div className="lesson-body mt-8">
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
            components={components}
          >
            {segment.value}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}
