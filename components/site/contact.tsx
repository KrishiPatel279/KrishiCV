"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const CHANNELS = [
  {
    label: "Email",
    value: "krishipatel279@gmail.com",
    href: "mailto:krishipatel279@gmail.com",
  },
  {
    label: "Phone",
    value: "+256 758 742 134",
    href: "tel:+256758742134",
  },
  {
    label: "Location",
    value: "Namugongo, Kampala",
    href: "https://www.google.com/maps/search/?api=1&query=Namugongo+Kampala",
  },
  {
    label: "CV",
    value: "Download PDF",
    href: "/cv.pdf",
  },
]

export function Contact() {
  return (
    <section id="contact" className="relative w-full px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="md:col-span-6"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </p>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-6xl">
              Let&apos;s <span className="italic text-primary">connect.</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Open to cybersecurity, IT support and entry-level security
              engineering roles. The fastest channel is email — happy to share
              references and discuss opportunities.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a href="mailto:krishipatel279@gmail.com">
                  <Mail className="size-4" />
                  Send an email
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="glass rounded-full border-foreground/15 bg-transparent hover:bg-foreground/5"
              >
                <a href="/cv.pdf" download>
                  <Download className="size-4" />
                  Download CV
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-6"
          >
            <ul className="glass divide-y divide-border/50 rounded-2xl">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    download={c.href === "/cv.pdf" || undefined}
                    className="group flex items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-foreground/[0.03]"
                  >
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {c.label}
                      </div>
                      <div className="mt-1 font-serif text-xl tracking-tight">
                        {c.value}
                      </div>
                    </div>
                    <ArrowUpRight
                      className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
