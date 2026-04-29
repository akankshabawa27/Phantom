const CACHE  = 'phantom-v2';
const ASSETS = [
  './', './index.html',
  /* Slides */
  './slides/slide-01.html', './slides/slide-02.html', './slides/slide-03.html',
  './slides/slide-04.html', './slides/slide-05.html', './slides/slide-06.html',
  /* CSS */
  './css/base.css', './css/slide.css', './css/nav.css',
  './css/slide-01.css', './css/slide-02.css', './css/slide-03.css',
  './css/slide-04.css', './css/slide-05.css', './css/slide-06.css',
  /* JS */
  './js/stars.js', './js/nav.js', './js/scaler.js', './js/pwa.js',
  './js/slide-01.js', './js/slide-03.js',
  /* Assets & PWA */
  './assets/grain.svg',
  './manifest.json', './icon-192.svg', './icon-512.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (!e.request.url.startsWith('http')) return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
