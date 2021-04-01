const OFFLINE_VERSION = 1;
const OFFLINE_CACHE = 'disclave-offline-cache-v1';
const OFFLINE_URL = 'offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(OFFLINE_CACHE);
      await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    })()
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          return await fetch(event.request);
        } catch (error) {
          console.log('Fetch failed; returning offline page instead.', error);

          const cache = await caches.open(OFFLINE_CACHE);
          return await cache.match(OFFLINE_URL);
        }
      })()
    );
  }
});
