// Author: Kaden Griffith
// Descr : A caching service worker for PWA's

'use strict';

const cacheName = 'static';

// Install the service worker and cache all
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      cache.addAll([
'/service-worker.js',
    '/index.html',
    '/favicons/widetile.png',
    '/favicons/smalltile.png',
    '/favicons/mediumtile.png',
    '/favicons/launch750x1294.png',
    '/favicons/launch640x1136.png',
    '/favicons/launch2048x2732.png',
    '/favicons/launch1668x2224.png',
    '/favicons/launch1536x2048.png',
    '/favicons/launch1242x2148.png',
    '/favicons/launch1125x2436.png',
    '/favicons/largetile.png',
    '/favicons/icon-96.png',
    '/favicons/icon-512.png',
    '/favicons/icon-48.png',
    '/favicons/icon-384.png',
    '/favicons/icon-32.png',
    '/favicons/icon-256.png',
    '/favicons/icon-180.png',
    '/favicons/icon-16.png',
    '/favicons/icon-144.png',
    '/favicons/icon-128.png',
    '/favicons/apple-touch-icon-76x76.png',
    '/favicons/apple-touch-icon-72x72.png',
    '/favicons/apple-touch-icon-60x60.png',
    '/favicons/apple-touch-icon-57x57.png',
    '/favicons/apple-touch-icon-180x180.png',
    '/favicons/apple-touch-icon-152x152.png',
    '/favicons/apple-touch-icon-144x144.png',
    '/favicons/apple-touch-icon-120x120.png',
    '/favicons/apple-touch-icon-114x114.png',
    '/favicons/app-512.png',
    '/favicons/app-384.png',
    '/favicons/app-256.png',
    '/favicons/android-chrome-192x192.png',
    '/58816b23060a41c2b2cd.js',
    '/58816b23060a41c2b2cd.css',
    '/404.html',
    '/250f4fd14562247c3a8ccf4ab190e36e.png',
    '/1.58816b23060a41c2b2cd.js',
    '/0.58816b23060a41c2b2cd.js'
]);
    })
  );
  self.skipWaiting();
});

// Grab the cached assets before trying to reload them
self.addEventListener('fetch', function(event) {
  event.preventDefault();
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
          .then(function(res) {
            return caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request.url, res.clone());
                return res;
              })
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    })
  );
});

// Activate the service worker and erase any unnecessary cache data
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
    .then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      ).catch(function(err) {
        console.error(err);
      });
    })
  );
});