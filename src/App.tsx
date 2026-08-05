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
        {/* Grid decoration */}
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
        <div
          style={{
            paddingTop: 14,
            borderTop: '1px solid #E4E0D8',
          }}
        >
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
        {['Work', 'About', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
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
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
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

    // Scraping form fields directly from the active elements satisfies Web3Forms security rules
    const formData = new FormData(e.currentTarget)
    formData.append("access_key", "5610e500-aa2b-4bd5-b35c-22909c198635")
    formData.append("subject", "New Portfolio Lead Inflow Notification")

    try {
      const response = await fetch("https://web3forms.com", {
        method: "POST",
        body: formData, // Standard Multi-part content parameters prevent network resets
      })

      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
      } else {
        alert("Something went wrong with the form service. Please try again.")
      }
    } catch (error) {
      alert("Submission error. Please check your internet connection and try again.")
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
            value={formState.name}
            onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
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
            value={formState.email}
            onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
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
          value={formState.message}
          onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
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
    'Zapier / Webhooks',
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 40px 80px',
        }}
      >
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
            marginBottom: 32,
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
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            color: '#1C1C18',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            maxWidth: 820,
            marginBottom: 28,
          }}
        >
          Systems that work
          <br />
          <span style={{ color: '#6B9B78' }}>while you sleep.</span>
        </h1>

        {/* Sub-text */}
        <p
          className="animate-fade-up delay-200"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.1rem',
            color: '#6B6860',
            maxWidth: 500,
            lineHeight: 1.7,
            marginBottom: 48,
            fontWeight: 300,
          }}
        >
          Automating the repetitive so your business captures, nurtures, and closes leads — without
          you lifting a finger.
        </p>

        {/* CTA buttons */}
        <div
          className="hero-ctas animate-fade-up delay-300"
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 80 }}
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
              transition: 'background 0.2s ease, transform 0.2s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#6B9B78'
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#1C1C18'
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
            }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: '#1C1C18',
              background: 'transparent',
              border: '1.5px solid #D4CFC8',
              borderRadius: 100,
              padding: '14px 28px',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = '#6B9B78'
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = '#D4CFC8'
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Workflow mockup */}
        <div className="animate-fade-up delay-400" style={{ display: 'flex', justifyContent: 'center' }}>
          <WorkflowMockup />
        </div>

        {/* Scroll cue */}
        <div
          className="animate-fade-in delay-600"
          style={{
            position: 'absolute',
            bottom: 36,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              color: '#B8B4AC',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1.5,
              height: 32,
              background: 'linear-gradient(to bottom, #B8B4AC, transparent)',
            }}
          />
        </div>
      </section>

      {/* ── CONCEPT SNAPSHOTS ─────────────────────────────────────────────── */}
      <section
        id="work"
        className="concepts-section"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 40px',
          maxWidth: 1160,
          margin: '0 auto',
        }}
      >
        {/* Section label */}
        <div style={{ marginBottom: 56, maxWidth: 640 }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#6B9B78',
              letterSpacing: '0.12em',
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
              color: '#1C1C18',
              lineHeight: 1.15,
              marginBottom: 16,
              letterSpacing: '-0.015em',
            }}
          >
            Concept Snapshots &amp;{' '}
            <span style={{ fontStyle: 'italic', color: '#6B9B78' }}>Interactive Builds</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: '#6B6860',
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Explore pre-configured GoHighLevel frameworks engineered to solve common business
            bottlenecks. Built completely from scratch in my development sandbox.
          </p>
        </div>

        {/* Cards grid */}
        <div
          className="concepts-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {concepts.map((c) => (
            <ConceptCard key={c.title} {...c} />
          ))}
        </div>
      </section>

      {/* ── BACKGROUND & SKILLS ───────────────────────────────────────────── */}
      <section
        id="about"
        className="about-section"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 40px',
          background: 'transparent',
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Left: narrative */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#6B9B78',
                letterSpacing: '0.12em',
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
                color: '#1C1C18',
                lineHeight: 1.2,
                marginBottom: 28,
                letterSpacing: '-0.015em',
              }}
            >
              Hey there! Meet your{' '}
              <span style={{ fontStyle: 'italic', color: '#9B85C4' }}>Operational Co-Pilot</span>
            </h2>

            {/* Profile mini-card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 18,
                marginBottom: 28,
                background: '#FFFFFF',
                borderRadius: 16,
                border: '1px solid #E4E0D8',
                padding: '18px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              {/* Photo placeholder */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #B8D4BF 0%, #D5CAEB 100%)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  border: '2px dashed #C8DCC0',
                  overflow: 'hidden',
                }}
                title="Replace with your photo"
              >
                🪴
              </div>
              {/* Info */}
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: "'Trispace', monospace",
                    fontSize: '1rem',
                    fontWeight: 400,
                    color: '#1C1C18',
                    letterSpacing: '0.04em',
                    marginBottom: 4,
                  }}
                >
                  Jellie Joyce Andaya
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[
                    { icon: '📍', text: '  Tokyo, Japan' },
                    { icon: '💼', text: 'GoHighLevel Specialist' },
                    { icon: '🕐', text: 'Available · GMT+9' },
                  ].map((item) => (
                    <span
                      key={item.text}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
                        color: '#6B6860',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span style={{ fontSize: '0.75rem' }}>{item.icon}</span>
                      {item.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: '#4A4A46',
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              I'm a GoHighLevel Specialist focused on transforming messy business operations into
              streamlined, revenue-generating machines by centralizing your marketing, sales
              pipelines, and customer communication into one cohesive platform. 
           <br />
           <br />
                By partnering with me, you get an agile, platform-focused expert who eliminates technical headaches, cuts
              software overhead costs, and delivers turnkey automation, handling all the heavy lifting
              so you can focus entirely on serving your clients.
            </p>
          </div>

          {/* Right: stats + skills */}
          <div>
            {/* Stats grid */}
            <div
              className="stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                background: '#FFFFFF',
                borderRadius: 20,
                border: '1px solid #E4E0D8',
                overflow: 'hidden',
                marginBottom: 28,
                boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
              }}
            >
              {[
                { number: '0', label: 'Missed Leads' },
                { number: '10+', label: 'Custom Funnels Built' },
                { number: '24/7', label: 'Automated Systems' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    borderRight: i < 2 ? '1px solid #E4E0D8' : 'none',
                  }}
                >
                  <StatBlock {...stat} />
                </div>
              ))}
            </div>

            {/* Skills & Tools */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 20,
                border: '1px solid #E4E0D8',
                padding: '24px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#9B9890',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                Skills &amp; Tools
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {skills.map((s) => (
                  <SkillChip key={s} label={s} />
                ))}
              </div>
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
          maxWidth: 1160,
          margin: '0 auto',
        }}
      >
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }}>
          {/* Left: copy */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#6B9B78',
                letterSpacing: '0.12em',
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
                color: '#1C1C18',
                lineHeight: 1.15,
                marginBottom: 20,
                letterSpacing: '-0.015em',
              }}
            >
              Let's build something{' '}
              <span style={{ fontStyle: 'italic', color: '#6B9B78' }}>together.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: '#6B6860',
                lineHeight: 1.75,
                fontWeight: 300,
                marginBottom: 40,
              }}
            >
              Whether you're starting from scratch or cleaning up a messy CRM, I'm here to help.
              Reach out and let's figure out what you need.
            </p>

            {/* Availability badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#F0F7F2',
                border: '1px solid #C8DCC0',
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
                  background: '#6B9B78',
                  display: 'inline-block',
                  boxShadow: '0 0 0 3px rgba(107,155,120,0.3)',
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

            {/* Direct contact links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  ),
                  label: 'Email',
                  value: 'hello.jjoyce@gmail.com',
                  href: 'mailto:hello.jjoyce@gmail.com',
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                    </svg>
                  ),
                  label: 'Instagram',
                  value: '@jelejoys',
                  href: 'https://instagram.com/jelejoys',
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    background: '#FAFAF6',
                    border: '1px solid #E4E0D8',
                    borderRadius: 12,
                    textDecoration: 'none',
                    color: '#4A4A46',
                    transition: 'border-color 0.2s ease, background 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = '#6B9B78'
                    ;(e.currentTarget as HTMLElement).style.background = '#F0F7F2'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = '#E4E0D8'
                    ;(e.currentTarget as HTMLElement).style.background = '#FAFAF6'
                  }}
                >
                  <span style={{ color: '#6B9B78', display: 'flex', flexShrink: 0 }}>{link.icon}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, color: '#9B9890', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 1 }}>{link.label}</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.87rem', color: '#4A4A46' }}>{link.value}</p>
                  </div>
                </a>
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
          borderTop: '1px solid #E4E0D8',
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
            color: '#1C1C18',
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

      {/* Responsive styles */}
      <style>{`
        /* ── Tablet (≤1024px) ── */
        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }

        /* ── Mobile (≤768px) ── */
        @media (max-width: 768px) {
          /* Nav */
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          nav { padding: 0 20px !important; }

          /* Hero */
          .hero-section {
            padding: 100px 24px 60px !important;
            min-height: auto !important;
          }
          .hero-ctas {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .hero-ctas a {
            text-align: center !important;
          }

          /* Concept cards */
          .concepts-section {
            padding: 72px 24px !important;
          }
          .concepts-grid {
            grid-template-columns: 1fr !important;
          }

          /* About */
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

          /* Contact */
          .contact-section {
            padding: 72px 24px !important;
          }
          .contact-form-name-row {
            grid-template-columns: 1fr !important;
          }

          /* Footer */
          .site-footer {
            padding: 24px 20px !important;
            flex-direction: column !important;
            gap: 8px !important;
            text-align: center !important;
          }
        }

        /* ── Small phones (≤480px) ── */
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid > div {
            border-right: none !important;
            border-bottom: 1px solid #E4E0D8 !important;
          }
          .stats-grid > div:last-child {
            border-bottom: none !important;
          }
          .profile-card {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  )
}
