export default function register(config) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/sw.js", config)
            .then((registration) => {
                console.info("Service Worker registered with scope:", registration.scope);
            })
            .catch((error) => {
                console.warn("Service Worker registration failed:", error);
            });
    }else{
        console.warn("Service Worker not supported");
    }
}
