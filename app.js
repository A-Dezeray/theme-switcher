/**
 * Aesthetic Theme Switcher
 * A micro app for switching between multiple color themes
 * with localStorage persistence, custom theme generator, and accessibility checking
 */

// ========================================
// THEME DEFINITIONS
// ========================================

const themes = {
    'soft-stone': {
        name: 'Soft Stone',
        emoji: '🪨',
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
        emoji: '🌸',
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
        emoji: '🌙',
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
        emoji: '☕',
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
        emoji: '🌲',
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
        emoji: '⚡',
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
let carouselIndex = 0;

// ========================================
// DOM ELEMENTS
// ========================================

const themeDropdown = document.getElementById('theme-dropdown');
const carouselTrack = document.getElementById('carousel-track');
const carouselDots = document.getElementById('carousel-dots');
const hexGrid = document.getElementById('hex-grid');
const contrastResults = document.getElementById('contrast-results');

// Custom theme inputs
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
    initCarousel();
    initHexDisplay();
    initCustomGenerator();
    initContrastChecker();
    setupEventListeners();
});

// ========================================
// THEME SWITCHING
// ========================================

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('aesthetic-theme');
    const savedCustomTheme = localStorage.getItem('aesthetic-custom-theme');

    if (savedCustomTheme) {
        customTheme = JSON.parse(savedCustomTheme);
        updateCustomInputs();
    }

    if (savedTheme) {
        currentTheme = savedTheme;
        if (savedTheme === 'custom') {
            applyCustomTheme();
        }
    }

    applyTheme(currentTheme);
    themeDropdown.value = currentTheme;
}

function applyTheme(themeName) {
    currentTheme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('aesthetic-theme', themeName);

    // Update UI
    updateCarouselActive();
    updateHexDisplay();
    updateContrastChecker();

    // Announce theme change for accessibility
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

    // Create preview cards
    themeKeys.forEach((key, index) => {
        const theme = themes[key];
        const preview = createThemePreview(key, theme);
        carouselTrack.appendChild(preview);

        // Create dot
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to ${theme.name}`);
        dot.addEventListener('click', () => scrollToTheme(index));
        carouselDots.appendChild(dot);
    });

    // Setup carousel navigation
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
    preview.setAttribute('role', 'button');
    preview.setAttribute('tabindex', '0');
    preview.setAttribute('aria-label', `Select ${theme.name} theme`);

    preview.innerHTML = `
        <div class="theme-preview-content" style="color: ${theme.colors['text-primary']}">
            <span class="theme-preview-name">${theme.emoji} ${theme.name}</span>
            <div class="theme-preview-colors">
                <span class="color-dot" style="background: ${theme.colors['primary']}"></span>
                <span class="color-dot" style="background: ${theme.colors['secondary']}"></span>
                <span class="color-dot" style="background: ${theme.colors['accent']}"></span>
            </div>
        </div>
    `;

    preview.addEventListener('click', () => {
        themeDropdown.value = key;
        applyTheme(key);
    });

    preview.addEventListener('keypress', (e) => {
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
        { name: 'Text Secondary', var: 'text-secondary' },
        { name: 'Border', var: 'border' }
    ];

    hexGrid.innerHTML = '';

    colorVars.forEach(({ name, var: cssVar }) => {
        const computedColor = getComputedStyle(document.documentElement)
            .getPropertyValue(`--${cssVar}`).trim();

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
        item.addEventListener('keypress', (e) => {
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

        // Show feedback
        const originalText = element.querySelector('.hex-value').textContent;
        element.querySelector('.hex-value').textContent = 'Copied!';
        setTimeout(() => {
            element.querySelector('.hex-value').textContent = originalText;
        }, 1000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ========================================
// CUSTOM THEME GENERATOR
// ========================================

function initCustomGenerator() {
    // Load saved custom theme
    const savedCustom = localStorage.getItem('aesthetic-custom-theme');
    if (savedCustom) {
        customTheme = JSON.parse(savedCustom);
        updateCustomInputs();
    }

    // Color picker change handlers
    const colorMappings = [
        { picker: 'bg', hex: 'bgHex', cssVar: 'bg-primary' },
        { picker: 'surface', hex: 'surfaceHex', cssVar: 'surface' },
        { picker: 'primary', hex: 'primaryHex', cssVar: 'primary' },
        { picker: 'secondary', hex: 'secondaryHex', cssVar: 'secondary' },
        { picker: 'accent', hex: 'accentHex', cssVar: 'accent' },
        { picker: 'text', hex: 'textHex', cssVar: 'text-primary' }
    ];

    colorMappings.forEach(({ picker, hex, cssVar }) => {
        // Color picker change
        customInputs[picker].addEventListener('input', (e) => {
            const value = e.target.value;
            customInputs[hex].value = value;
            customTheme[cssVar] = value;
        });

        // Hex input change
        customInputs[hex].addEventListener('input', (e) => {
            let value = e.target.value;
            if (!value.startsWith('#')) value = '#' + value;
            if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                customInputs[picker].value = value;
                customTheme[cssVar] = value;
            }
        });
    });

    // Button handlers
    document.getElementById('apply-custom').addEventListener('click', applyCustomTheme);
    document.getElementById('reset-custom').addEventListener('click', resetCustomTheme);
    document.getElementById('save-custom').addEventListener('click', saveCustomTheme);
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

function applyCustomTheme() {
    // Generate derived colors
    const bgSecondary = adjustBrightness(customTheme['bg-primary'], -10);
    const surfaceElevated = adjustBrightness(customTheme['surface'], 5);
    const primaryHover = adjustBrightness(customTheme['primary'], -15);
    const secondaryHover = adjustBrightness(customTheme['secondary'], -15);
    const textSecondary = blendColors(customTheme['text-primary'], customTheme['bg-primary'], 0.3);
    const textMuted = blendColors(customTheme['text-primary'], customTheme['bg-primary'], 0.6);
    const border = blendColors(customTheme['text-primary'], customTheme['bg-primary'], 0.8);
    const borderFocus = customTheme['primary'];

    // Apply CSS variables
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

    // Calculate shadow color
    const shadowColor = hexToRgba(customTheme['text-primary'], 0.1);
    root.style.setProperty('--shadow-color', shadowColor);

    // Set theme attribute
    document.documentElement.setAttribute('data-theme', 'custom');
    themeDropdown.value = 'custom';
    currentTheme = 'custom';
    localStorage.setItem('aesthetic-theme', 'custom');

    updateHexDisplay();
    updateContrastChecker();
    updateCarouselActive();
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

    // Clear inline styles
    const root = document.documentElement;
    const cssVars = [
        '--bg-primary', '--bg-secondary', '--surface', '--surface-elevated',
        '--primary', '--primary-hover', '--secondary', '--secondary-hover',
        '--accent', '--text-primary', '--text-secondary', '--text-muted',
        '--border', '--border-focus', '--shadow-color'
    ];
    cssVars.forEach(v => root.style.removeProperty(v));
}

function saveCustomTheme() {
    localStorage.setItem('aesthetic-custom-theme', JSON.stringify(customTheme));

    // Visual feedback
    const btn = document.getElementById('save-custom');
    const originalText = btn.textContent;
    btn.textContent = '✓ Saved!';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
    }, 1500);
}

// ========================================
// ACCESSIBILITY - CONTRAST CHECKER
// ========================================

function initContrastChecker() {
    updateContrastChecker();
}

function updateContrastChecker() {
    const computedStyle = getComputedStyle(document.documentElement);

    const checks = [
        {
            label: 'Text on Background',
            fg: computedStyle.getPropertyValue('--text-primary').trim(),
            bg: computedStyle.getPropertyValue('--bg-primary').trim()
        },
        {
            label: 'Text on Surface',
            fg: computedStyle.getPropertyValue('--text-primary').trim(),
            bg: computedStyle.getPropertyValue('--surface').trim()
        },
        {
            label: 'Primary on Surface',
            fg: computedStyle.getPropertyValue('--primary').trim(),
            bg: computedStyle.getPropertyValue('--surface').trim()
        },
        {
            label: 'Secondary Text',
            fg: computedStyle.getPropertyValue('--text-secondary').trim(),
            bg: computedStyle.getPropertyValue('--bg-primary').trim()
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
    return rgbToHex(
        rgb.r + amount,
        rgb.g + amount,
        rgb.b + amount
    );
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

// ========================================
// EVENT LISTENERS
// ========================================

function setupEventListeners() {
    // Theme dropdown change
    themeDropdown.addEventListener('change', (e) => {
        const theme = e.target.value;
        if (theme === 'custom') {
            applyCustomTheme();
        } else {
            // Clear any custom inline styles
            resetCustomTheme();
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
        blendColors
    };
}
