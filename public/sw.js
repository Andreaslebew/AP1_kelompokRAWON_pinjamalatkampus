const CACHE_NAME = 'pinjam-alat-kampus-v1';
const OFFLINE_URL = '/offline.html';
const PRECACHE_URLS = ['/', '/offline.html', '/manifest.webmanifest', '/favicon.svg'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

  // Navigasi (klik link / reload): network dulu, fallback ke offline.html
    if (request.mode === 'navigate') {
        event.respondWith(
        fetch(request).catch(() => caches.match(OFFLINE_URL))
        );
        return;
    }

  // Aset statis: cache dulu, lalu network, lalu offline.html
    event.respondWith(
        caches.match(request).then(
        (cached) =>
            cached ||
            fetch(request)
            .then((response) => {
                if (response.ok && response.type === 'basic') {
                const copy = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                }
                return response;
            })
            .catch(() => caches.match(OFFLINE_URL))
        )
    );
});