"use client"

import { motion } from "framer-motion"
import {
  LifeBuoy,
  Bug,
  MessagesSquare,
  Mountain,
  Terminal,
  Lightbulb,
  type LucideIcon,
} from "lucide-react"

type Skill = {
  name: string
  description: string
  icon: LucideIcon
}

const SKILLS: Skill[] = [
  {
    name: "General IT Support",
    description:
      "Triaging, diagnosing, and resolving everyday technology issues across hardware, software and end-users.",
    icon: LifeBuoy,
  },
  {
    name: "Penetration Testing",
    description:
      "Hands-on offensive security practice — recon, exploitation and reporting through TryHackMe labs.",
    icon: Bug,
  },
  {
    name: "Proficient in Linux",
    description:
      "Comfortable navigating, administering and automating Linux environments from the command line.",
    icon: Terminal,
  },
  {
    name: "Communication",
    description:
      "Explaining technical concepts clearly to both technical teammates and non-technical stakeholders.",
    icon: MessagesSquare,
  },
  {
    name: "Problem Solving & Adaptive Thinking",
    description:
      "Breaking complex problems into smaller pieces and adjusting approach as new information surfaces.",
    icon: Lightbulb,
  },
  {
    name: "Persistence",
    description:
      "Sticking with hard problems until they&apos;re solved — the trait that turned curiosity into a career.",
    icon: Mountain,
  },
]

export function Skills() {
  return (
    <section id="skills" className="relative w-full px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-3 sm:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Skills
          </p>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl md:text-6xl">
            What I bring to the <span className="italic text-primary">team.</span>
          </h2>
        </motion.div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map(({ name, description, icon: Icon }, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass group flex flex-col gap-4 rounded-2xl p-6"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30 transition-transform group-hover:scale-110">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-serif text-xl leading-tight tracking-tight text-balance">
                  {name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description.replace(/&apos;/g, "'")}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
