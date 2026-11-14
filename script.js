// ============================================================
// BLANK LOG — MAIN SITE + RESEARCH LAB (FINAL V2)
// ============================================================

const ACCESS_CODE = 'CASSIE-ENZO';

let AppState = {
    isUnlocked: false,
    activeTab: 'home',
    researchSubtab: 'video', // 'video', 'builder', 'analytics', 'courses', 'intelligence', 'marketing'
    analyticsChart: null,
    courses: [
        { title: 'Prompt Engineering 101', desc: 'Learn how to write prompts that actually work.', date: 'Today' },
        { title: 'Building AI Agents', desc: 'How to connect LLMs to tools and APIs.', date: 'Yesterday' },
        { title: 'Fine-Tuning Models', desc: 'How to train base models on your own data.', date: '2 days ago' }
    ],
    intel: [
        { title: 'OpenAI Releases GPT-5', desc: 'OpenAI announced GPT-5 with a massive leap in reasoning.', date: 'June 2026' },
        { title: 'Anthropic Raises $2B', desc: 'Anthropic closed a $2B funding round led by Google.', date: 'May 2026' }
    ],
    marketingIdeas: [
        { title: 'Launch on Product Hunt', desc: 'Coordinate a launch for DevAI on Product Hunt.' },
        { title: 'Twitter/X Thread', desc: 'Write a thread breaking down "How to build an AI app in 2026".' }
    ]
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
                <p style="line-height: 1.8;">Blank Log™ was founded in 2026 with a simple goal: build AI tools that actually work for the people using them.</p>
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
                <p>We are officially launching our three flagship apps.</p>
            </div>
            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// RESEARCH LAB
// ============================================================
function renderResearchTab() {
    if (!AppState.isUnlocked) return `<div style="text-align:center; padding: 100px 20px;"><h1>Access Denied</h1></div>`;
    
    const subtabs = [
        { id: 'video', label: 'Video Studio' },
        { id: 'builder', label: 'UI Builder' },
        { id: 'analytics', label: 'Analytics' },
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
    if (tab === 'analytics') setTimeout(initAnalyticsChart, 100);
}

function renderResearchContent() {
    switch(AppState.researchSubtab) {
        case 'video': return renderVideoStudio();
        case 'builder': return renderUIBuilder();
        case 'analytics': return renderAnalyticsLab();
        case 'courses': return renderCourses();
        case 'intelligence': return renderIntelligence();
        case 'marketing': return renderMarketing();
        default: return renderVideoStudio();
    }
}

// ============================================================
// FEATURE 1: VIDEO STUDIO
// ============================================================
function renderVideoStudio() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 8px;">Video Ad Studio</h1>
            <p style="color: var(--text-muted); margin-bottom: 24px;">Generate realistic video ads using AI.</p>
            <div class="card" style="padding: 24px;">
                <label style="font-size: 14px; color: var(--text-muted); display: block; margin-bottom: 8px;">Ad Prompt</label>
                <textarea id="videoPromptInput" rows="3" style="width: 100%; background: #050505; color: white; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 16px;" placeholder="e.g., A cinematic shot of a sneaker on a wet street..."></textarea>
                <div style="display: flex; gap: 12px; margin-bottom: 24px;">
                    <select style="background: #050505; color: white; border: 1px solid var(--border-color); padding: 10px; border-radius: 8px;">
                        <option>Google Veo 3.1</option>
                        <option>Runway Gen-4</option>
                    </select>
                    <button class="btn" onclick="alert('Connect Veo/Runway API to generate video.')">Generate Video</button>
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
                <h4 style="margin-bottom: 12px; font-size: 14px; color: var(--text-muted);">HTML / CSS</h4>
                <textarea id="uiCodeInput" style="flex: 1; background: #050505; color: #22c55e; font-family: monospace; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); resize: none;"></textarea>
                <button class="btn" style="margin-top: 12px;" onclick="updatePreview()">Run Preview</button>
            </div>
            <div style="width: 50%; padding: 16px; display: flex; flex-direction: column;">
                <h4 style="margin-bottom: 12px; font-size: 14px; color: var(--text-muted);">Live Preview</h4>
                <iframe id="uiPreview" style="flex: 1; background: white; border: none; border-radius: 8px;"></iframe>
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
// FEATURE 3: ANALYTICS LAB (STOCK STYLE)
// ============================================================
function renderAnalyticsLab() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 24px;">Analytics Lab</h1>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px;">
                <div class="card"><h3 style="font-size: 14px; color: var(--text-muted);">Total Users</h3><p style="font-size: 28px; font-weight: bold; color: #8b5cf6;">1,248</p></div>
                <div class="card"><h3 style="font-size: 14px; color: var(--text-muted);">Active Subscriptions</h3><p style="font-size: 28px; font-weight: bold; color: #22c55e;">342</p></div>
                <div class="card"><h3 style="font-size: 14px; color: var(--text-muted);">Monthly Revenue</h3><p style="font-size: 28px; font-weight: bold; color: #22c55e;">$4,580</p></div>
            </div>
            <div class="card" style="padding: 24px;">
                <h3 style="font-size: 18px; margin-bottom: 16px;">User Growth Chart</h3>
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
                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#8b5cf6'
                },
                {
                    label: 'Subscriptions',
                    data: [20, 60, 120, 180, 250, 342],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#22c55e'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { labels: { color: '#ffffff' } } 
            },
            scales: {
                x: { ticks: { color: '#888' }, grid: { color: '#1a1a1a' } },
                y: { ticks: { color: '#888' }, grid: { color: '#1a1a1a' } }
            }
        }
    });
}

// ============================================================
// FEATURE 4: AI COURSES (4 new ones a day)
// ============================================================
function renderCourses() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 24px;">AI Courses (4 new today)</h1>
            <div class="card-grid">
                ${AppState.courses.map(course => `
                    <div class="card">
                        <h3>${course.title}</h3>
                        <p>${course.desc}</p>
                        <span style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 12px;">${course.date}</span>
                        <button class="btn">Start Course</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================================
// FEATURE 5: INTELLIGENCE
// ============================================================
function renderIntelligence() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 24px;">AI Company Intelligence</h1>
            <div class="card" style="padding: 24px; margin-bottom: 24px;">
                <h3 style="font-size: 16px; margin-bottom: 12px;">Paste a link to get an AI summary</h3>
                <input type="text" placeholder="https://..." style="width: 100%; padding: 12px; background: #050505; border: 1px solid var(--border-color); color: white; border-radius: 8px; margin-bottom: 12px;">
                <button class="btn">Summarize & Save</button>
            </div>
            <div class="card-grid">
                ${AppState.intel.map(item => `
                    <div class="card">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                        <span style="font-size: 12px; color: var(--text-muted); display: block; margin-top: 12px;">${item.date}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================================
// FEATURE 6: MARKETING
// ============================================================
function renderMarketing() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 24px;">Marketing Ideas Board</h1>
            <div class="card" style="padding: 24px; margin-bottom: 24px;">
                <input type="text" id="marketingTitle" placeholder="Idea Title..." style="width: 100%; padding: 12px; background: #050505; border: 1px solid var(--border-color); color: white; border-radius: 8px; margin-bottom: 12px;">
                <textarea id="marketingDesc" placeholder="Describe the idea..." rows="3" style="width: 100%; padding: 12px; background: #050505; border: 1px solid var(--border-color); color: white; border-radius: 8px; margin-bottom: 12px;"></textarea>
                <button class="btn" onclick="alert('Connected to database to save ideas.')">Save Idea</button>
            </div>
            <div class="card-grid">
                ${AppState.marketingIdeas.map(idea => `
                    <div class="card">
                        <h3>${idea.title}</h3>
                        <p>${idea.desc}</p>
                    </div>
                `).join('')}
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
