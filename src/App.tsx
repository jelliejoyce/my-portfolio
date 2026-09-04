import { useEffect, useRef, useState } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS (per blueprint — strict 2-accent system on white)
//   bg #FFFFFF · surface #F8FAF8 · ink #1E1E1C · body #5B5B57 · border #EAEAE6
//   green  50 #EAF6EE  200 #C9E4D0  500 #7FB08F  700 #5C9370
//   violet 50 #F2EEFA  200 #DCCFEF  500 #B39DDB  700 #9678C9
// ═══════════════════════════════════════════════════════════════════════════

// ─── useFinePointer ───────────────────────────────────────────────────────────
// Gates every cursor-driven effect: only fires for mouse users who haven't
// asked for reduced motion. Touch devices and reduced-motion users get the
// static / scroll-only fallback everywhere this is checked.
function useFinePointer() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const pointerMq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(pointerMq.matches && !motionMq.matches)
    update()
    pointerMq.addEventListener('change', update)
    motionMq.addEventListener('change', update)
    return () => {
      pointerMq.removeEventListener('change', update)
      motionMq.removeEventListener('change', update)
    }
  }, [])
  return enabled
}

// ─── Magnetic ─────────────────────────────────────────────────────────────────
// Wraps a link/button and pulls it a few px toward the cursor when nearby.
function Magnetic({
  children,
  strength = 0.3,
  max = 6,
}: {
  children: React.ReactNode
  strength?: number
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()

  useEffect(() => {
    const el = ref.current
    if (!el || !fine) return
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      const radius = Math.max(rect.width, rect.height) * 1.6 + 24
      const dist = Math.hypot(relX, relY)
      if (dist < radius) {
        const pull = 1 - dist / radius
        const dx = Math.max(-max, Math.min(max, relX * strength * pull))
        const dy = Math.max(-max, Math.min(max, relY * strength * pull))
        el.style.transform = `translate(${dx}px, ${dy}px)`
      } else {
        el.style.transform = 'translate(0, 0)'
      }
    }
    const reset = () => {
      el.style.transform = 'translate(0, 0)'
    }
    window.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', reset)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', reset)
    }
  }, [fine, strength, max])

  return (
    <div ref={ref} style={{ display: 'inline-flex', transition: 'transform 0.2s cubic-bezier(0.2,0.8,0.2,1)' }}>
      {children}
    </div>
  )
}

// ─── CustomCursor ─────────────────────────────────────────────────────────────
function CustomCursor() {
  const fine = useFinePointer()
  const dotRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const [variant, setVariant] = useState<'default' | 'link' | 'card'>('default')

  useEffect(() => {
    document.body.classList.toggle('custom-cursor-active', fine)
    return () => document.body.classList.remove('custom-cursor-active')
  }, [fine])

  useEffect(() => {
    if (!fine) return

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    let raf = 0
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22
      pos.current.y += (target.current.y - pos.current.y) * 0.22
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest?.('[data-cursor-card]')) setVariant('card')
      else if (t.closest?.('a, button')) setVariant('link')
    }
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest?.('[data-cursor-card]') || t.closest?.('a, button')) setVariant('default')
    }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [fine])

  if (!fine) return null

  const size = variant === 'default' ? 9 : variant === 'link' ? 26 : 46

  return (
    <div
      ref={dotRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        background: variant === 'default' ? '#7FB08F' : 'rgba(255,255,255,0.6)',
        border: variant === 'default' ? 'none' : `1.5px solid ${variant === 'link' ? '#B39DDB' : '#7FB08F'}`,
        opacity: variant === 'default' ? 0.55 : 0.95,
        pointerEvents: 'none',
        zIndex: 999,
        transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, border-color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans)',
        fontSize: 9,
        fontWeight: 600,
        color: '#5C9370',
        letterSpacing: '0.02em',
      }}
    >
      {variant === 'card' ? 'View' : null}
    </div>
  )
}

// ─── ReactiveBackground ───────────────────────────────────────────────────────
// Replaces the old auto-looping ParallaxShapes. Every motion here is driven
// by scroll position (user input) or cursor position (gated to fine pointers).
function ReactiveBackground({ scrollY }: { scrollY: number }) {
  const fine = useFinePointer()
  const spotRef = useRef<HTMLDivElement>(null)
  const sageRef = useRef<HTMLDivElement>(null)
  const lavenderRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(scrollY)
  scrollRef.current = scrollY

  useEffect(() => {
    if (!fine) return

    const onMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(circle 200px at ${(e.clientX / window.innerWidth) * 100}% ${(e.clientY / window.innerHeight) * 100}%, ${e.clientX < window.innerWidth / 2 ? 'rgba(127,176,143,0.10)' : 'rgba(179,157,219,0.10)'}, transparent 70%)`
      }
    }
    window.addEventListener('mousemove', onMove)

    let raf = 0
    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.05
      current.current.y += (target.current.y - current.current.y) * 0.05
      if (sageRef.current) {
        sageRef.current.style.transform = `translate(${current.current.x * 18}px, ${scrollRef.current * 0.08 + current.current.y * 14}px)`
      }
      if (lavenderRef.current) {
        lavenderRef.current.style.transform = `translate(${current.current.x * -14}px, ${scrollRef.current * 0.05 + current.current.y * -10}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [fine])

  // Scroll-only fallback for touch / reduced-motion
  useEffect(() => {
    if (fine) return
    if (sageRef.current) sageRef.current.style.transform = `translateY(${scrollY * 0.08}px)`
    if (lavenderRef.current) lavenderRef.current.style.transform = `translateY(${scrollY * 0.05}px)`
  }, [scrollY, fine])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* base dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, #1E1E1C 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.05,
        }}
      />
      {/* cursor spotlight, brightens/tints the grid near the pointer */}
      {fine && (
        <div
          ref={spotRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle 200px at 50% 30%, rgba(127,176,143,0.10), transparent 70%)',
          }}
        />
      )}
      {/* sage blob */}
      <div
        ref={sageRef}
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #C9E4D0, #7FB08F)',
          top: -140,
          right: -100,
          filter: 'blur(75px)',
          opacity: 0.32,
        }}
      />
      {/* lavender blob */}
      <div
        ref={lavenderRef}
        style={{
          position: 'absolute',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 60% 30%, #DCCFEF, #B39DDB)',
          top: 320,
          left: -90,
          filter: 'blur(60px)',
          opacity: 0.28,
        }}
      />
      {/* static geometric accents, scroll-drift only */}
      <div
        style={{
          position: 'absolute',
          width: 80,
          height: 80,
          border: '2px solid #7FB08F',
          borderRadius: 12,
          top: 200,
          right: '25%',
          opacity: 0.08,
          transform: `translateY(${scrollY * 0.1}px) rotate(28deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 120,
          height: 120,
          backgroundImage: 'radial-gradient(circle, #7FB08F 1.5px, transparent 1.5px)',
          backgroundSize: '14px 14px',
          top: 460,
          right: '8%',
          opacity: 0.15,
          transform: `translateY(${scrollY * 0.09}px)`,
        }}
      />
      <svg
        style={{
          position: 'absolute',
          width: 100,
          height: 100,
          top: 920,
          left: '12%',
          opacity: 0.09,
          transform: `translateY(${scrollY * 0.06}px)`,
        }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <polygon points="50,8 92,85 8,85" stroke="#B39DDB" strokeWidth="2" />
      </svg>
      <div
        style={{
          position: 'absolute',
          width: 56,
          height: 56,
          border: '2px solid #DCCFEF',
          borderRadius: '50%',
          top: 1220,
          right: '30%',
          opacity: 0.12,
          transform: `translateY(${scrollY * 0.11}px)`,
        }}
      />
    </div>
  )
}

// ─── InteractiveName ──────────────────────────────────────────────────────────
// Letter-by-letter hover response — each character lifts and shifts toward
// the accent colors when the name is hovered. Purely hover-triggered, resets
// on mouse-leave, no auto-loop.
function InteractiveName({ text }: { text: string }) {
  const [hovered, setHovered] = useState(false)
  const letters = text.split('')
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'inline-block', cursor: 'default' }}
    >
      {letters.map((ch, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            transform: hovered ? `translateY(-${4 + (i % 3) * 3}px)` : 'translateY(0)',
            color: hovered ? (i % 2 === 0 ? '#7FB08F' : '#9678C9') : '#1E1E1C',
            transition: `transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.025}s, color 0.35s ease ${i * 0.025}s`,
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}

// ─── HeroPhoto ────────────────────────────────────────────────────────────────
// Styled placeholder (swap for a real photo later). Glow shifts toward the
// cursor when hovered; static gradient on touch devices.
function HeroPhoto() {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!fine || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    ref.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(127,176,143,0.4), rgba(179,157,219,0.28) 55%, #F8FAF8 100%)`
  }
  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.background = 'radial-gradient(circle at 50% 30%, rgba(127,176,143,0.4), rgba(179,157,219,0.28) 55%, #F8FAF8 100%)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="hero-photo animate-fade-in"
      style={{
        position: 'relative',
        borderRadius: 28,
        aspectRatio: '4 / 5',
        width: '100%',
        maxWidth: 300,
        background: 'radial-gradient(circle at 50% 30%, rgba(127,176,143,0.4), rgba(179,157,219,0.28) 55%, #F8FAF8 100%)',
        border: '1.5px dashed #C9E4D0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 72,
        transition: 'background 0.2s ease',
      }}
      title="Replace with your photo"
    >
      🪴
    </div>
  )
}

// ─── WorkflowMini ─────────────────────────────────────────────────────────────
// A small, per-project flow diagram reused from the original WorkflowMockup —
// relocated here from the hero, per the blueprint. Steps play in, staggered,
// once when the card first scrolls into view (never on a loop).
interface WorkflowStep {
  icon: string
  label: string
}
function WorkflowMini({ steps, accent, play }: { steps: WorkflowStep[]; accent: string; play: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {steps.map((step, i) => (
        <div
          key={step.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            opacity: play ? 1 : 0,
            transform: play ? 'translateX(0)' : 'translateX(-10px)',
            transition: `opacity 0.45s ease ${i * 0.12}s, transform 0.45s ease ${i * 0.12}s`,
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              background: accent,
              boxShadow: `0 4px 10px ${accent}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              flexShrink: 0,
            }}
          >
            {step.icon}
          </span>
          <span
            style={{
              flex: 1,
              height: 6,
              borderRadius: 3,
              background: accent,
              opacity: 0.8,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 500,
              color: '#5B5B57',
              whiteSpace: 'nowrap',
            }}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
interface ProjectCardProps {
  title: string
  objective: string
  architecture: string
  accent: string
  steps: WorkflowStep[]
  index: number
}
function ProjectCard({ title, objective, architecture, accent, steps, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [played, setPlayed] = useState(false)
  const fine = useFinePointer()

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setPlayed(true)),
      { threshold: 0.45 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!fine || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -5, y: px * 5 })
  }
  const handleLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <div
      ref={cardRef}
      data-cursor-card
      className="project-card animate-fade-up"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        flex: '0 0 320px',
        scrollSnapAlign: 'start',
        borderRadius: 20,
        background: '#FFFFFF',
        border: '1px solid #EAEAE6',
        overflow: 'hidden',
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.25s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
        boxShadow: '0 24px 48px rgba(30,30,28,0.06)',
      }}
    >
      {/* Diagram header */}
      <div
        style={{
          padding: '22px 22px 20px',
          background: '#F8FAF8',
          position: 'relative',
          borderBottom: '1px solid #EAEAE6',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 18,
            right: 20,
            fontFamily: "'Trispace', monospace",
            fontSize: '0.75rem',
            color: accent,
            letterSpacing: '0.06em',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div style={{ maxWidth: 210 }}>
          <WorkflowMini steps={steps} accent={accent} play={played} />
        </div>
      </div>

      {/* Copy */}
      <div style={{ padding: '22px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            color: '#1E1E1C',
            marginBottom: 10,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: '#5B5B57',
            lineHeight: 1.65,
            marginBottom: 14,
          }}
        >
          {objective}
        </p>
        <div style={{ paddingTop: 12, borderTop: '1px solid #EAEAE6' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              color: '#8A8983',
              lineHeight: 1.5,
            }}
          >
            {architecture}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── ProjectsTrack ────────────────────────────────────────────────────────────
// Horizontal, scroll-snapped rail. Vertical wheel input over the section is
// redirected to horizontal scroll (desktop only); touch devices get native
// overflow-x swiping for free.
function ProjectsTrack({ projects }: { projects: ProjectCardProps[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const fine = useFinePointer()

  useEffect(() => {
    const el = trackRef.current
    if (!el || !fine) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [fine])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const cardWidth = el.scrollWidth / projects.length
      const idx = Math.round(el.scrollLeft / cardWidth)
      setActiveIndex(Math.max(0, Math.min(projects.length - 1, idx)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [projects.length])

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={trackRef}
        className="projects-track"
        style={{
          display: 'flex',
          gap: 24,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: 8,
          paddingRight: 40,
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.title} {...p} index={i} />
        ))}
      </div>

      {/* fade-out edge cue */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 8,
          width: 90,
          background: 'linear-gradient(90deg, transparent, #FFFFFF)',
          pointerEvents: 'none',
        }}
      />

      {/* progress dots */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 28 }}>
        {projects.map((_, i) => (
          <span
            key={i}
            style={{
              width: activeIndex === i ? 22 : 6,
              height: 6,
              borderRadius: 3,
              background: activeIndex === i ? '#7FB08F' : '#EAEAE6',
              transition: 'width 0.25s ease, background 0.25s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── SkillChip ────────────────────────────────────────────────────────────────
function SkillChip({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.75rem',
        fontWeight: 500,
        color: '#4A5C4E',
        background: '#EAF6EE',
        border: '1px solid #C9E4D0',
        borderRadius: 100,
        padding: '4px 12px',
      }}
    >
      {label}
    </span>
  )
}

// ─── StatBlock ────────────────────────────────────────────────────────────────
function StatBlock({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '16px 10px' }}>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          color: '#7FB08F',
          lineHeight: 1,
          marginBottom: 5,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.78rem',
          color: '#5B5B57',
          fontWeight: 400,
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </div>
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
// Floating, edge-detached capsule. A pastel-green dot slides beneath the
// active section link (IntersectionObserver-driven). Links are magnetic.
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('work')
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const wrapRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)

  const navItems = [
    { key: 'work', label: 'Work' },
    { key: 'about', label: 'About' },
    { key: 'certificates', label: 'Certs' },
    { key: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.key)).filter(Boolean) as HTMLElement[]
    if (sections.length < navItems.length) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const el = linkRefs.current[active]
    if (el && wrapRef.current) {
      const wrapRect = wrapRef.current.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      setIndicator({ left: elRect.left - wrapRect.left, width: elRect.width })
    }
  }, [active, menuOpen])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 18,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 20px',
        }}
      >
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 28,
            width: '100%',
            maxWidth: 660,
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(14px)',
            border: '1px solid #EAEAE6',
            borderRadius: 100,
            padding: '10px 12px 10px 22px',
            boxShadow: scrolled ? '0 14px 34px rgba(30,30,28,0.09)' : '0 4px 16px rgba(30,30,28,0.04)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <span
            style={{
              fontFamily: "'Trispace', monospace",
              fontSize: '0.95rem',
              fontWeight: 400,
              color: '#1E1E1C',
              letterSpacing: '0.04em',
              flexShrink: 0,
            }}
          >
            jellie <span style={{ color: '#7FB08F' }}>✦</span>
          </span>

          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
            <div ref={wrapRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 26 }}>
              {navItems.map((item) => (
                <Magnetic key={item.key} strength={0.3} max={5}>
                  <a
                    ref={(el) => {
                      linkRefs.current[item.key] = el
                    }}
                    href={`#${item.key}`}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: active === item.key ? '#1E1E1C' : '#5B5B57',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {item.label}
                  </a>
                </Magnetic>
              ))}
              {indicator && (
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    bottom: -9,
                    left: indicator.left,
                    width: indicator.width,
                    height: 3,
                    borderRadius: 2,
                    background: '#7FB08F',
                    transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              )}
            </div>

            <Magnetic strength={0.25} max={5}>
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  background: '#7FB08F',
                  borderRadius: 100,
                  padding: '9px 18px',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = '#5C9370'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = '#7FB08F'
                }}
              >
                Let's Talk
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#DCCFEF', flexShrink: 0 }} />
              </a>
            </Magnetic>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              width: 32,
              height: 32,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                display: 'block',
                width: 18,
                height: 2,
                borderRadius: 2,
                background: '#1E1E1C',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 18,
                height: 2,
                borderRadius: 2,
                background: '#1E1E1C',
                transition: 'opacity 0.2s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: 18,
                height: 2,
                borderRadius: 2,
                background: '#1E1E1C',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className="mobile-menu"
        style={{
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          position: 'fixed',
          top: 78,
          left: 20,
          right: 20,
          zIndex: 49,
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(14px)',
          border: '1px solid #EAEAE6',
          borderRadius: 20,
          padding: '10px 20px 20px',
          gap: 4,
          boxShadow: '0 20px 40px rgba(30,30,28,0.1)',
        }}
      >
        {navItems.map((item) => (
          <a
            key={item.key}
            href={`#${item.key}`}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 500,
              color: '#1E1E1C',
              textDecoration: 'none',
              padding: '12px 4px',
              borderBottom: '1px solid #EAEAE6',
            }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#FFFFFF',
            background: '#7FB08F',
            borderRadius: 100,
            padding: '12px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            marginTop: 12,
          }}
        >
          Let's Talk
        </a>
      </div>
    </>
  )
}

// ─── ContactForm ──────────────────────────────────────────────────────────────
// Logic byte-for-byte identical to the original — state, Web3Forms submission,
// honeypot, and validation are untouched. Only the surrounding styling and the
// focus-ring accent (alternating green / violet) changed.
function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const inputStyle = {
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    color: '#1E1E1C',
    background: '#FFFFFF',
    border: '1px solid #EAEAE6',
    borderRadius: 12,
    padding: '14px 18px',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  }

  const focusColors: Record<string, { border: string; ring: string }> = {
    name: { border: '#7FB08F', ring: 'rgba(127, 176, 143, 0.14)' },
    email: { border: '#B39DDB', ring: 'rgba(179, 157, 219, 0.14)' },
    message: { border: '#7FB08F', ring: 'rgba(127, 176, 143, 0.14)' },
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const c = focusColors[e.target.name] ?? focusColors.name
    e.target.style.borderColor = c.border
    e.target.style.boxShadow = `0 0 0 3px ${c.ring}`
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#EAEAE6'
    e.target.style.boxShadow = 'none'
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)

    // Scraping form fields straight out of the active element layout context
    const formData = new FormData(e.currentTarget)
    formData.append("access_key", "5610e500-aa2b-4bd5-b35c-22909c198635")
    formData.append("subject", "New Portfolio Lead Inflow Notification")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
      } else {
        alert("The server received the data packet but rejected the parameters.")
      }
    } catch (error) {
      alert("Submission error. Please check your network connection and retry.")
    } finally {
      setIsSending(false)
    }
  }

  if (submitted) {
    return (
      <div
        className="animate-fade-up"
        style={{
          textAlign: 'center',
          padding: '60px 40px',
          background: '#F8FAF8',
          borderRadius: 20,
          border: '1px solid #EAEAE6',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            color: '#1E1E1C',
            marginBottom: 10,
          }}
        >
          Message received.
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', color: '#5B5B57', fontSize: '0.9rem' }}>
          I'll be in touch within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Hidden honeypot field prevents bot entries and forces Web3Forms validation success */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }}></input>

      <div className="contact-form-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#9B9890',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            spellCheck={false}
            autoComplete="name"
            data-gramm="false"
            data-gramm_editor="false"
          />
        </div>
        <div>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#9B9890',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            spellCheck={false}
            autoComplete="email"
            data-gramm="false"
            data-gramm_editor="false"
          />
        </div>
      </div>
      <div>
        <label
          style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#9B9890',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project..."
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 } as React.CSSProperties}
          onFocus={handleFocus}
          onBlur={handleBlur}
          spellCheck={false}
          autoComplete="off"
          data-gramm="false"
          data-gramm_editor="false"
        />
      </div>
      <button
        type="submit"
        disabled={isSending}
        style={{
          alignSelf: 'flex-start',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#FFFFFF',
          background: '#1E1E1C',
          border: 'none',
          borderRadius: 100,
          padding: '14px 32px',
          cursor: isSending ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s ease, transform 0.2s ease',
          opacity: isSending ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isSending) {
            ;(e.target as HTMLElement).style.background = '#7FB08F'
            ;(e.target as HTMLElement).style.transform = 'scale(1.03)'
          }
        }}
        onMouseLeave={(e) => {
          ;(e.target as HTMLElement).style.background = '#1E1E1C'
          ;(e.target as HTMLElement).style.transform = 'scale(1)'
        }}
      >
        {isSending ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const projects: Omit<ProjectCardProps, 'index'>[] = [
    {
      title: 'The Automated Lead Capture Engine',
      objective:
        'Designed for local service businesses to capture web traffic and instantly trigger automated email replies within 2 minutes of a form submission.',
      architecture: 'Custom Landing Page · Email Reply Automation · Calendar Integration',
      accent: '#7FB08F',
      steps: [
        { icon: '⚡', label: 'Lead Captured' },
        { icon: '✉️', label: 'Email Triggered' },
        { icon: '📅', label: 'Calendar Booked' },
      ],
    },
    {
      title: 'The SMS Nurture Sequence Blueprint',
      objective:
        'A multi-touch SMS and email drip sequence that keeps cold leads warm over 21 days, engineered to re-engage prospects who ghosted after the first touchpoint.',
      architecture: 'SMS Workflow · Email Sequences · Lead Scoring Tags · Pipeline Automation',
      accent: '#B39DDB',
      steps: [
        { icon: '💬', label: 'SMS Sent' },
        { icon: '🏷️', label: 'Lead Scored' },
        { icon: '🔁', label: 'Re-engaged' },
      ],
    },
    {
      title: 'The Smart Booking Calendar System',
      objective:
        'A fully automated appointment funnel that qualifies, books, and confirms clients without any manual input — freeing the business owner from inbox management entirely.',
      architecture: 'Booking Funnel · Confirmation Workflows · No-Show Re-Engagement · CRM Sync',
      accent: '#5C9370',
      steps: [
        { icon: '📅', label: 'Slot Booked' },
        { icon: '✅', label: 'Confirmed' },
        { icon: '🔄', label: 'CRM Synced' },
      ],
    },
  ]

  const skills = [
    'GoHighLevel',
    'CRM Architecture',
    'Workflow Automation',
    'Sales Pipelines',
    'Funnel Design',
    'Email/SMS Nurturing',
    'Lead Management',
    'Appointment Booking',
    'Analytics & Reporting',
    'Make',
    'AI',
  ]

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <ReactiveBackground scrollY={scrollY} />
      <CustomCursor />
      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '160px 40px 90px',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(220px, 340px) 1fr',
            gap: 64,
            alignItems: 'center',
            width: '100%',
            maxWidth: 1080,
            margin: '0 auto',
          }}
        >
          {/* Left: photo */}
          <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'center' }}>
            <HeroPhoto />
          </div>

          {/* Right: copy */}
          <div style={{ textAlign: 'left' }}>
            <h1
              className="animate-fade-up delay-100"
              style={{
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                  fontSize: '1.3rem',
                  color: '#5B5B57',
                  marginBottom: 4,
                }}
              >
                Hey there, I'm
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Trispace', monospace",
                  fontWeight: 500,
                  fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
                  letterSpacing: '0.005em',
                  color: '#1E1E1C',
                }}
              >
                <InteractiveName text="Jellie Joyce" />
              </span>
            </h1>

            {/* Role pill */}
            <div
              className="animate-fade-in delay-150"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#F8FAF8',
                border: '1px solid #EAEAE6',
                borderRadius: 100,
                padding: '6px 16px',
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#7FB08F',
                  display: 'inline-block',
                  boxShadow: '0 0 0 3px rgba(127,176,143,0.22)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: '#5B5B57',
                  letterSpacing: '0.02em',
                }}
              >
                GoHighLevel Specialist · CRM &amp; Automation
              </span>
            </div>

            {/* Bio */}
            <p
              className="animate-fade-up delay-200"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: '#5B5B57',
                maxWidth: 460,
                lineHeight: 1.7,
                marginBottom: 18,
                fontWeight: 300,
              }}
            >
              I turn messy business ops into streamlined, revenue-generating machines — so you get
              to focus on your clients, not your CRM.
            </p>

            {/* Tagline accent */}
            <p
              className="animate-fade-up delay-250"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: '#9678C9',
                marginBottom: 22,
              }}
            >
              ✦ "Systems that work while you sleep."
            </p>

            {/* CTAs */}
            <div
              className="hero-ctas animate-fade-up delay-300"
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 26 }}
            >
              <Magnetic strength={0.2} max={5}>
                <a
                  href="/resume.pdf"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    background: '#9678C9',
                    borderRadius: 100,
                    padding: '14px 28px',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = '#8563B8'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = '#9678C9'
                  }}
                >
                  Download Resume ↓
                </a>
              </Magnetic>
              <Magnetic strength={0.2} max={5}>
                <a
                  href="#work"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    background: '#1E1E1C',
                    borderRadius: 100,
                    padding: '14px 28px',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = '#7FB08F'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = '#1E1E1C'
                  }}
                >
                  View My Work →
                </a>
              </Magnetic>
            </div>

            {/* Identity line + availability */}
            <div
              className="animate-fade-up delay-350"
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  color: '#5B5B57',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                📍 Tokyo, Japan · GMT+9
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  color: '#5B5B57',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                🤿 Advanced Freediver
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS (horizontal track) ─────────────────────────────────── */}
      <section
        id="work"
        className="concepts-section"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 0 100px 40px',
        }}
      >
        <div style={{ maxWidth: 1160, margin: '0 auto 0 auto', paddingRight: 40 }}>
          <div style={{ marginBottom: 56, maxWidth: 640 }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#5C9370',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 14,
              }}
            >
              Platform Blueprints
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#1E1E1C',
                lineHeight: 1.15,
                marginBottom: 16,
                letterSpacing: '-0.015em',
              }}
            >
              Concept snapshots &amp; interactive builds
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: '#5B5B57',
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Pre-configured GoHighLevel frameworks engineered to solve common business
              bottlenecks. Built completely from scratch in my development sandbox.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 1160, margin: '0 auto', paddingRight: 40 }}>
          <ProjectsTrack projects={projects as ProjectCardProps[]} />
        </div>
      </section>

      {/* ── ABOUT / SKILLS ───────────────────────────────────────────────── */}
      <section
        id="about"
        className="about-section"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 40px',
        }}
      >
        <div
          className="about-grid"
          style={{
            maxWidth: 1160,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'start',
          }}
        >
          {/* Left: narrative */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#5C9370',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 14,
              }}
            >
              Background
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                color: '#1E1E1C',
                lineHeight: 1.2,
                marginBottom: 24,
                letterSpacing: '-0.015em',
              }}
            >
              Meet your <span style={{ fontStyle: 'italic', color: '#9678C9' }}>operational co-pilot</span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: '#4A4A46',
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              I am a GoHighLevel / Automation Specialist focused on transforming messy business operations into streamlined, revenue-generating machines.
              By centralizing your marketing, sales pipelines, and customer communication into one cohesive platform, I eliminate technical headaches and cut software overhead costs.
              When you partner with me, you get an agile, platform-focused expert who delivers turnkey automation, handling all the heavy lifting so you can focus entirely on serving your clients.
              <br />
              <br />
              Outside of work, I swap digital architecture for the beauty of the open ocean.
              I am a Molchanovs Certified Advanced Freediver and a PADI Certified Open Water Diver, and nothing compares to the absolute clarity and peace of being under the sea.
              Navigating complex business workflows actually requires a lot of the same calm, discipline, and adaptability as diving into the deep blue — and I bring that exact focus
              to every automation ecosystem I build.
            </p>
          </div>

          {/* Right: stats + skills */}
          <div>
            <div
              className="stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                background: '#FFFFFF',
                borderRadius: 16,
                border: '1px solid #EAEAE6',
                overflow: 'hidden',
                marginBottom: 20,
                boxShadow: '0 2px 16px rgba(30,30,28,0.04)',
              }}
            >
              {[
                { number: '<2min', label: 'Average Response Time' },
                { number: '21-Day', label: 'Nurture Sequences' },
                { number: '24/7', label: 'Systems Live' },
              ].map((stat, i) => (
                <div key={stat.label} style={{ borderRight: i < 2 ? '1px solid #EAEAE6' : 'none' }}>
                  <StatBlock {...stat} />
                </div>
              ))}
            </div>

            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                border: '1px solid #EAEAE6',
                padding: '18px',
                boxShadow: '0 2px 16px rgba(30,30,28,0.04)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#9B9890',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                Skills &amp; Tools
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skills.map((s) => (
                  <SkillChip key={s} label={s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATES ─────────────────────────────────────────────────── */}
      <section
        id="certificates"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 40px',
        }}
      >
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ maxWidth: 720 }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                color: '#1E1E1C',
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                marginBottom: 8,
              }}
            >
              <span style={{ fontStyle: 'italic', color: '#9678C9' }}>Credentials</span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: '#5B5B57',
                lineHeight: 1.6,
                fontWeight: 300,
                marginBottom: 32,
              }}
            >
              Verified certifications &amp; professional training
            </p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                {
                  title: 'AI Boost Bites: Automate tasks with Gemini and Apps Script',
                  issuer: 'Google',
                  date: '2026',
                  url: 'https://www.skills.google/public_profiles/0157d6a8-3b0c-44d2-bf61-6060bce44196/badges/26414443?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share',
                },
                {
                  title: 'AI Fluency Framework & Foundations',
                  issuer: 'Anthropic',
                  date: '2026',
                  url: 'https://verify.skilljar.com/c/2drrus4jxbrv',
                },
                {
                  title: 'AI Capabilities and Limitations',
                  issuer: 'Anthropic',
                  date: '2026',
                  url: 'https://verify.skilljar.com/c/uhroqca7r38j',
                },
                {
                  title: 'Introduction to Responsible AI',
                  issuer: 'Google',
                  date: '2026',
                  url: 'https://www.skills.google/public_profiles/0157d6a8-3b0c-44d2-bf61-6060bce44196/badges/26414962?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share',
                },
                {
                  title: 'Claude 101',
                  issuer: 'Anthropic',
                  date: '2026',
                  url: 'https://verify.skilljar.com/c/6nkq7vzv5y7g',
                },
                {
                  title: 'Introduction to Claude Cowork',
                  issuer: 'Anthropic',
                  date: '2026',
                  url: 'https://verify.skilljar.com/c/uav39s8hemj8',
                },
              ].map((cert, index) => {
                const accent = index % 2 === 0 ? '#7FB08F' : '#B39DDB'
                return (
                  <a
                    key={index}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-row"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 14px',
                      margin: '0 -14px',
                      borderRadius: 12,
                      borderBottom: '1px solid #EAEAE6',
                      textDecoration: 'none',
                      gap: 16,
                      transition: 'background 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.background = '#F8FAF8'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${accent}22`
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: accent,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem',
                        color: '#1E1E1C',
                        fontWeight: 400,
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      {cert.title}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.8rem',
                          color: '#8A8780',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {cert.issuer}
                      </span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#B5B2AA' }}>↗</span>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="contact-section"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 40px',
        }}
      >
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 80,
            alignItems: 'end',
            maxWidth: 1160,
            margin: '0 auto',
          }}
        >
          {/* Left: copy */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#5C9370',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 14,
              }}
            >
              Contact
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#1E1E1C',
                lineHeight: 1.15,
                marginBottom: 20,
                letterSpacing: '-0.015em',
              }}
            >
              Let's build something <span style={{ fontStyle: 'italic', color: '#7FB08F' }}>together.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: '#5B5B57',
                lineHeight: 1.75,
                fontWeight: 300,
                marginBottom: 40,
              }}
            >
              Whether you're starting from scratch or cleaning up a messy CRM, I'm here to help.
              Reach out and let's figure out what you need.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#EAF6EE',
                border: '1px solid #C9E4D0',
                borderRadius: 100,
                padding: '10px 20px',
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#7FB08F',
                  display: 'inline-block',
                  boxShadow: '0 0 0 3px rgba(127,176,143,0.3)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: '#4A5C4E',
                }}
              >
                Available for new projects
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'hello.jjoyce@gmail.com',
                  href: 'mailto:hello.jjoyce@gmail.com',
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  ),
                  label: 'Instagram',
                  value: '@jelejoys',
                  href: 'https://instagram.com/jelejoys',
                },
              ].map((link) => (
                <Magnetic key={link.label} strength={0.15} max={4}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 16px',
                      background: '#FAFAF6',
                      border: '1px solid #EAEAE6',
                      borderRadius: 12,
                      textDecoration: 'none',
                      color: '#4A4A46',
                      transition: 'border-color 0.2s ease, background 0.2s ease',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = '#7FB08F'
                      ;(e.currentTarget as HTMLElement).style.background = '#F8FAF8'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = '#EAEAE6'
                      ;(e.currentTarget as HTMLElement).style.background = '#FAFAF6'
                    }}
                  >
                    <span style={{ color: '#7FB08F', display: 'flex', flexShrink: 0 }}>{link.icon}</span>
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: '#9B9890',
                          letterSpacing: '0.07em',
                          textTransform: 'uppercase',
                          marginBottom: 1,
                        }}
                      >
                        {link.label}
                      </p>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.87rem', color: '#4A4A46' }}>{link.value}</p>
                    </div>
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer
        className="site-footer"
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid #EAEAE6',
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: "'Trispace', monospace",
            fontSize: '0.9rem',
            fontWeight: 400,
            color: '#1E1E1C',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Work With Me
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            color: '#B8B4AC',
          }}
        >
          © {new Date().getFullYear()} — Built to automate.
        </span>
      </footer>

      {/* Global + responsive styles */}
      <style>{`
        .custom-cursor-active,
        .custom-cursor-active a,
        .custom-cursor-active button {
          cursor: none !important;
        }

        .projects-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .projects-track::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up, .animate-fade-in {
            animation: none !important;
          }
        }

        /* ── Tablet (\u22641024px) ── */
        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .hero-grid {
            grid-template-columns: minmax(200px, 260px) 1fr !important;
            gap: 40px !important;
          }
        }

        /* ── Mobile (\u2264768px) ── */
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-toggle { display: flex !important; }

          .hero-section {
            padding: 110px 24px 60px !important;
            min-height: auto !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            justify-items: center;
            text-align: center !important;
          }
          .hero-grid > div:last-child {
            text-align: left !important;
          }
          .hero-ctas {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .hero-ctas a {
            text-align: center !important;
          }

          .concepts-section {
            padding: 72px 0 72px 24px !important;
          }

          .about-section {
            padding: 72px 24px !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }

          .contact-section {
            padding: 72px 24px !important;
          }
          .contact-form-name-row {
            grid-template-columns: 1fr !important;
          }

          .site-footer {
            padding: 24px 20px !important;
            flex-direction: column !important;
            gap: 8px !important;
            text-align: center !important;
          }
        }

        /* ── Small phones (\u2264480px) ── */
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid > div {
            border-right: none !important;
            border-bottom: 1px solid #EAEAE6 !important;
          }
          .stats-grid > div:last-child {
            border-bottom: none !important;
          }
          .cert-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
          }
        }
      `}</style>
    </div>
  )
}
