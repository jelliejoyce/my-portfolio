import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight,
  Code2,
  Sparkles,
  Zap,
  Layers,
  Terminal,
  Globe
} from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ backgroundColor: '#FAF8F5', color: '#1A1A1A', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '-0.5px' }}>
          JE
        </div>
        <div className="nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#work" style={{ color: '#666', textDecoration: 'none', fontSize: '15px' }}>Work</a>
          <a href="#about" style={{ color: '#666', textDecoration: 'none', fontSize: '15px' }}>About</a>
          <a href="#contact" style={{ color: '#666', textDecoration: 'none', fontSize: '15px' }}>Contact</a>
        </div>
        <a href="#contact" className="nav-cta" style={{ backgroundColor: '#1A1A1A', color: '#FFF', padding: '10px 20px', borderRadius: '100px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          Get in touch
        </a>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{ maxWidth: '1200px', margin: '40px auto 80px auto', padding: '120px 48px 80px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#EFECE6', padding: '6px 16px', borderRadius: '100px', fontSize: '14px', color: '#555', margin: '0 auto 24px auto' }}>
          <Sparkles size={16} />
          <span>Available for new opportunities</span>
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.1, margin: '0 auto 24px auto', maxWidth: '900px' }}>
          Designing & building digital experiences with purpose.
        </h1>
        <p style={{ fontSize: 'clamp(18px, 3vw, 22px)', color: '#666', maxWidth: '640px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
          Full-stack developer and designer focused on crafting clean interfaces, robust web apps, and modern digital products.
        </p>
        <div className="hero-ctas" style={{ display: 'flex', gap: '16px', justifyContent: 'center', margin: '0 auto' }}>
          <a href="#work" style={{ backgroundColor: '#1A1A1A', color: '#FFF', padding: '14px 28px', borderRadius: '100px', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            View projects <ChevronRight size={18} />
          </a>
          <a href="#contact" style={{ border: '1px solid #CCC', color: '#1A1A1A', padding: '14px 28px', borderRadius: '100px', textDecoration: 'none', fontWeight: 500 }}>
            Contact me
          </a>
        </div>
      </section>

      {/* Concept Cards Section */}
      <section id="work" className="concepts-section" style={{ maxWidth: '1200px', margin: '60px auto', padding: '80px 48px' }}>
        <div style={{ margin: '0 auto 48px auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-1px', margin: '0 auto 12px auto' }}>Selected Work</h2>
          <p style={{ color: '#666', fontSize: '18px', margin: '0 auto' }}>A collection of projects showcasing full-stack capabilities.</p>
        </div>
        
        <div className="concepts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', margin: '0 auto' }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: '#FFF', borderRadius: '24px', padding: '32px', border: '1px solid #E4E0D8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '0' }}>
            <div>
              <div style={{ backgroundColor: '#EFECE6', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 20px 0' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 600, margin: '0 0 12px 0' }}>JiroFlow Platform</h3>
              <p style={{ color: '#666', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                Streamlined productivity interface designed for high-efficiency task management and real-time collaboration.
              </p>
            </div>
            <a href="https://jiroflow.xyz" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#1A1A1A', fontWeight: 600, textDecoration: 'none', margin: '0' }}>
              Visit Website <ArrowUpRight size={18} />
            </a>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: '#FFF', borderRadius: '24px', padding: '32px', border: '1px solid #E4E0D8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '0' }}>
            <div>
              <div style={{ backgroundColor: '#EFECE6', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 20px 0' }}>
                <Layers size={24} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 600, margin: '0 0 12px 0' }}>Design System</h3>
              <p style={{ color: '#666', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                Comprehensive UI component library focused on accessibility, responsiveness, and consistent brand aesthetic.
              </p>
            </div>
            <a href="#work" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#1A1A1A', fontWeight: 600, textDecoration: 'none', margin: '0' }}>
              View System <ArrowUpRight size={18} />
            </a>
          </div>

          {/* Card 3 */}
          <div style={{ backgroundColor: '#FFF', borderRadius: '24px', padding: '32px', border: '1px solid #E4E0D8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '0' }}>
            <div>
              <div style={{ backgroundColor: '#EFECE6', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 20px 0' }}>
                <Terminal size={24} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 600, margin: '0 0 12px 0' }}>Developer Tools</h3>
              <p style={{ color: '#666', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                Custom CLI tools and integrations built to accelerate web development workflows and project scaffolding.
              </p>
            </div>
            <a href="#work" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#1A1A1A', fontWeight: 600, textDecoration: 'none', margin: '0' }}>
              Explore Tools <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section" style={{ maxWidth: '1200px', margin: '60px auto', padding: '80px 48px' }}>
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', margin: '0 auto' }}>
          <div style={{ margin: '0' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-1px', margin: '0 0 24px 0' }}>
              Passionate about creating modern, scalable web solutions.
            </h2>
            <p style={{ color: '#666', fontSize: '18px', lineHeight: 1.7, margin: '0 0 20px 0' }}>
              I specialize in React, TypeScript, modern CSS frameworks, and backend architectures. My approach balances user experience with performance engineering.
            </p>
            <p style={{ color: '#666', fontSize: '18px', lineHeight: 1.7, margin: '0 0 32px 0' }}>
              Whether building interactive client web applications or scalable APIs, I aim to write modular, maintainable code.
            </p>
            <div className="profile-card" style={{ display: 'flex', gap: '24px', alignItems: 'center', margin: '0' }}>
              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', borderTop: '1px solid #E4E0D8', borderBottom: '1px solid #E4E0D8', padding: '24px 0', width: '100%', margin: '0' }}>
                <div style={{ margin: '0' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, margin: '0' }}>5+</div>
                  <div style={{ color: '#666', fontSize: '14px', margin: '4px 0 0 0' }}>Years Experience</div>
                </div>
                <div style={{ margin: '0' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, margin: '0' }}>30+</div>
                  <div style={{ color: '#666', fontSize: '14px', margin: '4px 0 0 0' }}>Projects Delivered</div>
                </div>
                <div style={{ margin: '0' }}>
                  <div style={{ fontSize: '28px', fontWeight 700, margin: '0' }}>100%</div>
                  <div style={{ color: '#666', fontSize: '14px', margin: '4px 0 0 0' }}>Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: '#EFECE6', borderRadius: '24px', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0' }}>
            <Code2 size={64} color="#999" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section" style={{ maxWidth: '1200px', margin: '60px auto 80px auto', padding: '80px 48px' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', margin: '0 auto' }}>
          <div style={{ margin: '0' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-1px', margin: '0 0 16px 0' }}>Let's work together.</h2>
            <p style={{ color: '#666', fontSize: '18px', lineHeight: 1.6, margin: '0 0 32px 0' }}>
              Have a project in mind or want to discuss potential roles? Send me a message and I'll get back to you shortly.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#555', margin: '0' }}>
                <Mail size={20} /> <span>contact@jiroflow.xyz</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#555', margin: '0' }}>
                <Globe size={20} /> <span>jiroflow.xyz</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '0' }}>
            <div className="contact-form-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '0' }}>
              <div style={{ margin: '0' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, margin: '0 0 8px 0' }}>First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CCC', backgroundColor: '#FFF', boxSizing: 'border-box', margin: '0' }} 
                  required 
                />
              </div>
              <div style={{ margin: '0' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, margin: '0 0 8px 0' }}>Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CCC', backgroundColor: '#FFF', boxSizing: 'border-box', margin: '0' }} 
                  required 
                />
              </div>
            </div>
            <div style={{ margin: '0' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, margin: '0 0 8px 0' }}>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CCC', backgroundColor: '#FFF', boxSizing: 'border-box', margin: '0' }} 
                required 
              />
            </div>
            <div style={{ margin: '0' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, margin: '0 0 8px 0' }}>Message</label>
              <textarea 
                name="message" 
                rows={4} 
                value={formData.message} 
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #CCC', backgroundColor: '#FFF', boxSizing: 'border-box', margin: '0' }} 
                required 
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#1A1A1A', color: '#FFF', padding: '14px 28px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', margin: '0' }}>
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer" style={{ borderTop: '1px solid #E4E0D8', padding: '32px 48px', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#888', fontSize: '14px', margin: '0' }}>
          © {new Date().getFullYear()} JiroFlow. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '20px', margin: '0' }}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666' }}><Github size={20} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666' }}><Linkedin size={20} /></a>
        </div>
      </footer>

      {/* Responsive Styles (Margins & Alignment Tweaks) */}
      <style>{`
        .contact-grid { grid-template-columns: 1fr 1fr; gap: 64px; }
        
        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; margin: 0 auto !important; }
        }
        
        /* ── Mobile (≤768px) ── */
        @media (max-width: 768px) {
          /* Nav */
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          nav { padding: 0 20px !important; margin: 0 auto !important; }

          /* Hero */
          .hero-section { padding: 100px 24px 60px !important; min-height: auto !important; margin: 20px auto 40px auto !important; }
          .hero-ctas { flex-direction: column !important; align-items: stretch !important; gap: 10px !important; margin: 0 auto !important; }
          .hero-ctas a { text-align: center !important; margin: 0 !important; }

          /* Concept cards */
          .concepts-section { padding: 72px 24px !important; margin: 40px auto !important; }
          .concepts-grid { grid-template-columns: 1fr !important; margin: 0 auto !important; }

          /* About */
          .about-section { padding: 72px 24px !important; margin: 40px auto !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; margin: 0 auto !important; }
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; margin: 0 auto !important; }

          /* Contact */
          .contact-section { padding: 72px 24px !important; margin: 40px auto !important; }
          .contact-form-name-row { grid-template-columns: 1fr !important; margin: 0 auto !important; }

          /* Footer */
          .site-footer { padding: 24px 20px !important; flex-direction: column !important; gap: 8px !important; text-align: center !important; margin: 0 auto !important; }
        }

        /* ── Small phones (≤480px) ── */
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; margin: 0 auto !important; }
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid #E4E0D8 !important; margin: 0 !important; }
          .stats-grid > div:last-child { border-bottom: none !important; }
          .profile-card { flex-direction: column !important; align-items: flex-start !important; margin: 0 !important; }
        }
      `}</style>
    </div>
  );
}
