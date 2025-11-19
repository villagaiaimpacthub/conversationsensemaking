/**
 * Upload Handler Module
 * Handles file uploads and triggers transcript analysis via backend API
 */

// API endpoint configuration
const API_BASE_URL = window.location.origin; // Use same origin as the page
const API_ENDPOINT = '/api/analyze';

/**
 * Handle file upload
 * @param {File} file - The uploaded file
 */
async function handleFileUpload(file) {
    if (!file) {
        console.error('No file provided');
        return;
    }
    
    // Validate file type
    if (!file.name.endsWith('.docx') && 
        file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        showUploadStatus('Please upload a .docx file', 'error');
        return;
    }
    
    // Show loading state
    showUploadStatus('Uploading file...', 'loading');
    
    try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', file);
        
        showUploadStatus('Extracting text from document...', 'loading');
        
        // Call backend API
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
            throw new Error(errorData.error || `Server error: ${response.statusText}`);
        }
        
        showUploadStatus('Analyzing with AI...', 'loading');
        
        const result = await response.json();
        
        if (!result.success || !result.analysis) {
            throw new Error(result.error || 'Analysis failed - no data returned');
        }
        
        // Store analysis data globally for charts
        window.analysisData = result.analysis;
        
        // Store download URL if provided
        if (result.outputFile?.url) {
            window.analysisDownloadUrl = result.outputFile.url;
            console.log('✅ Analysis file saved:', result.outputFile.filename);
        }
        
        showUploadStatus('Analysis complete!', 'success');
        
        // Show download button
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.style.display = 'inline-block';
        }
        
        // Update dashboard with analysis results
        updateDashboardWithAnalysis(result.analysis);
        
        // Hide upload area and show dashboard
        hideUploadArea();
        
    } catch (error) {
        console.error('Error processing file:', error);
        showUploadStatus(`Error: ${error.message}`, 'error');
        
        // Show error to user with more details
        setTimeout(() => {
            alert(`Failed to analyze transcript:\n\n${error.message}\n\nPlease check:\n- The file is a valid .docx document\n- The backend server is running\n- Your API key is configured correctly`);
        }, 500);
    }
}

/**
 * Show upload status message
 */
function showUploadStatus(message, type = 'info') {
    const statusEl = document.getElementById('uploadStatus');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.className = `upload-status ${type}`;
        statusEl.style.display = 'block';
    }
}

/**
 * Hide upload area after successful upload
 */
function hideUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.style.display = 'none';
    }
    
    const dashboard = document.getElementById('dashboardContent');
    if (dashboard) {
        dashboard.style.display = 'block';
    }
}

/**
 * Show upload area (for re-uploading)
 * Made global so it can be called from HTML onclick
 */
window.showUploadArea = function() {
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.style.display = 'block';
    }
    
    const dashboard = document.getElementById('dashboardContent');
    if (dashboard) {
        dashboard.style.display = 'none';
    }
    
    // Hide download button
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.style.display = 'none';
    }
    
    // Clear analysis data
    window.analysisData = null;
    window.analysisDownloadUrl = null;
    
    // Clear file input
    const fileInput = document.getElementById('transcriptFile');
    if (fileInput) {
        fileInput.value = '';
    }
}

/**
 * Update dashboard with analysis results
 * @param {Object} analysis - Analysis results
 */
function updateDashboardWithAnalysis(analysis) {
    // Update header with basic metrics
    updateHeader(analysis.basicMetrics);
    
    // Load tab content first, then initialize charts
    if (typeof loadTabContent === 'function') {
        // Load the default active tab
        loadTabContent('meeting-analysis', 'meeting-analysis.html');
    }
    
    // Update charts with new data (will be called after content loads)
    setTimeout(() => {
        if (typeof initializeCharts === 'function') {
            // Charts will read from window.analysisData
            initializeCharts();
        }
    }, 500);
    
    // Update content sections
    updateContentSections(analysis);
}

/**
 * Update dashboard header
 */
function updateHeader(metrics) {
    const header = document.querySelector('.dashboard-header');
    if (header) {
        const subtitle = header.querySelector('.subtitle');
        if (subtitle) {
            subtitle.textContent = `Analysis: ${metrics.totalSpeakers} Speakers • ${metrics.totalUtterances} Utterances • ~${metrics.estimatedDuration} minutes`;
        }
    }
}

/**
 * Determine status class and text based on score
 */
function getStatusForScore(score, type = 'general') {
    if (type === 'percentage') {
        if (score >= 80) return { class: 'status-high', text: 'Excellent' };
        if (score >= 60) return { class: 'status-medium', text: 'Good' };
        return { class: 'status-low', text: 'Needs Work' };
    }
    // For 0-100 scores
    if (score >= 75) return { class: 'status-high', text: 'High' };
    if (score >= 50) return { class: 'status-medium', text: 'Moderate' };
    return { class: 'status-low', text: 'Low' };
}

/**
 * Update KPI cards with data from analysis
 */
function updateKPICards(analysis) {
    if (!analysis) return;

    const basics = analysis.basicMetrics || {};
    const engagement = analysis.engagement || {};
    const inclusion = analysis.inclusion || {};
    const consensus = analysis.consensus || {};
    const decisions = analysis.decisions || [];
    const actions = analysis.actions || [];
    const gaps = analysis.knowledgeGaps || {};

    // Total Speakers
    const speakers = basics.totalSpeakers || 0;
    document.getElementById('kpi-speakers').textContent = speakers;
    document.getElementById('kpi-speakers-status').textContent = speakers > 0 ? 'Active' : 'N/A';
    document.getElementById('kpi-speakers-status').className = 'kpi-status status-high';

    // Engagement Score
    const engScore = engagement.overallEngagement || 0;
    const engStatus = getStatusForScore(engScore);
    document.getElementById('kpi-engagement').innerHTML = 
        `<span>${Math.round(engScore)}</span><span style="font-size: 1.5rem; color: var(--text-secondary);">/100</span>`;
    document.getElementById('kpi-engagement-status').textContent = engStatus.text;
    document.getElementById('kpi-engagement-status').className = `kpi-status ${engStatus.class}`;

    // Inclusion Score
    const inclScore = inclusion.score || 0;
    const inclStatus = getStatusForScore(inclScore);
    document.getElementById('kpi-inclusion').innerHTML = 
        `<span>${Math.round(inclScore)}</span><span style="font-size: 1.5rem; color: var(--text-secondary);">/100</span>`;
    document.getElementById('kpi-inclusion-status').textContent = inclStatus.text;
    document.getElementById('kpi-inclusion-status').className = `kpi-status ${inclStatus.class}`;

    // Consensus Score
    const consScore = consensus.overallScore || 0;
    const consStatus = getStatusForScore(consScore);
    document.getElementById('kpi-consensus').innerHTML = 
        `<span>${Math.round(consScore)}</span><span style="font-size: 1.5rem; color: var(--text-secondary);">/100</span>`;
    document.getElementById('kpi-consensus-status').textContent = consStatus.text;
    document.getElementById('kpi-consensus-status').className = `kpi-status ${consStatus.class}`;

    // Agenda Coverage (placeholder - requires agenda input)
    const agendaCoverage = 0; // TODO: Implement agenda coverage calculation
    document.getElementById('kpi-agenda').innerHTML = 
        `<span>${agendaCoverage}</span><span style="font-size: 1.5rem; color: var(--text-secondary);">%</span>`;
    document.getElementById('kpi-agenda-status').textContent = agendaCoverage > 0 ? 'N/A' : 'Requires Agenda';
    document.getElementById('kpi-agenda-status').className = `kpi-status status-low`;

    // Decisions Made
    const decCount = decisions.length || 0;
    document.getElementById('kpi-decisions').textContent = decCount;
    document.getElementById('kpi-decisions-status').textContent = decCount > 0 ? 'Productive' : 'None Recorded';
    document.getElementById('kpi-decisions-status').className = decCount > 0 ? 'kpi-status status-high' : 'kpi-status status-low';

    // Action Items
    const actCount = actions.length || 0;
    document.getElementById('kpi-actions').textContent = actCount;
    document.getElementById('kpi-actions-status').textContent = actCount > 0 ? 'Clear Ownership' : 'None Assigned';
    document.getElementById('kpi-actions-status').className = actCount > 0 ? 'kpi-status status-high' : 'kpi-status status-low';

    // Knowledge Gaps
    const gapCount = (gaps.explicit || []).length + (gaps.totalGaps || 0);
    const gapStatus = gapCount > 5 ? 'Explicit' : (gapCount > 2 ? 'Moderate' : 'Minimal');
    document.getElementById('kpi-gaps').textContent = gapCount;
    document.getElementById('kpi-gaps-status').textContent = gapStatus;
    document.getElementById('kpi-gaps-status').className = gapCount > 5 ? 'kpi-status status-medium' : 'kpi-status status-low';

    console.log('✅ KPI cards updated with analysis data');
}

/**
 * Update content sections with analysis data
 */
function updateContentSections(analysis) {
    // Update KPI cards
    updateKPICards(analysis);
    console.log('✅ Updating content sections with analysis:', analysis);
}

// File input change handler
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('transcriptFile');
    const uploadButton = document.getElementById('uploadButton');
    const dropZone = document.getElementById('dropZone');
    
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                handleFileUpload(file);
            }
        });
    }
    
    if (uploadButton) {
        uploadButton.addEventListener('click', function() {
            fileInput?.click();
        });
    }
    
    // Drag and drop handlers
    if (dropZone) {
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
        });
        
        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            const file = e.dataTransfer.files[0];
            if (file && (file.name.endsWith('.docx') || 
                file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                handleFileUpload(file);
            } else {
                showUploadStatus('Please upload a .docx file', 'error');
            }
        });
    }
});

/**
 * Store download URL globally for later use
 */
window.analysisDownloadUrl = null;

/**
 * Download analysis file
 */
function downloadAnalysis() {
    if (!window.analysisDownloadUrl) {
        alert('No analysis file available for download');
        return;
    }
    
    // Create a download link and trigger it
    const link = document.createElement('a');
    link.href = window.analysisDownloadUrl;
    link.download = `analysis_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Make downloadAnalysis available globally
 */
window.downloadAnalysis = downloadAnalysis;

