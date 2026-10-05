// ============================================================
// BLANK LOG™ HUB — COMPLETE FRONTEND
// ============================================================

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
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    analytics: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    homework: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>`,
    bell: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
    upload: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
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
    isAuthenticated: true,
    currentUser: {
        id: 'user_001', name: '', email: '', username: '', bio: '', status: '',
        plan: 'free', role: 'user', pfp: null, banner: null
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
    scheduledPosts: [],
    chatMessages: [],
    predictions: [],
    codeHistory: [],
    homeworkHistory: [],
    proofs: [],
    updates: [],
    settings: { theme: 'dark' }
};

// ============================================================
// STORAGE
// ============================================================
function saveState() {
    try {
        localStorage.setItem('blanklog_hub_state', JSON.stringify({
            usage: AppState.usage,
            scheduledPosts: AppState.scheduledPosts,
            chatMessages: AppState.chatMessages,
            predictions: AppState.predictions,
            codeHistory: AppState.codeHistory,
            homeworkHistory: AppState.homeworkHistory,
            proofs: AppState.proofs,
            updates: AppState.updates,
            currentUser: AppState.currentUser,
            settings: AppState.settings
        }));
    } catch (e) {}
}

function loadState() {
    try {
        const saved = localStorage.getItem('blanklog_hub_state');
        if (saved) {
            const data = JSON.parse(saved);
            Object.assign(AppState.usage, data.usage || {});
            AppState.scheduledPosts = data.scheduledPosts || [];
            AppState.chatMessages = data.chatMessages || [];
            AppState.predictions = data.predictions || [];
            AppState.codeHistory = data.codeHistory || [];
            AppState.homeworkHistory = data.homeworkHistory || [];
            AppState.proofs = data.proofs || [];
            AppState.updates = data.updates || [];
            if (data.currentUser) Object.assign(AppState.currentUser, data.currentUser);
            if (data.settings) Object.assign(AppState.settings, data.settings);
        }
    } catch (e) {}
}
loadState();

// ============================================================
// THEME
// ============================================================
function applyTheme(theme) {
    if (theme === 'light') document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
    AppState.settings.theme = theme;
    saveState();
}
applyTheme(AppState.settings.theme || 'dark');

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
    renderApp();
}

// ============================================================
// SIDEBAR
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
                            <span>${AppState.usage.autoPost.used}/${getLimitDisplay('autoPost')}</span>
                        </div>
                        <div class="progress-bar"><div class="progress-fill" style="width: ${getPercent('autoPost')}%"></div></div>
                    </div>
                    ${plan === 'free' ? `<button onclick="showPlansModal()" class="btn-primary" style="width:100%; margin-top:12px; font-size:12px; padding:8px;">Upgrade</button>` : plan === 'premium' ? `<button onclick="showPlansModal()" class="btn-secondary" style="width:100%; margin-top:12px; font-size:12px; padding:8px;">Upgrade to Pro</button>` : `<div style="text-align:center; margin-top:12px; font-size:11px; color:var(--text-muted);">Unlimited access</div>`}
                </div>
                <div style="display: flex; align-items: center; gap: 6px; margin-top: 10px; font-size: 11px; color: var(--text-muted);">
                    <span class="status-dot online"></span>
                    <span>System Online</span>
                    <span style="flex:1; text-align:right;">${user.name || 'User'}</span>
                </div>
                ${user.email ? `<div style="font-size: 10px; color: var(--text-muted); margin-top: 4px; word-break: break-all;">${user.email}</div>` : ''}
            </div>
        </div>
    `;
}

// ============================================================
// MOBILE NAV
// ============================================================
function renderMobileNav() {
    const mobileTabs = tabs.slice(0, 6);
    return `
        <div class="mobile-nav">
            ${mobileTabs.map(tab => `
                <button onclick="setActiveTab('${tab.id}')" class="${AppState.activeTab === tab.id ? 'active' : ''}">
                    ${tab.icon}
                    <span>${tab.label}</span>
                </button>
            `).join('')}
        </div>
    `;
}

// ============================================================
// FOOTER
// ============================================================
function renderFooter() {
    return `
        <div class="footer">
            <p>© 2026 Blank Log™ Hub &bull; blanklogapp@gmail.com &bull; All rights reserved.</p>
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
            ${proofs.length > 0 ? `<button style="margin-top: 10px; font-size: 12px; color: var(--accent-light); background: none; border: none; cursor: pointer;">View All Proofs →</button>` : ''}
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
                    ${remaining === 0 && !unlimited ? '<span style="color: #ef4444;">Upgrade</span>' : ''}
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="fade-in">
            <div style="margin-bottom: 24px;">
                <h1 class="page-title">Dashboard</h1>
                <p style="color: var(--text-muted); font-size: 14px;">Welcome back${AppState.currentUser.name ? ', ' + AppState.currentUser.name : ''}</p>
                <div style="margin-top: 10px;">
                    <span class="${getPlanBadge()}">${planData.name} Plan</span>
                    ${plan === 'free' ? '<span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">— Upgrade to unlock more</span>' : plan === 'premium' ? '<span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">— 5x more than Free</span>' : '<span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">— Unlimited access</span>'}
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
                            <p style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">${AppState.updates[0].date}</p>
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
                        <select>
                            <option>TikTok</option>
                            <option>YouTube</option>
                        </select>
                    </div>
                    <div style="margin-bottom: 14px;">
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Title / Caption</label>
                        <input type="text" placeholder="Enter post title...">
                    </div>
                    <div style="margin-bottom: 14px;">
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Video File</label>
                        <div style="border: 2px dashed var(--border-color); border-radius: 12px; padding: 30px; text-align: center; cursor: pointer; transition: all 0.2s;">
                            ${Icons.upload}
                            <p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Click to upload video</p>
                        </div>
                    </div>
                    <div style="margin-bottom: 14px;">
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Schedule Time</label>
                        <input type="datetime-local">
                    </div>
                    <button class="btn-primary" style="width: 100%;">Schedule Post</button>
                    <p style="font-size: 11px; color: var(--text-muted); text-align: center; margin-top: 10px;">${unlimited ? 'Unlimited' : remaining + ' remaining this month'}</p>
                </div>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div class="card">
                        <h3 class="section-title">Connected Accounts</h3>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--bg-primary); border-radius: 10px; border: 1px solid var(--border-color);">
                                <span style="font-size: 13px;">TikTok</span>
                                <span style="font-size: 11px; color: var(--text-muted);">Not connected</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--bg-primary); border-radius: 10px; border: 1px solid var(--border-color);">
                                <span style="font-size: 13px;">YouTube</span>
                                <span style="font-size: 11px; color: var(--text-muted);">Not connected</span>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <h3 class="section-title">Scheduled Posts</h3>
                        <p style="color: var(--text-muted); text-align: center; padding: 20px 0; font-size: 13px;">No scheduled posts</p>
                    </div>
                </div>
            </div>
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
    return `
        <div class="fade-in">
            <h1 class="page-title">AI Chat</h1>
            <p class="page-subtitle">Ask anything — powered by AI</p>
            <div class="card" style="height: 600px; display: flex; flex-direction: column; padding: 0; overflow: hidden;">
                <div style="flex: 1; overflow-y: auto; padding: 20px;">
                    <div style="text-align: center; padding: 40px 20px;">
                        <p style="color: var(--text-muted); font-size: 14px;">No messages yet. Start a conversation.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; padding: 16px; border-top: 1px solid var(--border-color);">
                    <input type="text" placeholder="Type your message..." style="flex: 1;">
                    <button class="btn-primary">Send</button>
                </div>
            </div>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 10px; text-align: center;">${unlimited ? 'Unlimited messages' : remaining + ' remaining this month'}</p>
            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// KALSHI TAB
// ============================================================
function renderKalshiTab() {
    const remaining = getRemaining('kalshi');
    const unlimited = isUnlimited('kalshi');
    return `
        <div class="fade-in">
            <h1 class="page-title">Kalshi</h1>
            <p class="page-subtitle">Upload a screenshot of a bet, AI does deep research, tells you Yes or No</p>
            <div class="grid-2">
                <div class="card">
                    <h3 class="section-title">Upload Screenshot</h3>
                    <div style="border: 2px dashed var(--border-color); border-radius: 12px; padding: 40px; text-align: center; cursor: pointer;">
                        ${Icons.upload}
                        <p style="font-size: 13px; color: var(--text-muted); margin-top: 8px;">Click to upload screenshot</p>
                        <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">PNG, JPG up to 10MB</p>
                    </div>
                    <div style="margin-top: 14px;">
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Prediction Question</label>
                        <input type="text" placeholder="e.g., Will Bitcoin hit $100k by Dec?">
                    </div>
                    <button class="btn-primary" style="width: 100%; margin-top: 14px;">Run AI Research</button>
                    <p style="font-size: 11px; color: var(--text-muted); text-align: center; margin-top: 10px;">${unlimited ? 'Unlimited' : remaining + ' remaining this month'}</p>
                </div>
                <div class="card">
                    <h3 class="section-title">Research Results</h3>
                    <div style="background: var(--bg-primary); padding: 20px; border-radius: 12px; min-height: 200px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 13px; text-align: center;">
                        Upload a screenshot to get started
                    </div>
                    <div class="grid-2" style="gap: 10px; margin-top: 14px;">
                        <div style="background: var(--bg-primary); padding: 14px; border-radius: 10px; text-align: center; border: 1px solid var(--border-color);">
                            <p style="font-size: 11px; color: var(--text-muted);">AI Probability</p>
                            <p style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">—</p>
                        </div>
                        <div style="background: var(--bg-primary); padding: 14px; border-radius: 10px; text-align: center; border: 1px solid var(--border-color);">
                            <p style="font-size: 11px; color: var(--text-muted);">Recommendation</p>
                            <p style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">—</p>
                        </div>
                    </div>
                </div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// CODE TAB
// ============================================================
function renderCodeTab() {
    const remaining = getRemaining('code');
    const unlimited = isUnlimited('code');
    return `
        <div class="fade-in">
            <h1 class="page-title">Code Assistant</h1>
            <p class="page-subtitle">AI-powered code analysis and debugging</p>
            <div class="grid-2">
                <div class="card">
                    <div style="display: flex; gap: 10px; margin-bottom: 14px;">
                        <select style="flex: 1;">
                            <option>JavaScript</option>
                            <option>Python</option>
                            <option>TypeScript</option>
                            <option>Java</option>
                            <option>Go</option>
                            <option>Rust</option>
                        </select>
                        <select style="flex: 1;">
                            <option>Review</option>
                            <option>Explain</option>
                            <option>Debug</option>
                            <option>Optimize</option>
                        </select>
                    </div>
                    <textarea rows="12" style="font-family: monospace; font-size: 13px; resize: vertical;" placeholder="// Paste your code here"></textarea>
                    <button class="btn-primary" style="width: 100%; margin-top: 14px;">Run Analysis</button>
                    <p style="font-size: 11px; color: var(--text-muted); text-align: center; margin-top: 10px;">${unlimited ? 'Unlimited' : remaining + ' remaining this month'}</p>
                </div>
                <div>
                    <div class="card" style="margin-bottom: 16px;">
                        <h3 class="section-title">Output</h3>
                        <div style="background: var(--bg-primary); padding: 16px; border-radius: 10px; min-height: 200px; font-family: monospace; font-size: 12px; color: var(--text-muted);">
                            // Results will appear here
                        </div>
                    </div>
                    <div class="card">
                        <h3 class="section-title">History</h3>
                        <p style="color: var(--text-muted); text-align: center; padding: 20px 0; font-size: 13px;">No history yet</p>
                    </div>
                </div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// ANALYTICS TAB
// ============================================================
function renderAnalyticsTab() {
    const remaining = getRemaining('analytics');
    const unlimited = isUnlimited('analytics');
    return `
        <div class="fade-in">
            <h1 class="page-title">Analytics</h1>
            <p class="page-subtitle">Stats from TikTok and YouTube</p>
            
            <div class="grid-4" style="margin-bottom: 20px;">
                <div class="card">
                    <p style="font-size: 12px; color: var(--text-muted);">Total Views</p>
                    <p style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">—</p>
                </div>
                <div class="card">
                    <p style="font-size: 12px; color: var(--text-muted);">Likes</p>
                    <p style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">—</p>
                </div>
                <div class="card">
                    <p style="font-size: 12px; color: var(--text-muted);">Comments</p>
                    <p style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">—</p>
                </div>
                <div class="card">
                    <p style="font-size: 12px; color: var(--text-muted);">Shares</p>
                    <p style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">—</p>
                </div>
            </div>

            <div class="grid-2" style="margin-bottom: 20px;">
                <div class="card">
                    <h3 class="section-title">TikTok Stats</h3>
                    <p style="color: var(--text-muted); text-align: center; padding: 20px 0; font-size: 13px;">Connect TikTok to see stats</p>
                </div>
                <div class="card">
                    <h3 class="section-title">YouTube Stats</h3>
                    <p style="color: var(--text-muted); text-align: center; padding: 20px 0; font-size: 13px;">Connect YouTube to see stats</p>
                </div>
            </div>

            <div class="card">
                <h3 class="section-title">Top Performing Posts</h3>
                <p style="color: var(--text-muted); text-align: center; padding: 30px 0; font-size: 13px;">No posts to display yet</p>
            </div>

            <p style="font-size: 11px; color: var(--text-muted); margin-top: 16px; text-align: center;">${unlimited ? 'Unlimited' : remaining + ' remaining this month'}</p>
            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// HOMEWORK SOLVER TAB
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
                        <select>
                            <option>Math</option>
                            <option>English (ELA)</option>
                            <option>Science</option>
                            <option>Social Studies</option>
                            <option>Foreign Language</option>
                            <option>Computer Science</option>
                            <option>Health</option>
                            <option>Art</option>
                            <option>Music</option>
                            <option>Business</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Grade</label>
                        <select>
                            <option>Middle School</option>
                            <option>High School</option>
                            <option>College</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Task</label>
                        <select>
                            <option>Solve</option>
                            <option>Essay</option>
                            <option>Explain</option>
                            <option>Summarize</option>
                            <option>Cite</option>
                            <option>Slides</option>
                            <option>Translate</option>
                        </select>
                    </div>
                </div>

                <div class="grid-2" style="gap: 10px; margin-bottom: 14px;">
                    <div style="border: 2px dashed var(--border-color); border-radius: 12px; padding: 20px; text-align: center; cursor: pointer;">
                        ${Icons.upload}
                        <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">Upload Photo</p>
                    </div>
                    <input type="text" placeholder="Or type your question..." style="padding: 16px;">
                </div>

                <textarea rows="4" placeholder="Paste your question or assignment details here..." style="margin-bottom: 14px;"></textarea>

                <button class="btn-primary" style="width: 100%;">Solve</button>
                <p style="font-size: 11px; color: var(--text-muted); text-align: center; margin-top: 10px;">${unlimited ? 'Unlimited' : remaining + ' remaining this month'}</p>
            </div>

            <div class="card">
                <h3 class="section-title">Answer</h3>
                <div style="background: var(--bg-primary); padding: 20px; border-radius: 12px; min-height: 200px; border: 1px solid var(--border-color);">
                    <p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 40px 20px;">Your answer will appear here</p>
                </div>
                <button class="btn-secondary" style="margin-top: 12px; display: flex; align-items: center; gap: 6px; font-size: 13px;">
                    ${Icons.copy} Copy Answer
                </button>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h3 class="section-title">History</h3>
                <p style="color: var(--text-muted); text-align: center; padding: 20px 0; font-size: 13px;">No homework solved yet</p>
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
            
            ${updates.length === 0 ? `
                <div class="card">
                    <p style="color: var(--text-muted); text-align: center; padding: 60px 20px; font-size: 14px;">No updates yet. Check back soon!</p>
                </div>
            ` : updates.map(u => `
                <div class="card" style="margin-bottom: 16px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                        <span class="${u.type === 'app' ? 'badge-premium' : u.type === 'company' ? 'badge-pro' : 'badge-free'}">${u.type === 'app' ? 'App Update' : u.type === 'company' ? 'Company' : 'New'}</span>
                        <span style="font-size: 11px; color: var(--text-muted);">${u.date}</span>
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
                <div class="banner" style="position: relative;">
                    ${user.banner ? `<img src="${user.banner}" style="width:100%; height:100%; object-fit: cover;" alt="Banner">` : '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); font-size: 13px;">Upload Banner</div>'}
                    <button onclick="document.getElementById('bannerUpload').click()" style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); border: 1px solid var(--border-color); color: #fff; padding: 5px 12px; border-radius: 8px; font-size: 11px; cursor: pointer;">Change Banner</button>
                    <input type="file" id="bannerUpload" accept="image/*" style="display:none;" onchange="handleBannerUpload(this)">
                </div>
                <div style="display: flex; align-items: center; gap: 16px; margin-top: -32px; margin-bottom: 16px; position: relative; z-index: 2;">
                    <div class="profile-pic">${user.pfp ? `<img src="${user.pfp}" alt="Profile">` : Icons.user}</div>
                    <button onclick="document.getElementById('pfpUpload').click()" class="btn-secondary" style="font-size: 12px; padding: 6px 14px;">Change Photo</button>
                    <input type="file" id="pfpUpload" accept="image/*" style="display:none;" onchange="handlePfpUpload(this)">
                </div>
                <div class="grid-2" style="margin-bottom: 12px;">
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Username</label>
                        <input type="text" id="settingsUsername" value="${user.username || ''}" placeholder="Enter username">
                    </div>
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Status</label>
                        <input type="text" id="settingsStatus" value="${user.status || ''}" placeholder="What's on your mind?">
                    </div>
                </div>
                <div style="margin-bottom: 12px;">
                    <label style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 6px;">Bio</label>
                    <textarea id="settingsBio" rows="3" style="resize: none;" placeholder="Tell us about yourself">${user.bio || ''}</textarea>
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
                <button style="margin-top: 10px; color: #ef4444; background: none; border: none; cursor: pointer; font-size: 13px;">Delete Account</button>
            </div>

            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// ADMIN TAB
// ============================================================
function renderAdminTab() {
    const isAdmin = AppState.currentUser.role === 'admin' || AppState.currentUser.role === 'developer';
    if (!isAdmin) {
        return `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 48px; margin-bottom: 16px;">🔒</div>
                <h2 style="font-size: 22px; font-weight: 700; color: var(--text-primary);">Access Denied</h2>
                <p style="color: var(--text-muted); margin-top: 8px;">Admin access only</p>
            </div>
        `;
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
                        <div style="display: flex; justify-content: space-between; font-size: 13px; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                            <span style="color: var(--text-muted);">Scheduled posts</span>
                            <span style="color: var(--text-primary); font-weight: 600;">${AppState.scheduledPosts.length}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 13px; padding: 8px 0;">
                            <span style="color: var(--text-muted);">Users</span>
                            <span style="color: var(--text-primary); font-weight: 600;">1</span>
                        </div>
                    </div>
                </div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// SETTINGS FUNCTIONS
// ============================================================
function handlePfpUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            AppState.currentUser.pfp = e.target.result;
            saveState();
            renderApp();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function handleBannerUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            AppState.currentUser.banner = e.target.result;
            saveState();
            renderApp();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function saveProfileSettings() {
    const username = document.getElementById('settingsUsername')?.value;
    const status = document.getElementById('settingsStatus')?.value;
    const bio = document.getElementById('settingsBio')?.value;
    if (username) AppState.currentUser.username = username;
    if (status !== undefined) AppState.currentUser.status = status;
    if (bio !== undefined) AppState.currentUser.bio = bio;
    saveState();
    renderApp();
}

function setTheme(theme) {
    AppState.settings.theme = theme;
    if (theme === 'dark') {
        document.body.classList.remove('light-mode');
    } else if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) document.body.classList.remove('light-mode');
        else document.body.classList.add('light-mode');
    }
    saveState();
    renderApp();
}

// ============================================================
// ADMIN FUNCTIONS
// ============================================================
function postUpdate() {
    const title = document.getElementById('updateTitle')?.value;
    const body = document.getElementById('updateBody')?.value;
    const type = document.getElementById('updateType')?.value;
    if (!title || !body) return;
    AppState.updates.unshift({
        id: Date.now(),
        title, body, type,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    saveState();
    renderApp();
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
                <button onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; color: var(--text-muted); font-size: 24px; cursor: pointer; line-height: 1;">&times;</button>
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
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 10px; font-size: 12px; color: var(--text-muted);">
                            <div>AutoPost: ${plan.limits.autoPost === Infinity ? '∞' : plan.limits.autoPost}</div>
                            <div>Chat: ${plan.limits.chat === Infinity ? '∞' : plan.limits.chat}</div>
                            <div>Kalshi: ${plan.limits.kalshi === Infinity ? '∞' : plan.limits.kalshi}</div>
                            <div>Code: ${plan.limits.code === Infinity ? '∞' : plan.limits.code}</div>
                            <div>Analytics: ${plan.limits.analytics === Infinity ? '∞' : plan.limits.analytics}</div>
                            <div>Homework: ${plan.limits.homework === Infinity ? '∞' : plan.limits.homework}</div>
                        </div>
                        <button onclick="selectPlan('${plan.id}'); this.closest('.modal-overlay').remove();" 
                            class="${plan.id === AppState.currentUser.plan ? 'btn-secondary' : 'btn-primary'}" style="width: 100%; margin-top: 12px; font-size: 13px; padding: 8px;">
                            ${plan.id === AppState.currentUser.plan ? 'Current Plan' : 'Select Plan'}
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function selectPlan(planId) {
    if (planId === AppState.currentUser.plan) return;
    AppState.currentUser.plan = planId;
    const plan = PLANS[planId];
    AppState.usage.autoPost.limit = plan.limits.autoPost;
    AppState.usage.chat.limit = plan.limits.chat;
    AppState.usage.kalshi.limit = plan.limits.kalshi;
    AppState.usage.code.limit = plan.limits.code;
    AppState.usage.analytics.limit = plan.limits.analytics;
    AppState.usage.homework.limit = plan.limits.homework;
    saveState();
    renderApp();
}

// ============================================================
// AUTH
// ============================================================
function login() {
    const email = document.querySelector('input[type="email"]')?.value || 'user@blanklog.com';
    const name = email.split('@')[0];
    AppState.currentUser.name = name;
    AppState.currentUser.email = email;
    AppState.currentUser.username = '@' + name;
    AppState.isAuthenticated = true;
    saveState();
    renderApp();
}

// ============================================================
// RENDER APP
// ============================================================
function renderApp() {
    if (!AppState.isAuthenticated) {
        document.getElementById('root').innerHTML = `
            <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-primary); padding: 20px;">
                <div style="max-width: 400px; width: 100%;">
                    <div style="text-align: center; margin-bottom: 32px;">
                        <div class="auth-logo">◼</div>
                        <h1 style="font-size: 26px; font-weight: 700; color: var(--text-primary);">Blank Log Hub</h1>
                        <p style="color: var(--text-muted); margin-top: 6px; font-size: 14px;">Sign in to continue</p>
                    </div>
                    <div class="card" style="padding: 24px;">
                        <input type="email" placeholder="Email" style="margin-bottom: 12px;" value="">
                        <input type="password" placeholder="Password" style="margin-bottom: 16px;" value="">
                        <button onclick="login()" class="btn-primary" style="width: 100%;">Sign In</button>
                        <p style="text-align: center; font-size: 12px; color: var(--text-muted); margin-top: 16px;">Create an account to get started</p>
                    </div>
                </div>
            </div>
        `;
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
renderApp();

window.setActiveTab = setActiveTab;
window.handlePfpUpload = handlePfpUpload;
window.handleBannerUpload = handleBannerUpload;
window.saveProfileSettings = saveProfileSettings;
window.setTheme = setTheme;
window.showPlansModal = showPlansModal;
window.selectPlan = selectPlan;
window.login = login;
window.postUpdate = postUpdate;
