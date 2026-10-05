// ============================================================
// BLANK LOG — COMPLETE FRONTEND
// ============================================================

const Icons = {
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>`,
    send: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
    chat: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
    trending: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
};

const PLANS = {
    free: { id: 'free', name: 'Free', price: 0, priceDisplay: '$0', priceLabel: 'Free', limits: { autoPost: 5, chat: 20, kalshi: 5, code: 15 }, badge: 'Free' },
    premium: { id: 'premium', name: 'Premium', price: 10, priceDisplay: '$10', priceLabel: '$10 / month', limits: { autoPost: 25, chat: 100, kalshi: 25, code: 75 }, badge: 'Popular' },
    pro: { id: 'pro', name: 'Pro', price: 25, priceDisplay: '$25', priceLabel: '$25 / month', limits: { autoPost: Infinity, chat: Infinity, kalshi: Infinity, code: Infinity }, badge: 'Best Value', unlimited: true }
};

let AppState = {
    isAuthenticated: true,
    currentUser: {
        id: 'user_001',
        name: '',
        email: '',
        username: '',
        bio: '',
        status: '',
        plan: 'free',
        role: 'user',
        pfp: null,
        banner: null,
        theme: 'dark'
    },
    activeTab: 'home',
    usage: {
        autoPost: { used: 0, limit: 5 },
        chat: { used: 0, limit: 20 },
        kalshi: { used: 0, limit: 5 },
        code: { used: 0, limit: 15 }
    },
    scheduledPosts: [],
    chatMessages: [],
    predictions: [],
    codeHistory: [],
    proofs: [],
    settings: { theme: 'dark' }
};

function saveState() {
    try {
        localStorage.setItem('blanklog_state', JSON.stringify({
            usage: AppState.usage,
            scheduledPosts: AppState.scheduledPosts,
            chatMessages: AppState.chatMessages,
            predictions: AppState.predictions,
            codeHistory: AppState.codeHistory,
            proofs: AppState.proofs,
            currentUser: AppState.currentUser,
            settings: AppState.settings
        }));
    } catch (e) {}
}

function loadState() {
    try {
        const saved = localStorage.getItem('blanklog_state');
        if (saved) {
            const data = JSON.parse(saved);
            Object.assign(AppState.usage, data.usage || {});
            AppState.scheduledPosts = data.scheduledPosts || [];
            AppState.chatMessages = data.chatMessages || [];
            AppState.predictions = data.predictions || [];
            AppState.codeHistory = data.codeHistory || [];
            AppState.proofs = data.proofs || [];
            if (data.currentUser) Object.assign(AppState.currentUser, data.currentUser);
            if (data.settings) Object.assign(AppState.settings, data.settings);
        }
    } catch (e) {}
}
loadState();

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
    AppState.settings.theme = theme;
    saveState();
}
applyTheme(AppState.settings.theme || 'dark');

function getRemaining(m) {
    const limit = AppState.usage[m].limit;
    const used = AppState.usage[m].used;
    return Math.max(0, limit - used);
}
function getPercent(m) {
    const limit = AppState.usage[m].limit;
    const used = AppState.usage[m].used;
    if (limit === Infinity) return 0;
    if (limit === 0) return 0;
    return Math.min(100, (used / limit) * 100);
}
function getLimitDisplay(m) {
    const limit = AppState.usage[m].limit;
    return limit === Infinity ? 'Unlimited' : limit;
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

const baseTabs = [
    { id: 'home', label: 'Home', icon: Icons.home },
    { id: 'autopost', label: 'Auto Post', icon: Icons.send },
    { id: 'chat', label: 'AI Chat', icon: Icons.chat },
    { id: 'kalshi', label: 'Kalshi', icon: Icons.trending },
    { id: 'code', label: 'Code', icon: Icons.code },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
];
let tabs = [...baseTabs];
if (AppState.currentUser.role === 'admin' || AppState.currentUser.role === 'developer') {
    tabs.push({ id: 'admin', label: 'Admin', icon: Icons.shield });
}

function setActiveTab(tabId) {
    AppState.activeTab = tabId;
    renderApp();
}

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
                        <h1>Blank Log</h1>
                        <p>v3.0.0</p>
                    </div>
                </div>
            </div>

            <nav style="padding: 12px 16px; flex: 1;">
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
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span class="plan-name">${planData.name}</span>
                        <span class="${getPlanBadge()}">${planData.badge}</span>
                    </div>
                    <div class="plan-price">${planData.priceLabel}</div>
                    <div style="margin-top: 12px;">
                        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); margin-bottom: 4px;">
                            <span>Used this month</span>
                            <span>${AppState.usage.autoPost.used}/${getLimitDisplay('autoPost')}</span>
                        </div>
                        <div class="progress-bar"><div class="progress-fill" style="width: ${getPercent('autoPost')}%"></div></div>
                    </div>
                    ${plan === 'free' ? `<button onclick="showPlansModal()" class="btn-primary" style="width:100%; margin-top:12px; font-size:13px; padding:8px;">Upgrade</button>` : plan === 'premium' ? `<button onclick="showPlansModal()" class="btn-secondary" style="width:100%; margin-top:12px; font-size:13px; padding:8px;">Upgrade to Pro</button>` : `<div style="text-align:center; margin-top:12px; font-size:12px; color:var(--text-muted);">Unlimited access</div>`}
                </div>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 12px; font-size: 12px; color: var(--text-muted);">
                    <span class="status-dot online"></span>
                    <span>System Online</span>
                    <span style="flex:1; text-align:right;">${user.name || 'User'}</span>
                </div>
                ${user.email ? `<div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${user.email}</div>` : ''}
            </div>
        </div>
    `;
}

function renderMobileNav() {
    return `
        <div class="mobile-nav">
            ${tabs.map(tab => `
                <button onclick="setActiveTab('${tab.id}')" class="${AppState.activeTab === tab.id ? 'active' : ''}">
                    ${tab.icon}
                    ${tab.label}
                </button>
            `).join('')}
        </div>
    `;
}

function renderFooter() {
    return `
        <div class="footer">
            <p>© 2026 Blank Log &bull; blanklogapp@gmail.com &bull; All rights reserved.</p>
        </div>
    `;
}

function renderProofFeed() {
    const proofs = AppState.proofs.slice(0, 5);
    return `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary);">Proof Feed — Live</h3>
                <span style="font-size: 12px; color: var(--text-muted);">verified by Proof</span>
            </div>
            <div>
                ${proofs.length === 0 ? '<p style="color: var(--text-muted); text-align: center; padding: 20px 0;">No proofs yet. Be the first!</p>' : proofs.map(p => `
                    <div class="proof-feed-item">
                        <div class="proof-avatar">${p.name.charAt(0)}</div>
                        <div class="proof-content">
                            <div>
                                <span class="proof-name">${p.name}</span>
                                <span class="proof-location"> from ${p.location}</span>
                            </div>
                            <div>
                                <span class="proof-amount">Won $${p.amount.toLocaleString()}</span>
                                <span style="font-size: 14px; color: var(--text-secondary);"> on their bet</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span class="proof-time">${p.time}</span>
                                <span class="badge-proof">verified by Proof</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${proofs.length > 0 ? `<button style="margin-top: 12px; font-size: 13px; color: var(--text-primary); background: none; border: none; cursor: pointer;">View All Proofs →</button>` : ''}
        </div>
    `;
}

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
                    ${remaining === 0 && !unlimited ? '<span style="color: #ef4444;">Upgrade for more</span>' : ''}
                </div>
            </div>
        `;
    }).join('');

    const recentPosts = AppState.scheduledPosts.slice(0, 3).map(post => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: var(--bg-primary); border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 8px;">
            <div>
                <p style="font-size: 14px; color: var(--text-primary);">${post.title}</p>
                <p style="font-size: 12px; color: var(--text-muted);">${post.platform} • ${new Date(post.scheduledTime).toLocaleString()}</p>
            </div>
            <span class="badge-free">Scheduled</span>
        </div>
    `).join('');

    return `
        <div class="fade-in">
            <div style="margin-bottom: 24px;">
                <h1 class="page-title">Dashboard</h1>
                <p style="color: var(--text-muted);">Welcome back${AppState.currentUser.name ? ', ' + AppState.currentUser.name : ''}</p>
                <div style="margin-top: 8px;">
                    <span class="${getPlanBadge()}">${planData.name} Plan</span>
                    ${plan === 'free' ? '<span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">— Upgrade to unlock more</span>' : plan === 'premium' ? '<span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">— 5x more than Free</span>' : '<span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">— Unlimited access</span>'}
                </div>
            </div>
            <div class="grid-4" style="margin-bottom: 24px;">${usageCards}</div>
            <div class="grid-2">
                <div class="card">
                    <h3 class="section-title">Quick Actions</h3>
                    <div class="grid-2" style="gap: 8px;">
                        <button onclick="setActiveTab('autopost')" class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; padding: 10px;">${Icons.plus} New Post</button>
                        <button onclick="setActiveTab('chat')" class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; padding: 10px;">${Icons.chat} Chat</button>
                        <button onclick="setActiveTab('kalshi')" class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; padding: 10px;">${Icons.trending} Predict</button>
                        <button onclick="setActiveTab('code')" class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; padding: 10px;">${Icons.code} Code</button>
                    </div>
                </div>
