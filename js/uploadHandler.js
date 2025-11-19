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
    
    // Update content sections AFTER content loads (contentLoader has a 300ms delay)
    // Wait a bit longer to ensure all DOM elements are ready
    setTimeout(() => {
        updateContentSections(analysis);
    }, 350);
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
 * Update Inclusivity Metrics cards with dynamic data
 */
function updateInclusivityMetrics(analysis) {
    if (!analysis || !analysis.inclusion) {
        console.log('⚠️ No analysis or inclusion data available for Inclusivity Metrics');
        return;
    }

    const inclusion = analysis.inclusion;
    console.log('📊 Updating Inclusivity Metrics with:', inclusion);

    // Pronoun Usage Card
    const pronounCard = document.getElementById('pronounUsageCard');
    if (pronounCard) {
        // Handle both new and old data formats
        const pronounRatio = (inclusion.pronounBalance?.ratio || inclusion.pronounRatio || 0).toFixed(2);
        const pronounPoints = inclusion.pronounBalance?.points || 0;
        const collectiveCount = inclusion.pronounBalance?.collectivePronounCount || inclusion.pronounData?.collective || 0;
        const individualCount = inclusion.pronounBalance?.individualPronounCount || inclusion.pronounData?.individual || 0;
        const pronounStatus = pronounRatio >= 0.7 && pronounRatio <= 1.0 ? '🟢 Balanced' : 
                             pronounRatio > 1.0 ? '🟡 Collective-focused' : '🟡 Individual-focused';
        
        console.log('📊 Pronoun data:', { pronounRatio, pronounPoints, collectiveCount, individualCount });
        
        pronounCard.innerHTML = `
            <ul class="metric-list">
                <li class="metric-item">
                    <span class="metric-name">Collective (we, us, our)</span>
                    <span class="metric-value">${collectiveCount}</span>
                </li>
                <li class="metric-item">
                    <span class="metric-name">Individual (I, me, you, my)</span>
                    <span class="metric-value">${individualCount}</span>
                </li>
                <li class="metric-item">
                    <span class="metric-name">Ratio</span>
                    <span class="metric-value">${pronounRatio}</span>
                </li>
            </ul>
            <div style="margin-top: 1rem; padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; color: var(--text-secondary); font-size: 0.875rem;">
                ${pronounStatus} - Appropriate mix of collective identity and individual ownership
            </div>
        `;
    }

    // Interruptions & Repairs Card
    const interruptionsCard = document.getElementById('interruptionsCard');
    if (interruptionsCard) {
        // Handle both new and old data formats
        const interruptionRate = (inclusion.interruptionRate?.rate || inclusion.interruptionRate || 0).toFixed(1);
        const interruptionPoints = inclusion.interruptionRate?.points || 0;
        const interruptionCount = inclusion.interruptionRate?.interruptionCount || inclusion.interruptions || 0;
        const interruptionStatus = interruptionRate <= 3 ? '🟢 Healthy' : interruptionRate <= 8 ? '🟡 Moderate' : '🔴 High';
        
        console.log('📊 Interruption data:', { interruptionRate, interruptionPoints, interruptionCount });
        
        interruptionsCard.innerHTML = `
            <ul class="metric-list">
                <li class="metric-item">
                    <span class="metric-name">Interruptions</span>
                    <span class="metric-value">${interruptionCount}</span>
                </li>
                <li class="metric-item">
                    <span class="metric-name">Rate per 100 utterances</span>
                    <span class="metric-value">${interruptionRate}</span>
                </li>
                <li class="metric-item">
                    <span class="metric-name">Repairs</span>
                    <span class="metric-value">-</span>
                </li>
            </ul>
            <div style="margin-top: 1rem; padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; color: var(--text-secondary); font-size: 0.875rem;">
                ${interruptionStatus} - ${interruptionRate <= 3 ? 'Low interruption rate indicates respectful dialogue' : 'Some interruptions detected'}
            </div>
        `;
    }

    // Inclusion Language Card
    const inclusionLanguageCard = document.getElementById('inclusionLanguageCard');
    if (inclusionLanguageCard) {
        const acknowledgments = inclusion.inclusionLanguage?.acknowledgments || 0;
        const invitations = inclusion.inclusionLanguage?.invitations || 0;
        const reinforcements = inclusion.inclusionLanguage?.reinforcements || 0;
        const total = acknowledgments + invitations + reinforcements;
        
        // Calculate inclusion rate if not provided by LLM
        let inclusionRate = inclusion.inclusionLanguage?.rate || 0;
        if (inclusionRate === 0 && total > 0 && analysis.basicMetrics?.totalUtterances) {
            inclusionRate = (total / analysis.basicMetrics.totalUtterances) * 100;
        }
        inclusionRate = inclusionRate.toFixed(1);
        
        const inclusionPoints = inclusion.inclusionLanguage?.points || 0;
        const inclusionStatus = inclusionRate >= 15 ? '🟢 High Inclusion' : inclusionRate >= 10 ? '🟡 Moderate' : '🔵 Low';
        
        inclusionLanguageCard.innerHTML = `
            <ul class="metric-list">
                <li class="metric-item">
                    <span class="metric-name">Acknowledgments</span>
                    <span class="metric-value">${acknowledgments}</span>
                </li>
                <li class="metric-item">
                    <span class="metric-name">Invitations</span>
                    <span class="metric-value">${invitations}</span>
                </li>
                <li class="metric-item">
                    <span class="metric-name">Reinforcements</span>
                    <span class="metric-value">${reinforcements}</span>
                </li>
            </ul>
            <div style="margin-top: 1rem; padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; color: var(--text-secondary); font-size: 0.875rem;">
                ${inclusionStatus} - ${inclusionRate} instances per 100 utterances
            </div>
        `;
    }

    console.log('✅ Inclusivity Metrics updated');
}

/**
 * Update Decisions and Actions with dynamic data
 */
function updateDecisionsAndActions(analysis) {
    if (!analysis) return;

    const decisions = analysis.decisions || [];
    const actions = analysis.actions || [];

    // Update Decisions
    const decisionsCount = document.getElementById('decisionsCount');
    const decisionsList = document.getElementById('decisionsList');
    
    if (decisionsCount) {
        decisionsCount.textContent = decisions.length;
    }
    
    if (decisionsList) {
        if (decisions.length === 0) {
            decisionsList.innerHTML = '<div style="padding: 1rem; color: var(--text-secondary); text-align: center;">No decisions recorded</div>';
        } else {
            let html = '';
            decisions.forEach((decision) => {
                html += `
                    <div class="takeaway-card">
                        <div class="takeaway-content">${decision.text || decision}</div>
                        <div class="takeaway-meta">
                            ${decision.speaker ? `<span>Speaker: ${decision.speaker}</span>` : ''}
                            <span class="tag decision">DECISION</span>
                        </div>
                    </div>
                `;
            });
            decisionsList.innerHTML = html;
        }
    }

    // Update Actions
    const actionsCount = document.getElementById('actionsCount');
    const actionsList = document.getElementById('actionsList');
    
    if (actionsCount) {
        actionsCount.textContent = actions.length;
    }
    
    if (actionsList) {
        if (actions.length === 0) {
            actionsList.innerHTML = '<div style="padding: 1rem; color: var(--text-secondary); text-align: center;">No action items recorded</div>';
        } else {
            let html = '';
            actions.forEach((action) => {
                html += `
                    <div class="takeaway-card action">
                        <div class="takeaway-content">${action.text || action}</div>
                        <div class="takeaway-meta">
                            ${action.speaker ? `<span>Owner: ${action.speaker}</span>` : ''}
                            <span class="tag action">ACTION</span>
                        </div>
                    </div>
                `;
            });
            actionsList.innerHTML = html;
        }
    }

    console.log('✅ Decisions and Actions updated:', decisions.length, 'decisions,', actions.length, 'actions');
}

/**
 * Update Utterance Distribution with dynamic speaker data
 */
function updateUtteranceDistribution(analysis) {
    if (!analysis || !analysis.participation) return;

    const container = document.getElementById('utteranceDistribution');
    if (!container) return;

    const distribution = analysis.participation.distribution || [];
    
    // Sort by percentage descending (already should be, but ensure it)
    const sorted = [...distribution].sort((a, b) => b.percentage - a.percentage);

    // Color palette for gradients
    const colors = [
        { start: 'rgba(168, 216, 234, 0.8)', end: 'rgba(168, 230, 207, 0.8)' },
        { start: 'rgba(168, 230, 207, 0.8)', end: 'rgba(212, 165, 245, 0.8)' },
        { start: 'rgba(212, 165, 245, 0.8)', end: 'rgba(255, 211, 182, 0.8)' },
        { start: 'rgba(255, 211, 182, 0.8)', end: 'rgba(255, 179, 217, 0.8)' },
        { start: 'rgba(255, 179, 217, 0.8)', end: 'rgba(148, 163, 184, 0.6)' },
        { start: 'rgba(148, 163, 184, 0.6)', end: 'rgba(168, 216, 234, 0.8)' }
    ];

    // Generate HTML for each speaker with aligned layout
    let html = '';
    sorted.forEach((speaker, index) => {
        const color = colors[index % colors.length];
        const gradient = `linear-gradient(90deg, ${color.start}, ${color.end})`;
        const percentage = Math.round(speaker.percentage * 10) / 10; // Round to 1 decimal
        
        html += `
            <div style="display: flex; align-items: center; margin-bottom: 0.75rem; gap: 1rem;">
                <div style="width: 200px; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.95rem; color: var(--text-primary);">
                    ${speaker.name}
                </div>
                <div style="flex: 1; display: flex; align-items: center; gap: 0.5rem;">
                    <div style="flex: 1; height: 28px; background: var(--bg-secondary); border-radius: 4px; overflow: hidden;">
                        <div style="height: 100%; width: ${percentage}%; background: ${gradient}; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; font-size: 0.85rem; font-weight: 600; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
                            ${percentage > 5 ? percentage + '%' : ''}
                        </div>
                    </div>
                    <div style="width: 40px; text-align: right; font-size: 0.9rem; color: var(--text-secondary); font-weight: 600;">
                        ${percentage}%
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    console.log('✅ Utterance Distribution updated with', sorted.length, 'speakers');
}

/**
 * Update content sections with analysis data
 */
function updateContentSections(analysis) {
    // Update KPI cards
    updateKPICards(analysis);
    // Update Utterance Distribution
    updateUtteranceDistribution(analysis);
    // Update Inclusivity Metrics
    updateInclusivityMetrics(analysis);
    // Update Decisions and Actions
    updateDecisionsAndActions(analysis);
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

