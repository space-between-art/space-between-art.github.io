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
    const content = document.getElementById('storyContent') || document.querySelector('.chapter-content');
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

// ========== RESONANCE WALL ==========
const RW_API = 'https://resonance-wall.winsusa2611.workers.dev/api/resonances';

async function loadResonances() {
    const wall = document.getElementById('resonanceWall');
    if (!wall) return;
    const novel = wall.dataset.novel;
    if (!novel) return;
    
    const container = document.getElementById('rwMessages');
    try {
        const res = await fetch(`${RW_API}?novel=${novel}`);
        const data = await res.json();
        if (data.resonances && data.resonances.length > 0) {
            container.innerHTML = data.resonances.map((r, i) => `
                <div class="rw-msg" style="animation-delay:${i * 0.08}s">
                    <div>${r.message}</div>
                    <div class="rw-msg-time">${formatTime(r.created_at)}</div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<div class="rw-empty">還沒有人留下共鳴。成為第一個？</div>';
        }
    } catch (e) {
        container.innerHTML = '<div class="rw-empty">載入中⋯⋯</div>';
    }
}

function formatTime(t) {
    if (!t) return '';
    const d = new Date(t + 'Z');
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return '剛剛';
    if (diff < 3600) return Math.floor(diff / 60) + ' 分鐘前';
    if (diff < 86400) return Math.floor(diff / 3600) + ' 小時前';
    if (diff < 604800) return Math.floor(diff / 86400) + ' 天前';
    return d.toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' });
}

async function submitResonance() {
    const wall = document.getElementById('resonanceWall');
    const input = document.getElementById('rwInput');
    const btn = document.getElementById('rwSubmit');
    if (!wall || !input || !btn) return;
    
    const novel = wall.dataset.novel;
    const message = input.value.trim();
    if (!message || message.length < 2) return;
    
    btn.disabled = true;
    btn.textContent = '送出中⋯';
    
    try {
        const res = await fetch(RW_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ novel, message })
        });
        const data = await res.json();
        if (data.success) {
            input.value = '';
            btn.textContent = '✓ 已留下';
            setTimeout(() => { btn.textContent = '留下共鳴'; btn.disabled = false; }, 2000);
            loadResonances();
            trackEvent('resonance_submit', { novel: novel });
        } else {
            btn.textContent = '留下共鳴';
            btn.disabled = false;
        }
    } catch (e) {
        btn.textContent = '留下共鳴';
        btn.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', loadResonances);

// ========== LO-FI MUSIC PLAYER ==========
let musicActive=false,musicPlaying=false;
const YT_LOFI='https://www.youtube.com/embed/jfKfPfyJRdk?enablejsapi=1&autoplay=1&loop=1&origin=https://space-between.art';

function toggleMusic(){
    const b=document.getElementById('musicBar'),t=document.getElementById('musicToggle'),p=document.getElementById('ytPlayer');
    if(!b||!t||!p)return;
    if(!musicActive){
        musicActive=true;
        b.classList.add('active');
        document.body.classList.add('music-on');
        t.classList.add('playing');
        t.textContent='🎶';
        if(!p.getAttribute('src')){
            p.src=YT_LOFI;
            musicPlaying=true;
            document.getElementById('musicPlayBtn').textContent='⏸';
        }
        try{localStorage.setItem('sba-music','on')}catch(e){}
    }else{
        b.classList.toggle('active');
        document.body.classList.toggle('music-on');
    }
}
function togglePlayPause(){
    const p=document.getElementById('ytPlayer'),b=document.getElementById('musicPlayBtn');
    if(!p||!b)return;
    if(musicPlaying){
        p.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
        b.textContent='▶';musicPlaying=false;
        try{localStorage.setItem('sba-music','paused')}catch(e){}
    }else{
        if(!p.getAttribute('src'))p.src=YT_LOFI;
        p.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}','*');
        b.textContent='⏸';musicPlaying=true;
        try{localStorage.setItem('sba-music','on')}catch(e){}
    }
}
function setVolume(v){
    const p=document.getElementById('ytPlayer');
    if(p&&p.contentWindow)p.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${v}]}`,'*');
    try{localStorage.setItem('sba-music-vol',v)}catch(e){}
}
function closeMusic(){
    const b=document.getElementById('musicBar'),t=document.getElementById('musicToggle'),p=document.getElementById('ytPlayer');
    if(b)b.classList.remove('active');
    document.body.classList.remove('music-on');
    musicActive=false;musicPlaying=false;
    if(t){t.classList.remove('playing');t.textContent='🎵'}
    if(p)p.src='';
    const btn=document.getElementById('musicPlayBtn');if(btn)btn.textContent='▶';
    try{localStorage.removeItem('sba-music')}catch(e){}
}

// Auto-resume music on page load if it was playing
document.addEventListener('DOMContentLoaded',function(){
    try{
        const state=localStorage.getItem('sba-music');
        if(state==='on'){
            const b=document.getElementById('musicBar'),t=document.getElementById('musicToggle'),p=document.getElementById('ytPlayer');
            if(b&&t&&p){
                musicActive=true;
                b.classList.add('active');
                document.body.classList.add('music-on');
                t.classList.add('playing');
                t.textContent='🎶';
                p.src=YT_LOFI;
                musicPlaying=true;
                const btn=document.getElementById('musicPlayBtn');if(btn)btn.textContent='⏸';
                const vol=localStorage.getItem('sba-music-vol');
                if(vol){
                    const slider=document.getElementById('musicVol');
                    if(slider)slider.value=vol;
                    setTimeout(()=>setVolume(vol),2000);
                }
            }
        }
    }catch(e){}
});
