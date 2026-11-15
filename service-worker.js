const CACHE_NAME = "dea-simulador-v1.1"; // Aqui va si cambian algo importante, para que se borre la cache vieja y se cree una nueva

const urlsToCache = [
  "/",
  "/index.html",
  "/documentacion.html",
  "/styles-documentacion.css",
  "/styles.css",
  "/reset.css",
  "/index.js",
  "/LICENSE",
  "/README.md",
  "/manifest.json",

  // audios
  "/src/analizandoRitmo.mp3",
  "/src/bucleComienzo.mp3",
  "/src/colocarParches2.mp3",
  "/src/comienzo.mp3",
  "/src/descargaNecesaria.mp3",
  "/src/descargaRealizada.mp3",
  "/src/inicio.mp3",
  "/src/metronomo.mp3",
  "/src/modoAutomatico.mp3",
  "/src/modoSemiautomatico.mp3",
  "/src/opcionesdesimulacion.mp3",
  "/src/ritmoDesfibrilableAutomatico.mp3",
  "/src/ritmoNoDesfibrilable.mp3",

  //imagenes
  "/src/images/cajaWeb.webp",
  "/src/images/titulounDEAenunacaja.webp",
  "/src/images/Flag_of_Argentina.svg.webp",
  "/src/images/cajaWebIcon.ico",
  

  //iconos
  "/icons/icono-192.png",
  "/icons/icono-512.png"
  
];

// instalar
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// activar y limpiar cache viejo
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// fetch (cache first)
// FETCH - Cache first con recuperación ante errores

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(event.request);

      if (cached) {
        return cached;
      }

      try {
        return await fetch(event.request);
      } catch (error) {
        console.error(
          "Error al recuperar recurso:",
          event.request.url,
          error
        );

        return Response.error();
      }
    })()
  );
});

// recibir mensaje para actualizar
self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});