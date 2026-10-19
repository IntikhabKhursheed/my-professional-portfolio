(() => {
  const userAgent = navigator.userAgent || "";
  if (navigator.webdriver || /HeadlessChrome/i.test(userAgent)) return;

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

    const lastSent = Number(window.localStorage.getItem("ik_visit_notified_at") || 0);
    if (Number.isFinite(lastSent) && Date.now() - lastSent < 6 * 60 * 60 * 1000) return;
  } catch {
    return;
  }

  const dwellTimeMs = 8 * 1000;
  let hasWaited = false;
  let hasInteracted = false;
  let sent = false;

  const payload = {
    path: window.location.pathname + window.location.search,
    referrer: document.referrer,
    ref: params.get("ref") || "",
    language: navigator.language || "",
    screen: `${window.screen.width}x${window.screen.height}`,
    tz: (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch { return ""; } })(),
  };

  const maybeSend = () => {
    if (sent || !hasWaited || !hasInteracted) return;
    sent = true;

    try {
      window.localStorage.setItem("ik_visit_notified_at", String(Date.now()));
    } catch {
      return;
    }

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
  };

  const onInteraction = () => {
    hasInteracted = true;
    maybeSend();
  };

  for (const eventName of ["scroll", "pointerdown", "touchstart", "keydown"]) {
    window.addEventListener(eventName, onInteraction, { once: true, passive: true });
  }

  let lastMousePosition;
  window.addEventListener("mousemove", (event) => {
    const movedByEvent = (event.movementX || 0) !== 0 || (event.movementY || 0) !== 0;
    const movedByPosition = lastMousePosition && (event.clientX !== lastMousePosition.x || event.clientY !== lastMousePosition.y);
    lastMousePosition = { x: event.clientX, y: event.clientY };
    if (movedByEvent || movedByPosition) onInteraction();
  }, { passive: true });

  window.setTimeout(() => {
    hasWaited = true;
    maybeSend();
  }, dwellTimeMs);
})();
