import { Sparkles } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="w-full px-4 pb-10 pt-4">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-primary" aria-hidden />
          <span className="font-serif text-base tracking-tight text-foreground/90">
            Krishi Patel
          </span>
          <span className="hidden sm:inline">— Cybersecurity & IT</span>
        </div>
        <div className="flex items-center gap-4">
          <span>© {year}</span>
          <a
            href="#top"
            className="rounded-full px-2 py-1 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
