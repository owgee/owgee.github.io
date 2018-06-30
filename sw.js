// Install the Service Worker
if (skipWaiting) { skipWaiting(); }
addEventListener('install', function(event) {

    event.waitUntil(
        // Open cache
        caches.open('cc-sw').then(function(cache) {
            // And add resources to it
            return cache.addAll([
                '/',
                'js/',
                'img/',
                'css/',
                'https://free.currencyconverterapi.com/'
            ]);
        })
    );
});


addEventListener('fetch', function(event) {

    console.log(event.request);
    event.respondWith(
        //If there's a request in the caches that matches
        caches.match(event.request).then(function(response) {
            //If the request is not null, return it, otherwise return the control to the network fetch
            console.log(response);
            return response || fetch(event.request)     //fetch from internet
                    .then(function(res) {
                        return caches.open('cc-sw')
                            .then(function(cache) {
                                cache.put(event.request.url, res.clone());    //save the response for future
                                return res;   // return the fetched data
                            })
                    })
                    .catch(function(err) {       // fallback
                        return caches.open('cc-sw')
                            .then(function(cache) {
                                return cache.match('/index.html');
                            });
                    });
        })
    );




});



