/**
 * Aesthetic Theme Switcher v2
 * Features: tab navigation, live preview, color harmony,
 * multiple saved themes, import/export, toast notifications,
 * and improved accessibility.
 */

// ========================================
// THEME DEFINITIONS
// ========================================

const themes = {
    'soft-stone': {
        name: 'Soft Stone',
        colors: {
            'bg-primary': '#f5f5f4',
            'bg-secondary': '#e7e5e4',
            'surface': '#ffffff',
            'surface-elevated': '#fafaf9',
            'primary': '#78716c',
            'primary-hover': '#57534e',
            'secondary': '#a8a29e',
            'secondary-hover': '#78716c',
            'accent': '#44403c',
            'text-primary': '#1c1917',
            'text-secondary': '#57534e',
            'text-muted': '#a8a29e',
            'border': '#d6d3d1',
            'border-focus': '#78716c'
        }
    },
    'rose-quartz': {
        name: 'Rose Quartz',
        colors: {
            'bg-primary': '#fdf2f8',
            'bg-secondary': '#fce7f3',
            'surface': '#ffffff',
            'surface-elevated': '#fefce8',
            'primary': '#db2777',
            'primary-hover': '#be185d',
            'secondary': '#f9a8d4',
            'secondary-hover': '#f472b6',
            'accent': '#831843',
            'text-primary': '#500724',
            'text-secondary': '#9d174d',
            'text-muted': '#f9a8d4',
            'border': '#fbcfe8',
            'border-focus': '#db2777'
        }
    },
    'midnight-violet': {
        name: 'Midnight Violet',
        colors: {
            'bg-primary': '#0f0a1a',
            'bg-secondary': '#1a1025',
            'surface': '#231a33',
            'surface-elevated': '#2d2145',
            'primary': '#a78bfa',
            'primary-hover': '#c4b5fd',
            'secondary': '#7c3aed',
            'secondary-hover': '#8b5cf6',
            'accent': '#ddd6fe',
            'text-primary': '#f5f3ff',
            'text-secondary': '#c4b5fd',
            'text-muted': '#6d28d9',
            'border': '#4c1d95',
            'border-focus': '#a78bfa'
        }
    },
    'coffee-cream': {
        name: 'Coffee Cream',
        colors: {
            'bg-primary': '#faf7f2',
            'bg-secondary': '#f3ebe0',
            'surface': '#fffdf9',
            'surface-elevated': '#fff9f0',
            'primary': '#92400e',
            'primary-hover': '#78350f',
            'secondary': '#d97706',
            'secondary-hover': '#b45309',
            'accent': '#451a03',
            'text-primary': '#292524',
            'text-secondary': '#78350f',
            'text-muted': '#d6d3d1',
            'border': '#e7e5e4',
            'border-focus': '#92400e'
        }
    },
    'forest-calm': {
        name: 'Forest Calm',
        colors: {
            'bg-primary': '#f0fdf4',
            'bg-secondary': '#dcfce7',
            'surface': '#ffffff',
            'surface-elevated': '#f7fee7',
            'primary': '#15803d',
            'primary-hover': '#166534',
            'secondary': '#4ade80',
            'secondary-hover': '#22c55e',
            'accent': '#14532d',
            'text-primary': '#052e16',
            'text-secondary': '#166534',
            'text-muted': '#86efac',
            'border': '#bbf7d0',
            'border-focus': '#15803d'
        }
    },
    'cyber-neon': {
        name: 'Cyber Neon',
        colors: {
            'bg-primary': '#030712',
            'bg-secondary': '#0f172a',
            'surface': '#1e293b',
            'surface-elevated': '#334155',
            'primary': '#06b6d4',
            'primary-hover': '#22d3ee',
            'secondary': '#f472b6',
            'secondary-hover': '#f9a8d4',
            'accent': '#facc15',
            'text-primary': '#f1f5f9',
            'text-secondary': '#94a3b8',
            'text-muted': '#475569',
            'border': '#334155',
            'border-focus': '#06b6d4'
        }
    }
};

// ========================================
// STATE
// ========================================

let currentTheme = 'soft-stone';
let customTheme = {
    'bg-primary': '#f5f5f5',
    'surface': '#ffffff',
    'primary': '#6b7280',
    'secondary': '#9ca3af',
    'accent': '#4b5563',
    'text-primary': '#1f2937'
};
let savedCustomThemes = [];
let carouselIndex = 0;

// ========================================
// DOM ELEMENTS
// ========================================

const themeDropdown = document.getElementById('theme-dropdown');
const carouselTrack = document.getElementById('carousel-track');
const carouselDots = document.getElementById('carousel-dots');
const hexGrid = document.getElementById('hex-grid');
const contrastResults = document.getElementById('contrast-results');
const toastContainer = document.getElementById('toast-container');

const customInputs = {
    bg: document.getElementById('custom-bg'),
    bgHex: document.getElementById('custom-bg-hex'),
    surface: document.getElementById('custom-surface'),
    surfaceHex: document.getElementById('custom-surface-hex'),
    primary: document.getElementById('custom-primary'),
    primaryHex: document.getElementById('custom-primary-hex'),
    secondary: document.getElementById('custom-secondary'),
    secondaryHex: document.getElementById('custom-secondary-hex'),
    accent: document.getElementById('custom-accent'),
    accentHex: document.getElementById('custom-accent-hex'),
    text: document.getElementById('custom-text'),
    textHex: document.getElementById('custom-text-hex')
};

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    initTabs();
    initCarousel();
    initHexDisplay();
    initCustomGenerator();
    initContrastChecker();
    initExportImport();
    initSavedThemes();
    setupEventListeners();
    updateLivePreview();
    updateHarmony();
});

// ========================================
// TOAST NOTIFICATIONS
// ========================================

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ========================================
// TAB NAVIGATION
// ========================================

function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        tab.addEventListener('keydown', (e) => {
            const tabsList = Array.from(tabs);
            const idx = tabsList.indexOf(tab);
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                tabsList[(idx + 1) % tabsList.length].focus();
                tabsList[(idx + 1) % tabsList.length].click();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                tabsList[(idx - 1 + tabsList.length) % tabsList.length].focus();
                tabsList[(idx - 1 + tabsList.length) % tabsList.length].click();
            }
        });
    });
}

function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tabName);
        t.setAttribute('aria-selected', t.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content').forEach(p => {
        p.classList.toggle('active', p.id === `panel-${tabName}`);
    });
}

// ========================================
// THEME SWITCHING
// ========================================

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('aesthetic-theme');
    const savedCustomThemeData = localStorage.getItem('aesthetic-custom-theme');
    const savedCustomThemesList = localStorage.getItem('aesthetic-saved-themes');

    if (savedCustomThemeData) {
        customTheme = JSON.parse(savedCustomThemeData);
        updateCustomInputs();
    }

    if (savedCustomThemesList) {
        savedCustomThemes = JSON.parse(savedCustomThemesList);
    }

    if (savedTheme) {
        currentTheme = savedTheme;
        if (savedTheme === 'custom') {
            applyCustomTheme(false);
        }
    }

    applyTheme(currentTheme);
    themeDropdown.value = currentTheme;
}

function applyTheme(themeName) {
    currentTheme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('aesthetic-theme', themeName);

    updateCarouselActive();
    updateHexDisplay();
    updateContrastChecker();
    announceThemeChange(themeName);
}

function announceThemeChange(themeName) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Theme changed to ${themes[themeName]?.name || 'Custom'}`;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// ========================================
// CAROUSEL
// ========================================

function initCarousel() {
    const themeKeys = Object.keys(themes);

    themeKeys.forEach((key, index) => {
        const theme = themes[key];
        const preview = createThemePreview(key, theme);
        carouselTrack.appendChild(preview);

        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to ${theme.name}`);
        dot.addEventListener('click', () => scrollToTheme(index));
        carouselDots.appendChild(dot);
    });

    document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
        carouselIndex = Math.max(0, carouselIndex - 1);
        scrollCarousel();
    });

    document.querySelector('.carousel-btn.next').addEventListener('click', () => {
        carouselIndex = Math.min(themeKeys.length - 1, carouselIndex + 1);
        scrollCarousel();
    });

    updateCarouselActive();
}

function createThemePreview(key, theme) {
    const preview = document.createElement('div');
    preview.className = 'theme-preview';
    preview.setAttribute('data-theme-key', key);
    preview.style.background = `linear-gradient(135deg, ${theme.colors['bg-primary']}, ${theme.colors['surface']})`;
    preview.setAttribute('role', 'option');
    preview.setAttribute('tabindex', '0');
    preview.setAttribute('aria-label', `Select ${theme.name} theme`);

    // Richer preview with mini UI mockup
    preview.innerHTML = `
        <div class="theme-preview-content" style="color: ${theme.colors['text-primary']}">
            <span class="theme-preview-name">${theme.name}</span>
            <div class="theme-preview-mini">
                <span class="theme-preview-mini-btn" style="background: ${theme.colors['primary']}; color: white;">Button</span>
                <div class="theme-preview-mini-card" style="background: ${theme.colors['surface-elevated']}; border-color: ${theme.colors['border']}"></div>
            </div>
            <div class="theme-preview-colors">
                <span class="color-dot" style="background: ${theme.colors['primary']}"></span>
                <span class="color-dot" style="background: ${theme.colors['secondary']}"></span>
                <span class="color-dot" style="background: ${theme.colors['accent']}"></span>
                <span class="color-dot" style="background: ${theme.colors['text-primary']}"></span>
            </div>
        </div>
    `;

    preview.addEventListener('click', () => {
        themeDropdown.value = key;
        applyTheme(key);
    });

    preview.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            themeDropdown.value = key;
            applyTheme(key);
        }
    });

    return preview;
}

function scrollToTheme(index) {
    carouselIndex = index;
    scrollCarousel();
}

function scrollCarousel() {
    const previews = carouselTrack.querySelectorAll('.theme-preview');
    if (previews[carouselIndex]) {
        previews[carouselIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
    updateCarouselDots();
}

function updateCarouselActive() {
    const previews = carouselTrack.querySelectorAll('.theme-preview');
    previews.forEach(preview => {
        const isActive = preview.getAttribute('data-theme-key') === currentTheme;
        preview.classList.toggle('active', isActive);
    });
}

function updateCarouselDots() {
    const dots = carouselDots.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === carouselIndex);
    });
}

// ========================================
// HEX DISPLAY
// ========================================

function initHexDisplay() {
    updateHexDisplay();
}

function updateHexDisplay() {
    const colorVars = [
        { name: 'Background', var: 'bg-primary' },
        { name: 'Surface', var: 'surface' },
        { name: 'Primary', var: 'primary' },
        { name: 'Secondary', var: 'secondary' },
        { name: 'Accent', var: 'accent' },
        { name: 'Text', var: 'text-primary' },
        { name: 'Text 2nd', var: 'text-secondary' },
        { name: 'Border', var: 'border' }
    ];

    hexGrid.innerHTML = '';
    // Cache getComputedStyle call
    const cs = getComputedStyle(document.documentElement);

    colorVars.forEach(({ name, var: cssVar }) => {
        const computedColor = cs.getPropertyValue(`--${cssVar}`).trim();

        const item = document.createElement('div');
        item.className = 'hex-item';
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `Copy ${name} color: ${computedColor}`);

        item.innerHTML = `
            <div class="hex-color-preview" style="background: var(--${cssVar})"></div>
            <div class="hex-name">${name}</div>
            <div class="hex-value">${computedColor}</div>
        `;

        item.addEventListener('click', () => copyToClipboard(computedColor, item));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyToClipboard(computedColor, item);
            }
        });

        hexGrid.appendChild(item);
    });
}

function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        element.classList.add('copied');
        setTimeout(() => element.classList.remove('copied'), 500);

        const valueEl = element.querySelector('.hex-value');
        const originalText = valueEl.textContent;
        valueEl.textContent = 'Copied!';
        setTimeout(() => { valueEl.textContent = originalText; }, 1000);
    }).catch(() => {
        showToast('Failed to copy to clipboard');
    });
}

// ========================================
// COPY CSS VARIABLES
// ========================================

function copyCSSVariables() {
    const cs = getComputedStyle(document.documentElement);
    const vars = [
        'bg-primary', 'bg-secondary', 'surface', 'surface-elevated',
        'primary', 'primary-hover', 'secondary', 'secondary-hover',
        'accent', 'text-primary', 'text-secondary', 'text-muted',
        'border', 'border-focus'
    ];

    const css = `:root {\n${vars.map(v => `    --${v}: ${cs.getPropertyValue(`--${v}`).trim()};`).join('\n')}\n}`;

    navigator.clipboard.writeText(css).then(() => {
        showToast('CSS variables copied to clipboard');
    }).catch(() => {
        showToast('Failed to copy');
    });
}

// ========================================
// CUSTOM THEME GENERATOR
// ========================================

function initCustomGenerator() {
    const savedCustom = localStorage.getItem('aesthetic-custom-theme');
    if (savedCustom) {
        customTheme = JSON.parse(savedCustom);
        updateCustomInputs();
    }

    const colorMappings = [
        { picker: 'bg', hex: 'bgHex', cssVar: 'bg-primary' },
        { picker: 'surface', hex: 'surfaceHex', cssVar: 'surface' },
        { picker: 'primary', hex: 'primaryHex', cssVar: 'primary' },
        { picker: 'secondary', hex: 'secondaryHex', cssVar: 'secondary' },
        { picker: 'accent', hex: 'accentHex', cssVar: 'accent' },
        { picker: 'text', hex: 'textHex', cssVar: 'text-primary' }
    ];

    colorMappings.forEach(({ picker, hex, cssVar }) => {
        customInputs[picker].addEventListener('input', (e) => {
            customInputs[hex].value = e.target.value;
            customTheme[cssVar] = e.target.value;
            applyCustomTheme(true);
            updateLivePreview();
            updateHarmony();
        });

        customInputs[hex].addEventListener('input', (e) => {
            let value = e.target.value;
            if (!value.startsWith('#')) value = '#' + value;
            if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                customInputs[picker].value = value;
                customTheme[cssVar] = value;
                applyCustomTheme(true);
                updateLivePreview();
                updateHarmony();
            }
        });
    });

    document.getElementById('reset-custom').addEventListener('click', resetCustomTheme);
    document.getElementById('save-custom').addEventListener('click', saveCustomTheme);
    document.getElementById('copy-css-vars').addEventListener('click', copyCSSVariables);
}

function updateCustomInputs() {
    customInputs.bg.value = customTheme['bg-primary'];
    customInputs.bgHex.value = customTheme['bg-primary'];
    customInputs.surface.value = customTheme['surface'];
    customInputs.surfaceHex.value = customTheme['surface'];
    customInputs.primary.value = customTheme['primary'];
    customInputs.primaryHex.value = customTheme['primary'];
    customInputs.secondary.value = customTheme['secondary'];
    customInputs.secondaryHex.value = customTheme['secondary'];
    customInputs.accent.value = customTheme['accent'];
    customInputs.accentHex.value = customTheme['accent'];
    customInputs.text.value = customTheme['text-primary'];
    customInputs.textHex.value = customTheme['text-primary'];
}

function applyCustomTheme(isLive) {
    const bgSecondary = adjustBrightness(customTheme['bg-primary'], -10);
    const surfaceElevated = adjustBrightness(customTheme['surface'], 5);
    const primaryHover = adjustBrightness(customTheme['primary'], -15);
    const secondaryHover = adjustBrightness(customTheme['secondary'], -15);
    const textSecondary = blendColors(customTheme['text-primary'], customTheme['bg-primary'], 0.3);
    const textMuted = blendColors(customTheme['text-primary'], customTheme['bg-primary'], 0.6);
    const border = blendColors(customTheme['text-primary'], customTheme['bg-primary'], 0.8);
    const borderFocus = customTheme['primary'];

    const root = document.documentElement;
    root.style.setProperty('--bg-primary', customTheme['bg-primary']);
    root.style.setProperty('--bg-secondary', bgSecondary);
    root.style.setProperty('--surface', customTheme['surface']);
    root.style.setProperty('--surface-elevated', surfaceElevated);
    root.style.setProperty('--primary', customTheme['primary']);
    root.style.setProperty('--primary-hover', primaryHover);
    root.style.setProperty('--secondary', customTheme['secondary']);
    root.style.setProperty('--secondary-hover', secondaryHover);
    root.style.setProperty('--accent', customTheme['accent']);
    root.style.setProperty('--text-primary', customTheme['text-primary']);
    root.style.setProperty('--text-secondary', textSecondary);
    root.style.setProperty('--text-muted', textMuted);
    root.style.setProperty('--border', border);
    root.style.setProperty('--border-focus', borderFocus);

    const shadowColor = hexToRgba(customTheme['text-primary'], 0.08);
    const shadowColorStrong = hexToRgba(customTheme['text-primary'], 0.16);
    root.style.setProperty('--shadow-color', shadowColor);
    root.style.setProperty('--shadow-color-strong', shadowColorStrong);

    document.documentElement.setAttribute('data-theme', 'custom');
    themeDropdown.value = 'custom';
    currentTheme = 'custom';
    localStorage.setItem('aesthetic-theme', 'custom');

    if (!isLive) {
        updateHexDisplay();
        updateContrastChecker();
        updateCarouselActive();
    }
}

function resetCustomTheme() {
    customTheme = {
        'bg-primary': '#f5f5f5',
        'surface': '#ffffff',
        'primary': '#6b7280',
        'secondary': '#9ca3af',
        'accent': '#4b5563',
        'text-primary': '#1f2937'
    };
    updateCustomInputs();
    updateLivePreview();
    updateHarmony();

    const root = document.documentElement;
    const cssVars = [
        '--bg-primary', '--bg-secondary', '--surface', '--surface-elevated',
        '--primary', '--primary-hover', '--secondary', '--secondary-hover',
        '--accent', '--text-primary', '--text-secondary', '--text-muted',
        '--border', '--border-focus', '--shadow-color', '--shadow-color-strong'
    ];
    cssVars.forEach(v => root.style.removeProperty(v));

    showToast('Custom theme reset');
}

function saveCustomTheme() {
    const name = `Custom ${savedCustomThemes.length + 1}`;
    savedCustomThemes.push({
        name,
        colors: { ...customTheme }
    });
    localStorage.setItem('aesthetic-saved-themes', JSON.stringify(savedCustomThemes));
    localStorage.setItem('aesthetic-custom-theme', JSON.stringify(customTheme));
    renderSavedThemes();
    showToast(`Theme "${name}" saved`);
}

// ========================================
// SAVED CUSTOM THEMES
// ========================================

function initSavedThemes() {
    renderSavedThemes();
}

function renderSavedThemes() {
    const grid = document.getElementById('saved-themes-grid');
    grid.innerHTML = '';

    if (savedCustomThemes.length === 0) {
        grid.innerHTML = '<p class="saved-themes-empty">No saved themes yet. Create one above!</p>';
        return;
    }

    savedCustomThemes.forEach((theme, index) => {
        const item = document.createElement('div');
        item.className = 'saved-theme-item';

        const colors = document.createElement('div');
        colors.className = 'saved-theme-colors';
        ['bg-primary', 'primary', 'secondary', 'accent'].forEach(key => {
            const dot = document.createElement('div');
            dot.className = 'saved-theme-dot';
            dot.style.background = theme.colors[key] || '#888';
            colors.appendChild(dot);
        });

        const nameEl = document.createElement('span');
        nameEl.className = 'saved-theme-name';
        nameEl.textContent = theme.name;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'saved-theme-delete';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.setAttribute('aria-label', `Delete ${theme.name}`);
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            savedCustomThemes.splice(index, 1);
            localStorage.setItem('aesthetic-saved-themes', JSON.stringify(savedCustomThemes));
            renderSavedThemes();
            showToast(`Theme "${theme.name}" deleted`);
        });

        item.appendChild(colors);
        item.appendChild(nameEl);
        item.appendChild(deleteBtn);

        item.addEventListener('click', () => {
            customTheme = { ...theme.colors };
            updateCustomInputs();
            applyCustomTheme(false);
            updateLivePreview();
            updateHarmony();
            showToast(`Applied "${theme.name}"`);
        });

        grid.appendChild(item);
    });
}

// ========================================
// LIVE PREVIEW
// ========================================

function updateLivePreview() {
    const card = document.getElementById('live-preview-card');
    if (!card) return;

    const bg = customTheme['bg-primary'];
    const surface = customTheme['surface'];
    const primary = customTheme['primary'];
    const secondary = customTheme['secondary'];
    const text = customTheme['text-primary'];
    const textSec = blendColors(text, bg, 0.3);
    const border = blendColors(text, bg, 0.8);

    card.style.background = bg;
    card.style.borderColor = border;

    const header = card.querySelector('.lp-header');
    header.style.background = surface;
    const dots = card.querySelectorAll('.lp-dot');
    if (dots[0]) dots[0].style.background = '#ff5f57';
    if (dots[1]) dots[1].style.background = '#ffbd2e';
    if (dots[2]) dots[2].style.background = '#28c840';

    const content = card.querySelector('.lp-content');
    content.style.background = bg;

    const title = card.querySelector('.lp-title');
    title.style.color = text;

    const textEl = card.querySelector('.lp-text');
    textEl.style.color = textSec;

    const btnPrimary = card.querySelector('.lp-btn-primary');
    btnPrimary.style.background = primary;
    btnPrimary.style.color = 'white';

    const btnSecondary = card.querySelector('.lp-btn-secondary');
    btnSecondary.style.background = secondary;
    btnSecondary.style.color = text;
}

// ========================================
// COLOR HARMONY
// ========================================

function updateHarmony() {
    const container = document.getElementById('harmony-palettes');
    if (!container) return;
    container.innerHTML = '';

    const primary = customTheme['primary'];
    const hsl = hexToHsl(primary);
    if (!hsl) return;

    const harmonies = [
        {
            name: 'Complementary',
            colors: [
                hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 180) % 360, hsl.s, Math.min(hsl.l + 15, 90)),
            ]
        },
        {
            name: 'Analogous',
            colors: [
                hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
            ]
        },
        {
            name: 'Triadic',
            colors: [
                hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
            ]
        },
        {
            name: 'Split Comp.',
            colors: [
                hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l),
                hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l),
            ]
        }
    ];

    harmonies.forEach(h => {
        const row = document.createElement('div');
        row.className = 'harmony-row';

        const label = document.createElement('span');
        label.className = 'harmony-label';
        label.textContent = h.name;

        const swatches = document.createElement('div');
        swatches.className = 'harmony-swatches';

        // Show the primary color first
        const primarySwatch = document.createElement('div');
        primarySwatch.className = 'harmony-swatch';
        primarySwatch.style.background = primary;
        swatches.appendChild(primarySwatch);

        h.colors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'harmony-swatch';
            swatch.style.background = color;
            swatches.appendChild(swatch);
        });

        row.appendChild(label);
        row.appendChild(swatches);

        row.addEventListener('click', () => {
            // Apply first harmony color as secondary
            if (h.colors[0]) {
                customTheme['secondary'] = h.colors[0];
                customInputs.secondary.value = h.colors[0];
                customInputs.secondaryHex.value = h.colors[0];
            }
            if (h.colors[1]) {
                customTheme['accent'] = h.colors[1];
                customInputs.accent.value = h.colors[1];
                customInputs.accentHex.value = h.colors[1];
            }
            applyCustomTheme(true);
            updateLivePreview();
            showToast(`Applied ${h.name} harmony`);
        });

        container.appendChild(row);
    });
}

// ========================================
// EXPORT / IMPORT
// ========================================

function initExportImport() {
    document.getElementById('export-theme-btn').addEventListener('click', exportTheme);
    document.getElementById('import-theme-btn').addEventListener('click', () => {
        document.getElementById('import-modal').showModal();
    });
    document.getElementById('import-cancel').addEventListener('click', () => {
        document.getElementById('import-modal').close();
    });
    document.getElementById('import-confirm').addEventListener('click', importTheme);
}

function exportTheme() {
    const cs = getComputedStyle(document.documentElement);
    const vars = [
        'bg-primary', 'bg-secondary', 'surface', 'surface-elevated',
        'primary', 'primary-hover', 'secondary', 'secondary-hover',
        'accent', 'text-primary', 'text-secondary', 'text-muted',
        'border', 'border-focus'
    ];

    const exported = {
        name: themes[currentTheme]?.name || 'Custom Theme',
        theme: currentTheme,
        colors: {}
    };
    vars.forEach(v => {
        exported.colors[v] = cs.getPropertyValue(`--${v}`).trim();
    });

    const json = JSON.stringify(exported, null, 2);
    navigator.clipboard.writeText(json).then(() => {
        showToast('Theme JSON copied to clipboard');
    }).catch(() => {
        // Fallback: download as file
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `theme-${currentTheme}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Theme downloaded as JSON file');
    });
}

function importTheme() {
    const textarea = document.getElementById('import-textarea');
    try {
        const data = JSON.parse(textarea.value);
        if (!data.colors) throw new Error('No colors found');

        // Apply the imported colors as a custom theme
        customTheme = {
            'bg-primary': data.colors['bg-primary'] || '#f5f5f5',
            'surface': data.colors['surface'] || '#ffffff',
            'primary': data.colors['primary'] || '#6b7280',
            'secondary': data.colors['secondary'] || '#9ca3af',
            'accent': data.colors['accent'] || '#4b5563',
            'text-primary': data.colors['text-primary'] || '#1f2937'
        };

        updateCustomInputs();
        applyCustomTheme(false);
        updateLivePreview();
        updateHarmony();

        document.getElementById('import-modal').close();
        textarea.value = '';
        switchTab('generator');
        showToast(`Imported "${data.name || 'theme'}" successfully`);
    } catch {
        showToast('Invalid JSON. Please check the format.');
    }
}

// ========================================
// ACCESSIBILITY - CONTRAST CHECKER
// ========================================

function initContrastChecker() {
    updateContrastChecker();
}

function updateContrastChecker() {
    const cs = getComputedStyle(document.documentElement);

    const checks = [
        {
            label: 'Text on Background',
            fg: cs.getPropertyValue('--text-primary').trim(),
            bg: cs.getPropertyValue('--bg-primary').trim()
        },
        {
            label: 'Text on Surface',
            fg: cs.getPropertyValue('--text-primary').trim(),
            bg: cs.getPropertyValue('--surface').trim()
        },
        {
            label: 'Primary on Surface',
            fg: cs.getPropertyValue('--primary').trim(),
            bg: cs.getPropertyValue('--surface').trim()
        },
        {
            label: 'Secondary Text',
            fg: cs.getPropertyValue('--text-secondary').trim(),
            bg: cs.getPropertyValue('--bg-primary').trim()
        }
    ];

    contrastResults.innerHTML = '';

    checks.forEach(({ label, fg, bg }) => {
        const ratio = getContrastRatio(fg, bg);
        const { level, badge } = getWCAGLevel(ratio);

        const item = document.createElement('div');
        item.className = 'contrast-item';
        item.innerHTML = `
            <span class="contrast-badge ${badge}">${level}</span>
            <span class="contrast-label">${label}</span>
            <span class="contrast-ratio">${ratio.toFixed(2)}:1</span>
        `;
        contrastResults.appendChild(item);
    });
}

function getContrastRatio(fg, bg) {
    const fgLum = getLuminance(fg);
    const bgLum = getLuminance(bg);
    const lighter = Math.max(fgLum, bgLum);
    const darker = Math.min(fgLum, bgLum);
    return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getWCAGLevel(ratio) {
    if (ratio >= 7) return { level: 'AAA', badge: 'pass' };
    if (ratio >= 4.5) return { level: 'AA', badge: 'pass' };
    if (ratio >= 3) return { level: 'AA Large', badge: 'aa' };
    return { level: 'Fail', badge: 'fail' };
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function hexToRgba(hex, alpha) {
    const rgb = hexToRgb(hex);
    if (!rgb) return `rgba(0, 0, 0, ${alpha})`;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function adjustBrightness(hex, percent) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const amount = Math.round(2.55 * percent);
    return rgbToHex(rgb.r + amount, rgb.g + amount, rgb.b + amount);
}

function blendColors(color1, color2, ratio) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    if (!rgb1 || !rgb2) return color1;
    return rgbToHex(
        rgb1.r * (1 - ratio) + rgb2.r * ratio,
        rgb1.g * (1 - ratio) + rgb2.g * ratio,
        rgb1.b * (1 - ratio) + rgb2.b * ratio
    );
}

function hexToHsl(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    let r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return rgbToHex(Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255));
}

// ========================================
// EVENT LISTENERS
// ========================================

function setupEventListeners() {
    themeDropdown.addEventListener('change', (e) => {
        const theme = e.target.value;
        if (theme === 'custom') {
            applyCustomTheme(false);
        } else {
            resetInlineStyles();
            applyTheme(theme);
        }
    });

    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.closest('.carousel-container')) {
            if (e.key === 'ArrowLeft') {
                carouselIndex = Math.max(0, carouselIndex - 1);
                scrollCarousel();
            } else if (e.key === 'ArrowRight') {
                const maxIndex = Object.keys(themes).length - 1;
                carouselIndex = Math.min(maxIndex, carouselIndex + 1);
                scrollCarousel();
            }
        }
    });

    // Debounced hex display + contrast update for live editing
    let updateTimeout;
    const debouncedUpdate = () => {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            updateHexDisplay();
            updateContrastChecker();
        }, 200);
    };

    // Watch for custom inputs to trigger debounced update
    Object.values(customInputs).forEach(input => {
        input.addEventListener('input', debouncedUpdate);
    });
}

function resetInlineStyles() {
    const root = document.documentElement;
    const cssVars = [
        '--bg-primary', '--bg-secondary', '--surface', '--surface-elevated',
        '--primary', '--primary-hover', '--secondary', '--secondary-hover',
        '--accent', '--text-primary', '--text-secondary', '--text-muted',
        '--border', '--border-focus', '--shadow-color', '--shadow-color-strong'
    ];
    cssVars.forEach(v => root.style.removeProperty(v));
}

// ========================================
// EXPORT FOR TESTING (if needed)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        themes,
        getContrastRatio,
        getLuminance,
        hexToRgb,
        rgbToHex,
        adjustBrightness,
        blendColors,
        hexToHsl,
        hslToHex
    };
}
