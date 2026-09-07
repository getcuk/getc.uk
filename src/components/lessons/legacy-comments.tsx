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
  "font-medium text-md-primary underline decoration-md-primary/35 underline-offset-2 hover:decoration-md-primary";

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
    <li className="border-t border-md-outline-variant pt-5 first:border-t-0 first:pt-0">
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
          <span className="font-medium text-md-on-surface">
            {comment.author}
          </span>
        )}
        <time
          dateTime={comment.date}
          className="font-mono text-xs text-md-on-surface-variant"
        >
          {formatLessonDate(comment.date)}
        </time>
      </div>
      <div className="mt-2 space-y-3 text-[0.95rem] leading-relaxed text-md-on-surface">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="whitespace-pre-wrap">
            {renderCommentText(paragraph)}
          </p>
        ))}
      </div>
      {comment.replies.length > 0 ? (
        <ul className="mt-4 space-y-5 border-l border-md-outline-variant pl-4 sm:pl-5">
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
    <section className="mt-12 border-t border-md-outline-variant pt-10">
      <h2 className="font-display text-xl font-medium tracking-tight text-md-on-surface">
        Earlier comments
        <span className="ml-2 font-mono text-sm font-normal text-md-on-surface-variant">
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
