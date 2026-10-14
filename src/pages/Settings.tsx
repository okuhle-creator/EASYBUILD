import React from 'react';
import { Key, Info, Github, Shield } from 'lucide-react';
import styles from './Settings.module.css';

export function Settings() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageSubtitle}>Configure EasyBuild for your workflow</p>
        </div>
      </header>

      <div className={styles.content}>
        {/* AI Provider */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Key size={18} strokeWidth={1.75} />
            <div>
              <h2 className={styles.sectionTitle}>AI Provider</h2>
              <p className={styles.sectionDesc}>EasyBuild supports OpenAI and Google Gemini for real AI generation.</p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.infoBox}>
              <Info size={14} strokeWidth={2} />
              <div>
                <p><strong>API keys are server-side only.</strong></p>
                <p>To use real AI generation, add your API key to <code>server/.env</code>. Keys are never exposed to the browser or included in exports.</p>
              </div>
            </div>

            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>server/.env</div>
              <pre className={styles.code}>{`# Copy .env.example to server/.env and fill in your keys
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-key-here

# Or for Google Gemini:
# AI_PROVIDER=gemini
# GEMINI_API_KEY=your-gemini-key-here`}</pre>
            </div>

            <p className={styles.cardNote}>
              Restart the server (<code>npm run dev:server</code>) after adding your key. Switch to <strong>API mode</strong> in the editor chat panel.
            </p>
          </div>
        </section>

        {/* Demo Mode */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Info size={18} strokeWidth={1.75} />
            <div>
              <h2 className={styles.sectionTitle}>Demo Mode</h2>
              <p className={styles.sectionDesc}>Use EasyBuild without any API key.</p>
            </div>
          </div>
          <div className={styles.card}>
            <p className={styles.cardText}>
              Demo mode loads polished example websites instantly — no API key required. Select <strong>Demo</strong> in the editor's conversation panel to use it.
            </p>
            <p className={styles.cardText}>
              Demo mode supports:
            </p>
            <ul className={styles.featureList}>
              <li>Portfolio and startup landing page examples</li>
              <li>Live preview and viewport switching</li>
              <li>Design customisation controls</li>
              <li>Code inspection and editing</li>
              <li>Project save and restore</li>
              <li>ZIP export and GitHub workflow</li>
            </ul>
          </div>
        </section>

        {/* GitHub */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Github size={18} strokeWidth={1.75} />
            <div>
              <h2 className={styles.sectionTitle}>GitHub Publishing</h2>
              <p className={styles.sectionDesc}>Publish your website to GitHub Pages for free hosting.</p>
            </div>
          </div>
          <div className={styles.card}>
            <p className={styles.cardText}>
              Export your project as a ZIP, then follow these steps:
            </p>
            <div className={styles.steps}>
              <div className={styles.step}>
                <span className={styles.stepNum}>1</span>
                <div>
                  <strong>Export ZIP</strong> — Click Export → Download ZIP in the editor's right panel.
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNum}>2</span>
                <div>
                  <strong>Create repository</strong> — Go to <a href="https://github.com/new" target="_blank" rel="noopener noreferrer">github.com/new</a> and create a public repository.
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNum}>3</span>
                <div>
                  <strong>Push code</strong> — Unzip your download and run:
                  <div className={styles.codeBlock} style={{marginTop: '0.5rem'}}>
                    <pre className={styles.code}>{`git init && git add . && git commit -m "from EasyBuild"
git remote add origin https://github.com/YOU/REPO.git
git push -u origin main`}</pre>
                  </div>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNum}>4</span>
                <div>
                  <strong>Enable GitHub Pages</strong> — In your repo settings, set Pages source to the main branch root. Your site goes live in minutes.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Shield size={18} strokeWidth={1.75} />
            <div>
              <h2 className={styles.sectionTitle}>Security</h2>
              <p className={styles.sectionDesc}>How EasyBuild handles your data.</p>
            </div>
          </div>
          <div className={styles.card}>
            <ul className={styles.featureList}>
              <li>API keys are stored only in <code>server/.env</code> — never sent to the browser</li>
              <li>Generated code is previewed in a sandboxed iframe, isolated from the application</li>
              <li>Project data is stored in your browser's local storage — not on any server</li>
              <li>Exported ZIPs contain zero secrets, keys or credentials</li>
              <li>No analytics, tracking or telemetry of any kind</li>
            </ul>
          </div>
        </section>

        {/* About */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.logoMark}>
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="7" fill="#1E3A5F"/>
                <path d="M8 10h10M8 16h16M8 22h12" stroke="#4A90D9" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h2 className={styles.sectionTitle}>About EasyBuild</h2>
              <p className={styles.sectionDesc}>Conversational Website Builder — v1.0.0</p>
            </div>
          </div>
          <div className={styles.card}>
            <p className={styles.cardText}>
              EasyBuild is an open, privacy-respecting website builder. Your projects stay in your browser. Export any time, own everything.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
