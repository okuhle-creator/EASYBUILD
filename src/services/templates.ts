import type { Project, DesignSettings } from '../types';

export interface SiteTemplate {
  id: string;
  name: string;
  category: 'Portfolio' | 'SaaS' | 'Agency' | 'E-Commerce' | 'Hospitality';
  tagline: string;
  description: string;
  tags: string[];
  designSettings: DesignSettings;
  html: string;
  css: string;
  javascript: string;
}

export const TEMPLATES: SiteTemplate[] = [
  {
    id: 'startup',
    name: 'Meridian Analytics',
    category: 'SaaS',
    tagline: 'Analytics That Actually Make Sense',
    description: 'Conversion-engineered startup landing page with interactive metric visualizations, tiered pricing matrix, and enterprise proof.',
    tags: ['Hero Visual', 'Feature Grid', 'Tiered Pricing', 'Customer Quotes'],
    designSettings: {
      primaryColor: '#1E3A5F',
      secondaryColor: '#2D5A8E',
      accentColor: '#4A90D9',
      backgroundColor: '#FAFAF8',
      surfaceColor: '#FFFFFF',
      textColor: '#1A1A1A',
      mutedColor: '#6B7280',
      headingFont: 'DM Sans',
      bodyFont: 'Inter',
      baseSize: 16,
      headingScale: 1.25,
      spacing: 1,
      borderRadius: 10,
      maxWidth: 1100,
      theme: 'light',
    },
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Meridian — Analytics That Actually Make Sense</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
  <nav class="nav">
    <div class="container nav-inner">
      <a href="#" class="logo">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="#1E3A5F"/><path d="M7 18l5-5 4 4 5-8" stroke="#4A90D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Meridian
      </a>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#testimonials">Customers</a></li>
      </ul>
      <div class="nav-cta">
        <a href="#pricing" class="btn btn-ghost btn-sm">Sign In</a>
        <a href="#pricing" class="btn btn-primary btn-sm">Start Free Trial</a>
      </div>
    </div>
  </nav>

  <section class="hero">
    <div class="container hero-inner">
      <div class="badge">Now with AI-powered insights ✦</div>
      <h1>Analytics that actually<br/><span class="highlight">make sense.</span></h1>
      <p class="hero-desc">Meridian turns complex telemetry into clear growth decisions. Connect your stack, understand user momentum, and scale with confidence.</p>
      <div class="hero-cta">
        <a href="#pricing" class="btn btn-primary">Start Free — No Card Required</a>
        <a href="#features" class="btn btn-outline">Explore Product Tour</a>
      </div>
      <p class="hero-note">Trusted by 2,400+ product and engineering teams</p>
      <div class="hero-visual">
        <div class="dashboard-mock">
          <div class="mock-header">
            <div class="mock-dot"></div><div class="mock-dot"></div><div class="mock-dot"></div>
            <span class="mock-title">Production Overview — Live</span>
          </div>
          <div class="mock-content">
            <div class="mock-stat"><strong>+34.8%</strong><span>Net MRR</span></div>
            <div class="mock-stat"><strong>1.48M</strong><span>Active Sessions</span></div>
            <div class="mock-stat"><strong>99.98%</strong><span>API Health</span></div>
          </div>
          <div class="mock-chart">
            <svg viewBox="0 0 300 80" preserveAspectRatio="none">
              <path d="M0 70 C50 60 80 20 130 30 S220 10 300 5" stroke="#4A90D9" stroke-width="2.5" fill="none"/>
              <path d="M0 70 C50 60 80 20 130 30 S220 10 300 5 V80 H0Z" fill="url(#grad)" opacity="0.15"/>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#4A90D9"/>
                  <stop offset="100%" stop-color="transparent"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="features" class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-label">Features</span>
        <h2>Everything you need to grow faster</h2>
        <p>Built for teams who care about real outcomes, not vanity metrics.</p>
      </div>
      <div class="features-grid">
        <div class="feature-card featured">
          <div class="feature-icon">📊</div>
          <h3>Unified Data Engine</h3>
          <p>Consolidate user events, product churn, and payment lifecycles into a single authoritative dashboard.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🤖</div>
          <h3>Automated Anomaly Detection</h3>
          <p>Instant plain-English summaries when activation drops or conversion surges occur.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Sub-second Latency</h3>
          <p>Distributed real-time streaming pipeline renders live cohort queries with zero refresh delays.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Enterprise-Grade Compliance</h3>
          <p>SOC 2 Type II, HIPAA ready, end-to-end payload encryption and configurable granular RBAC permissions.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>Native Mobile Command</h3>
          <p>Responsive executive cockpit accessible seamlessly on iOS and Android devices.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔗</div>
          <h3>150+ Direct Connectors</h3>
          <p>One-click data ingestion from Stripe, Segment, Snowflake, Postgres, and Shopify.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="testimonials" class="section section-dark">
    <div class="container">
      <div class="section-head light">
        <h2>Loved by teams that ship</h2>
        <p>See why high-growth companies rely on Meridian every day.</p>
      </div>
      <div class="testimonials-grid">
        <blockquote class="testimonial">
          <p>"Meridian replaced four fragmented dashboards for our leadership team. We halved our reporting overhead within weeks."</p>
          <cite>
            <strong>Elena Rostova</strong>
            <span>VP Growth, OrbitScale</span>
          </cite>
        </blockquote>
        <blockquote class="testimonial">
          <p>"The automated insights pinpointed our checkout friction point on day two. The ROI paid for the annual plan in 48 hours."</p>
          <cite>
            <strong>Marcus Chen</strong>
            <span>CTO, Stackflow Inc</span>
          </cite>
        </blockquote>
        <blockquote class="testimonial">
          <p>"Our board reviews are actually productive now. Clear visual metrics that engineers and investors both understand immediately."</p>
          <cite>
            <strong>Sarah K. Lindqvist</strong>
            <span>Founder & CEO, Novaline</span>
          </cite>
        </blockquote>
      </div>
    </div>
  </section>

  <section id="pricing" class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-label">Pricing</span>
        <h2>Simple, honest pricing</h2>
        <p>No surprise usage penalties. Upgrade or cancel anytime.</p>
      </div>
      <div class="pricing-grid">
        <div class="pricing-card">
          <h3>Starter</h3>
          <div class="price"><strong>$0</strong><span>/month</span></div>
          <p class="pricing-desc">For early prototypes and solo builders.</p>
          <ul class="pricing-features">
            <li>Up to 5 team members</li>
            <li>3 active data pipelines</li>
            <li>30-day historical retention</li>
            <li>Community support</li>
          </ul>
          <a href="#" class="btn btn-outline w-full">Get Started Free</a>
        </div>
        <div class="pricing-card featured-card">
          <div class="popular-badge">Most Popular</div>
          <h3>Scale</h3>
          <div class="price"><strong>$49</strong><span>/month</span></div>
          <p class="pricing-desc">For fast-growing product squads.</p>
          <ul class="pricing-features">
            <li>Unlimited team seats</li>
            <li>Unlimited integrations</li>
            <li>1-year historical analytics</li>
            <li>AI anomaly detection</li>
            <li>Priority 24/7 support</li>
          </ul>
          <a href="#" class="btn btn-primary w-full">Start 14-Day Free Trial</a>
        </div>
        <div class="pricing-card">
          <h3>Enterprise</h3>
          <div class="price"><strong>Custom</strong></div>
          <p class="pricing-desc">For organisations with custom compliance needs.</p>
          <ul class="pricing-features">
            <li>Dedicated cloud tenancy</li>
            <li>SAML / Okta SSO integration</li>
            <li>Custom SQL query engine</li>
            <li>99.99% uptime SLA</li>
          </ul>
          <a href="#" class="btn btn-outline w-full">Speak with Solutions</a>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="container text-center">
      <h2>Ready to understand your product data?</h2>
      <p>Join 2,400+ software teams making confident, data-driven decisions today.</p>
      <a href="#pricing" class="btn btn-primary btn-lg">Get Started in 2 Minutes</a>
    </div>
  </section>

  <footer class="footer">
    <div class="container footer-inner">
      <a href="#" class="logo">
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="#1E3A5F"/><path d="M7 18l5-5 4 4 5-8" stroke="#4A90D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Meridian
      </a>
      <p>© 2025 Meridian Analytics Technologies. All rights reserved.</p>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">System Status</a>
      </div>
    </div>
  </footer>
  <script src="script.js"></script>
</body>
</html>`,
    css: `:root {
  --primary: #1E3A5F;
  --accent: #4A90D9;
  --bg: #FAFAF8;
  --surface: #FFFFFF;
  --text: #1A1A1A;
  --muted: #6B7280;
  --border: #E5E7EB;
  --dark-bg: #0F1419;
  --dark-surface: #1A2332;
  --radius: 10px;
  --max-w: 1100px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'DM Sans', 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.container { max-width: var(--max-w); margin: 0 auto; padding: 0 2rem; }

/* Nav */
.nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(250,250,248,0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  display: flex; align-items: center;
  justify-content: space-between; height: 64px;
}
.logo {
  display: flex; align-items: center; gap: 0.5rem;
  font-weight: 700; font-size: 1.125rem;
  color: var(--primary); text-decoration: none;
}
.nav-links {
  list-style: none; display: flex; gap: 2rem;
}
.nav-links a {
  text-decoration: none; color: var(--muted);
  font-size: 0.9rem; font-weight: 500;
  transition: color 0.15s;
}
.nav-links a:hover { color: var(--text); }
.nav-cta { display: flex; gap: 0.75rem; }

/* Buttons */
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.625rem 1.375rem;
  border-radius: var(--radius); font-size: 0.9375rem;
  font-weight: 500; text-decoration: none;
  transition: all 0.18s; cursor: pointer; border: none;
}
.btn-primary { background: var(--primary); color: #fff; }
.btn-primary:hover { background: #2D5A8E; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(30,58,95,.3); }
.btn-ghost { background: transparent; color: var(--text); }
.btn-ghost:hover { background: var(--surface); }
.btn-outline { background: transparent; color: var(--primary); border: 1.5px solid var(--primary); }
.btn-outline:hover { background: var(--primary); color: #fff; }
.btn-sm { padding: 0.45rem 1rem; font-size: 0.875rem; }
.btn-lg { padding: 0.875rem 2.25rem; font-size: 1.0625rem; }
.w-full { width: 100%; justify-content: center; }

/* Hero */
.hero { padding: 6rem 0 4rem; }
.hero-inner { max-width: 760px; }
.badge {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.8125rem; font-weight: 500;
  color: var(--accent); background: #EBF3FC;
  border: 1px solid #BFD9F5; border-radius: 9999px;
  padding: 0.3rem 1rem; margin-bottom: 1.75rem;
}
h1 {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 700; line-height: 1.1;
  letter-spacing: -0.03em; margin-bottom: 1.25rem;
  color: var(--primary);
}
.highlight { color: var(--accent); }
.hero-desc {
  font-size: 1.0625rem; color: var(--muted);
  max-width: 580px; margin-bottom: 2rem; line-height: 1.7;
}
.hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.hero-note { font-size: 0.8125rem; color: var(--muted); }

/* Dashboard mock */
.hero-visual { margin-top: 3.5rem; }
.dashboard-mock {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 14px; overflow: hidden;
  box-shadow: 0 12px 48px rgba(0,0,0,0.08);
  max-width: 680px;
}
.mock-header {
  display: flex; align-items: center; gap: 6px; padding: 12px 16px;
  background: #F9FAFB; border-bottom: 1px solid var(--border);
}
.mock-dot {
  width: 10px; height: 10px; border-radius: 50%; background: var(--border);
}
.mock-title {
  margin-left: 12px; font-size: 0.75rem; color: var(--muted); font-weight: 500;
}
.mock-content {
  display: flex; gap: 1px;
  padding: 1.5rem; justify-content: space-around;
}
.mock-stat { text-align: center; }
.mock-stat strong { display: block; font-size: 1.625rem; font-weight: 700; color: var(--primary); }
.mock-stat span { font-size: 0.75rem; color: var(--muted); }
.mock-chart { padding: 0 1.5rem 1.5rem; }
.mock-chart svg { width: 100%; height: 80px; }

/* Sections */
.section { padding: 5.5rem 0; }
.section-dark { background: var(--dark-bg); color: #fff; }
.section-head { text-align: center; margin-bottom: 3.5rem; }
.section-head.light h2 { color: #fff; }
.section-head.light p { color: rgba(255,255,255,0.7); }
.section-head h2 {
  font-size: clamp(1.75rem, 3vw, 2.375rem);
  font-weight: 700; color: var(--primary);
  letter-spacing: -0.02em; margin: 0.5rem 0 0.875rem;
}
.section-head p { color: var(--muted); font-size: 1rem; max-width: 520px; margin: 0 auto; }
.section-label {
  display: inline-block; font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--accent);
}

/* Features */
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.feature-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 2rem;
  transition: box-shadow 0.2s, transform 0.2s;
}
.feature-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,.08); transform: translateY(-2px); }
.feature-card.featured { border-color: var(--accent); background: #EBF3FC; }
.feature-icon { font-size: 1.85rem; margin-bottom: 1.25rem; }
.feature-card h3 { font-size: 1.0625rem; font-weight: 600; color: var(--primary); margin-bottom: 0.5rem; }
.feature-card p { font-size: 0.9rem; color: var(--muted); line-height: 1.6; }

/* Testimonials */
.testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.testimonial {
  background: var(--dark-surface); border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius); padding: 2.25rem;
}
.testimonial p { color: rgba(255,255,255,0.88); font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem; }
.testimonial cite { display: block; font-style: normal; }
.testimonial cite strong { display: block; color: #fff; font-size: 0.9375rem; }
.testimonial cite span { font-size: 0.8125rem; color: rgba(255,255,255,0.5); }

/* Pricing */
.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.75rem; max-width: 960px; margin: 0 auto; }
.pricing-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 2.25rem; position: relative;
  display: flex; flex-direction: column;
}
.pricing-card.featured-card { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(74,144,217,0.12); }
.popular-badge {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: var(--accent); color: #fff; font-size: 0.75rem;
  font-weight: 600; padding: 0.25rem 0.875rem; border-radius: 9999px;
}
.pricing-card h3 { font-size: 1.125rem; font-weight: 600; color: var(--primary); margin-bottom: 0.5rem; }
.pricing-desc { font-size: 0.8125rem; color: var(--muted); margin-bottom: 1rem; }
.price { display: flex; align-items: baseline; gap: 0.25rem; margin-bottom: 1.5rem; }
.price strong { font-size: 2.5rem; font-weight: 700; color: var(--primary); }
.price span { color: var(--muted); font-size: 0.9rem; }
.pricing-features { list-style: none; margin-bottom: 2rem; flex: 1; }
.pricing-features li {
  padding: 0.6rem 0; font-size: 0.875rem; color: var(--text);
  border-bottom: 1px solid var(--border);
}
.pricing-features li::before { content: '✓  '; color: #16A34A; font-weight: 600; }

/* CTA */
.cta-section { background: var(--primary); color: #fff; padding: 5.5rem 0; }
.cta-section h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); margin-bottom: 1rem; color: #fff; }
.cta-section p { color: rgba(255,255,255,0.78); margin-bottom: 2.25rem; font-size: 1.0625rem; }
.cta-section .btn-primary { background: #fff; color: var(--primary); }
.cta-section .btn-primary:hover { background: rgba(255,255,255,0.92); }
.text-center { text-align: center; }

/* Footer */
.footer { border-top: 1px solid var(--border); padding: 2.5rem 0; background: var(--surface); }
.footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.25rem; }
.footer p { font-size: 0.8125rem; color: var(--muted); }
.footer-links { display: flex; gap: 1.75rem; }
.footer-links a { font-size: 0.8125rem; color: var(--muted); text-decoration: none; }
.footer-links a:hover { color: var(--text); }

@media (max-width: 768px) {
  .nav-links { display: none; }
  h1 { font-size: 2.25rem; }
  .section { padding: 3.5rem 0; }
  .hero { padding: 4rem 0 2rem; }
}`,
    javascript: `// Meridian landing page script
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});`,
  },
  {
    id: 'portfolio',
    name: 'Alex Morgan Portfolio',
    category: 'Portfolio',
    tagline: 'Design That Thinks, Code That Works',
    description: 'Sophisticated editorial portfolio featuring featured case studies, skills taxonomy, career milestones and project inquiry.',
    tags: ['Editorial Serif', 'Case Studies', 'Metrics Badges', 'Contact Form'],
    designSettings: {
      primaryColor: '#1E3A5F',
      secondaryColor: '#2D5A8E',
      accentColor: '#4A90D9',
      backgroundColor: '#FAFAF8',
      surfaceColor: '#FFFFFF',
      textColor: '#1A1A1A',
      mutedColor: '#6B7280',
      headingFont: 'Playfair Display',
      bodyFont: 'Inter',
      baseSize: 16,
      headingScale: 1.3,
      spacing: 1.25,
      borderRadius: 8,
      maxWidth: 1100,
      theme: 'light',
    },
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Alex Morgan — Designer & Developer</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
  <nav class="nav">
    <div class="nav-inner container">
      <a href="#" class="logo">Alex Morgan</a>
      <ul class="nav-links">
        <li><a href="#work">Selected Work</a></li>
        <li><a href="#about">About & Philosophy</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <span class="hero-label">Available for Q4 Engagements</span>
      <h1 class="hero-title">Design that thinks,<br/><em>code that endures.</em></h1>
      <p class="hero-sub">I'm Alex Morgan — a senior product designer and front-end architect bridging the gap between rigorous design systems and production code.</p>
      <div class="hero-actions">
        <a href="#work" class="btn btn-primary">View Case Studies</a>
        <a href="#contact" class="btn btn-ghost">Initiate Project</a>
      </div>
    </div>
  </section>

  <section id="work" class="section">
    <div class="container">
      <h2 class="section-title">Selected Case Studies</h2>
      <div class="grid grid-3">
        <article class="card project-card">
          <div class="card-img" style="background:#EBF3FC"></div>
          <div class="card-body">
            <span class="tag">Product Architecture</span>
            <h3>Fintrack Global</h3>
            <p>Redesigned the portfolio risk dashboard for 200k institutional investors, trimming transaction completion by 38%.</p>
          </div>
        </article>
        <article class="card project-card">
          <div class="card-img" style="background:#F0FDF4"></div>
          <div class="card-body">
            <span class="tag">Design Systems</span>
            <h3>Atlas Component Core</h3>
            <p>Authored a multi-brand design tokens architecture adopted across 14 cross-functional product squads.</p>
          </div>
        </article>
        <article class="card project-card">
          <div class="card-img" style="background:#FFF7ED"></div>
          <div class="card-body">
            <span class="tag">Full-Stack Frontend</span>
            <h3>Meridian Cloud</h3>
            <p>Architected high-velocity marketing platform achieving 99/100 Lighthouse performance and 4.2% launch conversion.</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section id="about" class="section section-alt">
    <div class="container about-grid">
      <div class="about-text">
        <h2 class="section-title">About & Approach</h2>
        <p>I operate at the precise intersection of ergonomic user research, tactile visual craft, and resilient software engineering.</p>
        <p>Over eight years at seed-stage disruptors and hyper-growth venture studios, I have helped deliver software relied upon by over 3 million users globally.</p>
        <ul class="skill-list">
          <li>Design Systems</li>
          <li>TypeScript & React</li>
          <li>Interaction Prototyping</li>
          <li>Performance Tuning</li>
        </ul>
      </div>
      <div class="about-stats">
        <div class="stat"><strong>8+</strong><span>Years Experience</span></div>
        <div class="stat"><strong>45+</strong><span>Shipped Milestones</span></div>
        <div class="stat"><strong>99.4%</strong><span>Client CSAT</span></div>
      </div>
    </div>
  </section>

  <section id="contact" class="section">
    <div class="container text-center">
      <h2 class="section-title">Let's craft something remarkable</h2>
      <p class="contact-sub">Seeking advisory roles, contract design leadership, or end-to-end MVP execution.</p>
      <a href="mailto:alex@morgan-studio.com" class="btn btn-primary btn-lg">hello@alexmorgan.design</a>
    </div>
  </section>

  <footer class="footer">
    <div class="container footer-inner">
      <span class="logo">Alex Morgan Studio</span>
      <p>© 2025 Alex Morgan. Designed with deliberate typography & care.</p>
    </div>
  </footer>
  <script src="script.js"></script>
</body>
</html>`,
    css: `/* Alex Morgan Portfolio */
:root {
  --eb-primary: #1E3A5F;
  --eb-accent: #4A90D9;
  --eb-bg: #FAFAF8;
  --eb-surface: #FFFFFF;
  --eb-text: #1A1A1A;
  --eb-muted: #6B7280;
  --eb-border: #E5E7EB;
  --eb-radius: 8px;
  --eb-max-width: 1100px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--eb-bg);
  color: var(--eb-text);
  line-height: 1.6;
}

.container {
  max-width: var(--eb-max-width);
  margin: 0 auto;
  padding: 0 2rem;
}

.nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(250,250,248,0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--eb-border);
}

.nav-inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 64px;
}

.logo {
  font-weight: 700; font-size: 1.1rem;
  color: var(--eb-primary); text-decoration: none;
  font-family: 'Playfair Display', serif;
}

.nav-links {
  list-style: none; display: flex; gap: 2rem;
}

.nav-links a {
  text-decoration: none; color: var(--eb-muted);
  font-size: 0.9rem; font-weight: 500;
  transition: color 0.15s;
}

.nav-links a:hover { color: var(--eb-text); }

.hero { padding: 7rem 0 6rem; }

.hero-label {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.8125rem; font-weight: 500;
  color: #16A34A; background: #F0FDF4;
  border: 1px solid #BBF7D0; border-radius: 9999px;
  padding: 0.25rem 0.875rem; margin-bottom: 1.5rem;
}

.hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600; line-height: 1.15;
  letter-spacing: -0.02em; margin-bottom: 1.5rem;
  color: var(--eb-primary);
}

.hero-title em { font-style: italic; color: var(--eb-accent); }

.hero-sub {
  max-width: 540px; color: var(--eb-muted);
  font-size: 1.0625rem; line-height: 1.7; margin-bottom: 2.5rem;
}

.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.65rem 1.4rem; border-radius: var(--eb-radius);
  font-size: 0.9375rem; font-weight: 500; text-decoration: none;
  transition: all 0.18s ease; cursor: pointer; border: none;
}

.btn-primary { background: var(--eb-primary); color: #fff; }
.btn-primary:hover { background: #2D5A8E; transform: translateY(-1px); }
.btn-ghost { background: transparent; color: var(--eb-text); border: 1px solid var(--eb-border); }
.btn-ghost:hover { background: var(--eb-surface); border-color: #D1D5DB; }
.btn-lg { padding: 0.875rem 2.25rem; font-size: 1rem; }

.section { padding: 5rem 0; }
.section-alt { background: var(--eb-surface); border-top: 1px solid var(--eb-border); border-bottom: 1px solid var(--eb-border); }

.section-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 600; color: var(--eb-primary); margin-bottom: 2.5rem;
}

.grid { display: grid; gap: 1.5rem; }
.grid-3 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }

.card {
  background: var(--eb-surface); border: 1px solid var(--eb-border);
  border-radius: var(--eb-radius); overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-2px);
}

.card-img { height: 180px; border-bottom: 1px solid var(--eb-border); }
.card-body { padding: 1.75rem; }

.tag {
  display: inline-block; font-size: 0.75rem; font-weight: 500;
  color: var(--eb-accent); background: #EBF3FC;
  padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.75rem;
}

.card-body h3 {
  font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--eb-primary);
}

.card-body p { font-size: 0.9rem; color: var(--eb-muted); line-height: 1.6; }

.about-grid { display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: start; }
.about-text p { color: var(--eb-muted); margin-bottom: 1rem; font-size: 0.95rem; }

.skill-list { list-style: none; display: flex; flex-wrap: wrap; gap: 0.625rem; margin-top: 1.5rem; }
.skill-list li {
  font-size: 0.8125rem; font-weight: 500; color: var(--eb-primary);
  background: var(--eb-bg); border: 1px solid var(--eb-border);
  padding: 0.3rem 0.85rem; border-radius: 9999px;
}

.about-stats { display: flex; flex-direction: column; gap: 2rem; }
.stat strong { display: block; font-size: 2.25rem; font-weight: 700; color: var(--eb-primary); font-family: 'Playfair Display', serif; }
.stat span { font-size: 0.8125rem; color: var(--eb-muted); }

.text-center { text-align: center; }
.contact-sub { color: var(--eb-muted); margin-bottom: 2rem; font-size: 1.0625rem; }

.footer { border-top: 1px solid var(--eb-border); padding: 2.5rem 0; background: var(--eb-surface); }
.footer-inner { display: flex; align-items: center; justify-content: space-between; }
.footer p { font-size: 0.8125rem; color: var(--eb-muted); }

@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; }
  .about-stats { flex-direction: row; justify-content: space-around; }
}`,
    javascript: `// Alex Morgan portfolio interactions
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});`,
  },
  {
    id: 'agency',
    name: 'Vektor Creative Studio',
    category: 'Agency',
    tagline: 'Brand Systems & Digital Experiences',
    description: 'Disciplined creative studio showcase with dark atmospheric palette, services matrix, project archive, and client roster.',
    tags: ['Dark Mode', 'Services Matrix', 'Client Badges', 'Inquiry Module'],
    designSettings: {
      primaryColor: '#0F1419',
      secondaryColor: '#1E2730',
      accentColor: '#4A90D9',
      backgroundColor: '#0F1419',
      surfaceColor: '#1A2332',
      textColor: '#F3F4F6',
      mutedColor: '#9CA3AF',
      headingFont: 'Outfit',
      bodyFont: 'Inter',
      baseSize: 16,
      headingScale: 1.25,
      spacing: 1,
      borderRadius: 6,
      maxWidth: 1200,
      theme: 'dark',
    },
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Vektor — Brand Systems & Digital Experiences</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
  <nav class="nav">
    <div class="container nav-inner">
      <a href="#" class="logo">VEKTOR</a>
      <ul class="nav-links">
        <li><a href="#work">Archive</a></li>
        <li><a href="#services">Capabilities</a></li>
        <li><a href="#about">Studio</a></li>
        <li><a href="#contact" class="btn btn-sm">Start Project</a></li>
      </ul>
    </div>
  </nav>

  <header class="hero">
    <div class="container">
      <p class="hero-tagline">INDEPENDENT BRAND & DIGITAL STUDIO</p>
      <h1 class="hero-heading">We forge brand identities and digital flagships for ambitious companies worldwide.</h1>
      <div class="hero-meta">
        <div><span>Offices in</span><strong>Berlin & London</strong></div>
        <div><span>Core Discipline</span><strong>Identity + Web</strong></div>
        <div><span>Current Status</span><strong>Taking Q1 Projects</strong></div>
      </div>
    </div>
  </header>

  <section id="work" class="section">
    <div class="container">
      <div class="section-top">
        <h2>Selected Commissions</h2>
        <a href="#contact" class="link-arrow">View All Archive →</a>
      </div>
      <div class="work-grid">
        <div class="work-item">
          <div class="work-thumb" style="background:#1E2730;"></div>
          <div class="work-meta">
            <h3>Solace Health</h3>
            <span>Brand Identity / Web App</span>
          </div>
        </div>
        <div class="work-item">
          <div class="work-thumb" style="background:#243242;"></div>
          <div class="work-meta">
            <h3>Aura Architecture</h3>
            <span>Editorial Web Platform</span>
          </div>
        </div>
        <div class="work-item">
          <div class="work-thumb" style="background:#1B2E3D;"></div>
          <div class="work-meta">
            <h3>Kanso Robotics</h3>
            <span>Industrial Brand System</span>
          </div>
        </div>
        <div class="work-item">
          <div class="work-thumb" style="background:#2C3E50;"></div>
          <div class="work-meta">
            <h3>Equinox Capital</h3>
            <span>Identity & Design System</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="services" class="section section-border">
    <div class="container">
      <h2>Capabilities</h2>
      <div class="services-list">
        <div class="service-row">
          <span class="service-num">01</span>
          <h3>Brand Architecture</h3>
          <p>Naming, brand strategy, visual positioning, typographic identity, art direction, and comprehensive guidelines.</p>
        </div>
        <div class="service-row">
          <span class="service-num">02</span>
          <h3>Digital Product Design</h3>
          <p>Interactive web flagships, bespoke software UI/UX, conversion funnels, motion choreography, and high-fidelity prototypes.</p>
        </div>
        <div class="service-row">
          <span class="service-num">03</span>
          <h3>Engineering & Systems</h3>
          <p>Production front-end engineering, headless CMS integrations, WebGL visualizers, and headless commerce setups.</p>
        </div>
      </div>
    </div>
  </section>

  <footer id="contact" class="footer">
    <div class="container footer-content">
      <h2>Have a project in mind?</h2>
      <a href="mailto:hello@vektor.studio" class="contact-email">hello@vektor.studio</a>
      <div class="footer-bottom">
        <span>© 2025 VEKTOR STUDIO LTD. ALL RIGHTS RESERVED.</span>
        <span>BERLIN / LONDON</span>
      </div>
    </div>
  </footer>
</body>
</html>`,
    css: `:root {
  --bg: #0F1419;
  --surface: #1A2332;
  --border: #263342;
  --text: #F3F4F6;
  --muted: #9CA3AF;
  --accent: #4A90D9;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

.nav {
  border-bottom: 1px solid var(--border);
  padding: 1.25rem 0;
  position: sticky; top: 0;
  background: rgba(15,20,25,0.9);
  backdrop-filter: blur(10px);
  z-index: 50;
}

.nav-inner { display: flex; align-items: center; justify-content: space-between; }
.logo { font-family: 'Outfit', sans-serif; font-weight: 700; letter-spacing: 0.15em; color: #fff; text-decoration: none; font-size: 1.125rem; }
.nav-links { list-style: none; display: flex; align-items: center; gap: 2rem; }
.nav-links a { color: var(--muted); text-decoration: none; font-size: 0.875rem; transition: color 0.15s; }
.nav-links a:hover { color: #fff; }

.btn-sm {
  background: #fff; color: var(--bg) !important;
  padding: 0.4rem 1rem; border-radius: 4px; font-weight: 500;
}

.hero { padding: 6.5rem 0 5rem; border-bottom: 1px solid var(--border); }
.hero-tagline { font-size: 0.75rem; letter-spacing: 0.2em; color: var(--accent); margin-bottom: 1.5rem; font-weight: 600; }
.hero-heading { font-family: 'Outfit', sans-serif; font-size: clamp(2.25rem, 4.5vw, 3.75rem); line-height: 1.15; font-weight: 600; max-width: 980px; margin-bottom: 3.5rem; }
.hero-meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; border-top: 1px solid var(--border); padding-top: 2rem; }
.hero-meta span { display: block; font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
.hero-meta strong { font-size: 1rem; color: #fff; font-weight: 500; }

.section { padding: 5rem 0; }
.section-border { border-top: 1px solid var(--border); }
.section-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3rem; }
.section-top h2, .section h2 { font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 600; }
.link-arrow { color: var(--accent); text-decoration: none; font-size: 0.875rem; }

.work-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
.work-item { display: flex; flex-direction: column; gap: 1rem; }
.work-thumb { height: 260px; border-radius: 6px; border: 1px solid var(--border); }
.work-meta h3 { font-size: 1.125rem; font-weight: 600; color: #fff; margin-bottom: 0.25rem; }
.work-meta span { font-size: 0.8125rem; color: var(--muted); }

.services-list { margin-top: 2.5rem; display: flex; flex-direction: column; }
.service-row { display: grid; grid-template-columns: 80px 240px 1fr; gap: 2rem; padding: 2.5rem 0; border-bottom: 1px solid var(--border); align-items: baseline; }
.service-num { font-family: 'Outfit', sans-serif; font-size: 0.875rem; color: var(--accent); }
.service-row h3 { font-family: 'Outfit', sans-serif; font-size: 1.25rem; color: #fff; font-weight: 600; }
.service-row p { color: var(--muted); font-size: 0.95rem; }

.footer { padding: 6rem 0 3rem; border-top: 1px solid var(--border); }
.footer-content h2 { font-family: 'Outfit', sans-serif; font-size: 2.25rem; margin-bottom: 1.5rem; }
.contact-email { font-family: 'Outfit', sans-serif; font-size: clamp(2rem, 5vw, 4rem); color: #fff; text-decoration: none; border-bottom: 2px solid var(--accent); display: inline-block; margin-bottom: 4rem; }
.footer-bottom { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--muted); }

@media (max-width: 768px) {
  .service-row { grid-template-columns: 1fr; gap: 0.75rem; }
  .nav-links { display: none; }
}`,
    javascript: '',
  },
];

export function getTemplateById(id: string): SiteTemplate | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function createProjectFromTemplate(template: SiteTemplate): Partial<Project> {
  return {
    name: template.name,
    description: template.description,
    html: template.html,
    css: template.css,
    javascript: template.javascript,
    designSettings: { ...template.designSettings },
  };
}
