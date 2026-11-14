// ============================================================
// BLANK LOG — MAIN SITE + RESEARCH LAB (UI BUILDER + ANALYTICS)
// ============================================================

const ACCESS_CODE = 'CASSIE-ENZO';

let AppState = {
    isUnlocked: false,
    activeTab: 'home',
    researchSubtab: 'builder', // 'builder' or 'analytics'
    analyticsChart: null
};

const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'apps', label: 'Our Apps' },
    { id: 'mission', label: 'Mission' },
    { id: 'updates', label: 'Updates' }
];

function getTabs() {
    const currentTabs = [...tabs];
    if (AppState.isUnlocked) currentTabs.push({ id: 'research', label: 'Research' });
    return currentTabs;
}

function setActiveTab(tabId) {
    AppState.activeTab = tabId;
    renderApp();
}

// ============================================================
// PUBLIC PAGES
// ============================================================
function renderSidebar() {
    return `
        <div class="sidebar">
            <div class="sidebar-header"><div class="logo-text">Blank Log™</div></div>
            <div class="nav-menu">
                ${getTabs().map(tab => `
                    <button onclick="setActiveTab('${tab.id}')" class="nav-link ${AppState.activeTab === tab.id ? 'active' : ''}">${tab.label}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function renderFooter() {
    return `<div class="footer">&copy; 2026 Blank Log™. All rights reserved.</div>`;
}

function renderHomeTab() {
    return `
        <div class="page-content fade-in">
            <h1>We build intelligent tools for builders.</h1>
            <p class="subtitle">Blank Log™ is an AI research and product company. We build software that helps you create, predict, and grow.</p>
            <div class="card-grid">
                <div class="card"><h3>DevAI</h3><p>Write, debug, and preview code instantly. Made by Blank Log™.</p><a href="https://devai.vercel.app" class="btn">Visit DevAI</a></div>
                <div class="card"><h3>PulseAI</h3><p>Schedule posts and track analytics. Made by Blank Log™.</p><a href="https://pulseai.vercel.app" class="btn">Visit PulseAI</a></div>
                <div class="card"><h3>InsightAI</h3><p>Predict markets and solve homework. Made by Blank Log™.</p><a href="https://insightai.vercel.app" class="btn">Visit InsightAI</a></div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

function renderAppsTab() {
    return `
        <div class="page-content fade-in">
            <h1>Our Apps</h1>
            <p class="subtitle">Three focused AI tools. One account. Made by Blank Log™.</p>
            <div class="card-grid">
                <div class="card"><h3>DevAI</h3><p>AI Chat and Code generation with live previews.</p><a href="https://devai.vercel.app" class="btn">Open DevAI</a></div>
                <div class="card"><h3>PulseAI</h3><p>Social media scheduling and analytics dashboard.</p><a href="https://pulseai.vercel.app" class="btn">Open PulseAI</a></div>
                <div class="card"><h3>InsightAI</h3><p>Prediction market research and homework solver.</p><a href="https://insightai.vercel.app" class="btn">Open InsightAI</a></div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

function renderMissionTab() {
    return `
        <div class="page-content fade-in">
            <h1>Our Mission</h1>
            <p class="subtitle">To build AI tools that make humans smarter, faster, and more capable.</p>
            <div class="card" style="margin-top: 32px;">
                <p style="line-height: 1.8;">Blank Log™ was founded in 2026 with a simple goal: build AI tools that actually work for the people using them. We believe that AI should be a partner, not a replacement.</p>
            </div>
            ${renderFooter()}
        </div>
    `;
}

function renderUpdatesTab() {
    return `
        <div class="page-content fade-in">
            <h1>Updates</h1>
            <p class="subtitle">Latest news from Blank Log™.</p>
            <div class="card" style="margin-top: 32px;">
                <h3 style="font-size: 18px; margin-bottom: 8px;">Welcome to Blank Log™</h3>
                <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 16px;">June 2026</p>
                <p>We are officially launching our three flagship apps: DevAI, PulseAI, and InsightAI.</p>
            </div>
            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// RESEARCH LAB (UI BUILDER + ANALYTICS)
// ============================================================
function renderResearchTab() {
    if (!AppState.isUnlocked) return `<div style="text-align:center; padding: 100px 20px;"><h1>Access Denied</h1></div>`;
    
    return `
        <div class="studio-header">
            <div class="studio-title">Research Lab</div>
            <div class="studio-actions">
                <button class="transform-btn ${AppState.researchSubtab === 'builder' ? 'active' : ''}" onclick="setResearchSubtab('builder')">UI Builder</button>
                <button class="transform-btn ${AppState.researchSubtab === 'analytics' ? 'active' : ''}" onclick="setResearchSubtab('analytics')">Analytics Lab</button>
            </div>
        </div>
        
        <div id="research-content" style="flex: 1; display: flex; overflow: hidden;">
            ${AppState.researchSubtab === 'builder' ? renderUIBuilder() : renderAnalyticsLab()}
        </div>
    `;
}

function setResearchSubtab(tab) {
    AppState.researchSubtab = tab;
    renderApp();
    
    if (tab === 'analytics') {
        setTimeout(initAnalyticsChart, 100);
    }
}

// ============================================================
// 1. UI COMPONENT BUILDER
// ============================================================
function renderUIBuilder() {
    return `
        <div style="display: flex; width: 100%; height: 100%;">
            <!-- Code Editor -->
            <div style="width: 50%; padding: 16px; border-right: 1px solid var(--border-color); display: flex; flex-direction: column;">
                <h4 style="margin-bottom: 12px; font-size: 14px; color: var(--text-muted);">HTML / CSS Code</h4>
                <textarea id="uiCodeInput" style="flex: 1; background: #050505; color: #22c55e; font-family: monospace; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; resize: none;" placeholder="<div style='color: white; padding: 20px;'>Hello World</div>"></textarea>
                <button class="btn" style="margin-top: 12px;" onclick="updatePreview()">Run / Preview</button>
            </div>
            
            <!-- Live Preview -->
            <div style="width: 50%; padding: 16px; display: flex; flex-direction: column;">
                <h4 style="margin-bottom: 12px; font-size: 14px; color: var(--text-muted);">Live Preview</h4>
                <iframe id="uiPreview" style="flex: 1; background: white; border: none; border-radius: 8px; width: 100%; height: 100%;"></iframe>
            </div>
        </div>
    `;
}

function updatePreview() {
    const code = document.getElementById('uiCodeInput')?.value || '';
    const iframe = document.getElementById('uiPreview');
    if (iframe) {
        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(code);
        doc.close();
    }
}

// ============================================================
// 2. ANALYTICS LAB
// ============================================================
function renderAnalyticsLab() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 24px;">Business Analytics Lab</h1>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px;">
                <div class="card"><h3 style="font-size: 14px; color: var(--text-muted);">Total Users</h3><p style="font-size: 28px; font-weight: bold; margin-top: 8px;">1,248</p></div>
                <div class="card"><h3 style="font-size: 14px; color: var(--text-muted);">Active Subscriptions</h3><p style="font-size: 28px; font-weight: bold; margin-top: 8px;">342</p></div>
                <div class="card"><h3 style="font-size: 14px; color: var(--text-muted);">Monthly Revenue</h3><p style="font-size: 28px; font-weight: bold; margin-top: 8px; color: #22c55e;">$4,580</p></div>
            </div>
            
            <div class="card" style="padding: 24px;">
                <h3 style="font-size: 18px; margin-bottom: 16px;">User Growth (Simulated)</h3>
                <canvas id="analyticsChart" style="width: 100%; height: 300px;"></canvas>
            </div>
        </div>
    `;
}

function initAnalyticsChart() {
    const canvas = document.getElementById('analyticsChart');
    if (!canvas) return;
    
    if (AppState.analyticsChart) AppState.analyticsChart.destroy();

    AppState.analyticsChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Users',
                    data: [150, 300, 500, 750, 1000, 1248],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Subscriptions',
                    data: [20, 60, 120, 180, 250, 342],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#ffffff' } } },
            scales: {
                x: { ticks: { color: '#888' }, grid: { color: '#222' } },
                y: { ticks: { color: '#888' }, grid: { color: '#222' } }
            }
        }
    });
}

// ============================================================
// MODAL & SECRET CODE
// ============================================================
function openModal() { document.getElementById('adminModal').classList.add('active'); }
function closeModal() { document.getElementById('adminModal').classList.remove('active'); document.getElementById('accessCode').value = ''; document.getElementById('errorText').style.display = 'none'; }
function verifyCode() {
    const input = document.getElementById('accessCode').value.toUpperCase().trim();
    if (input === ACCESS_CODE) {
        AppState.isUnlocked = true;
        closeModal();
        renderApp();
    } else {
        document.getElementById('errorText').style.display = 'block';
    }
}

// ============================================================
// MAIN RENDER
// ============================================================
function renderApp() {
    let content = '';
    switch(AppState.activeTab) {
        case 'home': content = renderHomeTab(); break;
        case 'apps': content = renderAppsTab(); break;
        case 'mission': content = renderMissionTab(); break;
        case 'updates': content = renderUpdatesTab(); break;
        case 'research': content = renderResearchTab(); break;
        default: content = renderHomeTab();
    }

    document.getElementById('root').innerHTML = `
        ${renderSidebar()}
        <div class="main-content">${content}</div>
        
        <div class="hidden-trigger" onclick="openModal()">◼</div>
        
        <div class="modal-overlay" id="adminModal">
            <div class="modal-content">
                <h2>Enter Access Code</h2>
                <p>This area is restricted.</p>
                <input type="text" id="accessCode" class="modal-input" placeholder="•••••••••" autocomplete="off">
                <div class="error-text" id="errorText">Invalid code.</div>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
                    <button class="btn" onclick="verifyCode()">Unlock</button>
                </div>
            </div>
        </div>
    `;

    const input = document.getElementById('accessCode');
    if (input) {
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') verifyCode(); });
        input.focus();
    }
}

// Global exports
window.setActiveTab = setActiveTab;
window.setResearchSubtab = setResearchSubtab;
window.updatePreview = updatePreview;
window.openModal = openModal;
window.closeModal = closeModal;
window.verifyCode = verifyCode;

// Initial render
renderApp();
