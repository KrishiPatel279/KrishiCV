"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "#profile", label: "Profile" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on hash change / link click
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener("hashchange", close)
    return () => window.removeEventListener("hashchange", close)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <a
          href="#top"
          className={cn(
            "flex items-center gap-2 rounded-full px-3 py-1.5 transition-all",
            scrolled && "glass",
          )}
        >
          <Sparkles className="size-4 text-primary" aria-hidden />
          <span className="font-serif text-lg leading-none tracking-tight">
            Krishi Patel
          </span>
        </a>

        <nav
          className={cn(
            "hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex",
            scrolled ? "glass" : "border border-transparent",
          )}
          aria-label="Primary"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <span
            aria-hidden
            className="mx-1 h-5 w-px bg-foreground/10"
          />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden rounded-full bg-primary text-primary-foreground hover:bg-primary/90 md:inline-flex"
          >
            <a href="/cv.pdf" download aria-label="Download CV">
              <Download className="size-4" />
              <span>CV</span>
            </a>
          </Button>

          <ThemeToggle className="glass md:hidden" />

          <button
            type="button"
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-full md:hidden",
              "glass",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-4 mt-2 md:hidden"
          >
            <div className="glass flex flex-col gap-1 rounded-2xl p-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-foreground/90 transition-colors hover:bg-foreground/5"
                >
                  {l.label}
                </a>
              ))}
              <ThemeToggle variant="row" />
              <a
                href="/cv.pdf"
                download
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
              >
                <span>Download CV</span>
                <Download className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
