import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { NotFoundView } from "@/components/not-found-view";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-md-surface text-md-on-surface">
      <SiteHeader />
      <NotFoundView />
      <SiteFooter />
    </div>
  );
}
