"use client"

import { motion } from "framer-motion"
import { ArrowDown, Download, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const CONTACTS = [
  {
    icon: Phone,
    label: "+256 758 742 134",
    href: "tel:+256758742134",
  },
  {
    icon: Mail,
    label: "krishipatel279@gmail.com",
    href: "mailto:krishipatel279@gmail.com",
  },
  {
    icon: MapPin,
    label: "Namugongo, Kampala",
    href: "https://www.google.com/maps/search/?api=1&query=Namugongo+Kampala",
  },
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-4 pt-28 pb-20"
    >
      {/* Soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.85 0.13 85 / 0.25), transparent 60%)",
        }}
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          Open to cybersecurity roles — 2026
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-4 text-xs uppercase tracking-[0.32em] text-muted-foreground"
        >
          Curriculum Vitae
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-6xl leading-[0.92] tracking-tight text-balance sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Krishi
          <br />
          <span className="italic text-primary">Patel</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          An eager and motivated professional seeking to launch a cybersecurity
          career — combining CCNA-level networking, hands-on TryHackMe
          practice, and ongoing CEH studies.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {CONTACTS.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="glass group inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
              >
                <Icon className="size-3.5 text-primary" aria-hidden />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <a href="/cv.pdf" download>
              <Download className="size-4" />
              Download CV
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="glass rounded-full border-foreground/15 bg-transparent hover:bg-foreground/5"
          >
            <a href="#profile">View profile</a>
          </Button>
        </motion.div>

        <motion.a
          href="#profile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 flex flex-col items-center gap-2 text-xs text-muted-foreground/80 transition-colors hover:text-foreground"
          aria-label="Scroll to profile section"
        >
          <span className="tracking-widest uppercase">Scroll</span>
          <ArrowDown className="size-4 animate-bounce" aria-hidden />
        </motion.a>
      </div>
    </section>
  )
}
