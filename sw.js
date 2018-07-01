// Install the Service Worker AND Activate it using the activate method

var CACHE_VERSION = 4;
var ACTIVE_CACHES = {
    all: 'cc-sw' + CACHE_VERSION
};

//
self.addEventListener('activate', function(event) {
    var expectedCacheNames = Object.values(ACTIVE_CACHES);

    // Active worker won't be treated as activated until promise
    // resolves successfully.
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (!expectedCacheNames.includes(cacheName)) {
                        console.log('Deleting expired cache...', cacheName);

                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


//All magic happens here, I mean, a lot of magic :-/
self.addEventListener('fetch', function(event) {
    console.log('Handling fetch event for', event.request.url);

    event.respondWith(

        // Open Cache object 'all'.
        caches.open(ACTIVE_CACHES['all']).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                if (response) {
                    console.log('Found response in cache:', response);

                    return response;
                }

                console.log('Fetching request from the network...');

                return fetch(event.request).then(function(networkResponse) {
                    cache.put(event.request, networkResponse.clone());

                    return networkResponse;
                });
            }).catch(function(error) {

                // Handle exceptions that arise from match() or fetch() functions.
                console.error('Error in fetch handler:', error);

                throw error;
            });
        })
    );
});







