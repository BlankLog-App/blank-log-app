// ============================================================
// BLANK LOG — MAIN SITE + 3D RESEARCH STUDIO
// ============================================================

const ACCESS_CODE = 'CASSIE-ENZO';
let AppState = {
    isUnlocked: false,
    activeTab: 'home',
    projects: [],
    scene: null,
    renderer: null,
    camera: null,
    object: null,
    isRecording: false,
    mediaRecorder: null,
    recordedChunks: []
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
    if (tabId !== 'research') {
        if (AppState.renderer) { AppState.renderer.dispose(); AppState.renderer = null; }
    }
    renderApp();
}

// ============================================================
// RENDER FUNCTIONS
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
        <div class="fade-in">
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
        <div class="fade-in">
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
        <div class="fade-in">
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
        <div class="fade-in">
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
// 3D STUDIO (RESEARCH TAB)
// ============================================================
function renderResearchTab() {
    if (!AppState.isUnlocked) return `<div style="text-align:center; padding: 100px 20px;"><h1>Access Denied</h1></div>`;
    
    return `
        <div class="fade-in">
            <h1>3D Research Studio</h1>
            <p class="subtitle">Create 3D models, record them as video ads, and save your projects.</p>
            
            <div class="studio-container">
                <div class="studio-sidebar">
                    <div class="studio-controls">
                        <label>Object Shape</label>
                        <select id="shapeSelect" onchange="changeShape(this.value)">
                            <option value="cube">Cube</option>
                            <option value="sphere">Sphere</option>
                            <option value="cone">Cone</option>
                            <option value="torus">Torus</option>
                        </select>
                        
                        <label>Color</label>
                        <input type="color" id="colorPicker" value="#8b5cf6" onchange="changeColor(this.value)">
                        
                        <label>Custom Code (Three.js)</label>
                        <textarea id="codeInput" placeholder="// Use scene, object, or add your own code here..."></textarea>
                        <button class="btn" style="width:100%; margin-top:8px; font-size:12px;" onclick="runCustomCode()">Run Code</button>
                        
                        <button class="btn" style="width:100%; margin-top:16px; background:#22c55e;" onclick="recordVideo()">${AppState.isRecording ? 'Stop Recording' : 'Record Video'}</button>
                        <button class="btn btn-outline" style="width:100%; margin-top:8px;" onclick="saveProject()">Save Project</button>
                    </div>
                    
                    <div class="project-list" id="projectList">
                        <p style="color:var(--text-muted); font-size:12px;">No saved projects yet.</p>
                    </div>
                </div>
                
                <div class="studio-canvas-container" id="canvasContainer"></div>
            </div>
            ${renderFooter()}
        </div>
    `;
}

// ============================================================
// THREE.JS ENGINE
// ============================================================
function initThreeJS() {
    const container = document.getElementById('canvasContainer');
    if (!container || !window.THREE) return;
    
    // Clean up old renderer
    if (AppState.renderer) {
        AppState.renderer.dispose();
        container.innerHTML = '';
    }

    AppState.scene = new THREE.Scene();
    AppState.scene.background = new THREE.Color(0x0a0a0a);

    AppState.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    AppState.camera.position.z = 3;

    AppState.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    AppState.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(AppState.renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    AppState.scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    AppState.scene.add(directionalLight);

    changeShape('cube'); // Default shape

    const animate = function () {
        requestAnimationFrame(animate);
        if (AppState.object) {
            AppState.object.rotation.x += 0.01;
            AppState.object.rotation.y += 0.01;
        }
        AppState.renderer.render(AppState.scene, AppState.camera);
    };
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        if (!container || !AppState.renderer) return;
        AppState.camera.aspect = container.clientWidth / container.clientHeight;
        AppState.camera.updateProjectionMatrix();
        AppState.renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function changeShape(shape) {
    if (!AppState.scene) return;
    if (AppState.object) AppState.scene.remove(AppState.object);

    let geometry;
    switch(shape) {
        case 'sphere': geometry = new THREE.SphereGeometry(1, 32, 32); break;
        case 'cone': geometry = new THREE.ConeGeometry(1, 2, 32); break;
        case 'torus': geometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100); break;
        default: geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    }

    const material = new THREE.MeshStandardMaterial({ color: 0x8b5cf6 });
    AppState.object = new THREE.Mesh(geometry, material);
    AppState.scene.add(AppState.object);
}

function changeColor(color) {
    if (AppState.object) AppState.object.material.color.set(color);
}

function runCustomCode() {
    const code = document.getElementById('codeInput')?.value;
    if (!code || !AppState.scene) return;
    try {
        // Eval is dangerous in production, but fine for a local sandbox
        const func = new Function('scene', 'object', 'THREE', code);
        func(AppState.scene, AppState.object, THREE);
    } catch (err) {
        alert('Code Error: ' + err.message);
    }
}

// ============================================================
// RECORDING & SAVING
// ============================================================
function recordVideo() {
    if (!AppState.renderer) return;
    
    if (AppState.isRecording) {
        AppState.mediaRecorder.stop();
        AppState.isRecording = false;
        renderApp(); // Update button text
        return;
    }

    const canvas = AppState.renderer.domElement;
    const stream = canvas.captureStream(30);
    AppState.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    AppState.recordedChunks = [];

    AppState.mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) AppState.recordedChunks.push(e.data);
    };

    AppState.mediaRecorder.onstop = () => {
        const blob = new Blob(AppState.recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'blank-log-ad.webm';
        a.click();
        URL.revokeObjectURL(url);
        alert('Video recorded and downloaded!');
    };

    AppState.mediaRecorder.start();
    AppState.isRecording = true;
    renderApp();
}

async function saveProject() {
    const title = prompt("Enter project name:", "My 3D Model");
    if (!title) return;
    
    const fakeData = { shape: document.getElementById('shapeSelect')?.value, color: document.getElementById('colorPicker')?.value, code: document.getElementById('codeInput')?.value };
    
    try {
        const res = await fetch('/api/research', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (localStorage.getItem('token') || '') },
            body: JSON.stringify({ title, type: '3d_model', data: fakeData })
        });
        if (res.ok) alert('Project saved to database!');
        else alert('Error saving project. Check console.');
    } catch(e) { alert('Network error: ' + e.message); }
}
// ============================================================
// MAIN RENDER & MODAL LOGIC
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
        
        <!-- Hidden Trigger -->
        <div class="hidden-trigger" onclick="openModal()">◼</div>
        
        <!-- Secret Modal -->
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

    // Add enter key listener for the input
    const input = document.getElementById('accessCode');
    if (input) {
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') verifyCode(); });
        input.focus();
    }

    // If we are on the Research tab, initialize Three.js
    if (AppState.activeTab === 'research' && AppState.isUnlocked) {
        setTimeout(initThreeJS, 50);
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

// ============================================================
// GLOBAL EXPORTS & INIT
// ============================================================
window.setActiveTab = setActiveTab;
window.openModal = openModal;
window.closeModal = closeModal;
window.verifyCode = verifyCode;
window.changeShape = changeShape;
window.changeColor = changeColor;
window.runCustomCode = runCustomCode;
window.recordVideo = recordVideo;
window.saveProject = saveProject;

// Initial render
renderApp();
