// ============================================================
// BLANK LOG — MAIN SITE + 3D STUDIO (CHUNK 1)
// ============================================================
const ACCESS_CODE = 'CASSIE-ENZO';

let AppState = {
    isUnlocked: false,
    activeTab: 'home',
    scene: null,
    renderer: null,
    camera: null,
    controls: null,
    transformControls: null,
    selectedObject: null,
    objects: [],
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
// 3D STUDIO SHELL
// ============================================================
function renderResearchTab() {
    if (!AppState.isUnlocked) return `<div style="text-align:center; padding: 100px 20px;"><h1>Access Denied</h1></div>`;
    
    return `
        <div class="studio-header">
            <div class="studio-title">3D Studio</div>
            <div class="studio-actions">
                <div class="transform-buttons">
                    <button class="transform-btn active" onclick="setTransformMode('translate')">Move</button>
                    <button class="transform-btn" onclick="setTransformMode('rotate')">Rotate</button>
                    <button class="transform-btn" onclick="setTransformMode('scale')">Scale</button>
                </div>
                <button class="btn" onclick="recordVideo()">${AppState.isRecording ? 'Stop Recording' : 'Record Video'}</button>
                <button class="btn btn-outline" onclick="saveProject()">Save</button>
            </div>
        </div>
        <div class="studio-container">
            <div class="studio-panel">
                <div class="panel-section">
                    <h4>Add Objects</h4>
                    <button class="object-btn" onclick="addObject('box')">◼ Cube</button>
                    <button class="object-btn" onclick="addObject('sphere')">● Sphere</button>
                    <button class="object-btn" onclick="addObject('cone')">▲ Cone</button>
                    <button class="object-btn" onclick="addObject('cylinder')">⬒ Cylinder</button>
                    <button class="object-btn" onclick="addObject('plane')">▬ Plane</button>
                </div>
                <div class="panel-section">
                    <h4>Scene Objects</h4>
                    <div id="objectList" style="font-size:13px; color:var(--text-muted);">No objects added.</div>
                </div>
            </div>

            <div class="studio-viewport" id="viewportContainer"></div>

            <div class="studio-panel right">
                <div class="panel-section">
                    <h4>Properties</h4>
                    <div class="studio-controls">
                        <label>Color</label>
                        <input type="color" id="propColor" value="#8b5cf6" onchange="updateSelectedProperty('color', this.value)">
                        <label>Scale</label>
                        <input type="range" id="propScale" min="0.1" max="5" step="0.1" value="1" onchange="updateSelectedProperty('scale', this.value)">
                    </div>
                </div>
                <div class="panel-section">
                    <h4>Custom Code</h4>
                    <textarea id="codeInput" placeholder="// Write custom Three.js code here..."></textarea>
                    <button class="btn" style="width:100%; margin-top:8px; font-size:12px;" onclick="runCustomCode()">Run Code</button>
                </div>
            </div>
        </div>
    `;
}
// ============================================================
// CHUNK 2: THREE.JS ENGINE & OBJECT MANAGER
// ============================================================

function initThreeJS() {
    const container = document.getElementById('viewportContainer');
    if (!container || !window.THREE) return;

    if (AppState.renderer) {
        AppState.renderer.dispose();
        container.innerHTML = '';
    }

    AppState.scene = new THREE.Scene();
    AppState.scene.background = new THREE.Color(0x0a0a0a);
    
    const grid = new THREE.GridHelper(20, 20, 0x333333, 0x111111);
    AppState.scene.add(grid);

    AppState.camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    AppState.camera.position.set(5, 5, 5);
    AppState.camera.lookAt(0, 0, 0);

    AppState.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    AppState.renderer.setSize(container.clientWidth, container.clientHeight);
    AppState.renderer.shadowMap.enabled = true;
    container.appendChild(AppState.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    AppState.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    AppState.scene.add(dirLight);

    // Orbit Controls (Rotate camera around scene)
    if (THREE.OrbitControls) {
        AppState.controls = new THREE.OrbitControls(AppState.camera, AppState.renderer.domElement);
        AppState.controls.enableDamping = true;
        AppState.controls.dampingFactor = 0.05;
    } else {
        // Fallback if OrbitControls didn't load
        console.warn('OrbitControls not loaded. Add the script tag to index.html.');
    }

    // Transform Controls (Move/Rotate/Scale objects)
    if (THREE.TransformControls) {
        AppState.transformControls = new THREE.TransformControls(AppState.camera, AppState.renderer.domElement);
        AppState.transformControls.addEventListener('dragging-changed', function (event) {
            if (AppState.controls) AppState.controls.enabled = !event.value;
        });
        AppState.scene.add(AppState.transformControls);
    } else {
        console.warn('TransformControls not loaded. Add the script tag to index.html.');
    }

    function animate() {
        requestAnimationFrame(animate);
        if (AppState.controls) AppState.controls.update();
        if (AppState.renderer && AppState.scene && AppState.camera) {
            AppState.renderer.render(AppState.scene, AppState.camera);
        }
    }
    animate();

    window.addEventListener('resize', () => {
        if (!container || !AppState.renderer) return;
        AppState.camera.aspect = container.clientWidth / container.clientHeight;
        AppState.camera.updateProjectionMatrix();
        AppState.renderer.setSize(container.clientWidth, container.clientHeight);
    });

    AppState.renderer.domElement.addEventListener('pointerdown', onPointerDown);
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerDown(event) {
    if (!AppState.renderer || !AppState.camera) return;
    
    const rect = AppState.renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, AppState.camera);
    const intersects = raycaster.intersectObjects(AppState.objects, true);

    if (intersects.length > 0) {
        selectObject(intersects[0].object);
    } else {
        selectObject(null);
    }
}

function addObject(type) {
    if (!AppState.scene) return;

    let geometry;
    switch(type) {
        case 'sphere': geometry = new THREE.SphereGeometry(1, 32, 32); break;
        case 'cone': geometry = new THREE.ConeGeometry(1, 2, 32); break;
        case 'cylinder': geometry = new THREE.CylinderGeometry(1, 1, 2, 32); break;
        case 'plane': geometry = new THREE.PlaneGeometry(2, 2); break;
        default: geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    }

    const material = new THREE.MeshStandardMaterial({ 
        color: 0x8b5cf6, 
        roughness: 0.5,
        metalness: 0.2
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.position.set(
        (Math.random() - 0.5) * 4, 
        (Math.random() - 0.5) * 4, 
        (Math.random() - 0.5) * 4
    );
    
    mesh.name = type.charAt(0).toUpperCase() + type.slice(1);
    mesh.userData.id = Date.now();

    AppState.scene.add(mesh);
    AppState.objects.push(mesh);
    
    selectObject(mesh);
    updateObjectList();
}

function selectObject(mesh) {
    if (AppState.transformControls) {
        AppState.transformControls.detach();
    }

    AppState.selectedObject = mesh;

    if (mesh && AppState.transformControls) {
        AppState.transformControls.attach(mesh);
    }

    updateObjectList();
    updatePropertiesPanel();
}

function updateObjectList() {
    const list = document.getElementById('objectList');
    if (!list) return;

    if (AppState.objects.length === 0) {
        list.innerHTML = 'No objects added.';
        return;
    }

    list.innerHTML = AppState.objects.map((obj, i) => `
        <div class="object-item ${AppState.selectedObject === obj ? 'active' : ''}" onclick="selectObject(AppState.objects[${i}])">
            <span>${obj.name}</span>
            <button onclick="event.stopPropagation(); deleteObject(${i})">×</button>
        </div>
    `).join('');
}

function deleteObject(index) {
    const mesh = AppState.objects[index];
    if (!mesh) return;

    AppState.scene.remove(mesh);
    AppState.objects.splice(index, 1);

    if (AppState.selectedObject === mesh) {
        selectObject(null);
    }
    
    updateObjectList();
}

function updatePropertiesPanel() {
    const colorInput = document.getElementById('propColor');
    const scaleInput = document.getElementById('propScale');
    
    if (AppState.selectedObject) {
        if (colorInput) colorInput.value = '#' + AppState.selectedObject.material.color.getHexString();
        if (scaleInput) scaleInput.value = AppState.selectedObject.scale.x;
    }
}

function updateSelectedProperty(prop, value) {
    if (!AppState.selectedObject) return;

    if (prop === 'color') {
        AppState.selectedObject.material.color.set(value);
    } else if (prop === 'scale') {
        const s = parseFloat(value);
        AppState.selectedObject.scale.set(s, s, s);
    }
}

// Export chunk 2 functions
window.addObject = addObject;
window.selectObject = selectObject;
window.deleteObject = deleteObject;
window.updateSelectedProperty = updateSelectedProperty;
// ============================================================
// CHUNK 3: RENDER LOOP, MODAL & CUSTOM CODE
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

    // Add enter key listener for the input
    const input = document.getElementById('accessCode');
    if (input) {
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') verifyCode(); });
        input.focus();
    }

    // Initialize 3D Studio if on Research tab
    if (AppState.activeTab === 'research' && AppState.isUnlocked) {
        setTimeout(initThreeJS, 50);
    }
}

function setTransformMode(mode) {
    if (AppState.transformControls) {
        AppState.transformControls.setMode(mode);
    }
    document.querySelectorAll('.transform-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

function runCustomCode() {
    const code = document.getElementById('codeInput')?.value;
    if (!code || !AppState.scene) return;

    try {
        // Wrap in a function to allow the user to use 'scene', 'selected', and 'THREE'
        const func = new Function('scene', 'selected', 'THREE', code);
        func(AppState.scene, AppState.selectedObject, THREE);
    } catch (err) {
        alert('Code Error: ' + err.message);
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
window.setTransformMode = setTransformMode;
window.runCustomCode = runCustomCode;
window.openModal = openModal;
window.closeModal = closeModal;
window.verifyCode = verifyCode;

// Initial render
renderApp();
// ============================================================
// CHUNK 4: RECORDING & SAVING TO DATABASE
// ============================================================

function recordVideo() {
    if (!AppState.renderer) return;
    
    if (AppState.isRecording) {
        AppState.mediaRecorder.stop();
        AppState.isRecording = false;
        renderApp(); 
        return;
    }

    try {
        const canvas = AppState.renderer.domElement;
        const stream = canvas.captureStream(60); // 60 FPS
        AppState.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
        AppState.recordedChunks = [];

        AppState.mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) AppState.recordedChunks.push(e.data);
        };

        AppState.mediaRecorder.onstop = () => {
            const blob = new Blob(AppState.recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'blank-log-ad-' + Date.now() + '.webm';
            a.click();
            URL.revokeObjectURL(url);
            alert('Video recorded and downloaded! You can now use this for ads.');
        };

        AppState.mediaRecorder.start();
        AppState.isRecording = true;
        renderApp();
    } catch (e) {
        alert('Recording Error: ' + e.message);
    }
}

async function saveProject() {
    const title = prompt("Enter project name:", "My 3D Scene");
    if (!title) return;
    
    // Serialize the scene objects
    const sceneData = AppState.objects.map(obj => ({
        name: obj.name,
        position: { x: obj.position.x, y: obj.position.y, z: obj.position.z },
        rotation: { x: obj.rotation.x, y: obj.rotation.y, z: obj.rotation.z },
        scale: { x: obj.scale.x, y: obj.scale.y, z: obj.scale.z },
        color: obj.material.color.getHexString()
    }));
    
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to be logged in to save. (Login integration coming soon).');
        return;
    }

    try {
        const res = await fetch('/api/research', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify({ title, type: '3d_model', data: sceneData })
        });
        
        if (res.ok) alert('Project saved successfully to database!');
        else alert('Error saving project. Check console.');
    } catch(e) { 
        alert('Network error: ' + e.message); 
    }
}

// Export recording and saving functions
window.recordVideo = recordVideo;
window.saveProject = saveProject;
