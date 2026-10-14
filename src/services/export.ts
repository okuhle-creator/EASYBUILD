import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Project } from '../types';

function sanitizeProjectName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-_\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 50) || 'my-website';
}

function generateReadme(project: Project, safeName: string): string {
  return `# ${project.name}

> Generated with [EasyBuild](https://easybuild.app) — Conversational Website Builder

## About

${project.description || 'A website generated with EasyBuild.'}

## File Structure

\`\`\`
${safeName}/
├── index.html      Main HTML document
├── style.css       Stylesheet
├── script.js       JavaScript
└── README.md       This file
\`\`\`

## Running Locally

Open \`index.html\` directly in your browser, or use a local server:

\`\`\`bash
# Using Python
python -m http.server 8080

# Using Node.js (npx)
npx serve .
\`\`\`

Then visit \`http://localhost:8080\`.

## Publishing to GitHub Pages

### Step 1 — Initialise a Git repository

\`\`\`bash
cd ${safeName}
git init
git add .
git commit -m "Initial commit from EasyBuild"
\`\`\`

### Step 2 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name your repository (e.g. \`${safeName}\`)
3. Leave it public
4. **Do not** initialise with a README (you already have one)

### Step 3 — Push your code

\`\`\`bash
git remote add origin https://github.com/YOUR_USERNAME/${safeName}.git
git branch -M main
git push -u origin main
\`\`\`

### Step 4 — Enable GitHub Pages

1. Open your repository on GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** and **/ (root)**
5. Click **Save**

Your website will be live at \`https://YOUR_USERNAME.github.io/${safeName}\` within a minute.

## Customising

Edit \`index.html\`, \`style.css\` and \`script.js\` in any text editor. The CSS uses custom properties (variables) at the top of \`style.css\` — changing these will update the whole design.

## Created

${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
`;
}

function generateGitignore(): string {
  return `# Operating System
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log

# Dependencies (if you add a build step)
node_modules/
`;
}

export async function downloadProjectZip(project: Project): Promise<void> {
  const safeName = sanitizeProjectName(project.name);
  const zip = new JSZip();
  const folder = zip.folder(safeName)!;

  // Ensure CSS and JS references match exported filenames
  let html = project.html;
  // Normalise stylesheet link
  if (!html.includes('style.css')) {
    html = html.replace(/<\/head>/, '  <link rel="stylesheet" href="style.css"/>\n</head>');
  }
  // Normalise script reference
  if (!html.includes('script.js')) {
    html = html.replace(/<\/body>/, '  <script src="script.js"></script>\n</body>');
  }

  folder.file('index.html', html);
  folder.file('style.css', project.css || '/* No styles generated */');
  folder.file('script.js', project.javascript || '// No scripts generated');
  folder.file('README.md', generateReadme(project, safeName));
  folder.file('.gitignore', generateGitignore());

  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
  saveAs(blob, `${safeName}.zip`);
}

export function downloadSingleFile(
  content: string,
  filename: string,
  mimeType = 'text/plain'
): void {
  const blob = new Blob([content], { type: mimeType });
  saveAs(blob, filename);
}

export function downloadHtml(project: Project): void {
  downloadSingleFile(project.html, 'index.html', 'text/html');
}

export function downloadCss(project: Project): void {
  downloadSingleFile(project.css, 'style.css', 'text/css');
}

export function downloadJs(project: Project): void {
  downloadSingleFile(project.javascript, 'script.js', 'text/javascript');
}
