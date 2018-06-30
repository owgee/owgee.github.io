// Install the Service Worker
if (self.skipWaiting) { self.skipWaiting(); }
self.addEventListener('install', function(event) {

    event.waitUntil(
        // Open cache
        caches.open('cc-sw').then(function(cache) {
            // And add resources to it
            return cache.addAll([
                './',
                'js/',
                'vendor/',
                'img/',
                'css/'
            ]);
        })
    );
});


self.addEventListener('fetch', function(event) {

    console.log(event.request);
    event.respondWith(
        //If there's a request in the caches that matches
        caches.match(event.request).then(function(response) {
            //If the request is not null, return it, otherwise return the control to the network fetch
            return response || fetch(event.request);
        })
    );
});
