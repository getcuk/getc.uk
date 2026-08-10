import { SITE_NAME } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center px-4 text-sm text-zinc-500">
        © {new Date().getFullYear()} {SITE_NAME}
      </div>
    </footer>
  );
}
