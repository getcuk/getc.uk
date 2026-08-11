import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  href?: string;
  className?: string;
  /** Text size in rem (default ~1.85 for header) */
  size?: number;
};

export function Logo({ href = "/", className, size = 1.85 }: LogoProps) {
  // Slightly under the text cap-height so the mark doesn’t dominate.
  const markPx = Math.round(size * 16 * 0.82);

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center transition-opacity hover:opacity-90",
        className,
      )}
      aria-label="get c"
    >
      <Image
        src="/brand/logo-mark.svg"
        alt=""
        width={markPx}
        height={markPx}
        className="mr-0.5 shrink-0 dark:invert"
        style={{ width: markPx, height: markPx }}
        priority
      />
      <span
        className="font-display font-bold tracking-tight whitespace-pre text-[#ff8a1f]"
        style={{ fontSize: `${size}rem`, lineHeight: 0.95 }}
      >
        {" get c"}
      </span>
    </Link>
  );
}
