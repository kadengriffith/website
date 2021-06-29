/* eslint-disable */
const CACHE = "static";

let FILES = ["/"];

if ("function" === typeof importScripts) {
  importScripts('/precache-manifest.30868c162a3e0227e0bb39b57d4ca527.js');
  FILES = FILES.concat(self.__precacheManifest || []);
}

self.addEventListener("install", function(evt) {
  evt.waitUntil(
    caches
      .open(CACHE)
      .then(function(cache) {
        cache.addAll(FILES).catch(function() {
          console.error("Manifest not cached: precache files not added.");
        });
      })
      .catch(function() {
        console.error("Manifest not cached.");
      })
  );
});

self.addEventListener("fetch", function(evt) {
  // Let the browser do its default thing
  // for non-GET requests.
  if (evt.request.method != "GET") return;

  // Prevent the default, and handle the request ourselves.
  evt.respondWith(
    (async function() {
      // Try to get the response from a cache
      const openCache = await caches.open(CACHE).catch(function() {
        console.error("Failed to open cache on fetch.");
      });
      const cachedResponse = await openCache.match(evt.request);

      if (cachedResponse) {
        // If we found a match in the cache, return it, but also
        // update the entry in the cache in the background.
        evt.waitUntil(openCache.add(evt.request));
        return cachedResponse;
      }

      // If we didn't find a match in the cache, use the network.
      return fetch(evt.request).catch(function() {
        console.error("Fetch failure:", evt.request);
      });
    })()
  );
});
