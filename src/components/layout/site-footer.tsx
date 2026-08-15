import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="page-gutter mx-auto flex h-16 w-full max-w-6xl items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <Logo size={1.55} />
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
