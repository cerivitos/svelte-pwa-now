var cacheName = "sgtoilet";
var filesToCache = [
  "/",
  "/index.html",
  "/main.css",
  "/main.js",
  "/components.css",
  "https://fonts.googleapis.com/css?family=Oswald|Roboto&display=swap"
];
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(thisCacheName) {
          if (thisCacheName !== cacheName) {
            console.log(
              "[ServiceWorker] Removing Cached Files from Cache - ",
              thisCacheName
            );
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        console.log("[ServiceWorker] Found in Cache", e.request.url, response);
        return response;
      }
      var requestClone = e.request.clone();
      fetch(requestClone)
        .then(function(response) {
          if (!response) {
            console.log("[ServiceWorker] No response from fetch ");
            return response;
          }

          var responseClone = response.clone();
          caches.open(cacheName).then(function(cache) {
            cache.put(e.request, responseClone);
            console.log("[ServiceWorker] New Data Cached", e.request.url);
            return response;
          });
        })
        .catch(function(err) {
          console.log("[ServiceWorker] Error Fetching & Caching New Data", err);
        });
    })
  );
});
