(() => {
  const hostname = window.location.hostname.toLowerCase();
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  const isNetlifyPreview = hostname.endsWith(".netlify.app") && /(?:^|\.)(?:deploy-preview-\d+|deploy-\w+|[a-z0-9-]+--[a-z0-9-]+)\./i.test(hostname);
  if (isLocal || isNetlifyPreview) return;

  let params;
  try {
    params = new URLSearchParams(window.location.search);
    if (params.get("owner") === "1") {
      window.localStorage.setItem("ik_owner", "1");
      return;
    }
    if (window.localStorage.getItem("ik_owner") === "1") return;

    const now = Date.now();
    const lastSent = Number(window.localStorage.getItem("ik_visit_notified_at") || 0);
    if (Number.isFinite(lastSent) && now - lastSent < 6 * 60 * 60 * 1000) return;
    window.localStorage.setItem("ik_visit_notified_at", String(now));
  } catch {
    return;
  }

  const payload = {
    path: window.location.pathname + window.location.search,
    referrer: document.referrer,
    ref: params.get("ref") || "",
    language: navigator.language || "",
    screen: `${window.screen.width}x${window.screen.height}`,
    tz: (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch { return ""; } })(),
  };

  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      const queued = navigator.sendBeacon("/.netlify/functions/notify-visit", new Blob([body], { type: "application/json" }));
      if (queued) return;
    }
    fetch("/.netlify/functions/notify-visit", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
  } catch {
    // Notifications must never affect the page.
  }
})();
