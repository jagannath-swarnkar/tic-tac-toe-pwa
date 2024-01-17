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
                "/win.png",
                "/bg_music_1.mp3",
                "button_sound1.mp3",
                "fail.flac",
                "restart.wav",
                "reset.wav",
                "winner_sound.wav",
                "wrong.mp3",
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
