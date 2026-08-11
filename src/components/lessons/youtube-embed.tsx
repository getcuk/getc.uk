type YoutubeEmbedProps = {
  id: string;
};

export function YoutubeEmbed({ id }: YoutubeEmbedProps) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="relative aspect-video w-full bg-zinc-950">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
