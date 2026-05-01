"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Ambient site-wide starfield. Sits fixed behind all content.
 * Adapts to light/dark theme via the `dark` class on <html>.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const [isDark, setIsDark] = useState(true)

  // Watch for theme class changes on <html>.
  useEffect(() => {
    const el = document.documentElement
    const update = () => setIsDark(el.classList.contains("dark"))
    update()
    const obs = new MutationObserver(update)
    obs.observe(el, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let stars: {
      x: number
      y: number
      r: number
      base: number
      speed: number
      phase: number
      tone: "warm" | "cool" | "neutral"
    }[] = []

    const palette = isDark
      ? {
          warm: (a: number) => `rgba(255, 220, 150, ${a})`,
          cool: (a: number) => `rgba(170, 210, 255, ${a})`,
          neutral: (a: number) => `rgba(245, 245, 235, ${a})`,
          nebulaA: "rgba(120, 90, 200, 0.10)",
          nebulaB: "rgba(80, 160, 220, 0.08)",
          baseAlpha: 1,
        }
      : {
          warm: (a: number) => `rgba(150, 100, 20, ${a})`,
          cool: (a: number) => `rgba(40, 90, 160, ${a})`,
          neutral: (a: number) => `rgba(40, 40, 80, ${a})`,
          nebulaA: "rgba(120, 90, 200, 0.06)",
          nebulaB: "rgba(80, 140, 220, 0.05)",
          baseAlpha: 0.55,
        }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const density = 0.00018
      const count = Math.floor(width * height * density)
      stars = Array.from({ length: count }, () => {
        const roll = Math.random()
        const tone: "warm" | "cool" | "neutral" =
          roll < 0.15 ? "warm" : roll < 0.3 ? "cool" : "neutral"
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.1 + 0.2,
          base: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 0.6 + 0.2,
          phase: Math.random() * Math.PI * 2,
          tone,
        }
      })
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)

      // Soft nebula gradients
      const g1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.3,
        0,
        width * 0.2,
        height * 0.3,
        Math.max(width, height) * 0.5,
      )
      g1.addColorStop(0, palette.nebulaA)
      g1.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, width, height)

      const g2 = ctx.createRadialGradient(
        width * 0.85,
        height * 0.7,
        0,
        width * 0.85,
        height * 0.7,
        Math.max(width, height) * 0.45,
      )
      g2.addColorStop(0, palette.nebulaB)
      g2.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, width, height)

      // Stars
      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase)
        const a = s.base * tw * palette.baseAlpha
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = palette[s.tone](a)
        ctx.fill()
      }
    }

    const tick = (t: number) => {
      draw(t)
      rafRef.current = requestAnimationFrame(tick)
    }

    resize()
    rafRef.current = requestAnimationFrame(tick)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [isDark])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* Vignette — dark in dark mode, light wash in light mode */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 80%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0) 0%, rgba(246,241,230,0.55) 80%)",
        }}
      />
    </div>
  )
}
