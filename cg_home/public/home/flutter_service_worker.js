'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "2b521e10dfa0f067561de489a19d6620",
"index.html": "a97e3717ebe046bf5c9a49e81b442067",
"/": "a97e3717ebe046bf5c9a49e81b442067",
"main.dart.js": "97a66fa570eb6d3a74d754c5c144ef7e",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "317361579910b8420e37c6623d159382",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "906fc433ff2f17c2c8af10ca573ca807",
"assets/AssetManifest.json": "8d3238abf3f828b216124f3a35ff7794",
"assets/NOTICES": "745666c7558bd672835a1db17bf6b75b",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/creatego_packages/assets/svg/yoshop_logo.svg": "9ae9457b901b10ad4af03e3f2b87c4df",
"assets/packages/creatego_packages/assets/png/delicious.png": "41bcb54ed8f0e95d4d57f686cd2bb62a",
"assets/packages/creatego_packages/assets/png/no_image.png": "8bc36b779f05e502267a1bb179ecf590",
"assets/packages/creatego_packages/assets/png/takeout.png": "6db2dd59eb01960daefad354437423ad",
"assets/packages/creatego_packages/assets/png/dinein.png": "aa0dc3d065fc9251b49b95eba24e8dd9",
"assets/packages/creatego_packages/assets/png/creditcard.png": "0f2639865dcc8a2bc2d42152adc30e0f",
"assets/packages/creatego_packages/assets/png/food1.png": "b11f52a2c352dcc11a76e29b02e2c03d",
"assets/packages/creatego_packages/assets/png/print.png": "0a92e53c658d55c53eff92e2df026fb6",
"assets/packages/creatego_packages/assets/png/menu.png": "0c09cd777bcfddcfac4f1074402ff319",
"assets/packages/creatego_packages/assets/png/food.png": "693eed9132f5722e912f49487a375f9e",
"assets/packages/creatego_packages/assets/png/pay4.png": "dd6ec52e5cae186ab0d5a9f1ac0c5cf8",
"assets/packages/creatego_packages/assets/png/pay1.png": "3d18ddd30b847e80b6652049387cb481",
"assets/packages/creatego_packages/assets/png/pay2.png": "3830c80c3d268de9ef58515d45c234f0",
"assets/packages/creatego_packages/assets/png/reklam.png": "17ca6f9bf4eeffd0abe4925b45dccb46",
"assets/packages/creatego_packages/assets/png/pay3.png": "56e0457868da8fd02582a6eaf7a7d4f2",
"assets/packages/creatego_packages/assets/png/trash.png": "73aa18b2ea8dde8c9b52f628c7076931",
"assets/packages/creatego_packages/assets/png/yoshop.png": "3331e2b9e72f9c4bfa89ffbfd16136d8",
"assets/packages/flex_color_picker/assets/opacity.png": "49c4f3bcb1b25364bb4c255edcaaf5b2",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "85b87ae71ee1eb33a86310ae183a3e72",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/no_image.png": "8bc36b779f05e502267a1bb179ecf590",
"assets/assets/creatego_login.png": "fcfdb469176f4143d6fe3fdb1734abe2",
"assets/assets/theme.png": "d4d14a59a45200581f644a3a413c3fb5",
"assets/assets/logos/cg_logo_short.svg": "de347a200ea0152cbcb299d8bfbe4f47",
"assets/assets/logos/cg_logo_full.svg": "3168007c024deaf3e9e8ad5f99312446",
"assets/assets/project.png": "5d3ce3bfd804b26c890d4811d90ce304",
"assets/assets/component.png": "26612783dc9e9b6eec2c08cc224f1326",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
