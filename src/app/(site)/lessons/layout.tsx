import type { ReactNode } from "react";

export default function LessonsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="lesson-canvas flex flex-1 flex-col bg-md-lesson-canvas text-md-on-surface">
      {children}
    </div>
  );
}
