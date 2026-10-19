const BOT_PATTERN = /bot|crawl|spider|slack|facebook|preview|headless|lighthouse|uptime|monitor|curl|wget|python-requests|httpclient|scrapy|bingpreview|discordbot|whatsapp/i;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function clean(value, max = 500) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, max) : "";
}

function summarizeAgent(ua) {
  const browser = /Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "Unknown browser";
  const device = /iPad|Tablet/i.test(ua) ? "Tablet" : /Mobi|Android/i.test(ua) ? "Mobile" : "Desktop";
  const os = /Windows/i.test(ua) ? "Windows" : /Android/i.test(ua) ? "Android" : /iPhone|iPad|iPod/i.test(ua) ? "iOS" : /Mac OS X|Macintosh/i.test(ua) ? "macOS" : /Linux/i.test(ua) ? "Linux" : "Unknown OS";
  return `${device} / ${browser} / ${os}`;
}

export default async (req, context) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });

  const userAgent = req.headers.get("user-agent") || "";
  if (BOT_PATTERN.test(userAgent)) return new Response(null, { status: 204 });
  if (!req.headers.get("content-type")?.toLowerCase().includes("application/json")) return new Response("Unsupported Media Type", { status: 415 });

  const declaredLength = Number(req.headers.get("content-length") || 0);
  if (declaredLength > 2048) return new Response("Payload Too Large", { status: 413 });

  let rawBody;
  try {
    const reader = req.body?.getReader();
    if (!reader) return new Response("Bad Request", { status: 400 });
    const chunks = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 2048) {
        await reader.cancel();
        return new Response("Payload Too Large", { status: 413 });
      }
      chunks.push(value);
    }
    const bodyBytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bodyBytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    rawBody = new TextDecoder().decode(bodyBytes);
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  let data;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return new Response("Bad Request", { status: 400 });
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) return new Response("Bad Request", { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Visitor notification is missing RESEND_API_KEY or NOTIFY_TO_EMAIL.");
    return new Response(null, { status: 500 });
  }

  const geo = context.geo || {};
  const details = [
    ["Time (Asia/Karachi)", new Intl.DateTimeFormat("en-PK", { timeZone: "Asia/Karachi", dateStyle: "medium", timeStyle: "long" }).format(new Date())],
    ["Location", [clean(geo.city, 100), clean(geo.country?.name || geo.country?.code || geo.country, 100)].filter(Boolean).join(", ") || "Unknown"],
    ["Referrer", clean(data.referrer, 500) || "Direct / unavailable"],
    ["Ref", clean(data.ref, 200) || "-"],
    ["Page", clean(data.path, 500) || "Unknown"],
    ["Device / browser / OS", summarizeAgent(userAgent)],
    ["Language", clean(data.language, 100) || "Unknown"],
    ["Timezone", clean(data.tz, 100) || "Unknown"],
    ["Screen", clean(data.screen, 50) || "Unknown"],
  ];
  const subject = `New portfolio visitor${clean(data.ref, 200) ? ` (ref: ${clean(data.ref, 200)})` : ""}`;
  const html = `<h2>New portfolio visitor</h2><table>${details.map(([label, value]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${escapeHtml(label)}</th><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`).join("")}</table>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: "Portfolio Alerts <onboarding@resend.dev>", to, subject, html }),
    });
    if (!response.ok) {
      console.error("Resend visitor notification failed with status", response.status);
      return new Response(null, { status: 500 });
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Visitor notification request failed.", error);
    return new Response(null, { status: 500 });
  }
};
