// ============================================================
// BLANK LOG — MAIN SITE + RESEARCH LAB (FINAL)
// ============================================================

const ACCESS_CODE = 'CASSIE-ENZO';

let AppState = {
    isUnlocked: false,
    activeTab: 'home',
    researchSubtab: 'video', // 'video', 'builder', 'courses', 'intelligence', 'marketing'
    analyticsChart: null,
    videoPrompt: ''
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
// RESEARCH LAB (ALL 5 FEATURES)
// ============================================================
function renderResearchTab() {
    if (!AppState.isUnlocked) return `<div style="text-align:center; padding: 100px 20px;"><h1>Access Denied</h1></div>`;
    
    const subtabs = [
        { id: 'video', label: 'Video Studio' },
        { id: 'builder', label: 'UI Builder' },
        { id: 'courses', label: 'AI Courses' },
        { id: 'intelligence', label: 'Intelligence' },
        { id: 'marketing', label: 'Marketing' }
    ];

    return `
        <div class="studio-header">
            <div class="studio-title">Research Lab</div>
            <div class="studio-actions" style="flex-wrap: wrap;">
                ${subtabs.map(tab => `
                    <button class="transform-btn ${AppState.researchSubtab === tab.id ? 'active' : ''}" onclick="setResearchSubtab('${tab.id}')">${tab.label}</button>
                `).join('')}
            </div>
        </div>
        
        <div id="research-content" style="flex: 1; display: flex; overflow: hidden;">
            ${renderResearchContent()}
        </div>
    `;
}

function setResearchSubtab(tab) {
    AppState.researchSubtab = tab;
    renderApp();
}

function renderResearchContent() {
    switch(AppState.researchSubtab) {
        case 'video': return renderVideoStudio();
        case 'builder': return renderUIBuilder();
        case 'courses': return renderCourses();
        case 'intelligence': return renderIntelligence();
        case 'marketing': return renderMarketing();
        default: return renderVideoStudio();
    }
}

// ============================================================
// FEATURE 1: VIDEO STUDIO (Replaces 3D Model)
// ============================================================
function renderVideoStudio() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 8px;">Video Ad Studio</h1>
            <p style="color: var(--text-muted); margin-bottom: 24px;">Generate realistic video ads using AI (Requires API integration).</p>
            
            <div class="card" style="padding: 24px;">
                <label style="font-size: 14px; color: var(--text-muted); display: block; margin-bottom: 8px;">Ad Prompt</label>
                <textarea id="videoPromptInput" rows="3" style="width: 100%; background: #050505; color: white; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 16px;" placeholder="e.g., A cinematic shot of a sneaker on a wet street, neon reflections, slow motion..."></textarea>
                
                <div style="display: flex; gap: 12px; margin-bottom: 24px;">
                    <select style="background: #050505; color: white; border: 1px solid var(--border-color); padding: 10px; border-radius: 8px;">
                        <option>Google Veo 3.1 (Realism)</option>
                        <option>Runway Gen-4 (Ads)</option>
                    </select>
                    <button class="btn" onclick="alert('Backend API integration required for Veo/Runway.')">Generate Video</button>
                </div>
                
                <div style="width: 100%; height: 400px; background: #000; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color);">
                    <p style="color: var(--text-muted);">Generated video will appear here</p>
                </div>
            </div>
        </div>
    `;
}

// ============================================================
// FEATURE 2: UI BUILDER
// ============================================================
function renderUIBuilder() {
    return `
        <div style="display: flex; width: 100%; height: 100%;">
            <div style="width: 50%; padding: 16px; border-right: 1px solid var(--border-color); display: flex; flex-direction: column;">
                <h4 style="margin-bottom: 12px; font-size: 14px; color: var(--text-muted);">HTML / CSS Code</h4>
                <textarea id="uiCodeInput" style="flex: 1; background: #050505; color: #22c55e; font-family: monospace; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; resize: none;" placeholder="<div style='color: white; padding: 20px;'>Hello World</div>"></textarea>
                <button class="btn" style="margin-top: 12px;" onclick="updatePreview()">Run / Preview</button>
            </div>
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
// FEATURE 3: AI COURSES
// ============================================================
function renderCourses() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 24px;">AI Courses</h1>
            <div class="card-grid">
                <div class="card"><h3>Prompt Engineering 101</h3><p>Learn how to write prompts that actually work.</p><button class="btn">Start Course</button></div>
                <div class="card"><h3>Building AI Agents</h3><p>How to connect LLMs to tools and APIs.</p><button class="btn">Start Course</button></div>
                <div class="card"><h3>Fine-Tuning Models</h3><p>How to train base models on your own data.</p><button class="btn">Start Course</button></div>
            </div>
        </div>
    `;
}

// ============================================================
// FEATURE 4: INTELLIGENCE
// ============================================================
function renderIntelligence() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 24px;">AI Company Intelligence</h1>
            <div class="card">
                <h3 style="font-size: 18px; margin-bottom: 8px;">OpenAI Releases GPT-5</h3>
                <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 12px;">June 2026</p>
                <p>OpenAI announced GPT-5 with a massive leap in reasoning and multimodal understanding. The model now handles 1M token context windows natively.</p>
            </div>
            <div class="card" style="margin-top: 16px;">
                <h3 style="font-size: 18px; margin-bottom: 8px;">Anthropic Raises $2B</h3>
                <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 12px;">May 2026</p>
                <p>Anthropic closed a $2B funding round led by Google, valuing the company at $60B. The funds will go towards compute and safety research.</p>
            </div>
        </div>
    `;
}

// ============================================================
// FEATURE 5: MARKETING IDEAS
// ============================================================
function renderMarketing() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 24px;">Marketing Ideas</h1>
            <div class="card">
                <h3 style="font-size: 18px; margin-bottom: 8px;">Idea #1: Launch on Product Hunt</h3>
                <p>Coordinate a launch for DevAI on Product Hunt. Prepare a demo video, a clear tagline, and a special discount for early adopters.</p>
            </div>
            <div class="card" style="margin-top: 16px;">
                <h3 style="font-size: 18px; margin-bottom: 8px;">Idea #2: Twitter/X Thread</h3>
                <p>Write a thread breaking down "How to build an AI app in 2026" and plug PulseAI at the end as the tool that handles the socials.</p>
            </div>
        </div>
    `;
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
