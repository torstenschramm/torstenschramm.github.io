const CacheName = 'Aggertalsperre  Oberer Kontrollgang-static-v1';
const files = [
    "index.html",

    "manifest.json",
    "WonderlandRuntime-LoadingScreen.bin",
    "WonderlandRuntime-loader.wasm",
    "WonderlandRuntime-loader.js",
    "WonderlandRuntime-loader-simd.wasm",
    "WonderlandRuntime-loader-simd.js",
    "WonderlandRuntime-loader-threads.wasm",
    "WonderlandRuntime-loader-threads.js",
    "WonderlandRuntime-loader-threads.worker.js",
    "WonderlandRuntime-loader-simd-threads.wasm",
    "WonderlandRuntime-loader-simd-threads.js",
    "WonderlandRuntime-loader-simd-threads.worker.js",
    "MyWonderlandFBX2.bin",
    "sfx/click.wav",
    "sfx/unclick.wav",
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CacheName).then(cache => cache.addAll(files) ));
});
self.addEventListener('activate', () => {
    console.log('Service worker initialized.');
});

self.addEventListener('fetch', e => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request, {ignoreSearch: true});
            if (r) return r;

            const response = await fetch(e.request);
            const cache = await caches.open(CacheName);
            cache.put(e.request, response.clone());
            return response;
        })()
    );
});
