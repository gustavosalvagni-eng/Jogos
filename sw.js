/* Offline app shell. Increment VERSION on each deployment. */
'use strict';
const VERSION = 'caso-noir-001-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-48.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(APP_SHELL)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('caso-noir-001-') && key !== VERSION).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const saved = await cache.match('./index.html');
      if (saved) return saved;
      try {
        const response = await fetch(event.request);
        if (response.ok) await cache.put('./index.html', response.clone());
        return response;
      } catch (_) {
        return new Response('<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Sem conexão</title><body style="background:#0b0b0e;color:#eee9e4;font-family:system-ui;padding:3rem"><h1>Sem conexão</h1><p>Abra o aplicativo uma vez online para instalar o conteúdo offline.</p></body></html>', {status:503,headers:{'Content-Type':'text/html; charset=utf-8'}});
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const hit = await caches.match(event.request);
    if (hit) return hit;
    return fetch(event.request);
  })());
});
