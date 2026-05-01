"use client"

import { motion } from "framer-motion"
import { GraduationCap, MapPin } from "lucide-react"

const EDUCATION = [
  {
    degree: "MSc. Information Technology",
    short: "MSc. IT",
    institution: "ISBAT University",
    campus: "Main Campus, Lugogo By-Pass",
    period: "2023 — 2025",
    status: "Most recent",
  },
  {
    degree: "BSc. Networking and Cyber Security",
    short: "BSc. NCS",
    institution: "ISBAT University",
    campus: "Main Campus, Lugogo By-Pass",
    period: "2020 — 2023",
    status: "Completed",
  },
]

export function Education() {
  return (
    <section id="education" className="relative w-full px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-3 sm:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Education
          </p>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl md:text-6xl">
            Where I <span className="italic text-primary">studied.</span>
          </h2>
        </motion.div>

        <ol className="grid gap-5 md:grid-cols-2">
          {EDUCATION.map((item, i) => (
            <motion.li
              key={item.degree}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass group relative flex flex-col gap-5 rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30">
                  <GraduationCap className="size-5" aria-hidden />
                </span>
                <span className="rounded-full border border-border/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {item.status}
                </span>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90">
                  {item.short}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-tight tracking-tight text-balance sm:text-3xl">
                  {item.degree}
                </h3>
              </div>

              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <span className="text-foreground/90">{item.institution}</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" aria-hidden />
                  {item.campus}
                </span>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
                <span className="font-mono text-xs tracking-wider text-muted-foreground">
                  {item.period}
                </span>
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-primary/70 ring-2 ring-primary/20"
                />
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
