// Author: Kaden Griffith
// Descr : A caching service worker for PWA's

"use strict";

const cacheName = "static";

// Install the service worker and cache all
self.addEventListener("install", function(event) {
  if (
    event.request &&
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  ) {
    return;
  }

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      cache.addAll([
        {
          revision: "c5a7211b87aa0f29a654e1b0f0e56522",
          url: "/index.html"
        },
        {
          revision: "7388a9c5300d023bd8b1",
          url: "/static/css/main.742d1989.chunk.css"
        },
        {
          revision: "2d2688d40192472aae27",
          url: "/static/js/2.97d04a68.chunk.js"
        },
        {
          revision: "7388a9c5300d023bd8b1",
          url: "/static/js/main.404e41be.chunk.js"
        },
        {
          revision: "42ac5946195a7306e2a5",
          url: "/static/js/runtime~main.a8a9905a.js"
        },
        {
          revision: "38c01981b35fa1e8a8c84c989b93cf9f",
          url: "/static/media/bytewave-text.38c01981.svg"
        },
        {
          revision: "73e75f6a58fee49b60e65e041bc05bc4",
          url: "/static/media/headshot.73e75f6a.png"
        },
        {
          revision: "a583e8dc539cb1606513c17aa3fa8367",
          url: "/static/media/hl.a583e8dc.png"
        },
        {
          revision: "246949a3f6acda25bfa595dfb7289996",
          url: "/static/media/loading.246949a3.gif"
        },
        {
          revision: "2488cffc51f0a69b9d4fe255a4b17ab3",
          url: "/static/media/logo.2488cffc.png"
        },
        {
          revision: "a6bf3556dda462139d057a9418d03694",
          url: "/static/media/mow_pattern-01.a6bf3556.svg"
        },
        {
          revision: "37afeb2c5abe46aaf80b8f467ced33be",
          url: "/static/media/mow_pattern-02.37afeb2c.svg"
        },
        {
          revision: "6ea6683a69b9f73f728f8036703eeadb",
          url: "/static/media/texture.6ea6683a.jpg"
        }
      ]);
    })
  );
  self.skipWaiting();
});

// Grab the cached assets before trying to reload them
self.addEventListener("fetch", function(event) {
  event.preventDefault();

  if (
    event.request &&
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
          .then(function(res) {
            return caches.open(cacheName).then(function(cache) {
              cache.put(event.request.url, res.clone());
              return res;
            });
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    })
  );
});

// Activate the service worker and erase any unnecessary cache data
self.addEventListener("activate", function(event) {
  self.clients.claim();

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
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
