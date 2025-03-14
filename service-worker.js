// Nome do cache
const CACHE_NAME = 'orla-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/estilo.css',
  '/index.js',
  '/imagens/icon-192x192.png',
  '/imagens/icon-512x512.png',
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Interceptar solicitações de rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
