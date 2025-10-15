const CACHE = "launcher-cache-v1";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(["/", "/index.html", "/app.js", "/manifest.webmanifest", OFFLINE_URL, "/icons/icon-192.png", "/icons/icon-512.png"]);
  })());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  // For navigation requests, try network then offline page
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const preload = await event.preloadResponse;
        if (preload) return preload;
        const network = await fetch(request);
        return network;
      } catch (err) {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(OFFLINE_URL);
        return cached;
      }
    })());
    return;
  }
  // For other requests, try cache first, then network
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const network = await fetch(request);
      // Optionally cache new assets
      if (request.url.startsWith(self.location.origin)) {
        cache.put(request, network.clone());
      }
      return network;
    } catch (err) {
      return cached || Response.error();
    }
  })());
});
