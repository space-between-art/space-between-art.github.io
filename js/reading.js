/* =============================================
   Space Between Art — Reading Pages JS
   ============================================= */

// ===== Reading Progress =====
window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = scrolled + '%';
});

// ===== Auto-hide nav on scroll =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.getElementById('siteNav');
    if (!nav) return;
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 200) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

// ===== Settings =====
let fontSize = 17;
let lineHeight = 2.0;

// Load saved settings
try {
    const saved = JSON.parse(localStorage.getItem('sba-reading-settings'));
    if (saved) {
        fontSize = saved.fontSize || 17;
        lineHeight = saved.lineHeight || 2.0;
    }
} catch(e) {}

function applySettings() {
    const content = document.getElementById('storyContent');
    if (!content) return;
    content.style.fontSize = fontSize + 'px';
    content.style.lineHeight = lineHeight;
    const fsVal = document.getElementById('fontSizeValue');
    const lhVal = document.getElementById('lineHeightValue');
    if (fsVal) fsVal.textContent = fontSize + 'px';
    if (lhVal) lhVal.textContent = lineHeight.toFixed(1);
}

function saveSettings() {
    try {
        localStorage.setItem('sba-reading-settings', JSON.stringify({ fontSize, lineHeight }));
    } catch(e) {}
}

function toggleSettings() {
    document.getElementById('settingsOverlay')?.classList.toggle('active');
    document.getElementById('settingsPanel')?.classList.toggle('active');
}

function changeFontSize(delta) {
    fontSize = Math.max(14, Math.min(24, fontSize + delta));
    applySettings();
    saveSettings();
    trackSettingsChange('font_size', fontSize);
}

function changeLineHeight(delta) {
    lineHeight = Math.max(1.5, Math.min(3.0, parseFloat((lineHeight + delta).toFixed(1))));
    applySettings();
    saveSettings();
    trackSettingsChange('line_height', lineHeight);
}

// ===== Table of Contents =====
function toggleToc() {
    document.getElementById('tocOverlay')?.classList.toggle('active');
    document.getElementById('tocPanel')?.classList.toggle('active');
}

// ===== Email Capture =====
function handleEmailCapture(event, source) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    if (!email) return;
    
    // GA4 event
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    trackEvent('email_capture', {
        source: source,
        book: parts[1] || 'unknown',
        chapter: (parts[2] || 'index').replace('.html', '')
    });
    
    // Send to n8n webhook
    const webhookUrl = 'https://spacebetween.app.n8n.cloud/webhook/email-capture';
    
    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            source: source,
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        })
    }).catch(() => {});

    // Show success
    const btn = form.querySelector('button');
    btn.textContent = '✓ 已送出';
    btn.disabled = true;
    form.querySelector('input[type="email"]').disabled = true;
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const prev = document.querySelector('.chapter-nav a:first-child');
        if (prev) window.location.href = prev.href;
    }
    if (e.key === 'ArrowRight') {
        const next = document.querySelector('.chapter-nav a:last-child');
        if (next) window.location.href = next.href;
    }
});

// ===== GA4 Event Tracking =====
function trackEvent(eventName, params) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, params);
    }
}

// Track chapter view on load
document.addEventListener('DOMContentLoaded', () => {
    applySettings();
    
    // Extract book & chapter from URL path
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    // Expected: /read/{book}/{chapter}.html
    const book = parts[1] || 'unknown';
    const chapter = (parts[2] || 'index').replace('.html', '');
    
    trackEvent('chapter_view', {
        book: book,
        chapter: chapter,
        page_path: path
    });
});

// Track reading depth (25%, 50%, 75%, 100%)
let depthTracked = { 25: false, 50: false, 75: false, 100: false };
window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.round((window.scrollY / docHeight) * 100);
    
    [25, 50, 75, 100].forEach(threshold => {
        if (pct >= threshold && !depthTracked[threshold]) {
            depthTracked[threshold] = true;
            const path = window.location.pathname;
            const parts = path.split('/').filter(Boolean);
            trackEvent('reading_depth', {
                book: parts[1] || 'unknown',
                chapter: (parts[2] || 'index').replace('.html', ''),
                depth_pct: threshold
            });
        }
    });
});

// Track chapter navigation clicks
document.addEventListener('click', (e) => {
    const link = e.target.closest('.chapter-nav a, .toc-list a');
    if (link) {
        const href = link.getAttribute('href');
        const path = window.location.pathname;
        const parts = path.split('/').filter(Boolean);
        trackEvent('chapter_navigate', {
            book: parts[1] || 'unknown',
            from_chapter: (parts[2] || 'index').replace('.html', ''),
            to_page: href,
            nav_type: link.closest('.toc-list') ? 'toc' : 'prev_next'
        });
    }
});

// Track settings changes
function trackSettingsChange(setting, value) {
    trackEvent('reading_settings', {
        setting: setting,
        value: value
    });
}

// ========== FLOATING AI BUTTON ==========
function toggleAiMenu() {
    const menu = document.getElementById('aiMenu');
    if (menu) menu.classList.toggle('active');
}
// Close AI menu on outside click
document.addEventListener('click', (e) => {
    const menu = document.getElementById('aiMenu');
    const btn = document.getElementById('aiFloatBtn');
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove('active');
    }
});

// ========== READING THEMES ==========
const THEMES = ['dark', 'warm', 'sepia', 'paper'];
let currentTheme = 'dark';

// Load saved theme
try {
    const savedTheme = localStorage.getItem('sba-reading-theme');
    if (savedTheme && THEMES.includes(savedTheme)) {
        currentTheme = savedTheme;
    }
} catch(e) {}

function applyTheme(theme) {
    currentTheme = theme;
    document.body.className = '';
    if (theme !== 'dark') {
        document.body.classList.add('theme-' + theme);
    }
    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    try { localStorage.setItem('sba-reading-theme', theme); } catch(e) {}
    trackEvent('reading_theme', { theme: theme });
}

// Apply theme on load
document.addEventListener('DOMContentLoaded', () => {
    if (currentTheme !== 'dark') {
        document.body.classList.add('theme-' + currentTheme);
    }
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === currentTheme);
    });
});

// ========== ESTIMATED READ TIME ==========
document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('storyContent') || document.querySelector('.chapter-content');
    const timeEl = document.getElementById('readTime');
    if (content && timeEl) {
        const text = content.innerText || content.textContent;
        const charCount = text.replace(/\s/g, '').length;
        const minutes = Math.max(1, Math.round(charCount / 500)); // ~500 Chinese chars/min
        timeEl.textContent = '約 ' + minutes + ' 分鐘閱讀 · ' + charCount.toLocaleString() + ' 字';
    }
});
