"use client";

import { useState } from "react";

type YoutubeEmbedProps = {
  id: string;
};

/** Lean branding once the real player loads; keep the seek bar visible. */
const EMBED_PARAMS = new URLSearchParams({
  autoplay: "1",
  controls: "1",
  modestbranding: "1",
  rel: "0",
  playsinline: "1",
  iv_load_policy: "3",
  fs: "1",
}).toString();

/**
 * Prefer maxres when it exists. Missing maxres often returns a tiny 120×90
 * placeholder with HTTP 200 (so onError never fires) — detect that and fall back.
 *
 * Also: cached images can finish before React attaches onLoad (Strict Mode
 * remounts are a common trigger). Check `img.complete` via ref as well.
 */
const THUMBS = ["maxresdefault", "sddefault", "hqdefault"] as const;

export function YoutubeEmbed({ id }: YoutubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const [thumbIndex, setThumbIndex] = useState(0);

  const thumbSrc = `https://i.ytimg.com/vi/${id}/${THUMBS[thumbIndex]}.jpg`;

  function advanceThumb() {
    setThumbIndex((i) => Math.min(i + 1, THUMBS.length - 1));
  }

  function considerThumb(img: HTMLImageElement) {
    // Placeholder for missing maxres is ~120×90
    if (img.naturalWidth > 0 && img.naturalWidth <= 120) {
      advanceThumb();
    }
  }

  return (
    <div className="my-4 overflow-hidden rounded-lg">
      <div className="relative aspect-[4/3] w-full bg-zinc-950">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?${EMBED_PARAMS}`}
            title="YouTube video"
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 block w-full"
            aria-label="Play video"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={thumbSrc}
              ref={(node) => {
                if (node?.complete) considerThumb(node);
              }}
              src={thumbSrc}
              alt=""
              width={1280}
              height={720}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              onError={advanceThumb}
              onLoad={(event) => considerThumb(event.currentTarget)}
            />
            <span
              className="absolute inset-0 bg-zinc-950/25 transition-colors group-hover:bg-zinc-950/35"
              aria-hidden
            />
            <span
              className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff8a1f] text-zinc-950 shadow-lg transition-transform group-hover:scale-105"
              aria-hidden
            >
              <svg
                viewBox="0 0 24 24"
                className="ml-0.5 h-6 w-6"
                fill="currentColor"
              >
                <path d="M8 5.14v13.72L19 12 8 5.14z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
