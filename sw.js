const CACHE = "launcher-cache-v4";
const OFFLINE_URL = "offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(["./", "index.html", "app.js", "manifest.webmanifest", OFFLINE_URL, "icons/icon-192.png", "icons/icon-512.png"]);
  })());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const preload = await event.preloadResponse;
        if (preload) return preload;
        const network = await fetch(request);
        return network;
      } catch (err) {
        const cache = await caches.open(CACHE);
        return (await cache.match(OFFLINE_URL)) || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const network = await fetch(request);
      if (new URL(request.url).origin === self.location.origin) {{ cache.put(request, network.clone()); }}
      return network;
    } catch (err) {
      return cached || Response.error();
    }
  })());
});
