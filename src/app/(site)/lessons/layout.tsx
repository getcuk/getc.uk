import type { ReactNode } from "react";

export default function LessonsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-background">
      {children}
    </div>
  );
}
