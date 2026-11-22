const CACHE_NAME = 'storymate-studio-v0.8.4.6-js-syntax-fix';
const APP_SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try { await cache.addAll(APP_SHELL); }
    catch (error) { console.warn('App shell cache incomplete', error); }
  })());
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('storymate-studio-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const isNavigation = event.request.mode === 'navigate';
    try {
      if (!isNavigation) {
        const cached = await caches.match(event.request);
        if (cached) return cached;
      }
      const response = await fetch(event.request);
      if (response && response.ok && (isNavigation || APP_SHELL.some(path => url.pathname.endsWith(path.replace('./', ''))))) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      const fallback = await caches.match('./index.html');
      if (fallback) return fallback;
      throw error;
    }
  })());
});
