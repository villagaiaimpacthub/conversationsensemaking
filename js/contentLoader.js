/**
 * Content Loader Module
 * Dynamically loads tab content from separate HTML files
 */

// Cache for loaded content to avoid reloading
const contentCache = {};

// Multi-part file mappings for large tabs
const multiPartFiles = {
    'meeting-analysis': [
        'meeting-analysis-part1.html',
        'meeting-analysis-part2.html',
        'meeting-analysis-part3.html',
        'meeting-analysis-part4.html',
        'meeting-analysis-part5.html',
        'meeting-analysis-part6.html'
    ]
};

/**
 * Loads HTML content from a file and inserts it into a container
 * @param {string} tabId - The ID of the tab container
 * @param {string} filename - The HTML file to load (or array of files for multi-part)
 */
async function loadTabContent(tabId, filename) {
    const container = document.getElementById(tabId);
    
    if (!container) {
        console.error(`Container with id "${tabId}" not found`);
        return;
    }

    // Check if this is a multi-part file
    const filesToLoad = multiPartFiles[tabId] || [filename];

    // Check cache first
    const cacheKey = filesToLoad.join('|');
    if (contentCache[cacheKey]) {
        container.innerHTML = contentCache[cacheKey];
        initializeTabContent(tabId);
        return;
    }

    try {
        // Load all parts in parallel
        const responses = await Promise.all(
            filesToLoad.map(file => fetch(`html/${file}`))
        );

        // Check all responses
        for (let i = 0; i < responses.length; i++) {
            if (!responses[i].ok) {
                throw new Error(`Failed to load ${filesToLoad[i]}: ${responses[i].statusText}`);
            }
        }

        // Get all HTML content
        const htmlParts = await Promise.all(
            responses.map(response => response.text())
        );

        // Combine all parts
        const combinedHtml = htmlParts.join('\n');
        
        // Cache the content
        contentCache[cacheKey] = combinedHtml;
        
        // Insert into container
        container.innerHTML = combinedHtml;
        
        // Initialize any tab-specific functionality
        initializeTabContent(tabId);
        
    } catch (error) {
        console.error(`Error loading content for ${tabId}:`, error);
        container.innerHTML = `
            <div class="card" style="text-align: center; padding: 3rem;">
                <h3 style="color: var(--danger);">Error Loading Content</h3>
                <p style="color: var(--text-secondary);">Failed to load content for ${tabId}</p>
                <p style="color: var(--text-muted); font-size: 0.875rem;">${error.message}</p>
            </div>
        `;
    }
}

/**
 * Initialize content-specific functionality after loading
 * @param {string} tabId - The ID of the tab that was loaded
 */
function initializeTabContent(tabId) {
    // Re-initialize charts after content is loaded
    // Wait a bit for DOM to be ready
    setTimeout(() => {
        console.log('Initializing charts for tab:', tabId);
        if (typeof initializeCharts === 'function') {
            console.log('Calling initializeCharts()');
            initializeCharts();
        } else {
            console.error('initializeCharts function not found!');
        }
    }, 200);
}

/**
 * Preload all tab content for better performance
 */
async function preloadAllTabs() {
    const tabs = [
        { id: 'meeting-analysis', file: 'meeting-analysis.html' },
        { id: 'longitudinal', file: 'longitudinal.html' },
        { id: 'patterns', file: 'patterns.html' },
        { id: 'actions', file: 'actions.html' },
        { id: 'recommendations', file: 'recommendations.html' }
    ];

    // Load all tabs in parallel
    await Promise.all(
        tabs.map(tab => loadTabContent(tab.id, tab.file))
    );
}

// Export functions for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadTabContent, preloadAllTabs };
}

