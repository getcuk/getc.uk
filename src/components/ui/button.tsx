import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "md-interactive md-btn",
        variant === "primary" && "md-btn-filled",
        variant === "secondary" && "md-btn-outlined",
        className,
      )}
      {...props}
    />
  );
}
