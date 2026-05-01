"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import {
  Pause,
  Play,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Procedural infinite zoom universe.
 *
 * World is partitioned into octaves o ∈ ℤ where cells have world-size 2^o.
 * For each octave whose projected cell size falls in a visible band, we hash
 * each cell deterministically and emit a small cluster of stars. As the
 * camera zooms, finer octaves fade in and coarser octaves fade out, giving
 * the appearance of an infinite, self-consistent universe.
 */

// Mulberry32 PRNG seeded by an integer
function mulberry32(seed: number) {
  let s = seed | 0
  return function () {
    s = (s + 0x6d2b79f5) | 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function cellSeed(x: number, y: number, o: number) {
  // Mix coordinates with large primes
  let h = (x * 73856093) ^ (y * 19349663) ^ (o * 83492791)
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b)
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35)
  h = h ^ (h >>> 16)
  return h | 0
}

// Smooth fade-in/out window over screen-cell size (in pixels).
// Visible band: ~[60, 600] px. Fades over [40,80] and [400,800].
function octaveVisibility(cellScreen: number) {
  if (cellScreen <= 40 || cellScreen >= 800) return 0
  const fadeIn =
    cellScreen < 80 ? (cellScreen - 40) / 40 : 1
  const fadeOut =
    cellScreen > 400 ? 1 - (cellScreen - 400) / 400 : 1
  const v = Math.min(fadeIn, fadeOut)
  // Smoothstep
  return v * v * (3 - 2 * v)
}

type Mode = "in" | "out" | "paused"

export function UniverseGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

    // Animation state stored in a ref so we can mutate without re-rendering
  const stateRef = useRef({
    scale: 200, // pixels per world unit
    cx: 0,
    cy: 0,
    targetCx: 0,
    targetCy: 0,
    mode: "in" as Mode,
    speed: 1, // 1 = normal
    lastT: 0,
    frame: 0,
  })

  const [mode, setMode] = useState<Mode>("in")
  const [depthLabel, setDepthLabel] = useState("0.0")

  useEffect(() => {
    stateRef.current.mode = mode
  }, [mode])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      const s = stateRef.current
      const dt = Math.min(0.05, (now - s.lastT) / 1000 || 0.016)
      s.lastT = now

      // Update scale based on mode
      if (s.mode === "in") {
        s.scale *= Math.exp(0.35 * dt * s.speed)
      } else if (s.mode === "out") {
        s.scale *= Math.exp(-0.35 * dt * s.speed)
      }

      // Smoothly chase target center (for click-to-pan)
      s.cx += (s.targetCx - s.cx) * Math.min(1, dt * 4)
      s.cy += (s.targetCy - s.cy) * Math.min(1, dt * 4)

      // Soft-clamp scale to a very wide but float-safe range.
      // (We don't renormalize cx/cy because the procedural field is keyed
      // on absolute world coords — rescaling would shuffle the universe.)
      if (s.scale > 1e14) s.scale = 1e14
      if (s.scale < 1e-10) s.scale = 1e-10

      // Background
      ctx.fillStyle = "#06060c"
      ctx.fillRect(0, 0, width, height)

      // Faint nebula gradients drifting with depth for atmosphere
      const phase = Math.log2(s.scale) * 0.4 + s.cx * 0.001
      const ng1 = ctx.createRadialGradient(
        width * (0.3 + 0.1 * Math.sin(phase)),
        height * (0.4 + 0.08 * Math.cos(phase * 0.7)),
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7,
      )
      ng1.addColorStop(0, "rgba(120, 90, 210, 0.18)")
      ng1.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = ng1
      ctx.fillRect(0, 0, width, height)

      const ng2 = ctx.createRadialGradient(
        width * (0.7 + 0.1 * Math.cos(phase * 0.9)),
        height * (0.65 + 0.08 * Math.sin(phase * 1.1)),
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.6,
      )
      ng2.addColorStop(0, "rgba(80, 160, 220, 0.15)")
      ng2.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = ng2
      ctx.fillRect(0, 0, width, height)

      // Determine octave range: cellScreen = 2^o * scale ∈ [40, 800] (visible)
      // 2^o = px/scale → o = log2(px/scale)
      const oMin = Math.floor(Math.log2(40 / s.scale))
      const oMax = Math.ceil(Math.log2(800 / s.scale))

      const halfW = width / 2
      const halfH = height / 2

      for (let o = oMin; o <= oMax; o++) {
        const cellWorld = Math.pow(2, o)
        const cellScreen = cellWorld * s.scale
        const vis = octaveVisibility(cellScreen)
        if (vis <= 0.001) continue

        // Visible range in world coords
        const viewLeft = s.cx - halfW / s.scale
        const viewRight = s.cx + halfW / s.scale
        const viewTop = s.cy - halfH / s.scale
        const viewBottom = s.cy + halfH / s.scale

        const cMinX = Math.floor(viewLeft / cellWorld) - 1
        const cMaxX = Math.ceil(viewRight / cellWorld) + 1
        const cMinY = Math.floor(viewTop / cellWorld) - 1
        const cMaxY = Math.ceil(viewBottom / cellWorld) + 1

        // Cap iteration count for safety (shouldn't normally trigger)
        const cells = (cMaxX - cMinX + 1) * (cMaxY - cMinY + 1)
        if (cells > 8000) continue

        for (let ix = cMinX; ix <= cMaxX; ix++) {
          for (let iy = cMinY; iy <= cMaxY; iy++) {
            const rng = mulberry32(cellSeed(ix, iy, o))
            const kind = rng() // 0..1 — what's in this cell
            const numStars =
              kind < 0.04
                ? 12 + Math.floor(rng() * 20) // dense cluster (galaxy)
                : kind < 0.5
                ? 1 + Math.floor(rng() * 3)
                : 0

            // Pre-compute galaxy params if cluster
            const isGalaxy = kind < 0.04
            const gAngle = isGalaxy ? rng() * Math.PI : 0
            const gAspect = isGalaxy ? 0.25 + rng() * 0.4 : 1
            const gHue = isGalaxy ? rng() : 0

            for (let k = 0; k < numStars; k++) {
              let lx: number
              let ly: number
              if (isGalaxy) {
                // Cluster around cell center with elliptical falloff
                const r = Math.pow(rng(), 1.6) * 0.45
                const a = rng() * Math.PI * 2
                const ex = Math.cos(a) * r
                const ey = Math.sin(a) * r * gAspect
                const cosA = Math.cos(gAngle)
                const sinA = Math.sin(gAngle)
                lx = 0.5 + ex * cosA - ey * sinA
                ly = 0.5 + ex * sinA + ey * cosA
              } else {
                lx = rng()
                ly = rng()
              }

              const wx = (ix + lx) * cellWorld
              const wy = (iy + ly) * cellWorld
              const sx = (wx - s.cx) * s.scale + halfW
              const sy = (wy - s.cy) * s.scale + halfH

              // Cull
              if (sx < -8 || sx > width + 8 || sy < -8 || sy > height + 8) {
                rng() // consume for determinism
                rng()
                rng()
                continue
              }

              const sizeR = rng()
              const colorR = isGalaxy ? gHue + rng() * 0.05 : rng()
              const brightR = rng()

              // Star size scales with octave so big-cell stars are bigger
              const sizeFactor = Math.max(0.6, Math.min(3.5, cellScreen / 180))
              const baseSize = 0.4 + sizeR * 1.4
              const size = baseSize * sizeFactor

              const alpha = (0.35 + brightR * 0.65) * vis

              // Twinkle (subtle, per-star phase)
              const twinkle =
                0.85 + 0.15 * Math.sin(now * 0.002 + sizeR * 50 + brightR * 30)
              const a = alpha * twinkle

              let color: string
              if (colorR < 0.08) {
                color = `rgba(255, 215, 140, ${a})` // gold
              } else if (colorR < 0.18) {
                color = `rgba(170, 210, 255, ${a})` // blue
              } else if (colorR < 0.24) {
                color = `rgba(255, 170, 180, ${a})` // pink
              } else if (colorR < 0.27) {
                color = `rgba(180, 255, 220, ${a})` // teal
              } else {
                color = `rgba(245, 245, 230, ${a})` // white
              }

              // Halo for larger stars
              if (size > 1.6) {
                const haloR = size * 5
                const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, haloR)
                grad.addColorStop(0, color)
                grad.addColorStop(1, "rgba(0,0,0,0)")
                ctx.fillStyle = grad
                ctx.beginPath()
                ctx.arc(sx, sy, haloR, 0, Math.PI * 2)
                ctx.fill()
              }

              // Star core
              ctx.beginPath()
              ctx.arc(sx, sy, size, 0, Math.PI * 2)
              ctx.fillStyle = color
              ctx.fill()
            }
          }
        }
      }

      // Update depth label about ~5x/sec
      s.frame = (s.frame + 1) | 0
      if (s.frame % 12 === 0) {
        setDepthLabel(Math.log2(s.scale).toFixed(1))
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    stateRef.current.lastT = performance.now()
    rafRef.current = requestAnimationFrame(draw)

    const ro = new ResizeObserver(resize)
    ro.observe(container)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  // Click to recenter: pan camera toward clicked point
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const rect = container.getBoundingClientRect()
    const px = e.clientX - rect.left - rect.width / 2
    const py = e.clientY - rect.top - rect.height / 2
    const s = stateRef.current
    s.targetCx = s.cx + px / s.scale
    s.targetCy = s.cy + py / s.scale
  }

  const handleReset = () => {
    const s = stateRef.current
    s.scale = 200
    s.cx = 0
    s.cy = 0
    s.targetCx = 0
    s.targetCy = 0
    setMode("in")
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/60 bg-[#06060c] sm:aspect-[16/9]"
    >
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="block h-full w-full cursor-crosshair"
        aria-label="Procedural universe — click to navigate"
      />

      {/* Reticle */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-foreground/40" />
        <div className="absolute left-1/2 bottom-0 h-2 w-px -translate-x-1/2 bg-foreground/40" />
        <div className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-foreground/40" />
        <div className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-foreground/40" />
      </div>

      {/* HUD */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3 sm:p-4"
      >
        <div className="glass pointer-events-auto rounded-full px-3 py-1.5 text-[11px] tracking-wide text-muted-foreground">
          <span className="text-foreground/70">depth</span>{" "}
          <span className="font-mono tabular-nums text-foreground">
            {depthLabel}
          </span>
        </div>
        <div className="glass pointer-events-auto hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] text-muted-foreground sm:flex">
          <Sparkles className="size-3 text-primary" aria-hidden />
          click anywhere to navigate
        </div>
      </motion.div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center p-3 sm:p-4">
        <div className="glass flex items-center gap-1 rounded-full p-1">
          <ControlButton
            label="Zoom in"
            active={mode === "in"}
            onClick={() => setMode("in")}
          >
            <ZoomIn className="size-4" />
          </ControlButton>
          <ControlButton
            label={mode === "paused" ? "Play" : "Pause"}
            onClick={() =>
              setMode((m) => (m === "paused" ? "in" : "paused"))
            }
          >
            {mode === "paused" ? (
              <Play className="size-4" />
            ) : (
              <Pause className="size-4" />
            )}
          </ControlButton>
          <ControlButton
            label="Zoom out"
            active={mode === "out"}
            onClick={() => setMode("out")}
          >
            <ZoomOut className="size-4" />
          </ControlButton>
          <div className="mx-1 h-5 w-px bg-foreground/15" />
          <ControlButton label="Reset" onClick={handleReset}>
            <RotateCcw className="size-4" />
          </ControlButton>
        </div>
      </div>
    </div>
  )
}

function ControlButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="ghost"
      size="sm"
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "h-9 w-9 rounded-full p-0 text-muted-foreground hover:bg-foreground/10 hover:text-foreground",
        active && "bg-primary/15 text-primary hover:bg-primary/20",
      )}
    >
      {children}
    </Button>
  )
}
