import type { ReactNode } from "react";
import { BackToTop } from "@/components/layout/back-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-md-surface text-md-on-surface">
      <SiteHeader />
      {children}
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
