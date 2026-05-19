import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import OpenAI from 'openai';

config(); // Load .env

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.API_PORT || 3001;

/* ─────────────────────────────────────────────────────────────
   POST /api/research
   Accepts: { prompt, depth, llm, maxSources }
   Returns: Structured JSON research data from the LLM (via Groq)
   ──────────────────────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are Matrix Research Engine, an elite AI research analyst. Given a research topic, produce a comprehensive structured analysis.

You MUST return valid JSON (no markdown, no code fences) with this exact schema:

{
  "score": <number 70-98, confidence score based on source quality>,
  "sources": <number, total sources synthesized>,
  "opportunities": <number, count of opportunities identified>,
  "highAuthority": <number, count of high-authority sources>,
  "supporting": <number, count of supporting sources>,
  "immediateOpps": <number, count of immediate opportunities>,
  "midHorizonOpps": <number, count of mid-horizon opportunities>,
  "tokensOutput": <number 2000-6000, estimated output tokens>,
  "llm": "<string, model name>",
  "summary": [
    "<string: paragraph 1 — macro landscape analysis, 2-3 sentences. Use <strong class='text-white/80'> for emphasis on key metrics>",
    "<string: paragraph 2 — top opportunities and actionable recommendations, 2-3 sentences>",
    "<string: paragraph 3 — risks, headwinds, and confidence caveats, 2-3 sentences>"
  ],
  "quote": {
    "text": "<string: one impactful quote or statistic from the analysis>",
    "attribution": "— Matrix Analyst · Source: <relevant source name>"
  },
  "trends": [
    {
      "id": <number>,
      "title": "<string: trend name>",
      "impact": "<'High' | 'Medium' | 'Low'>",
      "impactColor": "<'text-emerald-400' | 'text-amber-400' | 'text-blue-400'>",
      "impactBg": "<'bg-emerald-400/10' | 'bg-amber-400/10' | 'bg-blue-400/10'>",
      "summary": "<string: 1-2 sentence description>",
      "recommendations": ["<string>", "<string>", "<string>"]
    }
  ],
  "citations": [
    {
      "id": <number>,
      "name": "<string: source name>",
      "relevance": <number 75-99>,
      "da": <number 70-99, domain authority>,
      "url": "<string: plausible URL>"
    }
  ]
}

Generate 4-7 trends and 6-12 citations. Make the analysis genuinely insightful, specific, and data-rich for the given topic. Use real-world companies, frameworks, and metrics where possible.`;

app.post('/api/research', async (req, res) => {
  const { prompt, depth, llm, maxSources } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing research prompt.' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'GROQ_API_KEY not configured. Add it to your .env file.',
    });
  }

  try {
    // Groq uses an OpenAI-compatible API with a different base URL
    const client = new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });

    const userPrompt = `Research Topic: "${prompt}"
Search Depth: ${depth || 'Standard'}
Target Sources: ${maxSources || 25}

Produce a comprehensive analysis for this topic following the exact JSON schema specified.`;

    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return res.status(500).json({ error: 'Empty response from LLM.' });
    }

    const data = JSON.parse(raw);

    // Override the LLM field with the user's selected label for display
    data.llm = llm || 'Llama 3.3 70B';

    return res.json(data);
  } catch (err) {
    console.error('[API Error]', err.message);

    if (err.status === 401) {
      return res.status(401).json({ error: 'Invalid Groq API key.' });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: 'Rate limited by Groq. Try again in a moment.' });
    }

    return res.status(500).json({ error: err.message || 'LLM request failed.' });
  }
});

/* ── Health check ──────────────────────────────────────────── */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', engine: 'Matrix Research API (Groq)' });
});

app.listen(PORT, () => {
  console.log(`\n  ✦ Matrix Research API running → http://localhost:${PORT}/api`);
  console.log(`  ✦ Groq key: ${process.env.GROQ_API_KEY ? '✓ configured' : '✗ MISSING — add GROQ_API_KEY to .env'}`);
  console.log(`  ✦ Model: llama-3.3-70b-versatile (via Groq)\n`);
});
