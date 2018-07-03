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
    "revision": "54748c2fa19d7161e2c1e107036cab0c"
  },
  {
    "url": "js/3.3.1-jquery.min.js",
    "revision": "a09e13ee94d51c524b7e2a728c7d4039"
  },
  {
    "url": "js/4.0.11-handlebars.runtime.min.js",
    "revision": "db45bdd7ab59d5d2a9b24af35ceeca6f"
  },
  {
    "url": "js/5.2.0-firebase-app.js",
    "revision": "2cc68d8fd341a21583216b6ee216da1c"
  },
  {
    "url": "js/5.2.0-firebase-auth.js",
    "revision": "3ad1638ae9a0865ead1ed099634f0f78"
  },
  {
    "url": "js/5.2.0-firebase-firestore.js",
    "revision": "bc498548618eaacefcf53e1ed19156e8"
  },
  {
    "url": "js/5.2.0-firebase-storage.js",
    "revision": "aa7fc821a1771d3798d5e399f12e9eea"
  },
  {
    "url": "js/fullscreen.js",
    "revision": "e2ed68c03a762f9ab84938c483df7600"
  },
  {
    "url": "js/init.js",
    "revision": "e32f37245e146f79a1a98a03d2bd467f"
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
