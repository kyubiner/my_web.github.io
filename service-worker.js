if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/my_web.github.io',
  '/my_web.github.io/index.html',
  '/my_web.github.io/styles.css',
  '/my_web.github.io/script.js',
  '/my_web.github.io/manifest.json',
  '/my_web.github.io/manifest.json/image/icon.png',
  '/my_web.github.io/manifest.json/image/icon2.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});

