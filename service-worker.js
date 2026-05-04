const CACHE_NAME = "dea-simulador-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/reset.css",
  "/index.js",
  "/LICENSE",
  "/README.md",

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
  "/src/modoSemiautomtico.mp3",
  "/src/opcionesdesimulacion.mp3",
  "/src/ritmoDesfibrilableAutomatico.mp3",
  "/src/src/ritmoNoDesfibrilable.mp3",

  //imagenes
  "/src/cajaWeb.webp",
  "/scr/codesLogo.webp",
  "src/titulounDEAenunacaja.webp",

  //iconos
  "/icons/icono-192.png",
  "/icons/icono-512.png",
  "src/cajaWebIcon.ico"

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
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// 👉 recibir mensaje para actualizar
self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});