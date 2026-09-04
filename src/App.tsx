import { useEffect, useRef, useState } from 'react'

// JIROFLOW — REVAMP V1 / CONCEPT DRAFT
// Content is preserved from the supplied source. ContactForm submission logic is intentionally unchanged.

const C = {
  ink: '#11120F',
  body: '#62645D',
  paper: '#F7F8F3',
  white: '#FFFFFF',
  line: '#DDE1D8',
  green: '#7FB08F',
  greenDeep: '#4F7F60',
  mint: '#DCEFE2',
  violet: '#B39DDB',
  violetDeep: '#8065AE',
  violetSoft: '#ECE6F7',
  lime: '#CBEA8B',
}

const projects = [
  {
    title: 'The Automated Lead Capture Engine',
    objective: 'Designed for local service businesses to capture web traffic and instantly trigger automated email replies within 2 minutes of a form submission.',
    architecture: 'Custom Landing Page · Email Reply Automation · Calendar Integration',
    accent: C.green,
    steps: [['⚡', 'Lead Captured'], ['✉️', 'Email Triggered'], ['📅', 'Calendar Booked']],
  },
  {
    title: 'The SMS Nurture Sequence Blueprint',
    objective: 'A multi-touch SMS and email drip sequence that keeps cold leads warm over 21 days, engineered to re-engage prospects who ghosted after the first touchpoint.',
    architecture: 'SMS Workflow · Email Sequences · Lead Scoring Tags · Pipeline Automation',
    accent: C.violet,
    steps: [['💬', 'SMS Sent'], ['🏷️', 'Lead Scored'], ['🔁', 'Re-engaged']],
  },
  {
    title: 'The Smart Booking Calendar System',
    objective: 'A fully automated appointment funnel that qualifies, books, and confirms clients without any manual input — freeing the business owner from inbox management entirely.',
    architecture: 'Booking Funnel · Confirmation Workflows · No-Show Re-Engagement · CRM Sync',
    accent: C.greenDeep,
    steps: [['📅', 'Slot Booked'], ['✅', 'Confirmed'], ['🔄', 'CRM Synced']],
  },
]

const skills = ['GoHighLevel', 'CRM Architecture', 'Workflow Automation', 'Sales Pipelines', 'Funnel Design', 'Email/SMS Nurturing', 'Lead Management', 'Appointment Booking', 'Analytics & Reporting', 'Make', 'AI']

const certificates = [
  { title: 'AI Boost Bites: Automate tasks with Gemini and Apps Script', issuer: 'Google', date: '2026', url: 'https://www.skills.google/public_profiles/0157d6a8-3b0c-44d2-bf61-6060bce44196/badges/26414443?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share' },
  { title: 'AI Fluency Framework & Foundations', issuer: 'Anthropic', date: '2026', url: 'https://verify.skilljar.com/c/2drrus4jxbrv' },
  { title: 'AI Capabilities and Limitations', issuer: 'Anthropic', date: '2026', url: 'https://verify.skilljar.com/c/uhroqca7r38j' },
  { title: 'Introduction to Responsible AI', issuer: 'Google', date: '2026', url: 'https://www.skills.google/public_profiles/0157d6a8-3b0c-44d2-bf61-6060bce44196/badges/26414962?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share' },
  { title: 'Claude 101', issuer: 'Anthropic', date: '2026', url: 'https://verify.skilljar.com/c/6nkq7vzv5y7g' },
  { title: 'Introduction to Claude Cowork', issuer: 'Anthropic', date: '2026', url: 'https://verify.skilljar.com/c/uav39s8hemj8' },
]

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

function Magnetic({ children, strength = 0.12, max = 4 }: { children: React.ReactNode; strength?: number; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  useEffect(() => {
    const el = ref.current
    if (!el || !fine) return
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      const d = Math.hypot(x, y)
      const radius = Math.max(r.width, r.height) * 1.1
      if (d < radius) {
        const p = 1 - d / radius
        el.style.transform = `translate(${Math.max(-max, Math.min(max, x * strength * p))}px, ${Math.max(-max, Math.min(max, y * strength * p))}px)`
      } else el.style.transform = 'translate(0,0)'
    }
    const reset = () => { el.style.transform = 'translate(0,0)' }
    window.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', reset)
    return () => { window.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', reset) }
  }, [fine, strength, max])
  return <div ref={ref} className="magnetic">{children}</div>
}

function Cursor() {
  const fine = useFinePointer()
  const ref = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const [kind, setKind] = useState<'dot' | 'link' | 'card'>('dot')
  useEffect(() => {
    if (!fine) return
    const move = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY } }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('[data-cursor-card]')) setKind('card')
      else if (t.closest('a,button')) setKind('link')
    }
    const out = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('[data-cursor-card],a,button')) setKind('dot')
    }
    let raf = 0
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * .18
      pos.current.y += (target.current.y - pos.current.y) * .18
      if (ref.current) ref.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move); document.addEventListener('mouseover', over); document.addEventListener('mouseout', out); raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); document.removeEventListener('mouseout', out); cancelAnimationFrame(raf) }
  }, [fine])
  if (!fine) return null
  return <div ref={ref} className={`cursor cursor-${kind}`}>{kind === 'card' ? 'View' : ''}</div>
}

function Background() {
  const fine = useFinePointer()
  const spot = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!fine) return
    const move = (e: MouseEvent) => { if (spot.current) spot.current.style.background = `radial-gradient(420px circle at ${e.clientX}px ${e.clientY}px, rgba(127,176,143,.13), transparent 70%)` }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [fine])
  return <div className="bg-layer" aria-hidden><div className="grid-bg"/><div className="orb orb-a"/><div className="orb orb-b"/><div className="orb orb-c"/><div ref={spot} className="spot"/><div className="orbit orbit-a"/><div className="orbit orbit-b"/></div>
}

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const update = () => { const h = document.documentElement.scrollHeight - window.innerHeight; if (ref.current) ref.current.style.width = `${h > 0 ? window.scrollY / h * 100 : 0}%` }
    window.addEventListener('scroll', update, { passive: true }); update(); return () => window.removeEventListener('scroll', update)
  }, [])
  return <div className="scroll-progress"><div ref={ref}/></div>
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('work')
  const items = [{ id: 'work', label: 'Work' }, { id: 'about', label: 'About' }, { id: 'certificates', label: 'Certs' }]
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -50% 0px' })
    items.forEach(i => document.getElementById(i.id) && obs.observe(document.getElementById(i.id)!))
    return () => obs.disconnect()
  }, [])
  return <>
    <header className="nav-wrap">
      <nav className="nav">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>JE<span>•</span>Jiroflow</a>
        <div className="nav-links">{items.map(i => <Magnetic key={i.id}><a className={active === i.id ? 'active' : ''} href={`#${i.id}`}>{i.label}</a></Magnetic>)}</div>
        <Magnetic><a className="nav-cta" href="#contact">Let's Talk <i>↗</i></a></Magnetic>
        <button className={`hamburger ${open ? 'is-open' : ''}`} onClick={() => setOpen(v => !v)} aria-label="Open menu"><span/><span/><span/></button>
      </nav>
    </header>
    {open && <div className="mobile-nav">{items.map(i => <a key={i.id} href={`#${i.id}`} onClick={() => setOpen(false)}>{i.label}<span>↘</span></a>)}<a href="#contact" onClick={() => setOpen(false)}>Let's Talk<span>↗</span></a></div>}
  </>
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); obs.disconnect() } }, { threshold: .15, rootMargin: '0px 0px -80px' }); obs.observe(el); return () => obs.disconnect() }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function Hero() {
  const [typed, setTyped] = useState('')
  const text = 'systems that work while you sleep.'
  useEffect(() => { let i = 0; const id = window.setInterval(() => { i++; setTyped(text.slice(0, i)); if (i >= text.length) clearInterval(id) }, 45); return () => clearInterval(id) }, [])
  return <section id="top" className="hero">
    <div className="hero-noise"/>
    <div className="hero-copy">
      <div className="eyebrow"><span className="live-dot"/> GoHighLevel Specialist · CRM & Automation</div>
      <h1><span className="thin">Hey there, I'm</span><span className="name">JELLIE <em>JOYCE</em></span><span className="headline">I build <strong>{typed}</strong><b className="caret">|</b></span></h1>
      <p className="hero-lede">I turn messy business ops into streamlined, revenue-generating machines — so you get to focus on your clients, not your CRM.</p>
      <div className="hero-actions"><Magnetic><a className="button button-dark" href="#work">Explore the systems <span>↓</span></a></Magnetic><Magnetic><a className="button button-ghost" href="/resume.pdf">Download Resume <span>↘</span></a></Magnetic></div>
      <div className="hero-meta"><span>📍 Tokyo, Japan · GMT+9</span><span>🤿 Advanced Freediver</span><span>Available for new projects</span></div>
    </div>
    <div className="hero-visual" aria-hidden><div className="system-card"><div className="system-top"><span>JIROFLOW / LIVE SYSTEM</span><span className="status">● ONLINE</span></div><div className="signal"><div className="signal-line"><span>LEAD</span><i/></div><div className="signal-line"><span>CRM</span><i/></div><div className="signal-line"><span>AUTOMATION</span><i/></div><div className="signal-line"><span>REVENUE</span><i/></div></div><div className="system-footer"><span>24/7</span><span>11 SKILLS</span><span>∞ POSSIBILITIES</span></div></div><div className="floating-chip chip-a">CRM → Automation</div><div className="floating-chip chip-b">Response &lt; 2min</div><div className="floating-chip chip-c">AI-ready</div></div>
    <a className="scroll-cue" href="#work"><span>Scroll to explore</span><i>↓</i></a>
  </section>
}

function ProjectCard({ p, index }: { p: typeof projects[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const fine = useFinePointer()
  const move = (e: React.MouseEvent) => { if (!fine || !ref.current) return; const r = ref.current.getBoundingClientRect(); setTilt({ x: ((e.clientY-r.top)/r.height-.5)*-5, y: ((e.clientX-r.left)/r.width-.5)*5 }) }
  return <article ref={ref} data-cursor-card className="project-card" style={{ transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }} onMouseMove={move} onMouseLeave={() => setTilt({x:0,y:0})}>
    <div className="project-art" style={{ '--accent': p.accent } as React.CSSProperties}><span className="project-index">0{index+1}</span><div className="flow-map">{p.steps.map(([icon,label],i)=><div className="flow-step" key={label} style={{ transitionDelay: `${i*120}ms` }}><span>{icon}</span><b>{label}</b>{i < p.steps.length-1 && <i>→</i>}</div>)}</div><div className="project-scan"/></div>
    <div className="project-copy"><div className="project-tag">AUTOMATION BLUEPRINT</div><h3>{p.title}</h3><p>{p.objective}</p><div className="architecture"><span>STACK</span>{p.architecture}</div><a href="#contact" className="project-link">Build something like this <span>↗</span></a></div>
  </article>
}

function Work() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  useEffect(() => { const el = track.current; if (!el) return; const onScroll = () => { const cards = Array.from(el.children) as HTMLElement[]; const idx = cards.reduce((best,c,i) => Math.abs(c.getBoundingClientRect().left-el.getBoundingClientRect().left) < Math.abs(cards[best].getBoundingClientRect().left-el.getBoundingClientRect().left) ? i : best, 0); setActive(idx) }; el.addEventListener('scroll',onScroll,{passive:true}); return () => el.removeEventListener('scroll',onScroll) }, [])
  return <section id="work" className="section work-section"><div className="section-head"><Reveal><span className="section-kicker">01 / Platform Blueprints</span><h2>Concept snapshots.<br/><em>Interactive systems.</em></h2><p>Built completely from scratch in my development sandbox.</p></Reveal></div><div className="work-track" ref={track}>{projects.map((p,i)=><ProjectCard key={p.title} p={p} index={i}/>)}</div><div className="work-controls"><span>DRAG / SCROLL</span><div>{projects.map((_,i)=><button key={i} onClick={() => track.current?.children[i]?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'})} className={active===i?'on':''}/>)}</div><span>0{active+1} / 03</span></div></section>
}

function About() {
  return <section id="about" className="section about-section"><div className="about-grid"><Reveal className="about-copy"><span className="section-kicker">02 / Background</span><h2>Meet your <em>operational co-pilot.</em></h2><p>I am a GoHighLevel / Automation Specialist focused on transforming messy business operations into streamlined, revenue-generating machines. By centralizing your marketing, sales pipelines, and customer communication into one cohesive platform, I eliminate technical headaches and cut software overhead costs. When you partner with me, you get an agile, platform-focused expert who delivers turnkey automation, handling all the heavy lifting so you can focus entirely on serving your clients.</p><p>Outside of work, I swap digital architecture for the beauty of the open ocean. I am a Molchanovs Certified Advanced Freediver and a PADI Certified Open Water Diver, and nothing compares to the absolute clarity and peace of being under the sea. Navigating complex business workflows actually requires a lot of the same calm, discipline, and adaptability as diving into the deep blue — and I bring that exact focus to every automation ecosystem I build.</p><div className="quote-line">“Calm systems. Clear outcomes.”</div></Reveal><Reveal className="about-dashboard"><div className="stats"><div><strong>&lt;2min</strong><span>Average Response Time</span></div><div><strong>21-Day</strong><span>Nurture Sequences</span></div><div><strong>24/7</strong><span>Systems Live</span></div></div><div className="skills-panel"><div className="panel-label">Skills & Tools</div><div className="skill-cloud">{skills.map((s,i)=><span key={s} style={{'--delay': `${i*45}ms`} as React.CSSProperties}>{s}</span>)}</div></div><div className="mini-console"><span>WORKFLOW HEALTH</span><div><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><b>ALL SYSTEMS NOMINAL</b></div></Reveal></div></section>
}

function Certificates() {
  const [hover, setHover] = useState<number | null>(null)
  return <section id="certificates" className="section cert-section"><div className="cert-layout"><Reveal><span className="section-kicker">03 / Credentials</span><h2><em>Verified.</em><br/>Always learning.</h2><p>Verified certifications & professional training</p></Reveal><Reveal className="cert-list">{certificates.map((c,i)=><a key={c.title} href={c.url} target="_blank" rel="noopener noreferrer" onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)} className={hover===i?'hovered':''}><span className="cert-number">0{i+1}</span><span className="cert-title">{c.title}</span><span className="cert-issuer">{c.issuer}<small>{c.date}</small></span><b>↗</b></a>)}</Reveal></div></section>
}

// IMPORTANT: submission/state/fetch logic below is preserved from the supplied source.
function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const inputStyle = { width:'100%', fontFamily:'var(--font-sans)', fontSize:'0.92rem', color:C.ink, background:'rgba(255,255,255,.72)', border:'1px solid rgba(17,18,15,.12)', borderRadius:18, padding:'16px 18px', outline:'none', transition:'border-color .2s ease, box-shadow .2s ease, background .2s ease' }
  const focusColors: Record<string,{border:string;ring:string}> = { name:{border:C.green,ring:'rgba(127,176,143,.16)'}, email:{border:C.violet,ring:'rgba(179,157,219,.16)'}, message:{border:C.green,ring:'rgba(127,176,143,.16)'} }
  const handleFocus = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => { const c=focusColors[e.target.name]??focusColors.name; e.target.style.borderColor=c.border; e.target.style.boxShadow=`0 0 0 4px ${c.ring}`; e.target.style.background='#fff' }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => { e.target.style.borderColor='rgba(17,18,15,.12)'; e.target.style.boxShadow='none'; e.target.style.background='rgba(255,255,255,.72)' }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setIsSending(true)
    const formData = new FormData(e.currentTarget)
    formData.append("access_key", "5610e500-aa2b-4bd5-b35c-22909c198635")
    formData.append("subject", "New Portfolio Lead Inflow Notification")
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method:"POST", body:formData })
      const result = await response.json()
      if (result.success) setSubmitted(true); else alert("The server received the data packet but rejected the parameters.")
    } catch (error) { alert("Submission error. Please check your network connection and retry.") }
    finally { setIsSending(false) }
  }
  if (submitted) return <div className="success-card"><div className="success-mark">✓</div><h3>Message received.</h3><p>I'll be in touch within 24 hours.</p><div className="success-orbit">✦</div></div>
  return <form onSubmit={handleSubmit} className="contact-form"><input type="checkbox" name="botcheck" className="hidden" style={{display:'none'}}></input><div className="form-row"><label>Name<input type="text" name="name" required placeholder="Your name" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} spellCheck={false} autoComplete="name" data-gramm="false" data-gramm_editor="false"/></label><label>Email<input type="email" name="email" required placeholder="your@email.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} spellCheck={false} autoComplete="email" data-gramm="false" data-gramm_editor="false"/></label></div><label>Message<textarea name="message" required rows={6} placeholder="Tell me about your project..." style={{...inputStyle,resize:'vertical',lineHeight:1.6} as React.CSSProperties} onFocus={handleFocus} onBlur={handleBlur} spellCheck={false} autoComplete="off" data-gramm="false" data-gramm_editor="false"/></label><button type="submit" disabled={isSending} className="send-button">{isSending ? 'Sending...' : 'Send Message →'}</button></form>
}

function Contact() {
  return <section id="contact" className="contact-section"><div className="contact-shell"><Reveal className="contact-copy"><span className="section-kicker">04 / Contact</span><h2>Let's build something <em>together.</em></h2><p>Whether you're starting from scratch or cleaning up a messy CRM, I'm here to help. Reach out and let's figure out what you need.</p><div className="availability"><i/>Available for new projects</div><div className="contact-links"><a href="mailto:hello.jjoyce@gmail.com"><span>EMAIL</span><b>hello.jjoyce@gmail.com</b><i>↗</i></a><a href="https://instagram.com/jelejoys" target="_blank" rel="noopener noreferrer"><span>INSTAGRAM</span><b>@jelejoys</b><i>↗</i></a></div></Reveal><Reveal className="contact-card"><div className="form-top"><span>START A PROJECT</span><span>JIROFLOW / 01</span></div><ContactForm/></Reveal></div></section>
}

export default function App() {
  return <div className="site"><ScrollProgress/><Background/><Cursor/><Nav/><main><Hero/><Work/><About/><Certificates/><Contact/></main><footer><span>WORK WITH ME</span><span>© {new Date().getFullYear()} — Built to automate.</span><a href="#top">Back to top ↑</a></footer><style>{styles}</style></div>
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&display=swap');
:root{--font-sans:'Manrope',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--font-display:'Playfair Display',Georgia,serif;--mono:'DM Mono',monospace}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:${C.paper};color:${C.ink};font-family:var(--font-sans)}a{color:inherit}.site{min-height:100vh;overflow:hidden;position:relative}.magnetic{display:inline-flex;transition:transform .22s cubic-bezier(.2,.8,.2,1)}
.bg-layer{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;background:linear-gradient(135deg,#f8faf5 0%,#f7f8f3 55%,#f3f0fa 100%)}.grid-bg{position:absolute;inset:0;opacity:.28;background-image:linear-gradient(rgba(17,18,15,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(17,18,15,.045) 1px,transparent 1px);background-size:52px 52px;mask-image:linear-gradient(to bottom,black,transparent 78%)}.orb{position:absolute;border-radius:50%;filter:blur(50px);opacity:.28;animation:drift 16s ease-in-out infinite}.orb-a{width:440px;height:440px;right:-100px;top:5%;background:${C.mint}}.orb-b{width:360px;height:360px;left:-120px;top:45%;background:${C.violetSoft};animation-delay:-5s}.orb-c{width:300px;height:300px;right:12%;bottom:-100px;background:#e9f2c7;animation-delay:-9s}.spot{position:absolute;inset:0}.orbit{position:absolute;border:1px solid rgba(127,176,143,.12);border-radius:50%;animation:spin 30s linear infinite}.orbit-a{width:600px;height:600px;right:-300px;top:18%}.orbit-b{width:340px;height:340px;left:-190px;bottom:8%;animation-direction:reverse}
.scroll-progress{position:fixed;top:0;left:0;right:0;height:3px;z-index:100;background:rgba(17,18,15,.04)}.scroll-progress>div{height:100%;width:0;background:linear-gradient(90deg,${C.green},${C.violet});box-shadow:0 0 14px rgba(127,176,143,.4)}
.cursor{position:fixed;top:0;left:0;z-index:200;pointer-events:none;border-radius:50%;display:flex;align-items:center;justify-content:center;font:500 9px var(--mono);letter-spacing:.04em}.cursor-dot{width:9px;height:9px;background:${C.green};opacity:.7}.cursor-link{width:30px;height:30px;border:1px solid ${C.violet};background:rgba(255,255,255,.55)}.cursor-card{width:58px;height:58px;border:1px solid ${C.green};background:rgba(255,255,255,.78);color:${C.greenDeep}
.nav-wrap{position:fixed;top:18px;left:0;right:0;z-index:90;display:flex;justify-content:center;padding:0 20px}.nav{width:min(1100px,100%);display:flex;align-items:center;gap:26px;padding:11px 12px 11px 20px;border:1px solid rgba(17,18,15,.10);border-radius:999px;background:rgba(255,255,255,.78);backdrop-filter:blur(18px);box-shadow:0 16px 50px rgba(17,18,15,.07)}.brand{font:600 15px var(--mono);text-decoration:none;letter-spacing:-.03em;margin-right:auto}.brand span{color:${C.green};padding:0 5px}.nav-links{display:flex;gap:25px}.nav-links a{font-size:13px;text-decoration:none;color:${C.body};position:relative;padding:5px 0}.nav-links a:after{content:'';position:absolute;left:0;bottom:-4px;width:100%;height:2px;border-radius:4px;background:${C.green};transform:scaleX(0);transform-origin:left;transition:transform .3s}.nav-links a.active,.nav-links a:hover{color:${C.ink}.nav-links a.active:after{transform:scaleX(1)}.nav-cta{display:flex;gap:9px;align-items:center;background:${C.ink};color:#fff;padding:11px 17px;border-radius:999px;text-decoration:none;font-size:13px;font-weight:700}.nav-cta i{font-style:normal;color:${C.lime}}.hamburger{display:none;border:0;background:transparent;width:38px;height:38px}.hamburger span{display:block;width:20px;height:2px;background:${C.ink};margin:4px auto;transition:.25s}.hamburger.is-open span:nth-child(1){transform:translateY(6px) rotate(45deg)}.hamburger.is-open span:nth-child(2){opacity:0}.hamburger.is-open span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}.mobile-nav{position:fixed;z-index:89;top:82px;left:16px;right:16px;border:1px solid rgba(17,18,15,.1);border-radius:22px;background:rgba(255,255,255,.95);backdrop-filter:blur(18px);box-shadow:0 24px 60px rgba(17,18,15,.12);padding:10px}.mobile-nav a{display:flex;justify-content:space-between;padding:16px;border-bottom:1px solid ${C.line};text-decoration:none}.mobile-nav a:last-child{border:0;font-weight:700;color:${C.greenDeep}}
.hero{min-height:100svh;position:relative;z-index:1;padding:150px 6vw 90px;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(320px,.9fr);align-items:center;gap:7vw}.hero-copy{max-width:780px}.eyebrow,.section-kicker{font:500 11px var(--mono);letter-spacing:.14em;text-transform:uppercase;color:${C.greenDeep}}.eyebrow{display:inline-flex;gap:10px;align-items:center;padding:9px 13px;border:1px solid rgba(79,127,96,.18);background:rgba(220,239,226,.52);border-radius:999px;margin-bottom:25px}.live-dot{width:7px;height:7px;background:${C.green};border-radius:50%;box-shadow:0 0 0 5px rgba(127,176,143,.16);animation:pulse 2s infinite}.hero h1{margin:0}.thin{display:block;font-size:clamp(1.05rem,2vw,1.35rem);font-weight:500;color:${C.body);margin-bottom:2px}.name{display:block;font:700 clamp(3.6rem,8.8vw,8.5rem)/.92 var(--font-display);letter-spacing:-.055em}.name em{font-style:italic;color:${C.violetDeep}}.headline{display:block;font-size:clamp(1.45rem,3vw,2.7rem);line-height:1.12;letter-spacing:-.045em;margin-top:23px}.headline strong{font-family:var(--font-display);font-style:italic;color:${C.greenDeep}}.caret{font-weight:400;color:${C.violet};animation:blink 1s step-end infinite}.hero-lede{font-size:16px;line-height:1.8;color:${C.body};max-width:610px;margin:27px 0}.hero-actions{display:flex;gap:12px;flex-wrap:wrap}.button{display:inline-flex;align-items:center;gap:22px;border-radius:999px;padding:15px 20px;text-decoration:none;font-size:13px;font-weight:700}.button-dark{background:${C.ink};color:#fff}.button-dark span{color:${C.lime}}.button-ghost{border:1px solid rgba(17,18,15,.14);background:rgba(255,255,255,.55)}.hero-meta{display:flex;flex-wrap:wrap;gap:18px;margin-top:26px;color:#76786f;font:400 11px var(--mono)}.hero-visual{min-height:520px;position:relative;display:flex;align-items:center;justify-content:center}.system-card{width:min(480px,100%);border:1px solid rgba(17,18,15,.11);border-radius:28px;background:rgba(255,255,255,.7);backdrop-filter:blur(18px);box-shadow:0 35px 90px rgba(17,18,15,.11);padding:20px;transform:rotate(3deg);animation:cardFloat 7s ease-in-out infinite}.system-top,.system-footer{display:flex;justify-content:space-between;gap:15px;font:500 10px var(--mono);color:#8a8c84;letter-spacing:.08em}.status{color:${C.greenDeep}}.signal{margin:48px 0}.signal-line{display:grid;grid-template-columns:100px 1fr;align-items:center;gap:20px;margin:22px 0;font:500 10px var(--mono);color:${C.body}}.signal-line i{height:3px;border-radius:10px;background:linear-gradient(90deg,${C.green},${C.violet});position:relative}.signal-line i:after{content:'';position:absolute;right:0;top:50%;width:8px;height:8px;border-radius:50%;background:#fff;border:2px solid ${C.green};transform:translateY(-50%)}.floating-chip{position:absolute;padding:10px 13px;border-radius:999px;border:1px solid rgba(17,18,15,.1);background:rgba(255,255,255,.9);box-shadow:0 14px 30px rgba(17,18,15,.08);font:500 10px var(--mono);animation:chipFloat 5s ease-in-out infinite}.chip-a{top:16%;left:0}.chip-b{right:-3%;top:43%;animation-delay:-1.7s}.chip-c{left:9%;bottom:14%;animation-delay:-3s}.scroll-cue{position:absolute;left:6vw;bottom:26px;display:flex;gap:10px;align-items:center;color:#898b84;text-decoration:none;font:500 10px var(--mono);letter-spacing:.08em;text-transform:uppercase}.scroll-cue i{font-style:normal;color:${C.greenDeep};font-size:18px}
.section{position:relative;z-index:1;padding:130px 6vw}.section-head{max-width:1160px;margin:0 auto 55px}.section-head h2,.about-copy h2,.cert-layout h2,.contact-copy h2{font:700 clamp(2.7rem,6vw,5.8rem)/.98 var(--font-display);letter-spacing:-.055em;margin:14px 0 18px}.section-head h2 em,.about-copy h2 em,.cert-layout h2 em,.contact-copy h2 em{color:${C.violetDeep};font-style:italic}.section-head p,.cert-layout>div>p{color:${C.body};max-width:540px;line-height:1.7}.reveal{opacity:0;transform:translateY(45px);filter:blur(8px);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1),filter 1s ease}.reveal.in{opacity:1;transform:none;filter:none}
.work-track{max-width:1160px;margin:auto;display:flex;gap:22px;overflow-x:auto;padding:15px 0 25px;scroll-snap-type:x mandatory;scrollbar-width:none}.work-track::-webkit-scrollbar{display:none}.project-card{flex:0 0 min(390px,82vw);scroll-snap-align:start;border:1px solid rgba(17,18,15,.11);border-radius:28px;background:rgba(255,255,255,.76);overflow:hidden;box-shadow:0 22px 60px rgba(17,18,15,.07);transition:transform .2s ease,box-shadow .35s ease,border-color .35s}.project-card:hover{box-shadow:0 35px 80px rgba(17,18,15,.13);border-color:rgba(127,176,143,.5)}.project-art{height:300px;position:relative;padding:22px;background:radial-gradient(circle at 75% 20%,color-mix(in srgb,var(--accent) 24%,transparent),transparent 30%),linear-gradient(145deg,#eef2eb,#f8f7fb)}.project-index{font:500 11px var(--mono);color:var(--accent)}.flow-map{position:absolute;inset:80px 26px 35px;display:flex;flex-direction:column;justify-content:center;gap:17px}.flow-step{display:grid;grid-template-columns:34px 1fr auto;gap:11px;align-items:center}.flow-step span{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:var(--accent);box-shadow:0 9px 20px color-mix(in srgb,var(--accent) 30%,transparent)}.flow-step b{font-size:12px;font-weight:600;color:${C.ink}}.flow-step i{font-style:normal;font:500 14px var(--mono);color:#92958b}.project-scan{position:absolute;left:0;right:0;top:0;height:2px;background:var(--accent);box-shadow:0 0 18px var(--accent);animation:scan 4s linear infinite}.project-copy{padding:25px}.project-tag{font:500 9px var(--mono);letter-spacing:.13em;color:#8a8d84}.project-copy h3{font:600 23px/1.12 var(--font-display);letter-spacing:-.03em;margin:11px 0 13px}.project-copy p{font-size:13px;line-height:1.75;color:${C.body};margin:0 0 19px}.architecture{border-top:1px solid ${C.line};padding-top:14px;font-size:11px;line-height:1.6;color:#81847b}.architecture span{display:block;font:500 9px var(--mono);letter-spacing:.12em;color:${C.greenDeep};margin-bottom:4px}.project-link{display:flex;justify-content:space-between;margin-top:22px;text-decoration:none;font-size:12px;font-weight:700}.project-link span{color:${C.greenDeep}}.work-controls{max-width:1160px;margin:10px auto 0;display:flex;align-items:center;justify-content:space-between;color:#8a8d84;font:500 9px var(--mono);letter-spacing:.1em}.work-controls>div{display:flex;gap:7px}.work-controls button{width:7px;height:7px;padding:0;border:0;border-radius:50%;background:#d8dcd4}.work-controls button.on{width:30px;border-radius:99px;background:${C.green}}
.about-section{background:linear-gradient(180deg,transparent,rgba(255,255,255,.48),transparent)}.about-grid{max-width:1160px;margin:auto;display:grid;grid-template-columns:1fr 1fr;gap:8vw;align-items:start}.about-copy p{font-size:14px;line-height:1.9;color:${C.body};margin:0 0 18px}.quote-line{margin-top:30px;font:italic 18px var(--font-display);color:${C.violetDeep}}.about-dashboard{position:sticky;top:120px}.stats{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid rgba(17,18,15,.1);border-radius:22px;background:rgba(255,255,255,.7);overflow:hidden}.stats>div{padding:25px 15px;border-right:1px solid ${C.line}}.stats>div:last-child{border-right:0}.stats strong{display:block;font:600 27px var(--font-display);color:${C.greenDeep};letter-spacing:-.04em}.stats span{display:block;margin-top:6px;font:400 9px var(--mono);line-height:1.45;color:#85887f}.skills-panel,.mini-console{margin-top:14px;border:1px solid rgba(17,18,15,.1);border-radius:22px;background:rgba(255,255,255,.72);padding:22px}.panel-label,.mini-console>span{font:500 9px var(--mono);letter-spacing:.13em;color:#898c83;text-transform:uppercase}.skill-cloud{display:flex;flex-wrap:wrap;gap:8px;margin-top:15px}.skill-cloud span{padding:8px 11px;border-radius:999px;background:#edf6ef;border:1px solid #d2e6d7;color:#496a53;font-size:11px;transition:transform .25s,background .25s}.skill-cloud span:hover{transform:translateY(-4px) rotate(-1deg);background:#e1f1e6}.mini-console{display:grid;grid-template-columns:1fr auto;gap:15px;align-items:center}.mini-console>div{grid-column:1/-1;height:50px;display:flex;align-items:end;gap:5px}.mini-console>div i{flex:1;background:linear-gradient(to top,${C.green},${C.violet});border-radius:5px 5px 1px 1px;animation:bars 1.8s ease-in-out infinite}.mini-console>div i:nth-child(2n){height:35%}.mini-console>div i:nth-child(3n){height:70%}.mini-console>div i:nth-child(4n){height:48%}.mini-console>div i:nth-child(5n){height:85%}.mini-console>div i:nth-child(7n){height:60%}.mini-console>b{font:500 9px var(--mono);color:${C.greenDeep}}
.cert-section{padding-top:100px}.cert-layout{max-width:1160px;margin:auto;display:grid;grid-template-columns:.8fr 1.2fr;gap:8vw}.cert-layout>div>p{font-size:14px}.cert-list{margin-top:10px}.cert-list a{display:grid;grid-template-columns:42px 1fr 110px 25px;align-items:center;gap:15px;padding:18px 8px;border-bottom:1px solid ${C.line};text-decoration:none;transition:padding .3s,background .3s,transform .3s;border-radius:14px}.cert-list a:hover,.cert-list a.hovered{background:rgba(255,255,255,.72);padding-left:16px;padding-right:16px;transform:translateX(5px)}.cert-number{font:500 10px var(--mono);color:${C.greenDeep}}.cert-title{font-size:13px;line-height:1.45}.cert-issuer{font:500 9px var(--mono);color:#85887f;text-transform:uppercase}.cert-issuer small{display:block;margin-top:4px;color:#b1b4ad}.cert-list b{font:400 16px var(--mono);color:${C.violetDeep}}
.contact-section{padding:150px 6vw 110px}.contact-shell{max-width:1160px;margin:auto;display:grid;grid-template-columns:.85fr 1.15fr;gap:8vw;align-items:end}.contact-copy>p{max-width:500px;font-size:14px;line-height:1.85;color:${C.body}}.availability{display:inline-flex;gap:10px;align-items:center;padding:10px 14px;border-radius:999px;background:#eaf6ee;border:1px solid #cfe6d5;color:#4c7056;font-size:11px;font-weight:600;margin:22px 0}.availability i{width:7px;height:7px;border-radius:50%;background:${C.green};box-shadow:0 0 0 4px rgba(127,176,143,.16)}.contact-links{display:grid;gap:9px}.contact-links a{display:grid;grid-template-columns:90px 1fr auto;gap:10px;padding:14px 16px;border:1px solid rgba(17,18,15,.1);border-radius:16px;background:rgba(255,255,255,.58);text-decoration:none}.contact-links span{font:500 9px var(--mono);color:#8b8e85}.contact-links b{font-size:12px;font-weight:600}.contact-links i{font-style:normal;color:${C.greenDeep}}.contact-card{border:1px solid rgba(17,18,15,.11);border-radius:30px;background:rgba(255,255,255,.72);backdrop-filter:blur(16px);padding:10px;box-shadow:0 30px 90px rgba(17,18,15,.1)}.form-top{display:flex;justify-content:space-between;padding:15px 17px 12px;font:500 9px var(--mono);letter-spacing:.12em;color:#8b8e85}.contact-form{padding:12px 10px 10px;display:flex;flex-direction:column;gap:15px}.form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}.contact-form label{font:600 9px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:#85887f}.contact-form input,.contact-form textarea{display:block;margin-top:7px}.send-button{align-self:flex-start;border:0;border-radius:999px;padding:14px 22px;background:${C.ink};color:#fff;font:700 12px var(--font-sans);cursor:pointer;transition:.25s}.send-button:hover:not(:disabled){background:${C.greenDeep};transform:translateY(-2px);box-shadow:0 12px 28px rgba(79,127,96,.22)}.success-card{min-height:400px;display:grid;place-items:center;align-content:center;text-align:center;border-radius:22px;background:linear-gradient(145deg,#edf7ef,#f2edf9);position:relative;overflow:hidden}.success-mark{width:72px;height:72px;border-radius:50%;display:grid;place-items:center;background:#fff;color:${C.greenDeep};font-size:32px;box-shadow:0 15px 40px rgba(17,18,15,.1)}.success-card h3{font:600 28px var(--font-display);margin:20px 0 8px}.success-card p{margin:0;color:${C.body};font-size:13px}.success-orbit{position:absolute;font-size:120px;color:rgba(179,157,219,.18);right:-20px;bottom:-45px}
footer{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr 1fr;gap:15px;padding:28px 6vw;border-top:1px solid ${C.line};font:500 9px var(--mono);letter-spacing:.08em;color:#8b8e85}footer a{text-align:right;text-decoration:none;color:${C.greenDeep}}
@keyframes pulse{50%{box-shadow:0 0 0 8px rgba(127,176,143,0)}}@keyframes drift{50%{transform:translate(35px,-20px) scale(1.06)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes blink{50%{opacity:0}}@keyframes cardFloat{50%{transform:rotate(0deg) translateY(-12px)}}@keyframes chipFloat{50%{transform:translateY(-9px)}}@keyframes scan{0%{transform:translateY(0);opacity:0}10%,80%{opacity:1}100%{transform:translateY(300px);opacity:0}}@keyframes bars{50%{transform:scaleY(.55)}}
@media(max-width:1000px){.hero{grid-template-columns:1fr;padding-top:135px}.hero-visual{min-height:430px}.about-grid,.cert-layout,.contact-shell{grid-template-columns:1fr;gap:50px}.about-dashboard{position:static}.cert-layout>div:first-child{max-width:700px}.contact-shell{align-items:start}}
@media(max-width:760px){.nav-links,.nav-cta{display:none}.hamburger{display:block}.nav{padding-left:16px}.hero{padding:120px 24px 75px;gap:20px}.hero-visual{min-height:390px}.system-card{width:94%}.floating-chip{font-size:9px}.chip-a{left:-5px}.chip-b{right:-5px}.section{padding:90px 24px}.section-head h2,.about-copy h2,.cert-layout h2,.contact-copy h2{font-size:clamp(2.5rem,12vw,4.2rem)}.project-card{flex-basis:86vw}.form-row{grid-template-columns:1fr}.contact-section{padding:100px 24px 75px}.cert-list a{grid-template-columns:30px 1fr 25px}.cert-issuer{display:none}.work-controls{padding:0 2px}.hero-meta{gap:10px}.hero-lede{font-size:14px}footer{grid-template-columns:1fr;text-align:center;gap:9px;padding:24px}footer a{text-align:center}}
@media(max-width:480px){.name{font-size:18vw}.headline{font-size:1.3rem}.hero-visual{min-height:330px}.system-card{padding:15px;border-radius:22px}.signal{margin:35px 0}.signal-line{grid-template-columns:75px 1fr}.chip-c{bottom:7%;left:3%}.stats{grid-template-columns:1fr}.stats>div{border-right:0;border-bottom:1px solid ${C.line}}.stats>div:last-child{border-bottom:0}.project-art{height:270px}.cert-list a{padding:15px 5px}.cert-title{font-size:12px}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.001ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition:none!important}.reveal{opacity:1;transform:none;filter:none}}
`
