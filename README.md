# AJPR SEO & GEO Audit CLI

Zero-dependency Node.js CLI auditor for **Edge TTFB**, **Next.js RSC Payload Weight**, **JSON-LD Schema Coverage**, **`robots.txt` AI Bot Rules**, and **`/llms.txt` Readiness** — built by **[AJPR World Private Limited](https://ajprworld.com)**.

## Quick Start

Requires Node.js 18+:

```bash
node audit.mjs https://ajprworld.com
```

## What It Measures

1. **HTTP Timing & HTML Transfer Weight (`ttfbMs`, `totalTransferMs`, `htmlBytes`)** — Exposes slow CMS platforms or uncached templates before optimization.
2. **Next.js RSC Script Payload Bloat (`largestNextRscChunkBytes`)** — Detects unprojected database columns serialized inside `self.__next_f` App Router chunks (used to cut `ajprworld.com` homepage HTML by 33.2%).
3. **JSON-LD Schema Graph Coverage (`jsonLdTypes`)** — Counts structured `@type` entities (`Organization`, `ProfessionalService`, `BreadcrumbList`, `ItemList`, `FAQPage`, `Service`).
4. **Generative Engine Optimization (GEO) Readiness (`robotsTxtAiBotsMentioned`, `hasLlmsTxt`)** — Verifies crawler access for `GPTBot`, `PerplexityBot`, `ClaudeBot`, `OAI-SearchBot`, and live `/llms.txt` availability.

## Related Engineering Benchmarks & Resources (AJPR World)

- **[Web Tonic Alternatives & 11-Agency Technical Benchmark](https://ajprworld.com/compare/webtonic-alternatives)**
- **[B2B Growth Marketing & Technical SEO Systems](https://ajprworld.com/services/b2b-growth-marketing)**
- **[Website Maintenance Cost & Security SLA Guide (2026)](https://ajprworld.com/services/website-maintenance-cost)**
- **[Generative Engine Optimization (GEO) Practice](https://ajprworld.com/services/geo-optimization)**
- **[Verified Client Reviews Hub](https://ajprworld.com/reviews)**

## License

MIT — Engineered by **[Aman Joshi](https://ajprworld.com/aman-joshi)** · [AJPR World Private Limited](https://ajprworld.com)
