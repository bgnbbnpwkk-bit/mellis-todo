// Service Worker für "Meine Schritte".
// Strategie: network-first für frische Inhalte, Cache als Offline-Fallback.
// Auto-Update: skipWaiting + clients.claim sorgen dafür, dass eine neue Version
// sofort übernimmt; die Seite lädt dann via 'controllerchange' automatisch neu.
// Bei jeder inhaltlichen Änderung CACHE-Version erhöhen.
const CACHE = "melli-todo-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Firebase-/Google-Auth-Anfragen niemals abfangen/cachen.
  if (/(googleapis|gstatic|firebaseapp|google\.com|firebaseio)/.test(url.hostname)) return;
  // Nur gleiche Herkunft cachen; alles andere unverändert durchreichen.
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() =>
        caches.match(req).then((r) => r || caches.match("./index.html"))
      )
  );
});
