// --- CONFIGURATION & STATE ---
const DEFAULT_PRESET = {
    xPoints: [58, 108, 382, 435, 495, 1590, 1645, 2465, 2520, 3618, 3670, 3725, 4000, 4055, 4108, 5425, 6685],
    yPoints: [],
    showGuidelines: false,
    shapes: []
};

let appState = {
    config: JSON.parse(JSON.stringify(DEFAULT_PRESET)), // Deep copy
    presets: loadPresets(),
    overlay: {
        image: null,
        x: 0,
        y: 0,
        opacity: 50,
        scale: 100,
        locked: false
    },
    isMeasuringMode: false // Track if user is in measurement mode (independent of fullscreen)
};

// --- DOM ELEMENTS ---
const startBtn = document.getElementById('startBtn');
const displayValue = document.querySelector('.dimensions-value');
const toggleGuidelinesBtn = document.getElementById('toggleGuidelinesBtn');
const settingsBtn = document.getElementById('settingsBtn');
const keyboardHelpBtn = document.getElementById('keyboardHelpBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Settings Inputs
const inputXPoints = document.getElementById('inputXPoints');
const inputYPoints = document.getElementById('inputYPoints');
const applyMarkersBtn = document.getElementById('applyMarkersBtn');

// Shape Inputs
const shapeName = document.getElementById('shapeName');
const shapeX = document.getElementById('shapeX');
const shapeY = document.getElementById('shapeY');
const shapeW = document.getElementById('shapeW');
const shapeH = document.getElementById('shapeH');
const shapeColor = document.getElementById('shapeColor');
const addShapeBtn = document.getElementById('addShapeBtn');
const shapeList = document.getElementById('shapeList');

// Preset List
const presetList = document.getElementById('presetList');
const exportAllPresetsBtn = document.getElementById('exportAllPresetsBtn');
const importPresetsBtn = document.getElementById('importPresetsBtn');
const importFileInput = document.getElementById('importFileInput');
const importSingleFileInput = document.getElementById('importSingleFileInput');

// Overlay Controls
const overlayImageInput = document.getElementById('overlayImageInput');
const overlayOpacity = document.getElementById('overlayOpacity');
const overlayOpacityValue = document.getElementById('overlayOpacityValue');
const overlayScale = document.getElementById('overlayScale');
const overlayScaleValue = document.getElementById('overlayScaleValue');
const overlayLock = document.getElementById('overlayLock');
const overlayResetBtn = document.getElementById('overlayResetBtn');
const overlayClearBtn = document.getElementById('overlayClearBtn');
const backgroundOverlay = document.getElementById('backgroundOverlay');

// Containers
const guidelinesContainer = document.getElementById('guidelinesContainer');
const shapesContainer = document.getElementById('shapesContainer');
const exitFullScreenBtn = document.getElementById('exitFullScreenBtn');


// --- INITIALIZATION ---
function init() {
    updateDimensions();
    generateRulerNumbers();
    loadCurrentConfig();
    updateMainToggleState();

    // Set initial shape name
    if (appState.config && appState.config.shapes) {
        shapeName.value = `Rect ${appState.config.shapes.length + 1}`;
    }

    renderApp();
    renderPresetsList();
}


// --- CORE FUNCTIONS ---

function updateDimensions() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    displayValue.textContent = `${width} × ${height}`;
}

function generateRulerNumbers() {
    document.querySelectorAll('.ruler-number').forEach(el => el.remove());

    const rulerTop = document.querySelector('.ruler-top');
    const rulerLeft = document.querySelector('.ruler-left');
    const rulerRight = document.querySelector('.ruler-right');
    const rulerBottom = document.querySelector('.ruler-bottom');

    const maxW = Math.max(window.innerWidth, window.screen.width) + 100;
    const maxH = Math.max(window.innerHeight, window.screen.height) + 100;

    const fragmentTop = document.createDocumentFragment();
    const fragmentBottom = document.createDocumentFragment();

    for (let i = 100; i < maxW; i += 100) {
        const spanT = document.createElement('span');
        spanT.className = 'ruler-number';
        spanT.innerText = i;
        spanT.style.left = `${i}px`;
        fragmentTop.appendChild(spanT);

        const spanB = document.createElement('span');
        spanB.className = 'ruler-number';
        spanB.innerText = i;
        spanB.style.left = `${i}px`;
        fragmentBottom.appendChild(spanB);
    }

    if (rulerTop) rulerTop.appendChild(fragmentTop);
    if (rulerBottom) rulerBottom.appendChild(fragmentBottom);

    const fragmentLeft = document.createDocumentFragment();
    const fragmentRight = document.createDocumentFragment();

    for (let i = 100; i < maxH; i += 100) {
        const spanL = document.createElement('span');
        spanL.className = 'ruler-number';
        spanL.innerText = i;
        spanL.style.top = `${i}px`;
        fragmentLeft.appendChild(spanL);

        const spanR = document.createElement('span');
        spanR.className = 'ruler-number';
        spanR.innerText = i;
        spanR.style.top = `${i}px`;
        fragmentRight.appendChild(spanR);
    }

    if (rulerLeft) rulerLeft.appendChild(fragmentLeft);
    if (rulerRight) rulerRight.appendChild(fragmentRight);
}

function renderApp() {
    renderMarkers();
    renderGuidelines();
    renderShapes();
    updateSettingsForm();
    renderShapeList();
    updateMainToggleState();
}

function renderMarkers() {
    document.querySelectorAll('.ruler-marker-highlight, .ruler-marker-highlight-label').forEach(el => el.remove());

    const rulerTop = document.querySelector('.ruler-top');
    const rulerLeft = document.querySelector('.ruler-left');
    const rulerRight = document.querySelector('.ruler-right');
    const rulerBottom = document.querySelector('.ruler-bottom');

    const fragmentTop = document.createDocumentFragment();
    const fragmentBottom = document.createDocumentFragment();
    const fragmentLeft = document.createDocumentFragment();
    const fragmentRight = document.createDocumentFragment();

    appState.config.xPoints.forEach(point => {
        if (point <= window.innerWidth + 500) {
            createHighlightMarker(point, fragmentTop, 'horizontal');
            createHighlightMarker(point, fragmentBottom, 'horizontal');
        }
    });

    appState.config.yPoints.forEach(point => {
        if (point <= window.innerHeight + 500) {
            createHighlightMarker(point, fragmentLeft, 'vertical');
            createHighlightMarker(point, fragmentRight, 'vertical');
        }
    });

    if (rulerTop) rulerTop.appendChild(fragmentTop);
    if (rulerBottom) rulerBottom.appendChild(fragmentBottom);
    if (rulerLeft) rulerLeft.appendChild(fragmentLeft);
    if (rulerRight) rulerRight.appendChild(fragmentRight);
}

function createHighlightMarker(value, fragment, orientation) {
    const marker = document.createElement('div');
    marker.className = 'ruler-marker-highlight';

    const label = document.createElement('div');
    label.className = 'ruler-marker-highlight-label';
    label.innerText = value;

    if (orientation === 'horizontal') {
        marker.style.left = `${value}px`;
        label.style.left = `${value}px`;
    } else {
        marker.style.top = `${value}px`;
        label.style.top = `${value}px`;
    }

    fragment.appendChild(marker);
    fragment.appendChild(label);
}

function renderGuidelines() {
    guidelinesContainer.innerHTML = '';
    if (!appState.config.showGuidelines) return;

    const fragment = document.createDocumentFragment();

    appState.config.xPoints.forEach(x => {
        const line = document.createElement('div');
        line.className = 'guideline guideline-x';
        line.style.left = `${x}px`;
        fragment.appendChild(line);
    });

    appState.config.yPoints.forEach(y => {
        const line = document.createElement('div');
        line.className = 'guideline guideline-y';
        line.style.top = `${y}px`;
        fragment.appendChild(line);
    });

    appState.config.xPoints.forEach(x => {
        appState.config.yPoints.forEach(y => {
            if (x >= 0 && x <= window.innerWidth && y >= 0 && y <= window.innerHeight) {
                const label = document.createElement('div');
                label.className = 'guideline-intersection-label';
                label.style.left = `${x}px`;
                label.style.top = `${y}px`;
                label.innerText = `${x}, ${y}`;
                fragment.appendChild(label);
            }
        });
    });

    guidelinesContainer.appendChild(fragment);
}

function renderShapes() {
    shapesContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    appState.config.shapes.forEach(shape => {
        const el = document.createElement('div');
        el.className = 'custom-shape';
        el.style.left = `${shape.x}px`;
        el.style.top = `${shape.y}px`;
        el.style.width = `${shape.w}px`;
        el.style.height = `${shape.h}px`;
        el.style.borderColor = shape.color;
        el.style.color = shape.color;

        const labelPos = document.createElement('div');
        labelPos.className = 'shape-label-pos';
        labelPos.innerText = `${shape.x}, ${shape.y} - ${shape.name}`;
        el.appendChild(labelPos);

        const labelSize = document.createElement('div');
        labelSize.className = 'shape-label-size';
        labelSize.innerText = `${shape.w} × ${shape.h}`;
        el.appendChild(labelSize);

        fragment.appendChild(el);
    });

    shapesContainer.appendChild(fragment);
}

// --- STATE & STORAGE MANAGEMENT (with error handling) ---

function loadPresets() {
    try {
        const stored = localStorage.getItem('screen_ruler_presets_v2');
        if (stored) {
            const parsed = JSON.parse(stored);
            // Validate structure
            if (typeof parsed === 'object' && parsed !== null) {
                return parsed;
            }
        }
    } catch (error) {
        console.error('Failed to load presets from localStorage:', error);
        // Fall through to default initialization
    }

    // Initialize with 10 slots
    let presets = {};
    for (let i = 1; i <= 10; i++) {
        presets[`Preset ${i}`] = {
            name: `Preset ${i}`,
            config: null
        };
    }
    presets['Preset 1'].config = JSON.parse(JSON.stringify(DEFAULT_PRESET));
    presets['Preset 1'].name = "Default";
    return presets;
}

function savePresetsToStorage() {
    try {
        localStorage.setItem('screen_ruler_presets_v2', JSON.stringify(appState.presets));
        renderPresetsList();
    } catch (error) {
        console.error('Failed to save presets to localStorage:', error);
        alert('Unable to save presets. Storage may be full or disabled.');
    }
}

function loadCurrentConfig() {
    // Start with Default
}

function updateSettingsForm() {
    inputXPoints.value = appState.config.xPoints.join(', ');
    inputYPoints.value = appState.config.yPoints.join(', ');
}

function updateMainToggleState() {
    const isActive = appState.config.showGuidelines;
    if (isActive) {
        toggleGuidelinesBtn.classList.add('active');
        toggleGuidelinesBtn.setAttribute('aria-pressed', 'true');
    } else {
        toggleGuidelinesBtn.classList.remove('active');
        toggleGuidelinesBtn.setAttribute('aria-pressed', 'false');
    }
}

function getPointsFromInput(str) {
    return str.split(',')
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n))
        .sort((a, b) => a - b);
}

function applyConfigFromForm() {
    appState.config.xPoints = getPointsFromInput(inputXPoints.value);
    appState.config.yPoints = getPointsFromInput(inputYPoints.value);
    renderApp();
}

function sanitizeInput(input) {
    // Basic XSS prevention - remove HTML tags
    const div = document.createElement('div');
    div.textContent = input;
    return div.textContent;
}

function addShape() {
    const sanitizedName = sanitizeInput(shapeName.value || `Rect ${appState.config.shapes.length + 1}`);
    const s = {
        name: sanitizedName,
        x: parseInt(shapeX.value) || 0,
        y: parseInt(shapeY.value) || 0,
        w: parseInt(shapeW.value) || 100,
        h: parseInt(shapeH.value) || 100,
        color: shapeColor.value
    };
    appState.config.shapes.push(s);

    // Auto-increment name for next shape
    shapeName.value = `Rect ${appState.config.shapes.length + 1}`;

    renderApp();
}

function updateShape(index, key, value) {
    if (key === 'x' || key === 'y' || key === 'w' || key === 'h') {
        value = parseInt(value) || 0;
    } else if (key === 'name') {
        value = sanitizeInput(value);
    }
    appState.config.shapes[index][key] = value;
    renderApp();
}

function removeShape(index) {
    appState.config.shapes.splice(index, 1);
    renderApp();
}

function renderShapeList() {
    shapeList.innerHTML = '';
    appState.config.shapes.forEach((shape, idx) => {
        const item = document.createElement('div');
        item.className = 'shape-item';

        // Shape info section (name + color)
        const infoSection = document.createElement('div');
        infoSection.className = 'shape-item-info';

        const inputName = document.createElement('input');
        inputName.type = 'text';
        inputName.value = shape.name || `Rect ${idx + 1}`;
        inputName.className = 'shape-item-name';
        inputName.setAttribute('aria-label', `Shape ${idx + 1} name`);
        inputName.onchange = (e) => updateShape(idx, 'name', e.target.value);

        const inputColor = document.createElement('input');
        inputColor.type = 'color';
        inputColor.value = shape.color;
        inputColor.className = 'shape-item-color';
        inputColor.setAttribute('aria-label', `Shape ${idx + 1} color`);
        inputColor.onchange = (e) => updateShape(idx, 'color', e.target.value);

        infoSection.appendChild(inputName);
        infoSection.appendChild(inputColor);

        // Shape dimensions section
        const dimsSection = document.createElement('div');
        dimsSection.className = 'shape-item-dims';

        const inputX = document.createElement('input');
        inputX.type = 'number';
        inputX.value = shape.x;
        inputX.className = 'shape-item-input';
        inputX.setAttribute('aria-label', `Shape ${idx + 1} X position`);
        inputX.onchange = (e) => updateShape(idx, 'x', e.target.value);

        const inputY = document.createElement('input');
        inputY.type = 'number';
        inputY.value = shape.y;
        inputY.className = 'shape-item-input';
        inputY.setAttribute('aria-label', `Shape ${idx + 1} Y position`);
        inputY.onchange = (e) => updateShape(idx, 'y', e.target.value);

        const inputW = document.createElement('input');
        inputW.type = 'number';
        inputW.value = shape.w;
        inputW.className = 'shape-item-input';
        inputW.setAttribute('aria-label', `Shape ${idx + 1} width`);
        inputW.onchange = (e) => updateShape(idx, 'w', e.target.value);

        const inputH = document.createElement('input');
        inputH.type = 'number';
        inputH.value = shape.h;
        inputH.className = 'shape-item-input';
        inputH.setAttribute('aria-label', `Shape ${idx + 1} height`);
        inputH.onchange = (e) => updateShape(idx, 'h', e.target.value);

        dimsSection.appendChild(inputX);
        dimsSection.appendChild(inputY);
        dimsSection.appendChild(inputW);
        dimsSection.appendChild(inputH);

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.className = 'shape-item-delete';
        delBtn.innerText = 'Delete';
        delBtn.setAttribute('aria-label', `Delete shape ${idx + 1}`);
        delBtn.onclick = () => removeShape(idx);

        // Assemble item
        item.appendChild(infoSection);
        item.appendChild(dimsSection);
        item.appendChild(delBtn);

        shapeList.appendChild(item);
    });
}

function renderPresetsList() {
    presetList.innerHTML = '';
    Object.keys(appState.presets).forEach(key => {
        const presetData = appState.presets[key];
        const isEmpty = presetData.config === null;

        // Main preset item container
        const div = document.createElement('div');
        div.className = `preset-item ${isEmpty ? 'preset-empty' : 'preset-saved'}`;

        // Header section (name + status badge)
        const headerDiv = document.createElement('div');
        headerDiv.className = 'preset-header';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'preset-name-input';
        nameInput.value = presetData.name;
        nameInput.setAttribute('aria-label', `Preset ${key} name`);
        nameInput.onchange = (e) => {
            appState.presets[key].name = sanitizeInput(e.target.value);
            savePresetsToStorage();
        };

        const statusBadge = document.createElement('span');
        statusBadge.className = `preset-status-badge ${isEmpty ? 'empty' : 'saved'}`;
        statusBadge.innerText = isEmpty ? 'Empty' : 'Saved';
        statusBadge.setAttribute('aria-label', isEmpty ? 'Empty preset slot' : 'Saved preset');

        headerDiv.appendChild(nameInput);
        headerDiv.appendChild(statusBadge);

        // Actions section with grouped buttons
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'preset-actions';

        // Primary actions group (Load + Save)
        const primaryGroup = document.createElement('div');
        primaryGroup.className = 'preset-actions-primary';

        const loadBtn = document.createElement('button');
        loadBtn.className = 'btn-load';
        loadBtn.innerText = 'Load';
        loadBtn.setAttribute('aria-label', `Load preset ${presetData.name}`);
        loadBtn.onclick = () => loadPreset(key);
        if (isEmpty) {
            loadBtn.disabled = true;
            loadBtn.style.opacity = '0.5';
            loadBtn.style.cursor = 'not-allowed';
        }

        const saveBtn = document.createElement('button');
        saveBtn.className = 'btn-save';
        saveBtn.innerText = 'Save';
        saveBtn.setAttribute('aria-label', `Save current config to ${presetData.name}`);
        saveBtn.onclick = () => savePreset(key);

        primaryGroup.appendChild(loadBtn);
        primaryGroup.appendChild(saveBtn);

        // Secondary actions group (Export + Import + Delete)
        const secondaryGroup = document.createElement('div');
        secondaryGroup.className = 'preset-actions-secondary';

        const exportBtn = document.createElement('button');
        exportBtn.className = 'btn-export';
        exportBtn.innerText = 'Export';
        exportBtn.setAttribute('aria-label', `Export preset ${presetData.name}`);
        exportBtn.onclick = () => exportSinglePreset(key);
        if (isEmpty) {
            exportBtn.disabled = true;
        }

        const importBtn = document.createElement('button');
        importBtn.className = 'btn-import';
        importBtn.innerText = 'Import';
        importBtn.setAttribute('aria-label', `Import preset to ${presetData.name}`);
        importBtn.onclick = () => importSinglePreset(key);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.innerText = 'Delete';
        deleteBtn.setAttribute('aria-label', `Delete preset ${presetData.name}`);
        deleteBtn.onclick = () => deletePreset(key);

        secondaryGroup.appendChild(exportBtn);
        secondaryGroup.appendChild(importBtn);
        secondaryGroup.appendChild(deleteBtn);

        actionsDiv.appendChild(primaryGroup);
        actionsDiv.appendChild(secondaryGroup);

        // Assemble preset item
        div.appendChild(headerDiv);
        div.appendChild(actionsDiv);

        presetList.appendChild(div);
    });
}

window.loadPreset = function (key) {
    if (appState.presets[key] && appState.presets[key].config) {
        appState.config = JSON.parse(JSON.stringify(appState.presets[key].config));
        renderApp();
    } else {
        console.warn('Preset empty');
    }
};

window.savePreset = function (key) {
    appState.presets[key].config = JSON.parse(JSON.stringify(appState.config));
    savePresetsToStorage();
    renderPresetsList();
};

window.deletePreset = async function (key) {
    const confirmed = await showConfirmDialog(
        'Delete Preset',
        `Are you sure you want to delete preset "${appState.presets[key].name}"?`
    );

    if (confirmed) {
        appState.presets[key].config = null;
        savePresetsToStorage();
    }
};

window.removeShape = removeShape;

// --- CONFIRMATION DIALOG ---
const confirmDialog = document.getElementById('confirmDialog');
const confirmTitle = document.getElementById('confirm-title');
const confirmMessage = document.getElementById('confirm-message');
const confirmOkBtn = document.getElementById('confirmOkBtn');
const confirmCancelBtn = document.getElementById('confirmCancelBtn');

function showConfirmDialog(title, message) {
    return new Promise((resolve) => {
        confirmTitle.textContent = title;
        confirmMessage.textContent = message;
        confirmDialog.setAttribute('aria-hidden', 'false');

        const handleOk = () => {
            cleanup();
            resolve(true);
        };

        const handleCancel = () => {
            cleanup();
            resolve(false);
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                cleanup();
                resolve(false);
            }
        };

        const cleanup = () => {
            confirmDialog.setAttribute('aria-hidden', 'true');
            confirmOkBtn.removeEventListener('click', handleOk);
            confirmCancelBtn.removeEventListener('click', handleCancel);
            document.removeEventListener('keydown', handleEscape);
        };

        confirmOkBtn.addEventListener('click', handleOk);
        confirmCancelBtn.addEventListener('click', handleCancel);
        document.addEventListener('keydown', handleEscape);

        // Focus OK button
        setTimeout(() => confirmOkBtn.focus(), 100);
    });
}

// --- EXPORT/IMPORT FUNCTIONS ---

async function exportSinglePreset(key) {
    const presetData = appState.presets[key];
    if (!presetData || !presetData.config) {
        await showConfirmDialog('Export Error', 'Cannot export empty preset');
        return;
    }

    const exportData = {
        version: '2.0',
        exported: new Date().toISOString(),
        preset: {
            name: presetData.name,
            config: presetData.config
        }
    };

    downloadJSON(exportData, `matrix-led-preset-${sanitizeFilename(presetData.name)}.json`);
}

function exportAllPresets() {
    const exportData = {
        version: '2.0',
        exported: new Date().toISOString(),
        presets: appState.presets
    };

    downloadJSON(exportData, `matrix-led-all-presets-${getTimestamp()}.json`);
}

function importPresets(file) {
    const reader = new FileReader();

    reader.onload = async (e) => {
        try {
            const importedData = JSON.parse(e.target.result);

            // Validate structure
            if (!importedData.version) {
                throw new Error('Invalid file format: missing version');
            }

            // Handle single preset import
            if (importedData.preset) {
                const confirmed = await showConfirmDialog(
                    'Import Preset',
                    `Import preset "${importedData.preset.name}"?\n\nThis will add it to an empty slot.`
                );

                if (confirmed) {
                    // Find empty slot
                    const emptySlot = Object.keys(appState.presets).find(key => appState.presets[key].config === null);

                    if (emptySlot) {
                        appState.presets[emptySlot] = {
                            name: importedData.preset.name,
                            config: importedData.preset.config
                        };
                        savePresetsToStorage();
                    } else {
                        await showConfirmDialog(
                            'No Empty Slots',
                            'No empty slots available. Please delete a preset first.'
                        );
                    }
                }
            }
            // Handle multiple presets import
            else if (importedData.presets) {
                const confirmed = await showConfirmDialog(
                    'Import All Presets',
                    `Import ${Object.keys(importedData.presets).length} presets?\n\nWarning: This will replace ALL existing presets.`
                );

                if (confirmed) {
                    appState.presets = importedData.presets;
                    savePresetsToStorage();
                }
            } else {
                throw new Error('Invalid file format: no preset data found');
            }

            renderApp();
        } catch (error) {
            console.error('Import error:', error);
            await showConfirmDialog(
                'Import Error',
                `Failed to import presets: ${error.message}`
            );
        }
    };

    reader.onerror = async () => {
        await showConfirmDialog('File Error', 'Failed to read file');
    };

    reader.readAsText(file);
}

let targetPresetSlot = null; // Track which slot to import to

function importSinglePreset(key) {
    targetPresetSlot = key;
    filePickerOpen = true;
    importSingleFileInput.click();
}

function processSinglePresetImport(file) {
    if (!targetPresetSlot) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
        try {
            const importedData = JSON.parse(e.target.result);

            // Validate structure
            if (!importedData.version) {
                throw new Error('Invalid file format: missing version');
            }

            // Must be single preset format
            if (!importedData.preset) {
                throw new Error('Invalid file: expected single preset format');
            }

            const currentPreset = appState.presets[targetPresetSlot];
            const hasExistingData = currentPreset.config !== null;

            let confirmed = true;
            if (hasExistingData) {
                confirmed = await showConfirmDialog(
                    'Overwrite Preset',
                    `Replace "${currentPreset.name}" with "${importedData.preset.name}"?`
                );
            }

            if (confirmed) {
                appState.presets[targetPresetSlot] = {
                    name: importedData.preset.name,
                    config: importedData.preset.config
                };
                savePresetsToStorage();
                renderApp();
            }
        } catch (error) {
            console.error('Import error:', error);
            await showConfirmDialog(
                'Import Error',
                `Failed to import preset: ${error.message}`
            );
        } finally {
            targetPresetSlot = null;
        }
    };

    reader.onerror = async () => {
        await showConfirmDialog('File Error', 'Failed to read file');
        targetPresetSlot = null;
    };

    reader.readAsText(file);
}

// Helper: Download JSON file
function downloadJSON(data, filename) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Helper: Sanitize filename
function sanitizeFilename(name) {
    return name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

// Helper: Get timestamp for filename
function getTimestamp() {
    const now = new Date();
    return now.toISOString().replace(/[:.]/g, '-').split('T')[0];
}

window.exportSinglePreset = exportSinglePreset;

// --- BACKGROUND OVERLAY FUNCTIONS ---

let overlayImage = null;
let overlayDragging = false;
let overlayStartX, overlayStartY, overlayOffsetX, overlayOffsetY;

function handleOverlayImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        appState.overlay.image = event.target.result;
        renderOverlay();
    };
    reader.readAsDataURL(file);

    // Re-enter fullscreen after file selected
    reenterFullscreen();
}

function renderOverlay() {
    backgroundOverlay.innerHTML = '';

    if (!appState.overlay.image) return;

    const img = document.createElement('img');
    img.src = appState.overlay.image;
    img.style.opacity = appState.overlay.opacity / 100;
    img.style.transform = `scale(${appState.overlay.scale / 100})`;
    img.style.left = `${appState.overlay.x}px`;
    img.style.top = `${appState.overlay.y}px`;

    if (appState.overlay.locked) {
        img.classList.add('locked');
    }

    // Setup dragging
    img.addEventListener('mousedown', startOverlayDrag);
    img.addEventListener('touchstart', startOverlayDrag);

    backgroundOverlay.appendChild(img);
    overlayImage = img;
}

function startOverlayDrag(e) {
    if (appState.overlay.locked) return;

    overlayDragging = true;

    if (e.type === 'touchstart') {
        overlayStartX = e.touches[0].clientX - appState.overlay.x;
        overlayStartY = e.touches[0].clientY - appState.overlay.y;
    } else {
        overlayStartX = e.clientX - appState.overlay.x;
        overlayStartY = e.clientY - appState.overlay.y;
        e.preventDefault();
    }
}

function dragOverlay(e) {
    if (!overlayDragging) return;

    let clientX, clientY;
    if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    appState.overlay.x = clientX - overlayStartX;
    appState.overlay.y = clientY - overlayStartY;

    if (overlayImage) {
        overlayImage.style.left = `${appState.overlay.x}px`;
        overlayImage.style.top = `${appState.overlay.y}px`;
    }
}

function stopOverlayDrag() {
    overlayDragging = false;
}

function updateOverlayOpacity(value) {
    appState.overlay.opacity = parseInt(value);
    overlayOpacityValue.textContent = value;
    if (overlayImage) {
        overlayImage.style.opacity = value / 100;
    }
}

function updateOverlayScale(value) {
    appState.overlay.scale = parseInt(value);
    overlayScaleValue.textContent = value;
    if (overlayImage) {
        overlayImage.style.transform = `scale(${value / 100})`;
    }
}

function toggleOverlayLock(locked) {
    appState.overlay.locked = locked;
    if (overlayImage) {
        if (locked) {
            overlayImage.classList.add('locked');
        } else {
            overlayImage.classList.remove('locked');
        }
    }
}

function resetOverlayPosition() {
    appState.overlay.x = 0;
    appState.overlay.y = 0;
    if (overlayImage) {
        overlayImage.style.left = '0px';
        overlayImage.style.top = '0px';
    }
}

async function clearOverlay() {
    const confirmed = await showConfirmDialog(
        'Clear Overlay',
        'Clear background image?'
    );

    if (confirmed) {
        appState.overlay.image = null;
        appState.overlay.x = 0;
        appState.overlay.y = 0;
        backgroundOverlay.innerHTML = '';
        overlayImage = null;
        overlayImageInput.value = '';
    }
}

// Global drag listeners for overlay
document.addEventListener('mousemove', dragOverlay);
document.addEventListener('mouseup', stopOverlayDrag);
document.addEventListener('touchmove', dragOverlay);
document.addEventListener('touchend', stopOverlayDrag);

// --- SCREENSHOT FUNCTIONS ---

// Screenshot logic removed

// --- MODAL FOCUS TRAP ---
function trapFocus(element) {
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const updateFocusableElements = () => {
        return Array.from(element.querySelectorAll(focusableSelector));
    };

    const handleKeyDown = (e) => {
        if (e.key !== 'Tab') return;

        const focusableElements = updateFocusableElements();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    };

    element.addEventListener('keydown', handleKeyDown);

    // Return cleanup function
    return () => {
        element.removeEventListener('keydown', handleKeyDown);
    };
}

let cleanupFocusTrap = null;

// --- UNIFIED MODAL DRAGGING ---
function makeDraggable(header, content) {
    let localXOffset = 0;
    let localYOffset = 0;
    let localInitialX;
    let localInitialY;
    let localCurrentX;
    let localCurrentY;
    let localIsDragging = false;

    header.addEventListener("mousedown", dragStart);
    header.addEventListener("touchstart", dragStart, { passive: false });
    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("touchend", dragEnd);

    function dragStart(e) {
        if (e.type === "touchstart") {
            localInitialX = e.touches[0].clientX - localXOffset;
            localInitialY = e.touches[0].clientY - localYOffset;
        } else {
            localInitialX = e.clientX - localXOffset;
            localInitialY = e.clientY - localYOffset;
        }

        if (e.target.closest('.drag-handle') || e.target === header) {
            localIsDragging = true;
        }
    }

    function drag(e) {
        if (!localIsDragging) return;
        e.preventDefault();

        if (e.type === "touchmove") {
            localCurrentX = e.touches[0].clientX - localInitialX;
            localCurrentY = e.touches[0].clientY - localInitialY;
        } else {
            localCurrentX = e.clientX - localInitialX;
            localCurrentY = e.clientY - localInitialY;
        }

        const rect = content.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width - 20;
        const maxY = window.innerHeight - rect.height - 20;
        const minX = -20;
        const minY = -20;

        localCurrentX = Math.max(minX, Math.min(localCurrentX, maxX));
        localCurrentY = Math.max(minY, Math.min(localCurrentY, maxY));

        localXOffset = localCurrentX;
        localYOffset = localCurrentY;

        setTranslate(localCurrentX, localCurrentY, content);
    }

    function dragEnd() {
        localInitialX = localCurrentX;
        localInitialY = localCurrentY;
        localIsDragging = false;
    }

    return {
        reset: () => {
            localXOffset = 0;
            localYOffset = 0;
            localInitialX = 0;
            localInitialY = 0;
            localCurrentX = 0;
            localCurrentY = 0;
            setTranslate(0, 0, content);
        }
    };
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

const settingsDraggable = makeDraggable(document.querySelector('.settings-header'), document.querySelector('.settings-content'));
const userGuideDraggable = makeDraggable(document.querySelector('.user-guide-content .settings-header'), document.querySelector('.user-guide-content'));

// --- EVENT LISTENERS ---

startBtn.addEventListener('click', toggleFullScreen);

if (exitFullScreenBtn) {
    exitFullScreenBtn.addEventListener('click', () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    });
}

document.addEventListener('fullscreenchange', handleFullScreenChange);

window.addEventListener('resize', () => {
    updateDimensions();
    generateRulerNumbers();
    renderMarkers();
    renderGuidelines();
});

// Toggle Guidelines
toggleGuidelinesBtn.addEventListener('click', () => {
    appState.config.showGuidelines = !appState.config.showGuidelines;
    renderApp();
});

// Settings UI Events
settingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('active');
    settingsModal.setAttribute('aria-hidden', 'false');

    // Reset modal position
    settingsDraggable.reset();

    // Setup focus trap
    cleanupFocusTrap = trapFocus(settingsContent);

    // Focus first focusable element
    const firstFocusable = settingsContent.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
    }
});

// Keyboard Help removed

closeSettingsBtn.addEventListener('click', closeModal);

function closeModal() {
    settingsModal.classList.remove('active');
    settingsModal.setAttribute('aria-hidden', 'true');

    // Cleanup focus trap
    if (cleanupFocusTrap) {
        cleanupFocusTrap();
        cleanupFocusTrap = null;
    }

    // Return focus to settings button
    settingsBtn.focus();
}

// Tab Switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const targetId = btn.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
    });
});

applyMarkersBtn.addEventListener('click', () => {
    applyConfigFromForm();
    const originalText = applyMarkersBtn.innerText;
    applyMarkersBtn.innerText = "Applied!";
    applyMarkersBtn.style.backgroundColor = "#00cc7a";
    setTimeout(() => {
        applyMarkersBtn.innerText = originalText;
        applyMarkersBtn.style.backgroundColor = "";
    }, 1000);
});

addShapeBtn.addEventListener('click', addShape);

// Export/Import Event Listeners
exportAllPresetsBtn.addEventListener('click', exportAllPresets);

let filePickerOpen = false;

importPresetsBtn.addEventListener('click', () => {
    filePickerOpen = true;
    importFileInput.click();
});

importFileInput.addEventListener('change', (e) => {
    filePickerOpen = false;
    const file = e.target.files[0];
    if (file) {
        importPresets(file);
        // Reset input so same file can be imported again
        e.target.value = '';
    }
    // Re-enter fullscreen after file picker closes
    reenterFullscreen();
});

importFileInput.addEventListener('cancel', () => {
    filePickerOpen = false;
    reenterFullscreen();
});

// Single preset import listeners
importSingleFileInput.addEventListener('click', () => {
    filePickerOpen = true;
});

importSingleFileInput.addEventListener('change', (e) => {
    filePickerOpen = false;
    const file = e.target.files[0];
    if (file) {
        processSinglePresetImport(file);
        // Reset input so same file can be imported again
        e.target.value = '';
    }
    // Re-enter fullscreen after file picker closes
    reenterFullscreen();
});

importSingleFileInput.addEventListener('cancel', () => {
    filePickerOpen = false;
    targetPresetSlot = null;
    reenterFullscreen();
});

// Overlay Event Listeners - Handle file picker for overlay
overlayImageInput.addEventListener('click', () => {
    filePickerOpen = true;
});

overlayImageInput.addEventListener('change', (e) => {
    filePickerOpen = false;
    handleOverlayImageUpload(e);
});

overlayImageInput.addEventListener('cancel', () => {
    filePickerOpen = false;
    reenterFullscreen();
});

overlayOpacity.addEventListener('input', (e) => {
    updateOverlayOpacity(e.target.value);
});

overlayScale.addEventListener('input', (e) => {
    updateOverlayScale(e.target.value);
});

overlayLock.addEventListener('change', (e) => {
    toggleOverlayLock(e.target.checked);
});

overlayResetBtn.addEventListener('click', resetOverlayPosition);
overlayClearBtn.addEventListener('click', clearOverlay);

// Screenshot removed

// --- KEYBOARD SHORTCUTS ---
// --- KEYBOARD SHORTCUTS ---
document.addEventListener('keydown', (e) => {
    // ESC key - Close modal or exit fullscreen
    if (e.key === 'Escape') {
        // Close modals if active
        if (settingsModal.classList.contains('active')) {
            closeModal();
            e.preventDefault();
            return;
        }
        if (userGuideModal && userGuideModal.classList.contains('active')) {
            closeUserGuide();
            e.preventDefault();
            return;
        }

        // Exit fullscreen
        if (document.fullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            e.preventDefault();
        }
    }

    // Only allow shortcuts when not in input/textarea and not in modal
    if (document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA' ||
        settingsModal.classList.contains('active') ||
        (userGuideModal && userGuideModal.classList.contains('active'))) {
        return;
    }

    // G key - Toggle guidelines
    if (e.key === 'g' || e.key === 'G') {
        // Toggle if measuring, OR start measuring if not?
        // Current logic: Only toggle if measuring.
        if (document.body.classList.contains('is-measuring')) {
            toggleGuidelinesBtn.click();
            e.preventDefault();
        }
    }

    // S key - Open settings
    if (e.key === 's' || e.key === 'S') {
        // Check if no other modal is open
        if (!settingsModal.classList.contains('active')) {
            settingsBtn.click();
            e.preventDefault();
        }
    }
});

// Handle window focus - catch file picker close when user cancels
window.addEventListener('focus', () => {
    if (filePickerOpen) {
        filePickerOpen = false;
        reenterFullscreen();
    }
});

// --- FULLSCREEN LOGIC ---
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        appState.isMeasuringMode = true; // User is entering measurement mode
        document.documentElement.requestFullscreen().catch((e) => {
            console.error(`Error attempting to enable fullscreen mode: ${e.message} (${e.name})`);
        });
    } else {
        if (document.exitFullscreen) {
            appState.isMeasuringMode = false; // User is exiting measurement mode
            document.exitFullscreen();
        }
    }
}

function reenterFullscreen() {
    // Re-enter fullscreen after file picker closes (if was in measuring mode)
    if (appState.isMeasuringMode && !document.fullscreenElement) {
        setTimeout(() => {
            if (!document.fullscreenElement && appState.isMeasuringMode) {
                document.documentElement.requestFullscreen().catch((e) => {
                    console.error(`Error re-entering fullscreen: ${e.message}`);
                });
            }
        }, 500);
    }
}

function handleFullScreenChange() {
    if (document.fullscreenElement) {
        document.body.classList.add('is-measuring');
        if (exitFullScreenBtn) exitFullScreenBtn.style.display = 'flex';
        updateDimensions();
    } else {
        document.body.classList.remove('is-measuring');
        if (exitFullScreenBtn) exitFullScreenBtn.style.display = 'none';
    }
}

// --- KEYBOARD SHORTCUTS HELP ---
// Keyboard Help panel functions removed

// --- START ---
init();

// --- USER GUIDE MODAL LOGIC ---
const userGuideBtn = document.getElementById('userGuideBtn');
const userGuideModal = document.getElementById('userGuideModal');
const closeUserGuideBtn = document.getElementById('closeUserGuideBtn');
const userGuideContent = document.querySelector('.user-guide-content');
const userGuideHeader = userGuideContent.querySelector('.settings-header'); // Reusing class

// Open User Guide
userGuideBtn.addEventListener('click', () => {
    userGuideModal.classList.add('active');
    userGuideModal.setAttribute('aria-hidden', 'false');

    // Reset position
    userGuideDraggable.reset();

    // Trap focus
    if (cleanupFocusTrap) cleanupFocusTrap();
    cleanupFocusTrap = trapFocus(userGuideContent);

    // Focus close button or first focusable
    setTimeout(() => closeUserGuideBtn.focus(), 100);
});

// Close User Guide
closeUserGuideBtn.addEventListener('click', closeUserGuide);

function closeUserGuide() {
    userGuideModal.classList.remove('active');
    userGuideModal.setAttribute('aria-hidden', 'true');

    if (cleanupFocusTrap) {
        cleanupFocusTrap();
        cleanupFocusTrap = null;
    }
    userGuideBtn.focus();
}



// --- END ---
