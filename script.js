// ============================================================
// BLANK LOG — MAIN SITE + RESEARCH LAB (REAL DATA)
// ============================================================

const ACCESS_CODE = 'CASSIE-ENZO';

let AppState = {
    isUnlocked: false,
    activeTab: 'home',
    researchSubtab: 'analytics', // Default to analytics
    analyticsChart: null,
    appData: {
        devai: { users: [], revenue: [], views: [] },
        pulseai: { users: [], revenue: [], views: [] },
        insightai: { users: [], revenue: [], views: [] }
    },
    marketingOutput: ''
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
        { id: 'analytics', label: 'Analytics' },
        { id: 'marketing', label: 'Marketing' },
        { id: 'courses', label: 'AI Courses' },
        { id: 'intelligence', label: 'Intelligence' }
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
    if (tab === 'analytics') setTimeout(initAnalyticsCharts, 100);
}

function renderResearchContent() {
    switch(AppState.researchSubtab) {
        case 'analytics': return renderAnalyticsLab();
        case 'marketing': return renderMarketing();
        case 'courses': return renderCourses();
        case 'intelligence': return renderIntelligence();
        default: return renderAnalyticsLab();
    }
}

// ============================================================
// FEATURE 1: ANALYTICS (CANDLESTICK & REAL DATA)
// ============================================================
function renderAnalyticsLab() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 8px;">App Analytics</h1>
            <p style="color: var(--text-muted); margin-bottom: 24px;">Real-time data. Currently showing $0 until apps are live.</p>
            
            <div class="card-grid" style="grid-template-columns: repeat(3, 1fr);">
                <!-- DevAI Chart -->
                <div class="card" style="padding: 16px;">
                    <h3 style="font-size: 16px; margin-bottom: 12px;">DevAI</h3>
                    <div style="height: 150px; background: #000; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color);">
                        <span style="color: #ef4444; font-size: 12px;">No Data Yet ($0)</span>
                    </div>
                </div>
                
                <!-- PulseAI Chart -->
                <div class="card" style="padding: 16px;">
                    <h3 style="font-size: 16px; margin-bottom: 12px;">PulseAI</h3>
                    <div style="height: 150px; background: #000; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color);">
                        <span style="color: #ef4444; font-size: 12px;">No Data Yet ($0)</span>
                    </div>
                </div>
                
                <!-- InsightAI Chart -->
                <div class="card" style="padding: 16px;">
                    <h3 style="font-size: 16px; margin-bottom: 12px;">InsightAI</h3>
                    <div style="height: 150px; background: #000; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color);">
                        <span style="color: #ef4444; font-size: 12px;">No Data Yet ($0)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initAnalyticsCharts() {
    // Will be used once apps are live and sending real data
}

// ============================================================
// FEATURE 2: MARKETING (CAMPAIGN GENERATOR)
// ============================================================
function renderMarketing() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 8px;">Marketing Generator</h1>
            <p style="color: var(--text-muted); margin-bottom: 24px;">Generate ad copy for your apps.</p>
            
            <div class="card" style="padding: 24px; margin-bottom: 24px;">
                <label style="font-size: 14px; color: var(--text-muted); display: block; margin-bottom: 8px;">Product / App</label>
                <input type="text" id="marketingProduct" placeholder="e.g., DevAI" style="width: 100%; padding: 12px; background: #050505; border: 1px solid var(--border-color); color: white; border-radius: 8px; margin-bottom: 16px;">
                
                <label style="font-size: 14px; color: var(--text-muted); display: block; margin-bottom: 8px;">Platform</label>
                <select id="marketingPlatform" style="width: 100%; padding: 12px; background: #050505; border: 1px solid var(--border-color); color: white; border-radius: 8px; margin-bottom: 16px;">
                    <option>Twitter / X</option>
                    <option>LinkedIn</option>
                    <option>Instagram</option>
                    <option>Email</option>
                </select>
                
                <button class="btn" onclick="generateCampaign()">Generate Campaign</button>
            </div>
            
            <div class="card" style="padding: 24px;">
                <h3 style="font-size: 18px; margin-bottom: 12px;">Generated Output</h3>
                <div id="marketingOutput" style="background: #050505; padding: 16px; border-radius: 8px; min-height: 100px; border: 1px solid var(--border-color); color: var(--text-muted);">
                    Your generated ad copy will appear here.
                </div>
            </div>
        </div>
    `;
}

async function generateCampaign() {
    const product = document.getElementById('marketingProduct')?.value;
    const platform = document.getElementById('marketingPlatform')?.value;
    const outputDiv = document.getElementById('marketingOutput');

    if (!product) {
        alert('Please enter a product name.');
        return;
    }

    outputDiv.innerHTML = '<span style="color: var(--text-muted);">Generating...</span>';

    try {
        const res = await fetch('/api/marketing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product, platform })
        });
        
        const data = await res.json();
        if (data.success) {
            outputDiv.innerHTML = data.copy;
        } else {
            outputDiv.innerHTML = '<span style="color: #ef4444;">Error generating copy.</span>';
        }
    } catch (e) {
        outputDiv.innerHTML = '<span style="color: #ef4444;">Network error. Backend not connected.</span>';
    }
}

// ============================================================
// FEATURE 3: AI COURSES (4 Real Courses)
// ============================================================
function renderCourses() {
    const courses = [
        { 
            title: '1. Prompt Engineering 101', 
            desc: 'Learn how to structure system prompts, use few-shot examples, and control output formatting for consistent AI results.',
            content: 'Prompt engineering is the practice of designing inputs to get optimal outputs. Key techniques: 1) Role prompting ("You are a senior developer..."). 2) Chain-of-thought ("Think step by step..."). 3) Few-shot examples (give 2-3 examples of desired output). 4) Output constraints ("Respond in JSON format").'
        },
        { 
            title: '2. Building AI Agents', 
            desc: 'Understand how to connect LLMs to external tools, APIs, and memory to create autonomous agents.',
            content: 'AI agents use LLMs as a reasoning engine. They receive a goal, break it into steps, and execute tools (search, calculator, database). Key architecture: Goal → Plan → Tool Execution → Observation → Repeat. Popular frameworks include LangChain and CrewAI.'
        },
        { 
            title: '3. Fine-Tuning Models', 
            desc: 'Learn when to fine-tune vs. prompt, and how to prepare datasets for training custom models.',
            content: 'Fine-tuning is training a base model on your specific data. Use it when prompt engineering isn\'t enough (e.g., highly specialized domain). Steps: 1) Gather 100+ high-quality examples. 2) Format as JSONL. 3) Upload to OpenAI/Anthropic. 4) Train. 5) Evaluate.'
        },
        { 
            title: '4. RAG (Retrieval-Augmented Generation)', 
            desc: 'Connect AI to your own documents and databases to answer questions with real data.',
            content: 'RAG lets AI search your data before answering. Steps: 1) Chunk your documents. 2) Embed them as vectors (using OpenAI embeddings). 3) Store in a vector database (Pinecone/Supabase). 4) When user asks a question, search for relevant chunks. 5) Inject those chunks into the prompt.'
        }
    ];

    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 24px;">AI Courses</h1>
            <div class="card-grid">
                ${courses.map((course, index) => `
                    <div class="card">
                        <h3 style="font-size: 16px;">${course.title}</h3>
                        <p style="font-size: 13px;">${course.desc}</p>
                        <button class="btn" style="margin-top: 12px; font-size: 12px;" onclick="alert('${course.content.replace(/'/g, "\\'")}')">Read Content</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ============================================================
// FEATURE 4: INTELLIGENCE (COMPETITOR TRACKER)
// ============================================================
function renderIntelligence() {
    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 8px;">Competitor Tracker</h1>
            <p style="color: var(--text-muted); margin-bottom: 24px;">Paste a link from OpenAI, Anthropic, or Google. AI will summarize it and save it.</p>
            
            <div class="card" style="padding: 24px; margin-bottom: 24px;">
                <input type="text" id="intelUrl" placeholder="https://openai.com/blog/..." style="width: 100%; padding: 12px; background: #050505; border: 1px solid var(--border-color); color: white; border-radius: 8px; margin-bottom: 12px;">
                <button class="btn" onclick="trackCompetitor()">Analyze & Save</button>
            </div>
            
            <div id="intelFeed">
                <div class="card" style="padding: 24px; text-align: center; color: var(--text-muted);">
                    No intelligence saved yet. Paste a link above to start.
                </div>
            </div>
        </div>
    `;
}

async function trackCompetitor() {
    const url = document.getElementById('intelUrl')?.value;
    if (!url) {
        alert('Please paste a URL.');
        return;
    }

    const feed = document.getElementById('intelFeed');
    feed.innerHTML = '<div class="card" style="padding: 24px; text-align: center; color: var(--text-muted);">Analyzing...</div>';

    try {
        const res = await fetch('/api/intel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        
        const data = await res.json();
        if (data.success) {
            feed.innerHTML = `
                <div class="card" style="padding: 24px;">
                    <h3 style="font-size: 16px; margin-bottom: 8px;">${data.title}</h3>
                    <p style="font-size: 14px;">${data.summary}</p>
                    <span style="font-size: 12px; color: var(--text-muted); display: block; margin-top: 12px;">Source: ${url}</span>
                </div>
            `;
        } else {
            feed.innerHTML = '<div class="card" style="padding: 24px; text-align: center; color: #ef4444;">Failed to analyze.</div>';
        }
    } catch (e) {
        feed.innerHTML = '<div class="card" style="padding: 24px; text-align: center; color: #ef4444;">Backend not connected.</div>';
    }
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
window.generateCampaign = generateCampaign;
window.trackCompetitor = trackCompetitor;
window.openModal = openModal;
window.closeModal = closeModal;
window.verifyCode = verifyCode;

// Initial render
renderApp();
