importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js"
);

workbox.precaching.precacheAndRoute([
  {
    "url": "css/fonts/Unica77LL-Regular.woff2",
    "revision": "fc251e3bb043ec48bfd75b2dc9c0552a"
  },
  {
    "url": "css/style.css",
    "revision": "6361bc7e52f3c524da3406fac76c393b"
  },
  {
    "url": "img/cross.png",
    "revision": "e253495968ad3b7eabad886a843eb8e0"
  },
  {
    "url": "img/fullscreen.png",
    "revision": "39e102b354375070c9eba6a743b10704"
  },
  {
    "url": "img/galerie.png",
    "revision": "a64bb485f547d3c459eeffb8e22a1937"
  },
  {
    "url": "img/pfeillinks.png",
    "revision": "7a6c8e9fa772768ebb94997afe204f6b"
  },
  {
    "url": "img/pfeilrechts.png",
    "revision": "8088cdc8adf11442b4ad64ee1f49b995"
  },
  {
    "url": "index.html",
    "revision": "4afc849c27fcd9fe2a0b48b470fd9136"
  },
  {
    "url": "js/fullscreen.js",
    "revision": "e2ed68c03a762f9ab84938c483df7600"
  },
  {
    "url": "js/templates/templates.js",
    "revision": "b659ec11867795c5a91f0cc4f973c8ed"
  },
  {
    "url": "manifest.json",
    "revision": "0d55fb5833121128d3a573fdc8b727b8"
  },
  {
    "url": "template.html",
    "revision": "f8e325c53f0671de2c2a9f5841e26e2f"
  }
]);

workbox.routing.registerRoute(
  new RegExp("(.*).js"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "static-resources"
  })
);
