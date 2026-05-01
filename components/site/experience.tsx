"use client"

import { motion } from "framer-motion"
import { Briefcase, CheckCircle2 } from "lucide-react"

const EXPERIENCE = [
  {
    role: "Intern",
    company: "Diamond Trust Bank",
    period: "March 2023 — June 2023",
    summary:
      "Learnt a lot from the talented team at DTB in the few months I spent there — out-of-the-box thinking, creative problem solving, and the rhythm of a working enterprise environment.",
    bullets: [
      "Implementation of Ansible on internal servers for automation and application deployment.",
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="relative w-full px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-3 sm:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Experience
          </p>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl md:text-6xl">
            Work <span className="italic text-primary">experience.</span>
          </h2>
        </motion.div>

        <ol className="relative ml-3 border-l border-border/60 pl-8 sm:ml-5 sm:pl-12">
          {EXPERIENCE.map((item, i) => (
            <motion.li
              key={`${item.company}-${item.period}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative pb-12 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute -left-[42px] top-1.5 inline-flex size-9 items-center justify-center rounded-full bg-background ring-1 ring-border sm:-left-[58px]"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30">
                  <Briefcase className="size-4" aria-hidden />
                </span>
              </span>

              <div className="glass rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary/90">
                      {item.role}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl leading-tight tracking-tight text-balance sm:text-3xl">
                      {item.company}
                    </h3>
                  </div>
                  <span className="font-mono text-xs tracking-wider text-muted-foreground sm:text-right">
                    {item.period}
                  </span>
                </div>

                <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>

                {item.bullets.length > 0 && (
                  <ul className="mt-6 flex flex-col gap-3 border-t border-border/60 pt-5">
                    {item.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85"
                      >
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
