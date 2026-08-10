import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  href?: string;
  className?: string;
  /** Visual height of the logo in pixels */
  size?: number;
};

/** Amber "get c" + tagline mark (dark background). */
const LOGO_SRC = "/brand/get-c-logo.png";
const INTRINSIC_WIDTH = 476;
const INTRINSIC_HEIGHT = 244;

export function Logo({ href = "/", className, size = 40 }: LogoProps) {
  const width = Math.round(size * (INTRINSIC_WIDTH / INTRINSIC_HEIGHT));

  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center", className)}
      aria-label="get c — learn code, properly"
    >
      <Image
        src={LOGO_SRC}
        alt="get c — learn code, properly"
        width={width}
        height={size}
        className="h-auto w-auto"
        style={{ height: size, width: "auto" }}
        priority
      />
    </Link>
  );
}
