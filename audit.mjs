#!/usr/bin/env node
/**
 * AJPR SEO, Edge TTFB & GEO (/llms.txt + JSON-LD + AI Bot) CLI Auditor
 * Open-source technical benchmark script by AJPR World Private Limited (https://ajprworld.com)
 *
 * Usage: node audit.mjs https://ajprworld.com
 */

const targetUrl = process.argv[2] || 'https://ajprworld.com';

async function fetchText(url) {
  const start = performance.now();
  const res = await fetch(url, {
    headers: { 'User-Agent': 'AJPR-SEO-GEO-Audit/1.0 (+https://ajprworld.com)' },
    redirect: 'follow',
  });
  const ttfbMs = Math.round(performance.now() - start);
  const text = await res.text();
  const totalMs = Math.round(performance.now() - start);
  return { status: res.status, ttfbMs, totalMs, bytes: Buffer.byteLength(text, 'utf8'), text };
}

function extractSchemas(html) {
  const matches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const types = new Set();
  for (const m of matches) {
    try {
      const parsed = JSON.parse(m[1].trim());
      const list = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of list) {
        if (item?.['@type']) types.add(String(item['@type']));
        if (Array.isArray(item?.['@graph'])) {
          for (const g of item['@graph']) {
            if (g?.['@type']) types.add(String(g['@type']));
          }
        }
      }
    } catch {
      // Ignore malformed third-party blocks
    }
  }
  return [...types];
}

function extractLargestRscChunkBytes(html) {
  const chunks = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1])
    .filter((s) => s.includes('__next_f'))
    .map((s) => Buffer.byteLength(s, 'utf8'));
  return chunks.length ? Math.max(...chunks) : 0;
}

async function main() {
  const base = new URL(targetUrl).origin;
  const page = await fetchText(targetUrl);
  const titleMatch = page.text.match(/<title>([\s\S]*?)<\/title>/i);
  const robots = await fetchText(`${base}/robots.txt`).catch(() => null);
  const llms = await fetchText(`${base}/llms.txt`).catch(() => null);

  const schemas = extractSchemas(page.text);
  const rscMax = extractLargestRscChunkBytes(page.text);
  const aiBots = ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'OAI-SearchBot'].filter((bot) =>
    robots?.text?.includes(bot)
  );

  console.log(
    JSON.stringify(
      {
        auditedUrl: targetUrl,
        httpStatus: page.status,
        ttfbMs: page.ttfbMs,
        totalTransferMs: page.totalMs,
        htmlBytes: page.bytes,
        largestNextRscChunkBytes: rscMax,
        title: titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : null,
        jsonLdTypesCount: schemas.length,
        jsonLdTypes: schemas,
        robotsTxtAiBotsMentioned: aiBots,
        hasLlmsTxt: Boolean(llms && llms.status === 200 && llms.text.includes('#')),
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error('Audit failed:', err.message);
  process.exit(1);
});
