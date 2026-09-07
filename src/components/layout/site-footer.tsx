import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="mt-auto bg-md-surface-container-high dark:bg-md-surface-container-lowest"
    >
      <div className="site-shell flex items-center justify-between py-6 text-sm text-md-on-surface-variant">
        <Logo size={1.55} />
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
