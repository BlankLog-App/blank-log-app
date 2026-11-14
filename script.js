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
    <option>YouTube</option>
    <option>TikTok</option>
    <option>Instagram</option>
    <option>Twitter / X</option>
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
// AI COURSES (Interactive Wizard & 85% Pass Requirement)
// ============================================================

// 1. Course Data (Includes Meme Coins & Kalshi)
const courseData = {
    'prompt-eng': {
        title: 'Prompt Engineering 101',
        desc: 'Learn how to structure system prompts and control AI output.',
        steps: [
            { type: 'reading', content: 'Prompt engineering is the art of guiding AI. A good prompt includes a role, context, and specific constraints. Always tell the AI who it is (e.g., "You are a senior developer") and exactly what format you want (e.g., "Reply in JSON").' },
            { type: 'questions', questions: [
                { q: 'What is the first thing you should define in a prompt?', options: ['The role', 'The temperature', 'The API key'], answer: 0 },
                { q: 'Which format is best for structured data?', options: ['A poem', 'JSON', 'A story'], answer: 1 },
                { q: 'What does few-shot prompting mean?', options: ['Giving examples', 'Using fewer tokens', 'Lowering the temperature'], answer: 0 }
            ]},
            { type: 'reading', content: 'Now let\'s talk about temperature. Temperature controls randomness. A temperature of 0 is deterministic (good for code), while a temperature of 0.8 is creative (good for marketing). Always set this based on the task.' },
            { type: 'videos', videos: [
                { title: 'Prompt Engineering Basics', duration: '24 min', url: 'https://youtube.com/watch?v=example1' },
                { title: 'Advanced Prompting Techniques', duration: '28 min', url: 'https://youtube.com/watch?v=example2' }
            ]},
            { type: 'reading', content: 'The videos above showed you how to chain prompts together. Chain-of-thought prompting is when you tell the AI to "think step by step." This dramatically improves reasoning on complex math and logic problems.' },
            { type: 'reading', content: 'Finally, always validate your AI output. Never trust the AI blindly. Use code to check if the output matches your expected schema before using it in your app.' },
            { type: 'final_test', questions: [
                { q: 'What does temperature 0 do?', options: ['Makes it creative', 'Makes it deterministic', 'Turns it off'], answer: 1 },
                { q: 'What is chain-of-thought?', options: ['Thinking step-by-step', 'Using a blockchain', 'A type of prompt injection'], answer: 0 },
                { q: 'Should you validate AI output?', options: ['No, trust it', 'Yes, always', 'Only for code'], answer: 1 }
            ]}
        ]
    },
    'meme-coins': {
        title: 'Meme Coins & Market Psychology',
        desc: 'Understand the hype cycles and psychology behind meme coin trading.',
        steps: [
            { type: 'reading', content: 'Meme coins are driven entirely by community sentiment and virality, not underlying fundamentals. The key to trading them is understanding the "Hype Cycle": Accumulation, Markup, Distribution, and Markdown.' },
            { type: 'questions', questions: [
                { q: 'What drives meme coin prices?', options: ['Company earnings', 'Community sentiment', 'Government policy'], answer: 1 },
                { q: 'What is the "Markup" phase?', options: ['When price drops', 'When price rises fast', 'When volume is flat'], answer: 1 },
                { q: 'Are meme coins safe long-term?', options: ['Yes', 'No', 'Only Bitcoin'], answer: 1 }
            ]},
            { type: 'reading', content: 'Liquidity is critical. If a meme coin has low liquidity, a large sell order will crash the price instantly (slippage). Always check the liquidity pool on decentralized exchanges before buying.' },
            { type: 'videos', videos: [
                { title: 'How Meme Coins Pump and Dump', duration: '22 min', url: 'https://youtube.com/watch?v=example3' },
                { title: 'Reading Crypto Charts for Beginners', duration: '25 min', url: 'https://youtube.com/watch?v=example4' }
            ]},
            { type: 'reading', content: 'The videos explained how to spot volume spikes. If the price is going up but volume is going down, that is a bearish divergence. It means the hype is dying. Look for price and volume moving together.' },
            { type: 'reading', content: 'Risk management is the most important part. Never put more than 1-2% of your portfolio into a single meme coin. Use stop-losses and take profits on the way up. Greed kills traders.' },
            { type: 'final_test', questions: [
                { q: 'What is slippage?', options: ['Price impact of a trade', 'A type of wallet', 'A trading fee'], answer: 0 },
                { q: 'What is a bearish divergence?', options: ['Price up, volume down', 'Price down, volume up', 'Both up'], answer: 0 },
                { q: 'How much of your portfolio should go into one meme coin?', options: ['100%', '1-2%', '50%'], answer: 1 }
            ]}
        ]
    },
    'kalshi': {
        title: 'Kalshi Prediction Markets',
        desc: 'Learn how to trade real-world events on Kalshi.',
        steps: [
            { type: 'reading', content: 'Kalshi is a regulated prediction market where you buy "Yes" or "No" contracts on real-world events. Prices range from $0.01 to $0.99. If you buy a "Yes" contract at $0.60 and the event happens, you get $1.00. If it doesn\'t, you get $0.' },
            { type: 'questions', questions: [
                { q: 'What does a $0.60 Yes contract mean?', options: ['60% probability', '60 cents profit', '60 days to resolve'], answer: 0 },
                { q: 'What happens if the event resolves "No"?', options: ['You get $1', 'You lose your stake', 'You get a refund'], answer: 1 },
                { q: 'Is Kalshi regulated?', options: ['No', 'Yes', 'Only in Europe'], answer: 1 }
            ]},
            { type: 'reading', content: 'The price of a contract is essentially the market\'s consensus probability. If a contract is trading at $0.40, the market believes there is a 40% chance it will happen. Your job is to find markets where you believe the true probability is higher than the market price (an "edge").' },
            { type: 'videos', videos: [
                { title: 'How Kalshi Works', duration: '20 min', url: 'https://youtube.com/watch?v=example5' },
                { title: 'Advanced Prediction Market Strategies', duration: '30 min', url: 'https://youtube.com/watch?v=example6' }
            ]},
            { type: 'reading', content: 'The videos covered the "Kelly Criterion" for position sizing. It helps you calculate the optimal amount to bet based on your edge and bankroll. Never bet more than 5% of your bankroll on a single market, regardless of how confident you are.' },
            { type: 'reading', content: 'Finally, always do your own research. Read the actual rules of the contract. Sometimes there are technicalities in how a market resolves that can surprise you. Trade the rules, not just the headlines.' },
            { type: 'final_test', questions: [
                { q: 'What does a $0.40 No contract mean?', options: ['40% chance of No', '60% chance of No', '40% profit'], answer: 1 },
                { q: 'What is the Kelly Criterion?', options: ['A betting strategy', 'A stock index', 'A type of order'], answer: 0 },
                { q: 'What should you always read?', options: ['The headlines', 'The contract rules', 'Twitter'], answer: 1 }
            ]}
        ]
    }
};

// 2. State for the Course Wizard
let currentCourse = null;
let currentStep = 0;
let testScore = 0;

// 3. Render Courses List
function renderCourses() {
    if (currentCourse) {
        return renderCourseWizard();
    }

    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <h1 style="font-size: 24px; margin-bottom: 24px;">AI Courses</h1>
            <div class="card-grid">
                ${Object.keys(courseData).map(key => `
                    <div class="card">
                        <h3 style="font-size: 16px;">${courseData[key].title}</h3>
                        <p style="font-size: 13px; color: var(--text-muted);">${courseData[key].desc}</p>
                        <button class="btn" style="margin-top: 12px; font-size: 12px;" onclick="startCourse('${key}')">Start Course</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 4. Start Course
function startCourse(courseId) {
    currentCourse = courseData[courseId];
    currentStep = 0;
    testScore = 0;
    renderApp();
}

// 5. Render Wizard
function renderCourseWizard() {
    const step = currentCourse.steps[currentStep];
    
    if (!step) {
        // Course finished
        return `
            <div style="width: 100%; padding: 24px; text-align: center;">
                <h1 style="font-size: 28px; color: #22c55e; margin-bottom: 16px;">🎉 Course Complete!</h1>
                <p style="margin-bottom: 24px;">You have finished ${currentCourse.title}.</p>
                <button class="btn" onclick="currentCourse = null; renderApp();">Back to Courses</button>
            </div>
        `;
    }

    let content = '';
    
    if (step.type === 'reading') {
        content = `
            <p style="font-size: 16px; line-height: 1.8; color: #ccc;">${step.content}</p>
            <button class="btn" style="margin-top: 24px;" onclick="nextCourseStep()">Continue →</button>
        `;
    } 
    else if (step.type === 'questions') {
        content = `
            <h3 style="font-size: 18px; margin-bottom: 16px;">Check Your Understanding</h3>
            <form id="questionForm" onsubmit="submitQuestions(event)">
                ${step.questions.map((q, i) => `
                    <div style="margin-bottom: 20px;">
                        <p style="font-weight: 500; margin-bottom: 8px;">${i + 1}. ${q.q}</p>
                        ${q.options.map((opt, optIndex) => `
                            <label style="display: block; margin-bottom: 6px; cursor: pointer;">
                                <input type="radio" name="q${i}" value="${optIndex}" required style="margin-right: 8px;">
                                ${opt}
                            </label>
                        `).join('')}
                    </div>
                `).join('')}
                <button type="submit" class="btn">Submit Answers</button>
            </form>
        `;
    }
    else if (step.type === 'videos') {
        content = `
            <h3 style="font-size: 18px; margin-bottom: 16px;">Watch These Videos</h3>
            <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 16px;">(In a real app, these would be embedded YouTube players. For now, click the links below.)</p>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                ${step.videos.map(v => `
                    <div class="card" style="padding: 16px;">
                        <h4 style="font-size: 16px;">🎥 ${v.title}</h4>
                        <p style="font-size: 13px; color: var(--text-muted);">Duration: ${v.duration}</p>
                        <a href="${v.url}" target="_blank" class="btn" style="margin-top: 8px; display: inline-block; font-size: 12px;">Watch on YouTube</a>
                    </div>
                `).join('')}
            </div>
            <button class="btn" style="margin-top: 24px;" onclick="nextCourseStep()">I've Watched These →</button>
        `;
    }
    else if (step.type === 'final_test') {
        content = `
            <h3 style="font-size: 18px; margin-bottom: 16px;">Final Test (Need 85% to Pass)</h3>
            <form id="finalTestForm" onsubmit="submitFinalTest(event)">
                ${step.questions.map((q, i) => `
                    <div style="margin-bottom: 20px;">
                        <p style="font-weight: 500; margin-bottom: 8px;">${i + 1}. ${q.q}</p>
                        ${q.options.map((opt, optIndex) => `
                            <label style="display: block; margin-bottom: 6px; cursor: pointer;">
                                <input type="radio" name="fq${i}" value="${optIndex}" required style="margin-right: 8px;">
                                ${opt}
                            </label>
                        `).join('')}
                    </div>
                `).join('')}
                <button type="submit" class="btn" style="background: #22c55e;">Submit Final Test</button>
            </form>
        `;
    }

    return `
        <div style="width: 100%; padding: 24px; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h1 style="font-size: 24px;">${currentCourse.title}</h1>
                <button class="btn btn-outline" onclick="currentCourse = null; renderApp();">Exit Course</button>
            </div>
            <div class="card" style="padding: 32px;">
                ${content}
            </div>
        </div>
    `;
}

// 6. Submit Questions
function submitQuestions(event) {
    event.preventDefault();
    const step = currentCourse.steps[currentStep];
    let correct = 0;
    
    step.questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && parseInt(selected.value) === q.answer) {
            correct++;
        }
    });
    
    const score = (correct / step.questions.length) * 100;
    if (score >= 60) {
        alert(`Passed! You got ${Math.round(score)}%.`);
        nextCourseStep();
    } else {
        alert(`You got ${Math.round(score)}%. You need 60% to continue. Try again.`);
    }
}

// 7. Submit Final Test (Need 85%)
function submitFinalTest(event) {
    event.preventDefault();
    const step = currentCourse.steps[currentStep];
    let correct = 0;
    
    step.questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="fq${i}"]:checked`);
        if (selected && parseInt(selected.value) === q.answer) {
            correct++;
        }
    });
    
    const score = (correct / step.questions.length) * 100;
    
    if (score >= 85) {
        alert(`🎉 Congratulations! You passed with ${Math.round(score)}%. You are now certified in ${currentCourse.title}.`);
        currentCourse = null; // Reset to list
        renderApp();
    } else {
        alert(`You got ${Math.round(score)}%. You need 85% to pass. Review the material and try again.`);
    }
}

// 8. Move to Next Step
function nextCourseStep() {
    currentStep++;
    renderApp();
}

// Export functions
window.startCourse = startCourse;
window.nextCourseStep = nextCourseStep;
window.submitQuestions = submitQuestions;
window.submitFinalTest = submitFinalTest;
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
