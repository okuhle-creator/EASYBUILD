require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '2mb' }));

// ── Status endpoint ───────────────────────────────────────────
app.get('/api/status', (req, res) => {
  const provider = process.env.AI_PROVIDER || 'openai';
  const hasKey =
    provider === 'gemini'
      ? Boolean(process.env.GEMINI_API_KEY)
      : Boolean(process.env.OPENAI_API_KEY);

  res.json({
    available: hasKey,
    provider: hasKey ? provider : null,
    message: hasKey
      ? `${provider} configured`
      : 'No API key configured. Use demo mode or add a key to server/.env',
  });
});

// ── Generation endpoint ───────────────────────────────────────
app.post('/api/generate', async (req, res) => {
  const { prompt, projectContext, mode } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'prompt is required' });
  }

  if (prompt.length > 4000) {
    return res.status(400).json({ error: 'prompt is too long (max 4000 chars)' });
  }

  const provider = process.env.AI_PROVIDER || 'openai';

  try {
    let result;
    if (provider === 'gemini') {
      result = await generateWithGemini(prompt, projectContext);
    } else {
      result = await generateWithOpenAI(prompt, projectContext);
    }
    res.json(result);
  } catch (err) {
    console.error('Generation error:', err.message);
    const status = err.status || 500;
    res.status(status).json({
      error: err.message || 'Generation failed',
      success: false,
    });
  }
});

// ── OpenAI provider ───────────────────────────────────────────
async function generateWithOpenAI(prompt, context) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const err = new Error('No OpenAI API key configured. Add OPENAI_API_KEY to server/.env, or use Demo mode.');
    err.status = 503;
    throw err;
  }

  const { OpenAI } = require('openai');
  const openai = new OpenAI({ apiKey });
  const model = process.env.OPENAI_MODEL || 'gpt-4o';

  const systemPrompt = buildSystemPrompt();
  const messages = buildMessages(systemPrompt, prompt, context);

  const completion = await openai.chat.completions.create({
    model,
    messages,
    max_tokens: 8000,
    temperature: 0.7,
  });

  const content = completion.choices[0]?.message?.content || '';
  return parseGeneratedContent(content);
}

// ── Gemini provider ───────────────────────────────────────────
async function generateWithGemini(prompt, context) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const err = new Error('No Gemini API key configured. Add GEMINI_API_KEY to server/.env, or use Demo mode.');
    err.status = 503;
    throw err;
  }

  const { GoogleGenerativeAI } = require('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-pro';
  const model = genAI.getGenerativeModel({ model: modelName });

  const systemPrompt = buildSystemPrompt();
  const userMessage = buildUserMessage(prompt, context);
  const fullPrompt = systemPrompt + '\n\n' + userMessage;

  const result = await model.generateContent(fullPrompt);
  const content = result.response.text();
  return parseGeneratedContent(content);
}

// ── Shared utilities ──────────────────────────────────────────
function buildSystemPrompt() {
  return `You are EasyBuild's website generation engine. Generate complete, working, beautiful websites.

RULES:
1. Always respond with a JSON object with exactly these keys: html, css, javascript
2. The html must be a complete <!DOCTYPE html> document with head and body
3. The css must be complete, well-organised CSS (not inline styles)
4. The javascript may be empty string if not needed
5. Generate RESPONSIVE, ACCESSIBLE, SEMANTIC HTML
6. Use CSS custom properties for colours and design tokens
7. Include Google Fonts if using custom fonts (in the html head)
8. Make multi-section websites: navigation, hero, features/content, footer minimum
9. Use modern CSS: flexbox, grid, clamp(), custom properties
10. The website must look POLISHED and PROFESSIONAL — not generic
11. Never include explanations outside the JSON

RESPONSE FORMAT (strict):
{"html":"...complete html...", "css":"...complete css...", "javascript":"...js or empty string..."}`;
}

function buildUserMessage(prompt, context) {
  if (context && context.html) {
    return `MODIFY THE EXISTING WEBSITE:

Current HTML:
${context.html.slice(0, 3000)}

Current CSS:
${context.css.slice(0, 2000)}

USER REQUEST: ${prompt}

Return the complete modified website as JSON.`;
  }
  return `CREATE A WEBSITE: ${prompt}\n\nReturn the complete website as JSON.`;
}

function buildMessages(systemPrompt, prompt, context) {
  const messages = [{ role: 'system', content: systemPrompt }];

  if (context?.conversationHistory?.length) {
    // Include last few conversation turns for context
    const recent = context.conversationHistory.slice(-4);
    recent.forEach((msg) => {
      if (msg.role === 'user' || msg.role === 'assistant') {
        messages.push({ role: msg.role, content: msg.content });
      }
    });
  }

  messages.push({ role: 'user', content: buildUserMessage(prompt, context) });
  return messages;
}

function parseGeneratedContent(content) {
  // Try to extract JSON from the response
  const jsonMatch =
    content.match(/```json\s*([\s\S]*?)\s*```/) ||
    content.match(/```\s*([\s\S]*?)\s*```/) ||
    content.match(/(\{[\s\S]*\})/);

  const jsonStr = jsonMatch ? jsonMatch[1] : content;

  let parsed;
  try {
    parsed = JSON.parse(jsonStr.trim());
  } catch {
    // If parsing fails, try to extract sections manually
    const html = extractSection(content, 'html') || '';
    const css = extractSection(content, 'css') || '';
    const javascript = extractSection(content, 'javascript') || '';

    if (html) {
      return { html, css, javascript, success: true };
    }

    throw new Error('Could not parse the generated website. Please try again.');
  }

  if (!parsed.html) {
    throw new Error('Generated content missing HTML. Please try again.');
  }

  return {
    html: parsed.html || '',
    css: parsed.css || '',
    javascript: parsed.javascript || '',
    success: true,
  };
}

function extractSection(content, key) {
  const regex = new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\[\\s\\S])*)"`, 'i');
  const match = content.match(regex);
  if (match) {
    return match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  return null;
}

// ── Start server ──────────────────────────────────────────────
app.listen(PORT, () => {
  const provider = process.env.AI_PROVIDER || 'openai';
  const hasKey =
    provider === 'gemini'
      ? Boolean(process.env.GEMINI_API_KEY)
      : Boolean(process.env.OPENAI_API_KEY);

  console.log(`\n🚀 EasyBuild server running at http://localhost:${PORT}`);
  console.log(`   AI Provider: ${provider}`);
  console.log(`   API Key: ${hasKey ? '✅ configured' : '⚠️  not configured (demo mode will work)'}`);
  console.log(`\n   Add your API key to server/.env to enable real generation.\n`);
});
