import { useEffect, useRef, useState } from 'react'

// ─── Floating Geometric Background ───────────────────────────────────────────
function ParallaxShapes({ scrollY }: { scrollY: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Large sage blob */}
      <div
        className="animate-float-a absolute rounded-full opacity-30"
        style={{
          width: 520,
          height: 520,
          background: 'radial-gradient(circle at 40% 40%, #B8D4BF, #8BA896)',
          top: -120,
          right: -100,
          filter: 'blur(60px)',
          transform: `translateY(${scrollY * 0.08}px)`,
          transition: 'transform 0.1s linear',
        }}
      />
      {/* Lavender blob */}
      <div
        className="animate-float-b absolute rounded-full opacity-25"
        style={{
          width: 380,
          height: 380,
          background: 'radial-gradient(circle at 60% 30%, #D5CAEB, #C4B5D4)',
          top: 300,
          left: -80,
          filter: 'blur(50px)',
          transform: `translateY(${scrollY * 0.05}px)`,
          transition: 'transform 0.1s linear',
        }}
      />
      {/* Cream accent blob */}
      <div
        className="animate-float-c absolute rounded-full opacity-40"
        style={{
          width: 260,
          height: 260,
          background: 'radial-gradient(circle at 50% 50%, #F5E9CC, #EDD9AA)',
          top: 600,
          right: '15%',
          filter: 'blur(40px)',
          transform: `translateY(${scrollY * 0.12}px)`,
          transition: 'transform 0.1s linear',
        }}
      />
      {/* Small geometric square */}
      <div
        className="animate-float-a absolute opacity-10"
        style={{
          width: 80,
          height: 80,
          border: '2px solid #6B9B78',
          borderRadius: '12px',
          top: 180,
          right: '25%',
          transform: `translateY(${scrollY * 0.15}px) rotate(28deg)`,
          transition: 'transform 0.1s linear',
        }}
      />
      {/* Dot cluster */}
      <div
        className="animate-float-b absolute opacity-20"
        style={{
          width: 120,
          height: 120,
          backgroundImage: 'radial-gradient(circle, #6B9B78 1.5px, transparent 1.5px)',
          backgroundSize: '14px 14px',
          top: 440,
          right: '8%',
          transform: `translateY(${scrollY * 0.09}px)`,
          transition: 'transform 0.1s linear',
        }}
      />
      {/* Triangle outline */}
      <svg
        className="animate-float-c absolute opacity-10"
        style={{
          width: 100,
          height: 100,
          top: 900,
          left: '12%',
          transform: `translateY(${scrollY * 0.07}px)`,
          transition: 'transform 0.1s linear',
        }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <polygon points="50,8 92,85 8,85" stroke="#C4B5D4" strokeWidth="2" />
      </svg>
      {/* Small circle outline */}
      <div
        className="animate-float-b absolute opacity-15"
        style={{
          width: 56,
          height: 56,
          border: '2px solid #D5CAEB',
          borderRadius: '50%',
          top: 1200,
          right: '30%',
          transform: `translateY(${scrollY * 0.11}px)`,
          transition: 'transform 0.1s linear',
        }}
      />
    </div>
  )
}

// ─── Workflow Mockup ──────────────────────────────────────────────────────────
function WorkflowMockup() {
  const steps = [
    { icon: '⚡', label: 'Lead Captured', color: '#B8D4BF' },
    { icon: '✉️', label: 'Email Triggered', color: '#D5CAEB' },
    { icon: '📅', label: 'Calendar Booked', color: '#F5E2B8' },
    { icon: '✓', label: 'Deal Closed', color: '#C8D4B8' },
  ]

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F2 100%)',
        border: '1px solid #E4E0D8',
        padding: '28px',
        width: '100%',
        maxWidth: 380,
      }}
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 mb-6">
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F5B8B8' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F5E2B8' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#B8D4BF' }} />
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            color: '#9B9890',
            marginLeft: 8,
            letterSpacing: '0.05em',
          }}
        >
          automation_workflow.ghl
        </span>
      </div>

      {/* Flow steps */}
      <div className="flex flex-col gap-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: step.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {step.icon}
            </div>
            <div
              style={{
                flex: 1,
                height: 8,
                borderRadius: 4,
                background: step.color,
                opacity: 0.6,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                fontWeight: 500,
                color: '#6B6860',
                whiteSpace: 'nowrap',
              }}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Footer stat */}
      <div
        className="mt-6 flex items-center justify-between rounded-xl px-4 py-3"
        style={{ background: '#F2EFE8' }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#9B9890' }}>
          Response time
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 600,
            color: '#6B9B78',
          }}
        >
          &lt; 2 min
        </span>
      </div>
    </div>
  )
}

// ─── Concept Card ─────────────────────────────────────────────────────────────
interface ConceptCardProps {
  title: string
  objective: string
  architecture: string
  accent: string
  icon: string
  delay: string
}

function ConceptCard({ title, objective, architecture, accent, icon, delay }: ConceptCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`animate-fade-up ${delay} rounded-2xl overflow-hidden cursor-default`}
      style={{
        background: '#FFFFFF',
        border: `1px solid ${hovered ? accent : '#E4E0D8'}`,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.08), 0 0 0 1px ${accent}`
          : '0 2px 12px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card visual header */}
      <div
        style={{
          height: 160,
          background: `linear-gradient(135deg, ${accent}55 0%, ${accent}22 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 48,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(${accent}33 1px, transparent 1px), linear-gradient(90deg, ${accent}33 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
        <span style={{ position: 'relative', zIndex: 1 }}>{icon}</span>
      </div>

      <div style={{ padding: '24px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            color: '#1C1C18',
            marginBottom: 10,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            color: '#6B6860',
            lineHeight: 1.65,
            marginBottom: 16,
          }}
        >
          {objective}
        </p>

        <div style={{ paddingTop: 14, borderTop: '1px solid #E4E0D8' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#9B9890',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            Key Architecture
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.82rem',
              color: '#4A4A46',
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

// ─── Skill Chip ───────────────────────────────────────────────────────────────
function SkillChip({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8rem',
        fontWeight: 500,
        color: '#4A5C4E',
        background: '#E8F0EA',
        border: '1px solid #C8DCC0',
        borderRadius: 100,
        padding: '5px 14px',
      }}
    >
      {label}
    </span>
  )
}

// ─── Stat Block ───────────────────────────────────────────────────────────────
function StatBlock({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 16px' }}>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.6rem',
          color: '#6B9B78',
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          color: '#6B6860',
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
function Nav({ scrollY }: { scrollY: number }) {
  const elevated = scrollY > 40

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 64,
        background: elevated ? 'rgba(250, 250, 246, 0.92)' : 'transparent',
        backdropFilter: elevated ? 'blur(12px)' : 'none',
        borderBottom: elevated ? '1px solid #E4E0D8' : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <span
        style={{
          fontFamily: "'Trispace', monospace",
          fontSize: '1rem',
          fontWeight: 300,
          color: '#1C1C18',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        jellie joyce andaya
      </span>

      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Work', 'About', 'Certs', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item === 'Certs' ? 'certificates' : item.toLowerCase()}`}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#4A4A46',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#6B9B78')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#4A4A46')}
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#FFFFFF',
            background: '#6B9B78',
            borderRadius: 100,
            padding: '8px 20px',
            textDecoration: 'none',
            transition: 'background 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            ;(e.target as HTMLElement).style.background = '#5A8A67'
            ;(e.target as HTMLElement).style.transform = 'scale(1.03)'
          }}
          onMouseLeave={(e) => {
            ;(e.target as HTMLElement).style.background = '#6B9B78'
            ;(e.target as HTMLElement).style.transform = 'scale(1)'
          }}
        >
          Let's Talk
        </a>
      </div>
    </nav>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const inputStyle = {
    width: '100%',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    color: '#1C1C18',
    background: '#FFFFFF',
    border: '1px solid #E4E0D8',
    borderRadius: 12,
    padding: '14px 18px',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#6B9B78'
    e.target.style.boxShadow = '0 0 0 3px rgba(107, 155, 120, 0.12)'
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#E4E0D8'
    e.target.style.boxShadow = 'none'
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)

    const formData = new FormData(e.currentTarget)
    formData.append('access_key', '5610e500-aa2b-4bd5-b35c-22909c198635')
    formData.append('subject', 'New Portfolio Lead Inflow Notification')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
      } else {
        alert('The server received the data packet but rejected the parameters.')
      }
    } catch (error) {
      alert('Submission error. Please check your network connection and retry.')
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
          background: '#F2EFE8',
          borderRadius: 20,
          border: '1px solid #E4E0D8',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            color: '#1C1C18',
            marginBottom: 10,
          }}
        >
          Message received.
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', color: '#6B6860', fontSize: '0.9rem' }}>
          I'll be in touch within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
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
          background: '#1C1C18',
          border: 'none',
          borderRadius: 100,
          padding: '14px 32px',
          cursor: isSending ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s ease, transform 0.2s ease',
          opacity: isSending ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isSending) {
            ;(e.target as HTMLElement).style.background = '#6B9B78'
            ;(e.target as HTMLElement).style.transform = 'scale(1.03)'
          }
        }}
        onMouseLeave={(e) => {
          ;(e.target as HTMLElement).style.background = '#1C1C18'
          ;(e.target as HTMLElement).style.transform = 'scale(1)'
        }}
      >
        {isSending ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const concepts = [
    {
      title: 'The Automated Lead Capture Engine',
      objective:
        'Designed for local service businesses to capture web traffic and instantly trigger automated email replies within 2 minutes of a form submission.',
      architecture: 'Custom Landing Page · Email Reply Automation · Calendar Integration',
      accent: '#6B9B78',
      icon: '⚡',
      delay: 'delay-100',
    },
    {
      title: 'The SMS Nurture Sequence Blueprint',
      objective:
        'A multi-touch SMS and email drip sequence that keeps cold leads warm over 21 days, engineered to re-engage prospects who ghosted after the first touchpoint.',
      architecture: 'SMS Workflow · Email Sequences · Lead Scoring Tags · Pipeline Automation',
      accent: '#9B85C4',
      icon: '💬',
      delay: 'delay-200',
    },
    {
      title: 'The Smart Booking Calendar System',
      objective:
        'A fully automated appointment funnel that qualifies, books, and confirms clients without any manual input — freeing the business owner from inbox management entirely.',
      architecture: 'Booking Funnel · Confirmation Workflows · No-Show Re-Engagement · CRM Sync',
      accent: '#C4935A',
      icon: '📅',
      delay: 'delay-300',
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
    <div style={{ background: '#FAFAF6', minHeight: '100vh', position: 'relative' }}>
      <ParallaxShapes scrollY={scrollY} />
      <Nav scrollY={scrollY} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="hero-section"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 40px 80px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 48,
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Left Column: Copy & Actions */}
          <div style={{ textAlign: 'left' }}>
            {/* Role pill */}
            <div
              className="animate-fade-in"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#FFFFFF',
                border: '1px solid #E4E0D8',
                borderRadius: 100,
                padding: '6px 18px',
                marginBottom: 24,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#6B9B78',
                  display: 'inline-block',
                  boxShadow: '0 0 0 3px rgba(107,155,120,0.25)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: '#6B6860',
                  letterSpacing: '0.04em',
                }}
              >
                GoHighLevel Specialist | CRM & Marketing Automation
              </span>
            </div>

            {/* Hero headline */}
            <h1
              className="animate-fade-up delay-100"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                color: '#1C1C18',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: 20,
              }}
            >
              Systems that work <br />
              <span style={{ color: '#6B9B78' }}>while you sleep.</span>
            </h1>

            {/* Sub-text */}
            <p
              className="animate-fade-up delay-200"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: '#6B6860',
                maxWidth: 460,
                lineHeight: 1.7,
                marginBottom: 36,
                fontWeight: 300,
              }}
            >
              Automating the repetitive so your business captures, nurtures, and closes leads —
              without you lifting a finger.
            </p>

            {/* CTA buttons */}
            <div
              className="hero-ctas animate-fade-up delay-300"
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}
            >
              <a
                href="#work"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  background: '#1C1C18',
                  borderRadius: 100,
                  padding: '14px 28px',
                  textDecoration: 'none',
                }}
              >
                View Work
              </a>
              <a
                href="#contact"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#1C1C18',
                  background: '#FFFFFF',
                  border: '1px solid #E4E0D8',
                  borderRadius: 100,
                  padding: '14px 28px',
                  textDecoration: 'none',
                }}
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right Column: Workflow Mockup */}
          <div
            className="animate-fade-up delay-200"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <WorkflowMockup />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '0 40px 80px' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            background: '#FFFFFF',
            border: '1px solid #E4E0D8',
            borderRadius: 24,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
          }}
        >
          <StatBlock number="< 2 min" label="Avg. Lead Response Time" />
          <StatBlock number="100%" label="Automated Follow-Up" />
          <StatBlock number="24/7" label="System Availability" />
        </div>
      </section>

      {/* ── CONCEPTS / WORK ─────────────────────────────────────────────────── */}
      <section
        id="work"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 40px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div style={{ marginBottom: 56 }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#6B9B78',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Proof of Concept
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#1C1C18',
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
            }}
          >
            Systems I build <span style={{ fontStyle: 'italic', color: '#9B85C4' }}>& deploy.</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: 28,
          }}
        >
          {concepts.map((concept, i) => (
            <ConceptCard key={i} {...concept} />
          ))}
        </div>
      </section>

      {/* ── ABOUT & SKILLS ─────────────────────────────────────────────────── */}
      <section
        id="about"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 40px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 60,
            alignItems: 'start',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#6B9B78',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              About
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                color: '#1C1C18',
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                marginBottom: 24,
              }}
            >
              Bridging marketing Strategy & <br />
              <span style={{ fontStyle: 'italic', color: '#C4935A' }}>technical execution.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: '#6B6860',
                lineHeight: 1.75,
                marginBottom: 18,
                fontWeight: 300,
              }}
            >
              I specialize in turning chaotic, manual sales processes into streamlined, high-converting GoHighLevel engines. My focus is on eliminating repetitive work and building reliable systems that scale smoothly.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: '#6B6860',
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              Whether you need to capture more leads, speed up follow-ups, or completely automate your booking pipeline, I design solutions custom-built for your business operations.
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#9B9890',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 18,
              }}
            >
              Core Capabilities
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {skills.map((skill) => (
                <SkillChip key={skill} label={skill} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATES / CREDENTIALS ──────────────────────────────────── */}
      <section
        id="certificates"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 40px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: '#1C1C18',
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
              marginBottom: 8,
            }}
          >
            <span style={{ fontStyle: 'italic', color: '#9B85C4' }}>Credentials</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              color: '#6B6860',
              lineHeight: 1.6,
              fontWeight: 300,
              marginBottom: 32,
            }}
          >
            Verified certifications & professional training
          </p>

          {/* Minimalist List */}
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
            ].map((cert, index) => (
              <a
                key={index}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 0',
                  borderBottom: '1px solid #EAE8E3',
                  textDecoration: 'none',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: '#1C1C18',
                    fontWeight: 400,
                  }}
                >
                  {cert.title}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
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
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: '#B5B2AA',
                    }}
                  >
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 40px 120px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 60,
            alignItems: 'start',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#6B9B78',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Contact
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#1C1C18',
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                marginBottom: 20,
              }}
            >
              Let's build your <br />
              <span style={{ fontStyle: 'italic', color: '#6B9B78' }}>automation system.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: '#6B6860',
                lineHeight: 1.7,
                marginBottom: 32,
                fontWeight: 300,
              }}
            >
              Ready to automate your follow-ups, speed up response times, or streamline your pipelines? Send me a message and let's talk.
            </p>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid #E4E0D8',
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <span
          style={{
            fontFamily: "'Trispace', monospace",
            fontSize: '0.8rem',
            color: '#9B9890',
            letterSpacing: '0.04em',
          }}
        >
          © {new Date().getFullYear()} jellie joyce andaya
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#9B9890' }}>
          Built with GoHighLevel Focus
        </span>
      </footer>
    </div>
  )
}
