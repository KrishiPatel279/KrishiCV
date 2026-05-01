"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

type Variant = "pill" | "row"

export function ThemeToggle({
  variant = "pill",
  className,
}: {
  variant?: Variant
  className?: string
}) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === "dark" : true
  const next = isDark ? "light" : "dark"
  const label = `Switch to ${next} mode`

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={() => setTheme(next)}
        aria-label={label}
        className={cn(
          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-foreground/90 transition-colors hover:bg-foreground/5",
          className,
        )}
      >
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
        <span
          aria-hidden
          className="relative inline-flex size-5 items-center justify-center"
        >
          <Sun
            className={cn(
              "absolute size-4 transition-all duration-300",
              isDark
                ? "-rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100",
            )}
          />
          <Moon
            className={cn(
              "absolute size-4 transition-all duration-300",
              isDark
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-90 scale-0 opacity-0",
            )}
          />
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
        className,
      )}
    >
      <Sun
        aria-hidden
        className={cn(
          "absolute size-4 transition-all duration-300",
          isDark
            ? "-rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100",
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          "absolute size-4 transition-all duration-300",
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0",
        )}
      />
    </button>
  )
}
