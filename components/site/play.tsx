"use client"

import { motion } from "framer-motion"
import { UniverseGame } from "./universe-game"

export function Play() {
  return (
    <section id="play" className="relative w-full px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 max-w-2xl"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Play if bored
          </p>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            An infinite, procedural{" "}
            <span className="italic text-primary">universe.</span>
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every star is generated deterministically from its position — so
            you can wander forever and the cosmos stays consistent. Zoom in to
            keep finding finer detail, zoom out to escape the galaxy. Click
            anywhere on the canvas to drift toward it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <UniverseGame />
        </motion.div>
      </div>
    </section>
  )
}
