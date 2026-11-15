
const CACHE_NAME = "dea-simulador-v1.2";

// Recursos necesarios para funcionar sin conexión
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

  // Audios
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

  // Imágenes
  "/src/images/cajaWeb.webp",
  "/src/images/titulounDEAenunacaja.webp",
  "/src/images/Flag_of_Argentina.svg.webp",
  "/src/images/cajaWebIcon.ico",

  // Iconos
  "/icons/icono-192.png",
  "/icons/icono-512.png"
];

// INSTALACIÓN
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const url of urlsToCache) {
        const response = await fetch(url, {
          redirect: "follow"
        });

        if (!response.ok) {
          throw new Error(
            `No se pudo guardar ${url}: ${response.status}`
          );
        }

        // Evitar guardar respuestas con redirecciones
        // sin normalizarlas.
        const cleanResponse = new Response(
          await response.blob(),
          {
            status: 200,
            headers: response.headers
          }
        );

        await cache.put(url, cleanResponse);
      }
    })
  );
});

// ACTIVACIÓN
self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter(key =>
            key.startsWith("dea-simulador-") &&
            key !== CACHE_NAME
          )
          .map(key => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

// FETCH
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // En navegaciones, buscar por la ruta del archivo.
      if (event.request.mode === "navigate") {
        const url = new URL(event.request.url);

        const path =
          url.pathname === "/" ? "/index.html" : url.pathname;

        const cached = await cache.match(path);

        if (cached && !cached.redirected) {
          return cached;
        }
      } else {
        const cached = await cache.match(event.request);

        if (cached && !cached.redirected) {
          return cached;
        }
      }

      try {
        return await fetch(event.request);
      } catch (error) {
        console.error(
          "Error al recuperar:",
          event.request.url,
          error
        );

        return Response.error();
      }
    })()
  );
});

// ACTUALIZACIÓN
self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
