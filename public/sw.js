let cacheData = "appV1";

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "/static/js/bundle.js",
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "/index.html",
                "/",
                "/manifest.json",
                "/icon.png",
                "/icon-512.png",
                "/favicon.ico",
                "/clock.png",
                "/mbg.jpeg",
                "/restart.png",
                "/right-arrow.png",
                "/win.png"
            ]);
        })
    );
});

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        console.log("Offline fetch");
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp;
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl);
            })
        );
    }else{
        console.log("Live fetch");
    }
});
