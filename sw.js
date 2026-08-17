const CACHE_NAME = "wheel-app-cache-v1";
const ASSETS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", function(event){
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(ASSETS).catch(function(){});
    })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(event){
  event.respondWith(
    fetch(event.request).catch(function(){
      return caches.match(event.request);
    })
  );
});
