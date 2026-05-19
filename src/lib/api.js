/* ─────────────────────────────────────────────────────────────
   API client for the Matrix Research Engine backend.
   Calls /api/research (proxied by Vite to the Express server).
   ──────────────────────────────────────────────────────────── */

export async function fetchResearch({ prompt, depth, llm, maxSources }) {
  const res = await fetch('/api/research', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, depth, llm, maxSources }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `API error ${res.status}`);
  }

  return res.json();
}
