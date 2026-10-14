import React from 'react';
import { BookOpen, Terminal, Code2, Sparkles, Shield, Github, Layers, Zap } from 'lucide-react';
import styles from './Documentation.module.css';

export function Documentation() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.badge}>Developer & User Guide</span>
          <h1 className={styles.pageTitle}>EasyBuild Documentation</h1>
          <p className={styles.pageSubtitle}>
            Complete technical and user documentation for conversational generation, design customisation, security model and deployment.
          </p>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.docGrid}>
          {/* Table of contents */}
          <nav className={styles.toc}>
            <div className={styles.tocCard}>
              <h3 className={styles.tocTitle}>Table of Contents</h3>
              <ul className={styles.tocList}>
                <li><a href="#overview">1. Product Overview</a></li>
                <li><a href="#prompting">2. Conversational Prompting</a></li>
                <li><a href="#design-system">3. Design Tokens & Themes</a></li>
                <li><a href="#code-editor">4. Code Inspection & Edits</a></li>
                <li><a href="#ai-providers">5. AI Providers & Demo Mode</a></li>
                <li><a href="#github-deploy">6. GitHub & Pages Publishing</a></li>
                <li><a href="#security">7. Security Architecture</a></li>
                <li><a href="#shortcuts">8. Keyboard Shortcuts</a></li>
              </ul>
            </div>
          </nav>

          {/* Main doc content */}
          <main className={styles.docMain}>
            {/* 1. Overview */}
            <section id="overview" className={styles.section}>
              <div className={styles.sectionHeading}>
                <Layers className={styles.secIcon} size={20} />
                <h2>1. Product Overview</h2>
              </div>
              <p>
                <strong>EasyBuild</strong> is a professional conversational website builder designed to convert natural language descriptions into complete, standards-compliant, responsive website source code. Unlike simplistic static mock generators, EasyBuild produces full HTML5, modern CSS3, and vanilla JavaScript ready to be exported, modified, or published straight to GitHub Pages.
              </p>
              <div className={styles.callout}>
                <strong>Core Workspace:</strong> The editor is divided into three distinct panels:
                <ul>
                  <li><strong>Left Panel (Conversation):</strong> Interactive conversational prompt interface with real-time feedback and iterative refinement.</li>
                  <li><strong>Center Panel (Live Preview):</strong> Sandboxed iframe environment rendering generated code with Desktop, Tablet, and Mobile viewports and zoom.</li>
                  <li><strong>Right Panel (Design & Code):</strong> Dynamic design token customisation controls and real-time editable HTML/CSS/JS with validation.</li>
                </ul>
              </div>
            </section>

            {/* 2. Prompting */}
            <section id="prompting" className={styles.section}>
              <div className={styles.sectionHeading}>
                <Sparkles className={styles.secIcon} size={20} />
                <h2>2. Conversational Prompting Guide</h2>
              </div>
              <p>
                EasyBuild understands both high-level thematic intent and granular layout instructions. For optimal output, include your intended audience, section requirements, and aesthetic direction.
              </p>
              <div className={styles.compareGrid}>
                <div className={styles.compareCardBad}>
                  <h4>⚠️ Vague Prompt</h4>
                  <code>"Make me a good website for my company"</code>
                  <p>Lacks context about industry, color preferences, or required sections.</p>
                </div>
                <div className={styles.compareCardGood}>
                  <h4>✓ Effective Prompt</h4>
                  <code>"A B2B SaaS landing page for an AI customer support platform. Dark slate aesthetic with electric blue accents, featuring an interactive hero preview, 3 key benefits with metrics, customer testimonial grid, and transparent tiered pricing."</code>
                  <p>Provides clear structure, visual tone, and domain-specific content.</p>
                </div>
              </div>
              <h4>Iterative Follow-up Instructions</h4>
              <p>You can refine the site conversationally without losing previous work:</p>
              <ul className={styles.bulletList}>
                <li><em>"Change the primary accent color to forest green and round all buttons."</em></li>
                <li><em>"Add a 3-question accordion FAQ section above the footer."</em></li>
                <li><em>"Insert a contact inquiry form with name, email and project scope."</em></li>
                <li><em>"Switch the hero headline to: Next-Generation Analytics for Modern Teams."</em></li>
              </ul>
            </section>

            {/* 3. Design Tokens */}
            <section id="design-system" className={styles.section}>
              <div className={styles.sectionHeading}>
                <Code2 className={styles.secIcon} size={20} />
                <h2>3. Design Tokens & Dynamic Themes</h2>
              </div>
              <p>
                EasyBuild employs CSS Custom Properties (Variables) across generated code. When you adjust colors, typography, or spacing in the Design panel, overrides are injected in real-time into the preview:
              </p>
              <pre className={styles.codeBlock}>{`:root {
  --primary: #1E3A5F;        /* Main brand color */
  --secondary: #2D5A8E;      /* Secondary highlights */
  --accent: #4A90D9;         /* Interactive CTAs */
  --bg: #FAFAF8;             /* Canvas background */
  --surface: #FFFFFF;        /* Elevated card surfaces */
  --text: #1A1A1A;           /* Primary text */
  --muted: #6B7280;          /* Secondary captions */
  --radius: 8px;             /* Component corner radius */
  --max-w: 1100px;           /* Grid container width */
}`}</pre>
            </section>

            {/* 4. Code Inspection */}
            <section id="code-editor" className={styles.section}>
              <div className={styles.sectionHeading}>
                <Terminal className={styles.secIcon} size={20} />
                <h2>4. Code Inspection & Edits</h2>
              </div>
              <p>
                Switch to the <strong>Code</strong> tab in the right panel to inspect the generated HTML, CSS, and JavaScript. You can edit the code directly in the browser:
              </p>
              <ul className={styles.bulletList}>
                <li><strong>Validation Engine:</strong> Checks for mismatched HTML tags, unbalanced CSS braces, and JavaScript syntax before applying.</li>
                <li><strong>Apply to Preview:</strong> Click the "Apply to Preview" button or press <code>Ctrl+S</code> / <code>⌘S</code> to execute your changes.</li>
                <li><strong>Single-file Downloads:</strong> Download individual <code>index.html</code>, <code>style.css</code>, or <code>script.js</code> files anytime.</li>
              </ul>
            </section>

            {/* 5. AI Providers */}
            <section id="ai-providers" className={styles.section}>
              <div className={styles.sectionHeading}>
                <Zap className={styles.secIcon} size={20} />
                <h2>5. AI Providers & Demo Mode</h2>
              </div>
              <p>
                EasyBuild operates in two generation modes:
              </p>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Mode</th>
                      <th>API Key Required?</th>
                      <th>Capabilities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Demo Mode</strong></td>
                      <td>No</td>
                      <td>Instant generation from curated multi-section templates, intelligent conversational modifications (theme shifting, section addition, headline updates), full preview and export.</td>
                    </tr>
                    <tr>
                      <td><strong>API Mode</strong></td>
                      <td>Yes (Server-side)</td>
                      <td>Connects to OpenAI (GPT-4o) or Google Gemini via the secure Express server proxy. Zero client-side key exposure.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 6. GitHub Deploy */}
            <section id="github-deploy" className={styles.section}>
              <div className={styles.sectionHeading}>
                <Github className={styles.secIcon} size={20} />
                <h2>6. GitHub & GitHub Pages Publishing</h2>
              </div>
              <p>
                Every project can be exported as a ready-to-publish ZIP containing clean semantic files, a generated <code>README.md</code>, and a <code>.gitignore</code>:
              </p>
              <ol className={styles.numList}>
                <li>Click <strong>Export → Export for GitHub</strong> or <strong>Download Project ZIP</strong>.</li>
                <li>Create a new public repository on GitHub (leave it empty).</li>
                <li>Run <code>git init && git add . && git commit -m "Initial commit"</code>.</li>
                <li>Push to GitHub and enable <strong>GitHub Pages</strong> in Settings → Pages (Branch: main, Folder: /root).</li>
              </ol>
            </section>

            {/* 7. Security */}
            <section id="security" className={styles.section}>
              <div className={styles.sectionHeading}>
                <Shield className={styles.secIcon} size={20} />
                <h2>7. Security Architecture</h2>
              </div>
              <ul className={styles.bulletList}>
                <li><strong>Preview Sandboxing:</strong> Previews run within a sandboxed <code>&lt;iframe sandbox="allow-scripts allow-same-origin allow-forms"&gt;</code> without parent access.</li>
                <li><strong>API Protection:</strong> AI provider credentials reside exclusively in <code>server/.env</code>. The browser client never receives secret tokens.</li>
                <li><strong>Local-First Storage:</strong> All user projects and history are stored in browser localStorage. No unconsented telemetry or remote data logging.</li>
              </ul>
            </section>

            {/* 8. Shortcuts */}
            <section id="shortcuts" className={styles.section}>
              <div className={styles.sectionHeading}>
                <Terminal className={styles.secIcon} size={20} />
                <h2>8. Keyboard Shortcuts</h2>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Shortcut</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Send prompt message</td>
                      <td><code>Enter</code> (in prompt composer)</td>
                    </tr>
                    <tr>
                      <td>New line in composer</td>
                      <td><code>Shift + Enter</code></td>
                    </tr>
                    <tr>
                      <td>Apply code edits to preview</td>
                      <td><code>Ctrl + S</code> or <code>⌘ + S</code> (in code editor)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
