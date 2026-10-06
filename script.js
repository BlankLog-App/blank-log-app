// ============================================================
// BLANK LOG™ HUB — FRONTEND WITH BACKEND CONNECTION
// ============================================================

const API_BASE = '/api';

// ============================================================
// SVG ICONS
// ============================================================
const Icons = {
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>`,
    send: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
    chat: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
    trending: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    analytics: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    homework: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>`,
    bell: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
    upload: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`,
    more: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
    settings: `⚙️`
};

// ============================================================
// PLANS
// ============================================================
const PLANS = {
    free: {
        id: 'free', name: 'Free', priceDisplay: '$0', priceLabel: 'Free',
        limits: { autoPost: 5, chat: 20, kalshi: 5, code: 15, analytics: 5, homework: 5 },
        badge: 'Free'
    },
    premium: {
        id: 'premium', name: 'Premium', priceDisplay: '$10', priceLabel: '$10 / month',
        limits: { autoPost: 25, chat: 100, kalshi: 25, code: 75, analytics: 25, homework: 25 },
        badge: 'Popular'
    },
    pro: {
        id: 'pro', name: 'Pro', priceDisplay: '$25', priceLabel: '$25 / month',
        limits: { autoPost: Infinity, chat: Infinity, kalshi: Infinity, code: Infinity, analytics: Infinity, homework: Infinity },
        badge: 'Best Value'
    }
};

// ============================================================
// APP STATE
// ============================================================
let AppState = {
    isAuthenticated: false,
    authMode: 'login',
    authError: '',
    token: localStorage.getItem('blanklog_token') || null,
    currentUser: {
        id: null, name: '', email: '', username: '', bio: '', status: '',
        plan: 'free', role: 'user', pfp_url: null, banner_url: null
    },
    activeTab: 'home',
    usage: {
        autoPost: { used: 0, limit: 5 },
        chat: { used: 0, limit: 20 },
        kalshi: { used: 0, limit: 5 },
        code: { used: 0, limit: 15 },
        analytics: { used: 0, limit: 5 },
        homework: { used: 0, limit: 5 }
    },
    chatMessages: [],
    homeworkHistory: [],
    scheduledPosts: [],
    updates: [],
    proofs: [],
    settings: { theme: localStorage.getItem('blanklog_theme') || 'dark' },
    loading: false
};

// ============================================================
// API HELPER
// ============================================================
async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };
    if (AppState.token) {
        options.headers['Authorization'] = `Bearer ${AppState.token}`;
    }
    if (body) options.body = JSON.stringify(body);

    try {
        const res = await fetch(`${API_BASE}/${endpoint}`, options);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Request failed');
        return { success: true, data };
    } catch (err) {
        console.error(`API ${endpoint} error:`, err.message);
        return { success: false, error: err.message };
    }
}

// ============================================================
// THEME
// ============================================================
function applyTheme(theme) {
    if (theme === 'light') document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
    AppState.settings.theme = theme;
    localStorage.setItem('blanklog_theme', theme);
}
applyTheme(AppState.settings.theme);

// ============================================================
// HELPERS
// ============================================================
function getRemaining(m) {
    return Math.max(0, AppState.usage[m].limit - AppState.usage[m].used);
}
function getPercent(m) {
    const limit = AppState.usage[m].limit;
    const used = AppState.usage[m].used;
    if (limit === Infinity || limit === 0) return 0;
    return Math.min(100, (used / limit) * 100);
}
function getLimitDisplay(m) {
    return AppState.usage[m].limit === Infinity ? 'Unlimited' : AppState.usage[m].limit;
}
function isUnlimited(m) {
    return AppState.usage[m].limit === Infinity;
}
function getPlanBadge() {
    const plan = AppState.currentUser.plan;
    if (plan === 'free') return 'badge-free';
    if (plan === 'premium') return 'badge-premium';
    return 'badge-pro';
}

// ============================================================
// AUTH
// ============================================================
async function login() {
    const email = document.getElementById('authEmail')?.value;
    const password = document.getElementById('authPassword')?.value;
    if (!email || !password) {
        AppState.authError = 'Enter email and password';
        renderApp();
        return;
    }
    AppState.loading = true;
    renderApp();

    const res = await apiCall('auth', 'POST', { action: 'login', email, password });
    AppState.loading = false;

    if (res.success) {
        AppState.token = res.data.token;
        AppState.currentUser = res.data.user;
        AppState.isAuthenticated = true;
        localStorage.setItem('blanklog_token', res.data.token);
        await loadUserData();
        renderApp();
    } else {
        AppState.authError = res.error;
        renderApp();
    }
}

async function signup() {
    const name = document.getElementById('authName')?.value;
    const email = document.getElementById('authEmail')?.value;
    const password = document.getElementById('authPassword')?.value;
    if (!name || !email || !password) {
        AppState.authError = 'Fill in all fields';
        renderApp();
        return;
    }
    if (password.length < 6) {
        AppState.authError = 'Password must be 6+ characters';
        renderApp();
        return;
    }
    AppState.loading = true;
    renderApp();

    const res = await apiCall('auth', 'POST', { action: 'signup', name, email, password });
    AppState.loading = false;

    if (res.success) {
        AppState.token = res.data.token;
        AppState.currentUser = res.data.user;
        AppState.isAuthenticated = true;
        localStorage.setItem('blanklog_token', res.data.token);
        await loadUserData();
        renderApp();
    } else {
        AppState.authError = res.error;
        renderApp();
    }
}

function logout() {
    AppState.isAuthenticated = false;
    AppState.token = null;
    AppState.currentUser = { id: null, name: '', email: '', username: '', bio: '', status: '', plan: 'free', role: 'user', pfp_url: null, banner_url: null };
    localStorage.removeItem('blanklog_token');
    renderApp();
}

function setAuthMode(mode) {
    AppState.authMode = mode;
    AppState.authError = '';
    renderApp();
}

// ============================================================
// LOAD USER DATA
// ============================================================
async function loadUserData() {
    const res = await apiCall('users', 'GET');
    if (res.success) {
        if (res.data.user) {
            AppState.currentUser = { ...AppState.currentUser, ...res.data.user };
            const plan = res.data.user.plan || 'free';
            const limits = PLANS[plan].limits;
            Object.keys(AppState.usage).forEach(k => {
                AppState.usage[k].limit = limits[k];
            });
        }
        if (res.data.usage) {
            AppState.usage.chat.used = res.data.usage.chat_used || 0;
            AppState.usage.homework.used = res.data.usage.homework_used || 0;
            AppState.usage.kalshi.used = res.data.usage.kalshi_used || 0;
            AppState.usage.code.used = res.data.usage.code_used || 0;
            AppState.usage.autoPost.used = res.data.usage.auto_post_used || 0;
            AppState.usage.analytics.used = res.data.usage.analytics_used || 0;
        }
    }
}

async function loadUpdates() {
    const res = await apiCall('updates', 'GET');
    if (res.success) AppState.updates = res.data.updates || [];
}

// ============================================================
// NAVIGATION
// ============================================================
const baseTabs = [
    { id: 'home', label: 'Home', icon: Icons.home },
    { id: 'autopost', label: 'Auto Post', icon: Icons.send },
    { id: 'chat', label: 'AI Chat', icon: Icons.chat },
    { id: 'kalshi', label: 'Kalshi', icon: Icons.trending },
    { id: 'code', label: 'Code', icon: Icons.code },
    { id: 'analytics', label: 'Analytics', icon: Icons.analytics },
    { id: 'homework', label: 'Homework', icon: Icons.homework },
    { id: 'updates', label: 'Updates', icon: Icons.bell },
    { id: 'settings', label: 'Settings', icon: Icons.settings }
];
let tabs = [...baseTabs];
if (AppState.currentUser.role === 'admin' || AppState.currentUser.role === 'developer') {
    tabs.push({ id: 'admin', label: 'Admin', icon: Icons.shield });
}

function setActiveTab(tabId) {
    AppState.activeTab = tabId;
    if (tabId === 'updates') loadUpdates();
    renderApp();
}

// ============================================================
// RENDER SIDEBAR
// ============================================================
function renderSidebar() {
    const plan = AppState.currentUser.plan;
    const planData = PLANS[plan];
    const user = AppState.currentUser;

    return `
        <div class="sidebar">
            <div class="sidebar-header">
                <div class="sidebar-brand">
                    <div class="logo-box">◼</div>
                    <div>
                        <h1>Blank Log Hub</h1>
                        <p>v1.0.0</p>
                    </div>
                </div>
            </div>

            <nav style="padding: 12px 14px; flex: 1;">
                ${tabs.map(tab => `
                    <button onclick="setActiveTab('${tab.id}')" 
                        class="nav-link ${AppState.activeTab === tab.id ? 'active' : ''}">
                        ${tab.icon}
                        ${tab.label}
                    </button>
                `).join('')}
            </nav>

            <div class="sidebar-plan">
                <div class="plan-card">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="plan-name">${planData.name}</span>
                        <span class="${getPlanBadge()}">${planData.badge}</span>
                    </div>
                    <div class="plan-price">${planData.priceLabel}</div>
                    <div style="margin-top: 10px;">
                        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">
                            <span>Used this month</span>
                            <span>${AppState.usage.chat.used}/${getLimitDisplay('chat')}</span>
                        </div>
                        <div class="progress-bar"><div class="progress-fill" style="width: ${getPercent('chat')}%"></div></div>
                    </div>
                    ${plan === 'free' ? `<button onclick="showPlansModal()" class="btn-primary" style="width:100%; margin-top:12px; font-size:12px; padding:8px;">Upgrade</button>` : plan === 'premium' ? `<button onclick="showPlansModal()" class="btn-secondary" style="width:100%; margin-top:12px; font-size:12px; padding:8px;">Upgrade to Pro</button>` : `<div style="text-align:center; margin-top:12px; font-size:11px; color:var(--text-muted);">Unlimited access</div>`}
                </div>
                <div style="display: flex; align-items: center; gap: 6px; margin-top: 10px; font-size: 11px; color: var(--text-muted);">
                    <span class="status-dot online"></span>
                    <span>Online</span>
                    <span style="flex:1; text-align:right;">${user.name || 'User'}</span>
                </div>
                <button onclick="logout()" style="margin-top: 8px; width: 100%; background: none; border: 1px solid var(--border-color); color: var(--text-muted); padding: 6px; border-radius: 8px; font-size: 11px; cursor: pointer;">Log Out</button>
            </div>
        </div>
    `;
}

function renderMobileNav() {
    const primaryTabs = tabs.slice(0, 5);
    const moreTabs = tabs.slice(5);
    const moreActive = moreTabs.some(t => t.id === AppState.activeTab);
    
    return `
        <div class="mobile-nav">
            ${primaryTabs.map(tab => `
                <button onclick="setActiveTab('${tab.id}')" class="${AppState.activeTab === tab.id ? 'active' : ''}">
                    ${tab.icon}
                    <span>${tab.label}</span>
                </button>
            `).join('')}
            <button onclick="toggleMobileMore(event)" class="${moreActive ? 'active' : ''}">
                ${Icons.more}
                <span>More</span>
            </button>
        </div>
    `;
}

function toggleMobileMore(event) {
    event.stopPropagation();
    const existing = document.getElementById('mobileMoreMenu');
    const existingBackdrop = document.getElementById('mobileMoreBackdrop');
    
    if (existing) {
        existing.remove();
        if (existingBackdrop) existingBackdrop.remove();
        return;
    }
    
    const moreTabs = tabs.slice(5);
    
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-more-backdrop';
    backdrop.id = 'mobileMoreBackdrop';
    backdrop.onclick = toggleMobileMore;
    document.body.appendChild(backdrop);
    
    const menu = document.createElement('div');
    menu.className = 'mobile-more-menu';
    menu.id = 'mobileMoreMenu';
    menu.innerHTML = moreTabs.map(tab => `
        <button onclick="setActiveTab('${tab.id}'); toggleMobileMore(event);" class="${AppState.activeTab === tab.id ? 'active' : ''}">
            ${tab.icon}
            <span>${tab.label}</span>
        </button>
    `).join('');
    document.body.appendChild(menu);
}

function renderFooter() {
    return `
        <div class="footer">
            <p>© 2026 Blank Log™ Hub &bull; blanklogapp@gmail.com &bull; All rights reserved.</p>
        </div>
    `;
}

// ============================================================
// AUTH SCREEN
// ============================================================
function renderAuthScreen() {
    const isLogin = AppState.authMode === 'login';
    return `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-primary); padding: 20px;">
            <div style="max-width: 400px; width: 100%;">
                <div style="text-align: center; margin-bottom: 32px;">
                    <div class="auth-logo">◼</div>
                    <h1 style="font-size: 26px; font-weight: 700; color: var(--text-primary);">Blank Log Hub</h1>
                    <p style="color: var(--text-muted); margin-top: 6px; font-size: 14px;">${isLogin ? 'Sign in to continue' : 'Create your account'}</p>
                </div>
                <div class="card" style="padding: 24px;">
                    <div style="display: flex; gap: 8px; margin-bottom: 20px;">
                        <button onclick="setAuthMode('login')" class="${isLogin ? 'btn-primary' : 'btn-secondary'}" style="flex:1; font-size:13px; padding: 8px;">Sign In</button>
                        <button onclick="setAuthMode('signup')" class="${!isLogin ? 'btn-primary' : 'btn-secondary'}" style="flex:1; font-size:13px; padding: 8px;">Sign Up</button>
                    </div>
                    
                    ${AppState.authError ? `<div style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; padding: 10px; border-radius: 8px; margin-bottom: 14px; font-size: 13px;">${AppState.authError}</div>` : ''}
                    
                    ${!isLogin ? `
                        <input type="text" id="authName" placeholder="Full Name" style="margin-bottom: 12px;">
                    ` : ''}
                    <input type="email" id="authEmail" placeholder="Email" style="margin-bottom: 12px;">
                    <input type="password" id="authPassword" placeholder="Password" style="margin-bottom: 16px;">
                    
                    <button onclick="${isLogin ? 'login()' : 'signup()'}" class="btn-primary" style="width: 100%;" ${AppState.loading ? 'disabled' : ''}>
                        ${AppState.loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================================
// PROOF FEED
// ============================================================
function renderProofFeed() {
    const proofs = AppState.proofs.slice(0, 5);
    return `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                <h3 class="section-title" style="margin-bottom:0;">Proof Feed — Live</h3>
                <span style="font-size: 11px; color: var(--text-muted);">✔ verified by Proof</span>
            </div>
            <div>
                ${proofs.length === 0 ? '<p style="color: var(--text-muted); text-align: center; padding: 20px 0; font-size: 13px;">No proofs yet. Be the first!</p>' : proofs.map(p => `
                    <div class="proof-feed-item">
                        <div class="proof-avatar">${p.name.charAt(0)}</div>
                        <div class="proof-content">
                            <div>
                                <span class="proof-name">${p.name}</span>
                                <span class="proof-location"> from ${p.location}</span>
                            </div>
                            <div>
                                <span class="proof-amount">Won $${p.amount.toLocaleString()}</span>
                                <span style="font-size: 13px; color: var(--text-secondary);"> on their bet</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                <span class="proof-time">${p.time}</span>
                                <span class="badge-proof">✔ verified by Proof</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================================
// HOME TAB
// ============================================================
function renderHomeTab() {
    const plan = AppState.currentUser.plan;
    const planData = PLANS[plan];
    const modules = ['autoPost', 'chat', 'kalshi', 'code'];
    const labels = ['AutoPost', 'AI Chat', 'Kalshi', 'Code'];

    const usageCards = modules.map((m, i) => {
        const remaining = getRemaining(m);
        const percent = getPercent(m);
        const limit = getLimitDisplay(m);
        const used = AppState.usage[m].used;
        const unlimited = isUnlimited(m);
        return `
            <div class="card usage-card">
                <div class="usage-header">
                    <span class="usage-label">${labels[i]}</span>
                    <span class="usage-remaining">${unlimited ? 'Unlimited' : remaining + ' left'}</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: ${unlimited ? 0 : percent}%"></div></div>
                <div class="usage-stats">
                    <span>${unlimited ? 'Unlimited' : used + ' / ' + limit}</span>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="fade-in">
            <div style="margin-bottom: 24px;">
                <h1 class="page-title">Dashboard</h1>
                <p style="color: var(--text-muted); font-size: 14px;">Welcome back, ${AppState.currentUser.name}</p>
                <div style="margin-top: 10px;">
                    <span class="${getPlanBadge()}">${planData.name} Plan</span>
                </div>
            </div>
            <div class="grid-4" style="margin-bottom: 20px;">${usageCards}</div>
            <div class="grid-2" style="margin-bottom: 20px;">
                <div class="card">
                    <h3 class="section-title">Quick Actions</h3>
                    <div class="grid-2" style="gap: 8px;">
                        <button onclick="setActiveTab('autopost')" class="btn-secondary" style="font-size: 12px; padding: 10px;">New Post</button>
                        <button onclick="setActiveTab('chat')" class="btn-secondary" style="font-size: 12px; padding: 10px;">AI Chat</button>
                        <button onclick="setActiveTab('homework')" class="btn-secondary" style="font-size: 12px; padding: 10px;">Homework</button>
                        <button onclick="setActiveTab('analytics')" class="btn-secondary" style="font-size: 12px; padding: 10px;">Analytics</button>
                    </div>
                </div>
                <div class="card">
                    <h3 class="section-title">Latest Update</h3>
                    ${AppState.updates.length > 0 ? `
                        <div style="padding: 8px 0;">
                            <p style="font-size: 14px; color: var(--text-primary); font-weight: 500;">${AppState.updates[0].title}</p>
                            <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${AppState.updates[0].body}</p>
                        </div>
                    ` : '<p style="color: var(--text-muted); text-align: center; padding: 20px 0; font-size: 13px;">No updates yet</p>'}
                </div>
            </div>
            ${renderProofFeed()}
            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// AI CHAT TAB
// ============================================================
function renderChatTab() {
    const remaining = getRemaining('chat');
    const unlimited = isUnlimited('chat');
    const messagesHtml = AppState.chatMessages.map(msg => `
        <div style="display: flex; ${msg.role === 'user' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'} margin-bottom: 14px;">
            <div style="max-width: 75%; padding: 12px 16px; border-radius: 12px; ${msg.role === 'user' ? 'background: linear-gradient(180deg, var(--accent), var(--accent-dark)); color: #fff;' : 'background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-primary);'} font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${msg.content}</div>
        </div>
    `).join('');

    return `
        <div class="fade-in">
            <h1 class="page-title">AI Chat</h1>
            <p class="page-subtitle">Ask anything — powered by AI</p>
            <div class="card" style="height: 600px; display: flex; flex-direction: column; padding: 0; overflow: hidden;">
                <div style="flex: 1; overflow-y: auto; padding: 20px;" id="chatMessages">
                    ${messagesHtml || '<div style="text-align: center; padding: 40px 20px;"><p style="color: var(--text-muted); font-size: 14px;">No messages yet. Start a conversation.</p></div>'}
                    ${AppState.loading ? '<div style="text-align:center; padding: 12px; color: var(--text-muted); font-size: 13px;">Thinking...</div>' : ''}
                </div>
                <div style="display: flex; gap: 10px; padding: 16px; border-top: 1px solid var(--border-color);">
                    <input type="text" id="chatInput" placeholder="Type your message..." style="flex: 1;" onkeypress="if(event.key==='Enter') sendChatMessage()">
                    <button onclick="sendChatMessage()" class="btn-primary" ${AppState.loading ? 'disabled' : ''}>Send</button>
                </div>
            </div>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 10px; text-align: center;">${unlimited ? 'Unlimited messages' : remaining + ' remaining this month'}</p>
            ${renderFooter()}
        </div>
    `;
}

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input?.value?.trim();
    if (!message) return;
    if (!isUnlimited('chat') && getRemaining('chat') <= 0) {
        alert('Chat limit reached. Upgrade to continue.');
        return;
    }

    AppState.chatMessages.push({ role: 'user', content: message });
    input.value = '';
    AppState.loading = true;
    renderApp();
    scrollChat();

    const res = await apiCall('chat', 'POST', { message, history: AppState.chatMessages.slice(-10) });
    AppState.loading = false;

    if (res.success) {
        AppState.chatMessages.push({ role: 'assistant', content: res.data.message });
        AppState.usage.chat.used += 1;
    } else {
        AppState.chatMessages.push({ role: 'assistant', content: 'Error: ' + res.error });
    }
    renderApp();
    scrollChat();
}

function scrollChat() {
    setTimeout(() => {
        const el = document.getElementById('chatMessages');
        if (el) el.scrollTop = el.scrollHeight;
    }, 50);
}

// ============================================================
// HOMEWORK TAB
// ============================================================
function renderHomeworkTab() {
    const remaining = getRemaining('homework');
    const unlimited = isUnlimited('homework');
    return `
        <div class="fade-in">
            <h1 class="page-title">Homework Solver</h1>
            <p class="page-subtitle">AI that solves homework for any subject — middle school to college</p>
            
            <div class="card" style="margin-bottom: 20px;">
                <div class="grid-3" style="margin-bottom: 14px;">
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Subject</label>
                        <select id="hwSubject">
                            <option>Math</option><option>English (ELA)</option><option>Science</option>
                            <option>Social Studies</option><option>Foreign Language</option>
                            <option>Computer Science</option><option>Health</option><option>Art</option>
                            <option>Music</option><option>Business</option><option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Grade</label>
                        <select id="hwGrade">
                            <option>Middle School</option><option>High School</option><option>College</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Task</label>
                        <select id="hwTask">
                            <option>Solve</option><option>Essay</option><option>Explain</option>
                            <option>Summarize</option><option>Cite</option><option>Slides</option><option>Translate</option>
                        </select>
                    </div>
                </div>
                <textarea id="hwQuestion" rows="5" placeholder="Type your question or assignment here..." style="margin-bottom: 14px;"></textarea>
                <button onclick="solveHomework()" class="btn-primary" style="width: 100%;" ${AppState.loading ? 'disabled' : ''}>
                    ${AppState.loading ? 'Solving...' : 'Solve'}
                </button>
                <p style="font-size: 11px; color: var(--text-muted); text-align: center; margin-top: 10px;">${unlimited ? 'Unlimited' : remaining + ' remaining this month'}</p>
            </div>

            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <h3 class="section-title" style="margin-bottom: 0;">Answer</h3>
                    ${AppState.homeworkHistory[0] ? `<button onclick="copyAnswer()" class="btn-secondary" style="font-size: 12px; padding: 6px 12px; display: flex; align-items: center; gap: 4px;">${Icons.copy} Copy</button>` : ''}
                </div>
                <div id="hwAnswer" style="background: var(--bg-primary); padding: 20px; border-radius: 12px; min-height: 200px; border: 1px solid var(--border-color); white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
                    ${AppState.homeworkHistory[0]?.answer || '<p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 40px 20px;">Your answer will appear here</p>'}
                </div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

async function solveHomework() {
    const subject = document.getElementById('hwSubject')?.value;
    const grade = document.getElementById('hwGrade')?.value;
    const task = document.getElementById('hwTask')?.value;
    const question = document.getElementById('hwQuestion')?.value?.trim();
    if (!question) return alert('Enter your question');
    if (!isUnlimited('homework') && getRemaining('homework') <= 0) return alert('Homework limit reached. Upgrade to continue.');

    AppState.loading = true;
    renderApp();

    const res = await apiCall('homework', 'POST', { subject, grade, task, question });
    AppState.loading = false;

    if (res.success) {
        AppState.homeworkHistory.unshift({ answer: res.data.answer, question, subject, grade, task });
        AppState.usage.homework.used += 1;
    } else {
        alert('Error: ' + res.error);
    }
    renderApp();
}

function copyAnswer() {
    const answer = AppState.homeworkHistory[0]?.answer;
    if (answer) {
        navigator.clipboard.writeText(answer);
        alert('Copied!');
    }
}

// ============================================================
// KALSHI TAB
// ============================================================
function renderKalshiTab() {
    const remaining = getRemaining('kalshi');
    const unlimited = isUnlimited('kalshi');
    const last = AppState.predictions?.[0];
    return `
        <div class="fade-in">
            <h1 class="page-title">Kalshi</h1>
            <p class="page-subtitle">Describe a prediction market bet, AI tells you Yes or No</p>
            <div class="grid-2">
                <div class="card">
                    <h3 class="section-title">Prediction Question</h3>
                    <textarea id="kalshiQuestion" rows="5" placeholder="e.g., Will Bitcoin hit $100k by Dec?" style="margin-bottom: 14px;"></textarea>
                    <button onclick="runKalshiResearch()" class="btn-primary" style="width: 100%;" ${AppState.loading ? 'disabled' : ''}>
                        ${AppState.loading ? 'Researching...' : 'Run AI Research'}
                    </button>
                    <p style="font-size: 11px; color: var(--text-muted); text-align: center; margin-top: 10px;">${unlimited ? 'Unlimited' : remaining + ' remaining this month'}</p>
                </div>
                <div class="card">
                    <h3 class="section-title">AI Recommendation</h3>
                    ${last ? `
                        <div style="background: var(--bg-primary); padding: 16px; border-radius: 12px; margin-bottom: 12px;">
                            <div style="text-align: center; margin-bottom: 12px;">
                                <p style="font-size: 11px; color: var(--text-muted);">Recommendation</p>
                                <p style="font-size: 32px; font-weight: 700; color: ${last.recommendation === 'YES' ? '#22c55e' : '#ef4444'}; margin: 4px 0;">${last.recommendation}</p>
                                <p style="font-size: 13px; color: var(--text-secondary);">${last.probability}% confidence</p>
                            </div>
                            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">${last.reasoning}</p>
                        </div>
                    ` : '<p style="color: var(--text-muted); text-align: center; padding: 40px 20px; font-size: 13px;">Enter a question to get started</p>'}
                </div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

async function runKalshiResearch() {
    const question = document.getElementById('kalshiQuestion')?.value?.trim();
    if (!question) return alert('Enter a question');
    if (!isUnlimited('kalshi') && getRemaining('kalshi') <= 0) return alert('Kalshi limit reached. Upgrade to continue.');

    AppState.loading = true;
    renderApp();

    const res = await apiCall('kalshi', 'POST', { question });
    AppState.loading = false;

    if (res.success) {
        AppState.predictions = AppState.predictions || [];
        AppState.predictions.unshift({
            recommendation: res.data.recommendation,
            probability: res.data.probability,
            reasoning: res.data.reasoning
        });
        AppState.usage.kalshi.used += 1;
    } else {
        alert('Error: ' + res.error);
    }
    renderApp();
}

// ============================================================
// CODE TAB
// ============================================================
function renderCodeTab() {
    const remaining = getRemaining('code');
    const unlimited = isUnlimited('code');
    const output = AppState.codeOutput || '';
    return `
        <div class="fade-in">
            <h1 class="page-title">Code Assistant</h1>
            <p class="page-subtitle">AI-powered code analysis and debugging</p>
            <div class="grid-2">
                <div class="card">
                    <div style="display: flex; gap: 10px; margin-bottom: 14px;">
                        <select id="codeLanguage" style="flex: 1;">
                            <option>JavaScript</option><option>Python</option><option>TypeScript</option>
                            <option>Java</option><option>Go</option><option>Rust</option>
                        </select>
                        <select id="codeTask" style="flex: 1;">
                            <option value="review">Review</option>
                            <option value="explain">Explain</option>
                            <option value="debug">Debug</option>
                            <option value="optimize">Optimize</option>
                        </select>
                    </div>
                    <textarea id="codeInput" rows="12" style="font-family: monospace; font-size: 13px; resize: vertical;" placeholder="// Paste your code here"></textarea>
                    <button onclick="runCodeAnalysis()" class="btn-primary" style="width: 100%; margin-top: 14px;" ${AppState.loading ? 'disabled' : ''}>
                        ${AppState.loading ? 'Analyzing...' : 'Run Analysis'}
                    </button>
                    <p style="font-size: 11px; color: var(--text-muted); text-align: center; margin-top: 10px;">${unlimited ? 'Unlimited' : remaining + ' remaining this month'}</p>
                </div>
                <div class="card">
                    <h3 class="section-title">Output</h3>
                    <div style="background: var(--bg-primary); padding: 16px; border-radius: 10px; min-height: 400px; font-family: monospace; font-size: 12px; color: var(--text-secondary); white-space: pre-wrap; line-height: 1.6;">
                        ${output || '// Results will appear here'}
                    </div>
                </div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

async function runCodeAnalysis() {
    const code = document.getElementById('codeInput')?.value?.trim();
    const language = document.getElementById('codeLanguage')?.value;
    const task = document.getElementById('codeTask')?.value;
    if (!code) return alert('Paste some code');
    if (!isUnlimited('code') && getRemaining('code') <= 0) return alert('Code limit reached. Upgrade to continue.');

    AppState.loading = true;
    renderApp();

    const res = await apiCall('code', 'POST', { code, language, task });
    AppState.loading = false;

    if (res.success) {
        AppState.codeOutput = res.data.output;
        AppState.usage.code.used += 1;
    } else {
        alert('Error: ' + res.error);
    }
    renderApp();
}

// ============================================================
// AUTO POST TAB
// ============================================================
function renderAutoPostTab() {
    const remaining = getRemaining('autoPost');
    const unlimited = isUnlimited('autoPost');
    return `
        <div class="fade-in">
            <h1 class="page-title">Auto Post</h1>
            <p class="page-subtitle">Schedule posts to TikTok and YouTube</p>
            <div class="grid-2">
                <div class="card">
                    <h3 class="section-title">Create Post</h3>
                    <div style="margin-bottom: 14px;">
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Platform</label>
                        <select id="postPlatform"><option>TikTok</option><option>YouTube</option></select>
                    </div>
                    <div style="margin-bottom: 14px;">
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Title / Caption</label>
                        <input type="text" id="postTitle" placeholder="Enter post title...">
                    </div>
                    <div style="margin-bottom: 14px;">
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Video URL</label>
                        <input type="text" id="postVideoUrl" placeholder="https://...">
                    </div>
                    <div style="margin-bottom: 14px;">
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Schedule Time</label>
                        <input type="datetime-local" id="postScheduledTime">
                    </div>
                    <button onclick="schedulePost()" class="btn-primary" style="width: 100%;" ${AppState.loading ? 'disabled' : ''}>
                        ${AppState.loading ? 'Scheduling...' : 'Schedule Post'}
                    </button>
                    <p style="font-size: 11px; color: var(--text-muted); text-align: center; margin-top: 10px;">${unlimited ? 'Unlimited' : remaining + ' remaining this month'}</p>
                </div>
                <div class="card">
                    <h3 class="section-title">Scheduled Posts</h3>
                    ${AppState.scheduledPosts.length === 0 ? '<p style="color: var(--text-muted); text-align: center; padding: 20px 0; font-size: 13px;">No scheduled posts</p>' : AppState.scheduledPosts.map(p => `
                        <div style="background: var(--bg-primary); padding: 12px 14px; border-radius: 10px; margin-bottom: 8px; border: 1px solid var(--border-color);">
                            <p style="font-size: 14px; color: var(--text-primary); font-weight: 500;">${p.title}</p>
                            <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">${p.platform} • ${new Date(p.scheduled_time).toLocaleString()}</p>
                            <button onclick="cancelPost('${p.id}')" style="font-size: 11px; color: #ef4444; background: none; border: none; cursor: pointer; margin-top: 4px;">Cancel</button>
                        </div>
                    `).join('')}
                </div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

async function schedulePost() {
    const title = document.getElementById('postTitle')?.value?.trim();
    const platform = document.getElementById('postPlatform')?.value;
    const videoUrl = document.getElementById('postVideoUrl')?.value?.trim();
    const scheduledTime = document.getElementById('postScheduledTime')?.value;
    if (!title || !scheduledTime) return alert('Enter title and time');
    if (!isUnlimited('autoPost') && getRemaining('autoPost') <= 0) return alert('AutoPost limit reached. Upgrade to continue.');

    AppState.loading = true;
    renderApp();

    const res = await apiCall('autopost', 'POST', { title, platform, videoUrl, scheduledTime });
    AppState.loading = false;

    if (res.success) {
        AppState.scheduledPosts.push(res.data.post);
        AppState.usage.autoPost.used += 1;
    } else {
        alert('Error: ' + res.error);
    }
    renderApp();
}

async function cancelPost(postId) {
    const res = await apiCall(`autopost?postId=${postId}`, 'DELETE');
    if (res.success) {
        AppState.scheduledPosts = AppState.scheduledPosts.filter(p => p.id !== postId);
        renderApp();
    }
}

// ============================================================
// ANALYTICS TAB
// ============================================================
function renderAnalyticsTab() {
    return `
        <div class="fade-in">
            <h1 class="page-title">Analytics</h1>
            <p class="page-subtitle">Stats from TikTok and YouTube</p>
            <div class="grid-4" style="margin-bottom: 20px;">
                <div class="card"><p style="font-size: 12px; color: var(--text-muted);">Total Views</p><p style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">—</p></div>
                <div class="card"><p style="font-size: 12px; color: var(--text-muted);">Likes</p><p style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">—</p></div>
                <div class="card"><p style="font-size: 12px; color: var(--text-muted);">Comments</p><p style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">—</p></div>
                <div class="card"><p style="font-size: 12px; color: var(--text-muted);">Shares</p><p style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">—</p></div>
            </div>
            <div class="grid-2">
                <div class="card"><h3 class="section-title">TikTok Stats</h3><p style="color: var(--text-muted); text-align: center; padding: 20px 0; font-size: 13px;">Connect TikTok to see stats</p></div>
                <div class="card"><h3 class="section-title">YouTube Stats</h3><p style="color: var(--text-muted); text-align: center; padding: 20px 0; font-size: 13px;">Connect YouTube to see stats</p></div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// UPDATES TAB
// ============================================================
function renderUpdatesTab() {
    const updates = AppState.updates;
    return `
        <div class="fade-in">
            <h1 class="page-title">Updates</h1>
            <p class="page-subtitle">Latest news from Blank Log™ and Blank Log™ Hub</p>
            ${updates.length === 0 ? '<div class="card"><p style="color: var(--text-muted); text-align: center; padding: 60px 20px; font-size: 14px;">No updates yet. Check back soon!</p></div>' : updates.map(u => `
                <div class="card" style="margin-bottom: 16px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                        <span class="${u.type === 'app' ? 'badge-premium' : u.type === 'company' ? 'badge-pro' : 'badge-free'}">${u.type === 'app' ? 'App Update' : u.type === 'company' ? 'Company' : 'New'}</span>
                        <span style="font-size: 11px; color: var(--text-muted);">${new Date(u.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 style="font-size: 17px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px;">${u.title}</h3>
                    <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">${u.body}</p>
                </div>
            `).join('')}
            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// SETTINGS TAB
// ============================================================
function renderSettingsTab() {
    const user = AppState.currentUser;
    const theme = AppState.settings.theme || 'dark';
    return `
        <div class="fade-in" style="max-width: 640px; margin: 0 auto;">
            <h1 class="page-title">Settings</h1>
            <p class="page-subtitle">Manage your account and preferences</p>
            <div class="card" style="margin-bottom: 20px;">
                <h3 class="section-title">Profile</h3>
                <div class="grid-2" style="margin-bottom: 12px;">
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Username</label>
                        <input type="text" id="settingsUsername" value="${user.username || ''}">
                    </div>
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Status</label>
                        <input type="text" id="settingsStatus" value="${user.status || ''}">
                    </div>
                </div>
                <div style="margin-bottom: 12px;">
                    <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Bio</label>
                    <textarea id="settingsBio" rows="3" style="resize: none;">${user.bio || ''}</textarea>
                </div>
                <button onclick="saveProfileSettings()" class="btn-primary" style="font-size: 13px; padding: 10px 20px;">Save Profile</button>
            </div>
            <div class="card" style="margin-bottom: 20px;">
                <h3 class="section-title">Appearance</h3>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <div class="theme-option ${theme === 'dark' ? 'active' : ''}" onclick="setTheme('dark')">⚫ Dark</div>
                    <div class="theme-option ${theme === 'light' ? 'active' : ''}" onclick="setTheme('light')">💡 Light</div>
                    <div class="theme-option ${theme === 'system' ? 'active' : ''}" onclick="setTheme('system')">💻 System</div>
                </div>
            </div>
            <div class="card">
                <h3 class="section-title">Account</h3>
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-color); font-size: 14px;">
                    <span style="color: var(--text-muted);">Email</span>
                    <span style="color: var(--text-primary);">${user.email || 'Not set'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-color); font-size: 14px;">
                    <span style="color: var(--text-muted);">Plan</span>
                    <span style="color: var(--text-primary);">${user.plan ? PLANS[user.plan].name : 'Free'}</span>
                </div>
                <button onclick="showPlansModal()" class="btn-secondary" style="width: 100%; margin-top: 14px; font-size: 13px;">Manage Plan</button>
            </div>
            ${renderFooter()}
        </div>
    `;
}

async function saveProfileSettings() {
    const username = document.getElementById('settingsUsername')?.value;
    const status = document.getElementById('settingsStatus')?.value;
    const bio = document.getElementById('settingsBio')?.value;

    const res = await apiCall('users', 'PUT', { username, status, bio });
    if (res.success) {
        AppState.currentUser.username = username;
        AppState.currentUser.status = status;
        AppState.currentUser.bio = bio;
        alert('Saved!');
    } else {
        alert('Error: ' + res.error);
    }
}

function setTheme(theme) {
    if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    } else {
        applyTheme(theme);
    }
    renderApp();
}

// ============================================================
// ADMIN TAB
// ============================================================
function renderAdminTab() {
    const isAdmin = AppState.currentUser.role === 'admin' || AppState.currentUser.role === 'developer';
    if (!isAdmin) {
        return `<div style="text-align: center; padding: 60px 20px;"><div style="font-size: 48px; margin-bottom: 16px;">🔒</div><h2 style="font-size: 22px; font-weight: 700; color: var(--text-primary);">Access Denied</h2><p style="color: var(--text-muted); margin-top: 8px;">Admin access only</p></div>`;
    }
    return `
        <div class="fade-in">
            <h1 class="page-title">Admin Panel</h1>
            <p class="page-subtitle">System administration and controls</p>
            <div class="grid-2">
                <div class="card">
                    <h3 class="section-title">Post Update</h3>
                    <input type="text" id="updateTitle" placeholder="Update title..." style="margin-bottom: 10px;">
                    <textarea id="updateBody" rows="4" placeholder="Update details..." style="margin-bottom: 10px; resize: vertical;"></textarea>
                    <select id="updateType" style="margin-bottom: 10px;">
                        <option value="app">App Update</option>
                        <option value="company">Company Update</option>
                        <option value="new">New App</option>
                    </select>
                    <button onclick="postUpdate()" class="btn-primary" style="width: 100%;">Post Update</button>
                </div>
                <div class="card">
                    <h3 class="section-title">System Stats</h3>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <div style="display: flex; justify-content: space-between; font-size: 13px; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                            <span style="color: var(--text-muted);">Updates posted</span>
                            <span style="color: var(--text-primary); font-weight: 600;">${AppState.updates.length}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 13px; padding: 8px 0;">
                            <span style="color: var(--text-muted);">Scheduled posts</span>
                            <span style="color: var(--text-primary); font-weight: 600;">${AppState.scheduledPosts.length}</span>
                        </div>
                    </div>
                </div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

async function postUpdate() {
    const title = document.getElementById('updateTitle')?.value;
    const body = document.getElementById('updateBody')?.value;
    const type = document.getElementById('updateType')?.value;
    if (!title || !body) return;
    const res = await apiCall('updates', 'POST', { title, body, type });
    if (res.success) {
        AppState.updates.unshift(res.data.update);
        renderApp();
    } else {
        alert('Error: ' + res.error);
    }
}

// ============================================================
// PLANS MODAL
// ============================================================
function showPlansModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Choose Your Plan</h2>
                <button onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; color: var(--text-muted); font-size: 24px; cursor: pointer;">&times;</button>
            </div>
            <div style="display: flex; flex-direction: column; gap: 14px;">
                ${Object.values(PLANS).map(plan => `
                    <div class="card" style="padding: 16px; ${plan.id === AppState.currentUser.plan ? 'border: 2px solid var(--accent);' : ''}">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <h3 style="font-size: 16px; font-weight: 600; color: var(--text-primary);">${plan.name}</h3>
                                ${plan.id === AppState.currentUser.plan ? '<span style="font-size: 10px; color: var(--accent-light);">Current</span>' : ''}
                            </div>
                            <span class="${plan.id === 'free' ? 'badge-free' : plan.id === 'premium' ? 'badge-premium' : 'badge-pro'}">${plan.badge}</span>
                        </div>
                        <div style="font-size: 22px; font-weight: 700; color: var(--text-primary);">${plan.priceDisplay} <span style="font-size: 13px; font-weight: 400; color: var(--text-muted);">/ month</span></div>
                        <button onclick="upgradePlan('${plan.id}')" class="${plan.id === AppState.currentUser.plan ? 'btn-secondary' : 'btn-primary'}" style="width: 100%; margin-top: 12px; font-size: 13px; padding: 8px;">
                            ${plan.id === AppState.currentUser.plan ? 'Current Plan' : 'Upgrade'}
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

async function upgradePlan(planId) {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.remove();
    if (planId === 'free') return;

    // Check if admin → upgrade directly
    if (AppState.currentUser.role === 'admin' || AppState.currentUser.role === 'developer') {
        const res = await apiCall('payments', 'POST', { action: 'upgrade', newPlan: planId });
        if (res.success) {
            AppState.currentUser.plan = planId;
            const limits = PLANS[planId].limits;
            Object.keys(AppState.usage).forEach(k => { AppState.usage[k].limit = limits[k]; });
            renderApp();
            alert('Plan updated!');
        }
        return;
    }

    // Regular user → redirect to checkout
    const res = await apiCall(`payments?plan=${planId}`, 'GET');
    if (res.success && res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
    } else {
        alert('Payment setup error. Try again later.');
    }
}

// ============================================================
// RENDER APP
// ============================================================
function renderApp() {
    if (!AppState.isAuthenticated) {
        document.getElementById('root').innerHTML = renderAuthScreen();
        return;
    }

    let content = '';
    switch (AppState.activeTab) {
        case 'home': content = renderHomeTab(); break;
        case 'autopost': content = renderAutoPostTab(); break;
        case 'chat': content = renderChatTab(); break;
        case 'kalshi': content = renderKalshiTab(); break;
        case 'code': content = renderCodeTab(); break;
        case 'analytics': content = renderAnalyticsTab(); break;
        case 'homework': content = renderHomeworkTab(); break;
        case 'updates': content = renderUpdatesTab(); break;
        case 'settings': content = renderSettingsTab(); break;
        case 'admin': content = renderAdminTab(); break;
        default: content = renderHomeTab();
    }

    document.getElementById('root').innerHTML = `
        <div style="display: flex; min-height: 100vh;">
            ${renderSidebar()}
            <div class="main-content">${content}</div>
            ${renderMobileNav()}
        </div>
    `;
}

// ============================================================
// INITIALIZE
// ============================================================
async function init() {
    applyTheme(AppState.settings.theme);
    
    if (AppState.token) {
        // Verify token by loading user
        await loadUserData();
        if (AppState.currentUser.id) {
            AppState.isAuthenticated = true;
            await loadUpdates();
        } else {
            AppState.token = null;
            localStorage.removeItem('blanklog_token');
        }
    }
    renderApp();
}

init();

// ============================================================
// GLOBAL EXPORTS
// ============================================================
window.setActiveTab = setActiveTab;
window.toggleMobileMore = toggleMobileMore;
window.setAuthMode = setAuthMode;
window.login = login;
window.signup = signup;
window.logout = logout;
window.sendChatMessage = sendChatMessage;
window.solveHomework = solveHomework;
window.copyAnswer = copyAnswer;
window.runKalshiResearch = runKalshiResearch;
window.runCodeAnalysis = runCodeAnalysis;
window.schedulePost = schedulePost;
window.cancelPost = cancelPost;
window.saveProfileSettings = saveProfileSettings;
window.setTheme = setTheme;
window.showPlansModal = showPlansModal;
window.upgradePlan = upgradePlan;
window.postUpdate = postUpdate;
