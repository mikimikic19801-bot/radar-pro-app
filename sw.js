const CACHE_NAME = 'sport-radar-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://img.icons8.com/?size=96&id=u060U6K9U5L0&format=png&color=00e676'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('api') || event.request.url.includes('the-odds-api')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
