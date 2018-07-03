importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js"
);

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  "https://js.piio.co/sgnclp/piio.min.js",
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  "/__/firebase/5.2.0/firebase-app.js",
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  "/__/firebase/5.2.0/firebase-auth.js",
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  "/__/firebase/5.2.0/firebase-storage.js",
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  "/__/firebase/5.2.0/firebase-firestore.js",
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  "/__/firebase/init.js",
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.runtime.min.js",
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
  workbox.strategies.staleWhileRevalidate()
);
