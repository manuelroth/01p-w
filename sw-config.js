importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js"
);

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  new RegExp("(.*).js"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "static-resources"
  })
);
