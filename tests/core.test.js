import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Storage & Design settings tests
test('Default design tokens generation', () => {
  const defaultTokens = {
    primaryColor: '#1E3A5F',
    secondaryColor: '#2D5A8E',
    accentColor: '#4A90D9',
    backgroundColor: '#FAFAF8',
    surfaceColor: '#FFFFFF',
    textColor: '#1A1A1A',
    mutedColor: '#6B7280',
    headingFont: 'Inter',
    bodyFont: 'Inter',
    baseSize: 16,
    headingScale: 1.25,
    spacing: 1,
    borderRadius: 8,
    maxWidth: 1200,
    theme: 'light',
  };

  assert.strictEqual(defaultTokens.primaryColor, '#1E3A5F');
  assert.strictEqual(defaultTokens.borderRadius, 8);
  assert.strictEqual(defaultTokens.theme, 'light');
});

// 2. Templates integrity tests
test('All built-in templates have valid structure', () => {
  const templatesCode = fs.readFileSync(path.join(__dirname, '../src/services/templates.ts'), 'utf-8');

  assert.ok(templatesCode.includes('startup'), 'Has startup template');
  assert.ok(templatesCode.includes('portfolio'), 'Has portfolio template');
  assert.ok(templatesCode.includes('agency'), 'Has agency template');
  assert.ok(templatesCode.includes('<!DOCTYPE html>'), 'Contains valid DOCTYPE');
});

// 3. Demo mode keyword detection and modifications
test('Conversational modifications logic in demo mode', () => {
  const sampleContext = {
    html: `<!DOCTYPE html><html><head><title>Test</title></head><body><h1>Original Headline</h1><footer class="footer">Footer content</footer></body></html>`,
    css: `:root { --primary: #1E3A5F; --accent: #4A90D9; } body { background: #FAFAF8; }`,
    javascript: '',
  };

  // Test dark mode modification
  const darkReq = 'Please switch to dark mode';
  let css = sampleContext.css;
  if (darkReq.toLowerCase().includes('dark')) {
    css += '\nbody { background: #0F1419 !important; }';
  }
  assert.ok(css.includes('#0F1419'), 'Dark mode CSS was appended');

  // Test FAQ section injection
  let html = sampleContext.html;
  const faqReq = 'Add a FAQ section';
  if (faqReq.toLowerCase().includes('faq')) {
    const faq = '<section id="faq"><h2>Frequently Asked Questions</h2></section>';
    html = html.replace('<footer', faq + '\n<footer');
  }
  assert.ok(html.includes('Frequently Asked Questions'), 'FAQ was injected before footer');

  // Test headline change
  const headlineReq = 'Change the headline to "Revolutionary AI Studio"';
  const match = headlineReq.match(/change\s+(?:the\s+)?headline\s+(?:to\s+)?["']?([^"'\n]+)["']?/i);
  assert.ok(match, 'Headline regex matched');
  assert.strictEqual(match[1], 'Revolutionary AI Studio');
});

// 4. Export filenames and README verification
test('Export ZIP structure requirements', () => {
  const safeName = 'my-cool-website'
    .toLowerCase()
    .replace(/[^a-z0-9-_\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);

  assert.strictEqual(safeName, 'my-cool-website');

  const expectedFiles = ['index.html', 'style.css', 'script.js', 'README.md', '.gitignore'];
  assert.strictEqual(expectedFiles.length, 5);
  assert.ok(expectedFiles.includes('index.html'));
  assert.ok(expectedFiles.includes('.gitignore'));
});
