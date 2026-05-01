"use client"

import { motion } from "framer-motion"
import { Network, ShieldCheck, GraduationCap } from "lucide-react"

const HIGHLIGHTS = [
  {
    icon: Network,
    label: "CCNA-level networking",
  },
  {
    icon: ShieldCheck,
    label: "TryHackMe practitioner",
  },
  {
    icon: GraduationCap,
    label: "CEH studies in progress",
  },
]

export function Profile() {
  return (
    <section id="profile" className="relative w-full px-4 py-24 sm:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-5"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Profile
          </p>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            Eager, motivated,
            <br />
            <span className="italic text-primary">always learning.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:col-span-7"
        >
          <p className="text-pretty text-lg leading-relaxed text-foreground/85 sm:text-xl">
            An eager and motivated professional seeking to launch a
            cybersecurity career. Combines a CCNA-level understanding of
            networking with practical skills from TryHackMe labs. Committed to
            continuous learning through ongoing{" "}
            <span className="text-foreground">CEH</span> studies.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm text-foreground/85"
              >
                <Icon className="size-4 text-primary" aria-hidden />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
