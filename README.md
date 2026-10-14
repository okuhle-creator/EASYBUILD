# EasyBuild — AI-Powered Website Builder

> Build beautiful websites through conversation. EasyBuild turns natural language descriptions into fully functional, exportable website code.

---

## Features

- **Conversational Generation** — Describe your website in plain language; EasyBuild generates complete HTML, CSS and JavaScript
- **Live Preview** — See your website rendered instantly in a sandboxed iframe with desktop, tablet and mobile viewports
- **Incremental Editing** — Follow-up instructions modify your existing project, preserving your progress
- **Visual Customisation** — Adjust colours, typography, spacing and layout through live controls
- **Code Editor** — Inspect and edit generated HTML, CSS and JavaScript directly
- **Project Management** — Create, rename, duplicate and delete projects with automatic local persistence
- **Export & GitHub** — Download a ZIP with a clean project structure, README and `.gitignore` ready to push to GitHub
- **Demo Mode** — Works fully without an API key; loads polished example websites so you can explore the editor

---

## Quick Start

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
# Clone or download the project
cd EASYBUILD

# Install client dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..
```

### Running in Demo Mode (no API key required)

```bash
npm run dev
```

Open `http://localhost:5173`. In the editor, select **Demo Mode** from the provider selector. EasyBuild will load polished example websites without calling any external API.

### Running with an AI Provider

1. Copy `.env.example` to `.env` in the `server/` directory:

   ```bash
   cp .env.example server/.env
   ```

2. Add your API key:

   ```
   OPENAI_API_KEY=sk-...
   # or
   GEMINI_API_KEY=AIza...
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

---

## Architecture

```
EASYBUILD/
├── public/                  Static assets
├── src/
│   ├── components/
│   │   ├── navigation/      Top navigation bar
│   │   ├── editor/          Three-panel editor workspace
│   │   ├── chat/            Conversation panel & message composer
│   │   ├── preview/         Sandboxed iframe preview
│   │   ├── design/          Visual design controls
│   │   └── projects/        Project dashboard & management
│   ├── pages/               Route-level page components
│   ├── hooks/               Custom React hooks
│   ├── services/            API client, export, storage
│   ├── utils/               Shared utility functions
│   ├── styles/              Global CSS, design tokens
│   ├── types/               TypeScript type definitions
│   ├── App.tsx
│   └── main.tsx
├── server/
│   ├── index.js             Express API server
│   ├── providers/           AI provider adapters (OpenAI, Gemini)
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## AI Provider Configuration

EasyBuild supports OpenAI and Google Gemini. API keys are **never** exposed to the browser — all generation requests are proxied through the Express server.

| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | OpenAI API key (GPT-4o recommended) |
| `GEMINI_API_KEY` | Google Gemini API key |
| `AI_PROVIDER` | `openai` or `gemini` (default: `openai`) |
| `AI_MODEL` | Override the default model name |
| `PORT` | Server port (default: `3001`) |

---

## Building for Production

```bash
npm run build
```

The optimised client is written to `dist/`. Serve it with any static host (Netlify, Vercel, GitHub Pages) or alongside the Express server.

---

## Exporting & Publishing to GitHub

1. Build your website in EasyBuild.
2. Click **Export → Download ZIP** in the right panel.
3. Unzip the downloaded file.
4. Follow the included `README.md` for GitHub publishing:

```bash
cd my-website
git init
git add .
git commit -m "Initial commit from EasyBuild"
# Create a repo on github.com, then:
git remote add origin https://github.com/your-username/my-website.git
git push -u origin main
```

5. Enable GitHub Pages in your repository settings to host for free.

---

## Security

- **API keys** are stored only in `server/.env` and never sent to the browser.
- **Preview iframe** uses `sandbox="allow-scripts allow-same-origin"` to isolate generated code.
- **Generated code** is treated as untrusted input and never executed in the main application context.
- **Exports** contain zero application secrets, API keys or credentials.
- **Local storage** holds only project code and settings — no authentication tokens.

---

## Known Limitations

- Real AI generation requires a server-side API key (OpenAI or Gemini).
- The preview iframe cannot load external fonts from `file://` paths; use the dev server or deploy for full font support.
- Very large generated websites may exceed local storage quotas; export regularly.
- GitHub Push integration is not yet implemented; use the ZIP export workflow described above.

---

## License

MIT — free to use, modify and distribute.
