import type { GenerationResponse } from '../types';
import { TEMPLATES } from './templates';

interface ProjectContext {
  html: string;
  css: string;
  javascript: string;
}

// Keyword matching for demo mode template selection
function detectSiteType(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes('agency') || lower.includes('studio') || lower.includes('creative') || lower.includes('dark')) {
    return 'agency';
  }
  if (
    lower.includes('portfolio') ||
    lower.includes('personal') ||
    lower.includes('designer') ||
    lower.includes('developer') ||
    lower.includes('resume') ||
    lower.includes('cv') ||
    lower.includes('writer')
  ) {
    return 'portfolio';
  }
  // Default to SaaS/Startup landing page
  return 'startup';
}

export function demoGenerate(
  prompt: string,
  context?: { html: string; css: string; javascript: string } | undefined
): GenerationResponse {
  // If modifying existing project with code, execute contextual modification
  if (context && context.html && context.html.length > 100) {
    return modifyExisting(prompt, context);
  }

  const templateId = detectSiteType(prompt);
  const found = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];

  return {
    success: true,
    html: found.html,
    css: found.css,
    javascript: found.javascript,
  };
}

function modifyExisting(
  prompt: string,
  context: { html: string; css: string; javascript: string }
): GenerationResponse {
  const lower = prompt.toLowerCase();
  let css = context.css;
  let html = context.html;
  let js = context.javascript;

  // 1. Theme and color adjustments
  if (lower.includes('dark') && (lower.includes('mode') || lower.includes('theme') || lower.includes('bg'))) {
    css = css + '\n/* Applied Dark Theme */\nbody { background: #0F1419 !important; color: #F3F4F6 !important; }\n.nav, .section-alt, .card, .dashboard-mock { background: #1A2332 !important; border-color: #2D3D52 !important; }\n.card h3, .section-title, .logo, h1, h2, h3 { color: #FFFFFF !important; }\n.btn-ghost { color: #FFFFFF !important; border-color: #2D3D52 !important; }';
  } else if (lower.includes('light') && (lower.includes('mode') || lower.includes('theme'))) {
    css = css + '\n/* Applied Light Theme */\nbody { background: #FAFAF8 !important; color: #1A1A1A !important; }\n.section-dark { background: #F3F4F6 !important; color: #1A1A1A !important; }\n.section-dark h2 { color: #1A1A1A !important; }';
  }

  if (lower.includes('green') || lower.includes('emerald') || lower.includes('forest')) {
    css = css
      .replace(/--primary:\s*[^;]+;/g, '--primary: #14532D;')
      .replace(/--eb-primary:\s*[^;]+;/g, '--eb-primary: #14532D;')
      .replace(/--accent:\s*[^;]+;/g, '--accent: #16A34A;')
      .replace(/--eb-accent:\s*[^;]+;/g, '--eb-accent: #16A34A;');
  } else if (lower.includes('blue') || lower.includes('cobalt')) {
    css = css
      .replace(/--primary:\s*[^;]+;/g, '--primary: #1E3A5F;')
      .replace(/--eb-primary:\s*[^;]+;/g, '--eb-primary: #1E3A5F;')
      .replace(/--accent:\s*[^;]+;/g, '--accent: #4A90D9;')
      .replace(/--eb-accent:\s*[^;]+;/g, '--eb-accent: #4A90D9;');
  } else if (lower.includes('purple') || lower.includes('violet')) {
    css = css
      .replace(/--primary:\s*[^;]+;/g, '--primary: #4C1D95;')
      .replace(/--eb-primary:\s*[^;]+;/g, '--eb-primary: #4C1D95;')
      .replace(/--accent:\s*[^;]+;/g, '--accent: #8B5CF6;')
      .replace(/--eb-accent:\s*[^;]+;/g, '--eb-accent: #8B5CF6;');
  } else if (lower.includes('orange') || lower.includes('warm') || lower.includes('amber')) {
    css = css
      .replace(/--primary:\s*[^;]+;/g, '--primary: #7C2D12;')
      .replace(/--eb-primary:\s*[^;]+;/g, '--eb-primary: #7C2D12;')
      .replace(/--accent:\s*[^;]+;/g, '--accent: #EA580C;')
      .replace(/--eb-accent:\s*[^;]+;/g, '--eb-accent: #EA580C;');
  }

  // 2. Border radius tweaks
  if (lower.includes('pill') || lower.includes('rounded button') || lower.includes('round button')) {
    css = css + '\n.btn { border-radius: 9999px !important; }\n';
  } else if (lower.includes('sharp') || lower.includes('square')) {
    css = css + '\n.btn, .card, .dashboard-mock { border-radius: 0px !important; }\n';
  }

  // 3. Section injection: FAQ
  if (lower.includes('faq') || lower.includes('questions')) {
    const faqSection = `
  <!-- Added FAQ Section -->
  <section id="faq" class="section" style="border-top: 1px solid var(--border, #E5E7EB);">
    <div class="container" style="max-width: 800px; margin: 0 auto; padding: 4rem 2rem;">
      <h2 style="font-size: 2rem; text-align: center; margin-bottom: 2.5rem;">Frequently Asked Questions</h2>
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="border: 1px solid var(--border, #E5E7EB); border-radius: 8px; padding: 1.5rem; background: var(--surface, #FFFFFF);">
          <h3 style="font-size: 1.125rem; margin-bottom: 0.5rem; font-weight: 600;">How quickly can I get started?</h3>
          <p style="color: var(--muted, #6B7280); font-size: 0.95rem; line-height: 1.6;">You can launch your complete workspace in under two minutes with no engineering configuration needed.</p>
        </div>
        <div style="border: 1px solid var(--border, #E5E7EB); border-radius: 8px; padding: 1.5rem; background: var(--surface, #FFFFFF);">
          <h3 style="font-size: 1.125rem; margin-bottom: 0.5rem; font-weight: 600;">Can I export or host this anywhere?</h3>
          <p style="color: var(--muted, #6B7280); font-size: 0.95rem; line-height: 1.6;">Yes, download your production ZIP and deploy directly to GitHub Pages, Netlify, Vercel or any standard web server.</p>
        </div>
        <div style="border: 1px solid var(--border, #E5E7EB); border-radius: 8px; padding: 1.5rem; background: var(--surface, #FFFFFF);">
          <h3 style="font-size: 1.125rem; margin-bottom: 0.5rem; font-weight: 600;">What is your refund policy?</h3>
          <p style="color: var(--muted, #6B7280); font-size: 0.95rem; line-height: 1.6;">We offer a 30-day no-questions-asked money-back guarantee on all premium subscription tiers.</p>
        </div>
      </div>
    </div>
  </section>`;
    if (html.includes('<footer')) {
      html = html.replace('<footer', faqSection + '\n  <footer');
    } else {
      html = html.replace('</body>', faqSection + '\n</body>');
    }
  }

  // 4. Section injection: Newsletter / Contact form
  if ((lower.includes('contact') || lower.includes('form') || lower.includes('inquiry')) && !html.includes('id="contact"')) {
    const contactSection = `
  <!-- Added Contact Section -->
  <section id="contact" class="section" style="padding: 5rem 0; background: var(--surface, #FFFFFF); border-top: 1px solid var(--border, #E5E7EB);">
    <div class="container" style="max-width: 600px; margin: 0 auto; padding: 0 2rem; text-align: center;">
      <h2 style="font-size: 2rem; margin-bottom: 0.75rem;">Get in Touch</h2>
      <p style="color: var(--muted, #6B7280); margin-bottom: 2rem;">Have a question or looking to collaborate? Send us a note.</p>
      <form onsubmit="event.preventDefault(); alert('Message dispatched successfully!');" style="display: flex; flex-direction: column; gap: 1rem; text-align: left;">
        <div>
          <label style="display: block; font-size: 0.8125rem; font-weight: 500; margin-bottom: 0.35rem;">Full Name</label>
          <input type="text" required placeholder="Jane Doe" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid var(--border, #E5E7EB); border-radius: 6px; font-size: 0.9rem;" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8125rem; font-weight: 500; margin-bottom: 0.35rem;">Email Address</label>
          <input type="email" required placeholder="jane@example.com" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid var(--border, #E5E7EB); border-radius: 6px; font-size: 0.9rem;" />
        </div>
        <div>
          <label style="display: block; font-size: 0.8125rem; font-weight: 500; margin-bottom: 0.35rem;">Message</label>
          <textarea rows="4" required placeholder="Tell us about your project..." style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid var(--border, #E5E7EB); border-radius: 6px; font-size: 0.9rem; resize: vertical;"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; justify-content: center;">Send Message</button>
      </form>
    </div>
  </section>`;
    if (html.includes('<footer')) {
      html = html.replace('<footer', contactSection + '\n  <footer');
    } else {
      html = html.replace('</body>', contactSection + '\n</body>');
    }
  }

  // 5. Headline change request
  const headlineMatch = prompt.match(/change\s+(?:the\s+)?headline\s+(?:to\s+)?["']?([^"'\n]+)["']?/i);
  if (headlineMatch && headlineMatch[1]) {
    const newHeadline = headlineMatch[1].trim();
    html = html.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/i, `<h1>${newHeadline}</h1>`);
  }

  return {
    success: true,
    html,
    css,
    javascript: js,
  };
}
