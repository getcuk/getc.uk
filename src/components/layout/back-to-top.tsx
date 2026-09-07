"use client";

import { useEffect, useRef, useState } from "react";

const SHOW_AFTER_PX = 400;
const EDGE_PX = 20;

export function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    const footer = document.getElementById("site-footer");

    const update = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);

      if (!button) {
        return;
      }

      const footerTop = footer?.getBoundingClientRect().top;
      const overlap =
        footerTop == null ? 0 : Math.max(0, window.innerHeight - footerTop);
      button.style.bottom = `${EDGE_PX + overlap}px`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed right-5 bottom-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-md-primary text-md-on-primary shadow-lg transition-[opacity,transform,filter] duration-200 hover:brightness-110 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
