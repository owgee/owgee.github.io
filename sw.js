// Install the Service Worker
// Shorthand identifier mapped to specific versioned cache.

var CACHE_VERSION = 1;
var CURRENT_CACHES = {
    font: 'cc-sw' + CACHE_VERSION
};

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('cc-sw').then(function(cache) {
            return cache.addAll([
                'index.html',
                'img/',
                'css/',
                'js/',
                'vendor/'
            ]);
        })
    );
});





self.addEventListener('activate', function(event) {
    var expectedCacheNames = Object.values(CURRENT_CACHES);

    // Active worker won't be treated as activated until promise
    // resolves successfully.
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (!expectedCacheNames.includes(cacheName)) {
                        console.log('Deleting out of date cache:', cacheName);

                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log('Handling fetch event for', event.request.url);

    event.respondWith(

        // Opens Cache objects that start with 'cc'.
        caches.open(CURRENT_CACHES['cc']).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                if (response) {
                    console.log('Found response in cache:', response);

                    return response;
                }

                console.log('Fetching request from the network');

                return fetch(event.request).then(function(networkResponse) {
                    cache.put(event.request, networkResponse.clone());

                    return networkResponse;
                });
            }).catch(function(error) {

                // Handles exceptions that arise from match() or fetch().
                console.error('Error in fetch handler:', error);

                throw error;
            });
        })
    );
});





