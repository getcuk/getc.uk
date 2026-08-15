import {
  buildCommentTree,
  type LegacyComment,
  type LegacyCommentNode,
} from "@/lib/content/comments";
import { formatLessonDate } from "@/lib/format-lesson-date";
import type { ReactNode } from "react";

type LegacyCommentsProps = {
  comments: LegacyComment[];
};

const LINK_RE =
  /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s<]+)/g;

const COMMENT_LINK_CLASS =
  "font-medium text-[#ff8a1f] underline decoration-[#ff8a1f]/35 underline-offset-2 hover:decoration-[#ff8a1f]";

function trimUrl(raw: string): { href: string; trailing: string } {
  const trailing = raw.match(/[).,;:!?]+$/)?.[0] ?? "";
  return {
    href: trailing ? raw.slice(0, -trailing.length) : raw,
    trailing,
  };
}

function renderCommentText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of text.matchAll(LINK_RE)) {
    const index = match.index ?? 0;
    if (index > last) {
      nodes.push(text.slice(last, index));
    }

    if (match[1] && match[2]) {
      nodes.push(
        <a
          key={key++}
          href={match[2]}
          className={COMMENT_LINK_CLASS}
          target="_blank"
          rel="noreferrer"
        >
          {match[1]}
        </a>,
      );
    } else if (match[3]) {
      const { href, trailing } = trimUrl(match[3]);
      nodes.push(
        <a
          key={key++}
          href={href}
          className={COMMENT_LINK_CLASS}
          target="_blank"
          rel="noreferrer"
        >
          {href}
        </a>,
      );
      if (trailing) nodes.push(trailing);
    }

    last = index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes;
}

function CommentItem({ comment }: { comment: LegacyCommentNode }) {
  const paragraphs = comment.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <li className="border-t border-zinc-200 pt-5 first:border-t-0 first:pt-0 dark:border-zinc-800">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm">
        {comment.authorUrl ? (
          <a
            href={comment.authorUrl}
            className={COMMENT_LINK_CLASS}
            target="_blank"
            rel="nofollow noreferrer"
          >
            {comment.author}
          </a>
        ) : (
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {comment.author}
          </span>
        )}
        <time
          dateTime={comment.date}
          className="font-mono text-xs text-zinc-400 dark:text-zinc-500"
        >
          {formatLessonDate(comment.date)}
        </time>
      </div>
      <div className="mt-2 space-y-3 text-[0.95rem] leading-relaxed text-zinc-700 dark:text-zinc-300">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="whitespace-pre-wrap">
            {renderCommentText(paragraph)}
          </p>
        ))}
      </div>
      {comment.replies.length > 0 ? (
        <ul className="mt-4 space-y-5 border-l border-zinc-200 pl-4 dark:border-zinc-800 sm:pl-5">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function LegacyComments({ comments }: LegacyCommentsProps) {
  if (comments.length === 0) return null;

  const tree = buildCommentTree(comments);

  return (
    <section className="mt-12 border-t border-zinc-200 pt-10 dark:border-zinc-800">
      <h2 className="font-display text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Earlier comments
        <span className="ml-2 font-mono text-sm font-normal text-zinc-400">
          ({comments.length})
        </span>
      </h2>
      <ul className="mt-6 space-y-5">
        {tree.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </section>
  );
}
