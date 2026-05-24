import type { APIRoute } from "astro";
import { Redis } from "@upstash/redis";

// Force server-rendering — this route must never be prerendered
export const prerender = false;

const redis = new Redis({
  url: import.meta.env.KV_REST_API_URL,
  token: import.meta.env.KV_REST_API_TOKEN,
});

const VALID_SOURCES = ["direct", "gdrive", "torrent"] as const;
type Source = (typeof VALID_SOURCES)[number];

// GET /api/downloads — returns unified total + breakdown
export const GET: APIRoute = async () => {
  // Fetch KV counters and SourceForge total in parallel
  const [direct, gdrive, torrent, sfData] = await Promise.allSettled([
    redis.get<number>("dl:direct"),
    redis.get<number>("dl:gdrive"),
    redis.get<number>("dl:torrent"),
    fetch(
      "https://sourceforge.net/projects/berserkarch/files/stats/json?start_date=2000-01-01&end_date=2099-12-31",
      { signal: AbortSignal.timeout(6000) }
    ).then((r) => (r.ok ? r.json() : Promise.reject())),
  ]);

  const breakdown = {
    direct: direct.status === "fulfilled" ? (direct.value ?? 0) : 0,
    gdrive: gdrive.status === "fulfilled" ? (gdrive.value ?? 0) : 0,
    torrent: torrent.status === "fulfilled" ? (torrent.value ?? 0) : 0,
    sourceforge:
      sfData.status === "fulfilled" ? (sfData.value?.total ?? 0) : 0,
  };

  const total =
    breakdown.direct +
    breakdown.gdrive +
    breakdown.torrent +
    breakdown.sourceforge;

  return new Response(JSON.stringify({ total, breakdown }), {
    headers: {
      "Content-Type": "application/json",
      // Cache for 60s on CDN, stale-while-revalidate for 5 min
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
};

// POST /api/downloads — atomically increments a source counter
export const POST: APIRoute = async ({ request }) => {
  let source: Source;
  try {
    const body = await request.json();
    source = body?.source;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!VALID_SOURCES.includes(source)) {
    return new Response(JSON.stringify({ error: "Invalid source" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const newCount = await redis.incr(`dl:${source}`);

  return new Response(JSON.stringify({ ok: true, count: newCount }), {
    headers: { "Content-Type": "application/json" },
  });
};
