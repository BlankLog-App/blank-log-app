// ============================================================
// BLANK LOG — MAIN SITE LOGIC
// ============================================================

const ACCESS_CODE = 'CASSIE-ENZO';

let AppState = {
    isUnlocked: false,
    activeTab: 'home'
};

const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'apps', label: 'Our Apps' },
    { id: 'mission', label: 'Mission' },
    { id: 'updates', label: 'Updates' }
];

// The Research tab only shows if unlocked
function getTabs() {
    const currentTabs = [...tabs];
    if (AppState.isUnlocked) {
        currentTabs.push({ id: 'research', label: 'Research' });
    }
    return currentTabs;
}

function setActiveTab(tabId) {
    AppState.activeTab = tabId;
    renderApp();
}

function renderSidebar() {
    const currentTabs = getTabs();
    return `
        <div class="sidebar">
            <div class="sidebar-header">
                <div class="logo-text">Blank Log™</div>
            </div>
            <div class="nav-menu">
                ${currentTabs.map(tab => `
                    <button onclick="setActiveTab('${tab.id}')" 
                        class="nav-link ${AppState.activeTab === tab.id ? 'active' : ''}">
                        ${tab.label}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function renderHomeTab() {
    return `
        <div class="fade-in">
            <h1>We build intelligent tools for builders.</h1>
            <p class="subtitle">Blank Log™ is an AI research and product company. We build software that helps you create, predict, and grow.</p>
            
            <div class="card-grid">
                <div class="card">
                    <h3>DevAI</h3>
                    <p>Write, debug, and preview code instantly. Made by Blank Log™.</p>
                    <a href="https://devai.vercel.app" target="_blank" class="btn">Visit DevAI</a>
                </div>
                <div class="card">
                    <h3>PulseAI</h3>
                    <p>Schedule posts and track analytics across platforms. Made by Blank Log™.</p>
                    <a href="https://pulseai.vercel.app" target="_blank" class="btn">Visit PulseAI</a>
                </div>
                <div class="card">
                    <h3>InsightAI</h3>
                    <p>Predict markets and solve homework with AI. Made by Blank Log™.</p>
                    <a href="https://insightai.vercel.app" target="_blank" class="btn">Visit InsightAI</a>
                </div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

function renderAppsTab() {
    return `
        <div class="fade-in">
            <h1>Our Apps</h1>
            <p class="subtitle">Three focused AI tools. One account. Made by Blank Log™.</p>
            <div class="card-grid">
                <div class="card">
                    <h3>DevAI</h3>
                    <p>AI Chat and Code generation with live previews.</p>
                    <a href="https://devai.vercel.app" target="_blank" class="btn">Open DevAI</a>
                </div>
                <div class="card">
                    <h3>PulseAI</h3>
                    <p>Social media scheduling and analytics dashboard.</p>
                    <a href="https://pulseai.vercel.app" target="_blank" class="btn">Open PulseAI</a>
                </div>
                <div class="card">
                    <h3>InsightAI</h3>
                    <p>Prediction market research and homework solver.</p>
                    <a href="https://insightai.vercel.app" target="_blank" class="btn">Open InsightAI</a>
                </div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

function renderMissionTab() {
    return `
        <div class="fade-in">
            <h1>Our Mission</h1>
            <p class="subtitle">To build AI tools that make humans smarter, faster, and more capable.</p>
            <div class="card" style="margin-top: 32px;">
                <p style="color: var(--text-primary); line-height: 1.8; font-size: 16px;">
                    Blank Log™ was founded in 2026 with a simple goal: build AI tools that actually work for the people using them. 
                    We believe that AI should be a partner, not a replacement. It should help you learn, create, and make better decisions. 
                    Every app we build is designed with that philosophy in mind.
                </p>
            </div>
            ${renderFooter()}
        </div>
    `;
}

function renderUpdatesTab() {
    return `
        <div class="fade-in">
            <h1>Updates</h1>
            <p class="subtitle">Latest news from Blank Log™.</p>
            <div class="card" style="margin-top: 32px;">
                <h3 style="font-size: 18px; margin-bottom: 8px;">Welcome to Blank Log™</h3>
                <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 16px;">June 2026</p>
                <p style="color: var(--text-primary);">We are officially launching our three flagship apps: DevAI, PulseAI, and InsightAI. Sign up on any app, and your account works across all of them.</p>
            </div>
            ${renderFooter()}
        </div>
    `;
}

function renderResearchTab() {
    if (!AppState.isUnlocked) {
        return `<div style="text-align:center; padding: 100px 20px;"><h1>Access Denied</h1></div>`;
    }
    return `
        <div class="fade-in">
            <h1>Research & Development</h1>
            <p class="subtitle">Internal tools, 3D modeling, and AI courses.</p>
            
            <div class="card-grid">
                <div class="card">
                    <h3>3D Sandbox</h3>
                    <p>Create 3D models, code them, and record them into video ads.</p>
                    <button class="btn" onclick="alert('3D Sandbox coming soon.')">Open Studio</button>
                </div>
                <div class="card">
                    <h3>AI Courses</h3>
                    <p>Learn how to build and improve AI models.</p>
                    <button class="btn" onclick="alert('Courses coming soon.')">Start Learning</button>
                </div>
                <div class="card">
                    <h3>Intelligence</h3>
                    <p>Inside info on what other AI companies are doing.</p>
                    <button class="btn" onclick="alert('Intelligence coming soon.')">View Reports</button>
                </div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

function renderFooter() {
    return `
        <div class="footer">
            &copy; 2026 Blank Log™. All rights reserved.
        </div>
    `;
}

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
        <div class="main-content">
            ${content}
        </div>
        <!-- Hidden Trigger -->
        <div class="hidden-trigger" onclick="openModal()">◼</div>
        
        <!-- Modal -->
        <div class="modal-overlay" id="adminModal">
            <div class="modal-content">
                <h2>Enter Access Code</h2>
                <p>This area is restricted.</p>
                <input type="text" id="accessCode" class="modal-input" placeholder="•••••••••" autocomplete="off">
                <div class="error-text" id="errorText">Invalid code.</div>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button class="btn" style="background: var(--bg-primary); border: 1px solid var(--border-color);" onclick="closeModal()">Cancel</button>
                    <button class="btn" onclick="verifyCode()">Unlock</button>
                </div>
            </div>
        </div>
    `;

    // Add enter key listener for the input
    const input = document.getElementById('accessCode');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') verifyCode();
        });
        input.focus();
    }
}

function openModal() {
    document.getElementById('adminModal').classList.add('active');
}

function closeModal() {
    document.getElementById('adminModal').classList.remove('active');
    document.getElementById('accessCode').value = '';
    document.getElementById('errorText').style.display = 'none';
}

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

// Global exports
window.setActiveTab = setActiveTab;
window.openModal = openModal;
window.closeModal = closeModal;
window.verifyCode = verifyCode;

// Initial render
renderApp();
