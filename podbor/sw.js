const C="podbor-v5",F=["./","index.html","manifest.json","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// сначала из памяти телефона (открывается мгновенно и без интернета), параллельно тихо обновляем
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.open(C).then(c=>c.match(e.request,{ignoreSearch:true}).then(m=>{
  const net=fetch(e.request).then(r=>{if(r&&r.ok)c.put(e.request,r.clone());return r}).catch(()=>m);return m||net})))});
