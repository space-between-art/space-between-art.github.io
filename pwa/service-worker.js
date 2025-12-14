// 心靈療癒學院 - Service Worker
// 版本號（更新時遞增）
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `healing-academy-${CACHE_VERSION}`;

// 需要緩存的核心資源
const CORE_ASSETS = [
  '/',
  '/academy.html',
  '/ai-chat.html',
  '/case-supervision.html',
  '/reflection-journal.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// 離線頁面
const OFFLINE_PAGE = '/offline.html';

// ========== 安裝事件 ==========
self.addEventListener('install', (event) => {
  console.log('[SW] 安裝中...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] 緩存核心資源');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        // 跳過等待，立即激活
        return self.skipWaiting();
      })
  );
});

// ========== 激活事件 ==========
self.addEventListener('activate', (event) => {
  console.log('[SW] 激活中...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith('healing-academy-') && name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] 刪除舊緩存:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        // 立即控制所有頁面
        return self.clients.claim();
      })
  );
});

// ========== 請求攔截 ==========
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 只處理同源請求
  if (url.origin !== location.origin) {
    return;
  }
  
  // API 請求：網絡優先
  if (url.pathname.includes('/api/') || url.hostname.includes('workers.dev')) {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // 靜態資源：緩存優先
  if (request.destination === 'image' || 
      request.destination === 'style' || 
      request.destination === 'script' ||
      url.pathname.endsWith('.html')) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // 其他請求：網絡優先
  event.respondWith(networkFirst(request));
});

// ========== 緩存策略 ==========

// 緩存優先（適合靜態資源）
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // 背景更新緩存
    fetchAndCache(request);
    return cachedResponse;
  }
  
  return fetchAndCache(request);
}

// 網絡優先（適合 API 和動態內容）
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // 緩存成功的響應
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // 網絡失敗，嘗試緩存
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 如果是頁面請求，返回離線頁面
    if (request.destination === 'document') {
      return caches.match(OFFLINE_PAGE);
    }
    
    throw error;
  }
}

// 獲取並緩存
async function fetchAndCache(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // 網絡失敗，嘗試返回緩存
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 如果是頁面請求，返回離線頁面
    if (request.destination === 'document') {
      return caches.match(OFFLINE_PAGE);
    }
    
    throw error;
  }
}

// ========== 推送通知（可選）==========
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  
  const options = {
    body: data.body || '來自療癒學院的訊息',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/academy.html'
    },
    actions: [
      { action: 'open', title: '查看' },
      { action: 'close', title: '關閉' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || '療癒學院', options)
  );
});

// 通知點擊處理
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'close') return;
  
  const url = event.notification.data?.url || '/academy.html';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // 如果已有窗口打開，聚焦它
        for (const client of windowClients) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.navigate(url);
            return client.focus();
          }
        }
        // 否則打開新窗口
        return clients.openWindow(url);
      })
  );
});

console.log('[SW] Service Worker 已載入');
