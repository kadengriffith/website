// Author: Kaden Griffith
// Descr : A caching service worker for PWA's

'use strict';

const cacheName = 'static';

// Install the service worker and cache all
self.addEventListener('install', function (event) {
  if (event.request && event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }

  event.waitUntil(
    caches.open(cacheName)
    .then(function (cache) {
      cache.addAll(FILEARRAY);
    })
  );
  self.skipWaiting();
});

// Grab the cached assets before trying to reload them
self.addEventListener('fetch', function (event) {
  event.preventDefault();

  if (event.request && event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
          .then(function (res) {
            return caches.open(cacheName)
              .then(function (cache) {
                cache.put(event.request.url, res.clone());
                return res;
              });
          })
          .catch(function (err) {
            console.error(err);
          });
      }
    })
  );
});

// Activate the service worker and erase any unnecessary cache data
self.addEventListener('activate', function (event) {
  self.clients.claim();

  event.waitUntil(
    caches.keys()
    .then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          return caches.delete(cacheName);
        })
      ).catch(function (err) {
        console.error(err);
      });
    })
  );
});