# Detailed Implementation Plan: Step-by-Step Code Changes

## Overview
This plan shows exact code changes needed to make your workflow work correctly. Each step is clearly marked with file location and before/after code.

---

## PHASE 1: COMBINE PROMPTS IN BACKEND

### Step 1.1: Modify `server.js` - Load Both Prompts

**File:** `server.js`  
**Location:** Lines 55-69 (in the `loadSystemPrompt` function area)

**BEFORE:**
```javascript
/**
 * Read system prompt from file
 * @param {string} promptPath - Path to the system prompt file
 * @returns {Promise<string>} System prompt content
 */
async function loadSystemPrompt(promptPath) {
    try {
        const fullPath = path.join(__dirname, promptPath);
        const content = await fs.readFile(fullPath, 'utf-8');
        return content;
    } catch (error) {
        console.error('Error loading system prompt:', error);
        throw new Error(`Failed to load system prompt: ${error.message}`);
    }
}
```

**AFTER:**
```javascript
/**
 * Read system prompt from file
 * @param {string} promptPath - Path to the system prompt file
 * @returns {Promise<string>} System prompt content
 */
async function loadSystemPrompt(promptPath) {
    try {
        const fullPath = path.join(__dirname, promptPath);
        const content = await fs.readFile(fullPath, 'utf-8');
        return content;
    } catch (error) {
        console.error('Error loading system prompt:', error);
        throw new Error(`Failed to load system prompt: ${error.message}`);
    }
}

/**
 * Combine multiple system prompts into one
 * @param {Array<string>} promptPaths - Paths to prompt files
 * @returns {Promise<string>} Combined prompt content
 */
async function combineSystemPrompts(promptPaths) {
    try {
        const prompts = await Promise.all(
            promptPaths.map(promptPath => loadSystemPrompt(promptPath))
        );
        return prompts.join('\n\n---\n\n');
    } catch (error) {
        console.error('Error combining system prompts:', error);
        throw new Error(`Failed to combine system prompts: ${error.message}`);
    }
}
```

---

### Step 1.2: Modify `/api/analyze` Endpoint - Use Combined Prompts

**File:** `server.js`  
**Location:** Lines 198-204 (inside POST `/api/analyze` handler)

**BEFORE:**
```javascript
        // Step 2: Load system prompt
        console.log('Loading system prompt...');
        const systemPrompt = await loadSystemPrompt('systemprompts/analysis-prompt.md');
```

**AFTER:**
```javascript
        // Step 2: Load and combine system prompts
        console.log('Loading system prompts...');
        const systemPrompt = await combineSystemPrompts([
            'systemprompts/analysis-prompt.md',
            'systemprompts/metrics_calculations.md'
        ]);
```

---

## PHASE 2: EXTEND ANALYSIS PROMPT WITH COMPLETE JSON STRUCTURE

### Step 2.1: Update `systemprompts/analysis-prompt.md` - Add New Sections

**File:** `systemprompts/analysis-prompt.md`  
**Location:** After line 95 (after the current JSON structure example, before "## Analysis Guidelines")

**ADD THIS NEW SECTION:**

```markdown
### EXTENDED METRICS SECTIONS

**INCLUSION SCORE OBJECT**
```json
"inclusion": {
  "score": <number 0-100>,
  "pronounRatio": <number - collective/individual>,
  "pronounData": {
    "collective": <number - count of we/us/our>,
    "individual": <number - count of I/me/my/you>
  },
  "interruptions": <number - count of interruptions>,
  "interruptionRate": <number 0-100 - per 100 utterances>,
  "inclusionLanguage": {
    "acknowledgments": <number>,
    "invitations": <number>,
    "reinforcements": <number>,
    "total": <number>,
    "perHundred": <number>
  },
  "interpretation": "<string - interpretation of inclusion metrics>"
}
```

**CONSENSUS OBJECT**
```json
"consensus": {
  "overallScore": <number 0-100>,
  "topics": [
    {
      "topic": "<string>",
      "consensus": <number 0-100>,
      "description": "<string>"
    }
  ]
}
```

**EXTENDED RELATIONAL OBJECT**
```json
"relational": {
  "timeline": [
    {
      "timeblock": "<string - e.g., '0-10 min'>",
      "trust": <number 1-5>,
      "alignment": <number 1-5>,
      "care": <number 1-5>,
      "belonging": <number 1-5>
    }
  ],
  "summary": {
    "trust": <number 1-5>,
    "alignment": <number 1-5>,
    "care": <number 1-5>,
    "belonging": <number 1-5>
  }
}
```

**EXTENDED POWER DYNAMICS OBJECT**
```json
"powerDynamics": {
  "highPower": <number 0-100>,
  "lowPower": <number 0-100>,
  "neutral": <number 0-100>,
  "byPerson": [
    {
      "speaker": "<string>",
      "highPowerPercentage": <number 0-100>,
      "lowPowerPercentage": <number 0-100>,
      "neutralPercentage": <number 0-100>
    }
  ]
}
```

**KNOWLEDGE GAPS - EXTENDED WITH CATEGORIZATION**
```json
"knowledgeGaps": {
  "explicit": [
    {
      "speaker": "<string>",
      "text": "<string>",
      "type": "explicit",
      "severity": "<high|medium|low>",
      "category": "<string - e.g., 'Financial', 'Technical'>"
    }
  ],
  "implied": [
    {
      "speaker": "<string or null>",
      "text": "<string>",
      "type": "implied",
      "severity": "<high|medium|low>",
      "category": "<string>"
    }
  ],
  "byCoverage": [
    {
      "topic": "<string>",
      "coverageScore": <number 0-100>,
      "level": "<string - Well Covered|Surface Level|Minimal>",
      "gaps": [<array of gap strings>]
    }
  ],
  "totalExplicit": <number>,
  "totalImplied": <number>
}
```

**EMOTIONAL DYNAMICS OBJECT**
```json
"emotionalDynamics": {
  "averageSentiment": <number 1-5>,
  "timeline": [<array of sentiment scores 1-5>],
  "empathyScore": <number 0-100>,
  "triggers": {
    "excitement": [
      {
        "topic": "<string>",
        "intensity": <number 1-5>,
        "evidence": "<string>"
      }
    ],
    "frustration": [
      {
        "topic": "<string>",
        "intensity": <number 1-5>,
        "evidence": "<string>"
      }
    ]
  }
}
```

**BREAKTHROUGH MOMENTS - EXTENDED**
```json
"breakthroughs": [
  {
    "index": <number>,
    "timeblock": "<string>",
    "speaker": "<string>",
    "text": "<excerpt>",
    "type": "<cognitive|emotional|relational|behavioral>",
    "significance": <number 1-5>,
    "description": "<string - why this was a breakthrough>"
  }
]
```

**MEETING QUALITY & STRUCTURE**
```json
"meetingQuality": {
  "overallScore": <number 0-100>,
  "signalToNoiseRatio": <number 0-100>,
  "redundancyPercentage": <number 0-100>,
  "phases": [
    {
      "phase": "<string - Opening|Context|Problem|Solution|Decision|Action|Closing>",
      "percentageOfTime": <number 0-100>,
      "quality": "<string>"
    }
  ],
  "agendaCoverage": <number 0-100>,
  "decisionsVelocity": <number>,
  "interpretation": "<string>"
}
```
```

---

### Step 2.2: Update Analysis Guidelines in `analysis-prompt.md`

**File:** `systemprompts/analysis-prompt.md`  
**Location:** Lines 99-171 (the entire "## Analysis Guidelines" section)

**REPLACE WITH:**

```markdown
## Analysis Guidelines

### Basic Metrics
- Count unique speakers
- Count total utterances (each speaker turn)
- Count total words
- Estimate duration (assume ~150 words per minute)
- Calculate average words per utterance

### Participation Analysis
- Track each speaker's contribution
- Calculate percentage of total words per speaker
- Order by participation percentage (highest first)

### Engagement Metrics
- **Question Frequency**: Count questions asked, normalize to 0-100 scale
- **Feedback Instances**: Count acknowledgments, agreements, positive feedback
- **Response Dynamics**: Track how often questions get answered
- **Turn-Taking Balance**: Measure how evenly distributed turns are (0-100 where 100 = perfectly balanced)
- **Overall Engagement**: Average of the above four metrics

### Topic Analysis
- Identify main topics discussed
- Count mentions/utterances per topic
- Calculate percentage distribution

### Inclusion Score Calculation
**Use the methodology from metrics_calculations.md Section 1.3**
- Calculate pronoun ratio (collective vs individual)
- Count interruptions and calculate rate
- Count inclusion language instances (acknowledgments, invitations, reinforcements)
- Use formula: (0.25 × Pronoun Balance) + (0.25 × (100 - Interruption Rate)) + (0.3 × Inclusion Language Score) + (0.2 × Speaking Equity)
- Result: 0-100 score

### Consensus Score Calculation
**Use the methodology from metrics_calculations.md Section 1.4**
- Identify topics that reached consensus
- Classify each as: Strong (100), Moderate (75), Low (50), Disagreement (25)
- Average across all topics
- Result: 0-100 score

### Knowledge Gaps
- Identify explicit statements of missing information
- Look for phrases like "we don't know", "need to find out", "unclear", etc.
- Classify by severity (high/medium/low)
- Categorize by topic area
- Include both explicit AND implied gaps

### Power Dynamics
- **High Power Language**: Commands, directives, certainty statements ("must", "should", "decide")
- **Low Power Language**: Questions, hedges, qualifiers ("maybe", "perhaps", "could")
- **Neutral Language**: Factual statements, data presentation
- Calculate percentage of each type across all utterances
- **Use methodology from metrics_calculations.md Section 10**

### Relational Dynamics - TIMELINE FORMAT
**Use methodology from metrics_calculations.md Section 13**
- Break meeting into time blocks (e.g., 0-10 min, 10-20 min, etc.)
- For each block, rate 1-5:
  - **Trust**: Confidence in others' competence and intentions
  - **Alignment**: Agreement on goals, values, direction
  - **Care**: Concern for others' wellbeing
  - **Belonging**: Sense of inclusion and membership
- Return array of timeline entries
- Also return summary scores for overall meeting

### Sentiment Analysis
- Assign sentiment score to each utterance (1-5):
  - 1: Very negative
  - 3: Neutral
  - 5: Very positive
- Return timeline array and average score

### Emotional Dynamics
- Identify excitement triggers (topics that generated enthusiasm)
- Identify frustration triggers (topics that generated stress)
- Calculate empathy score from empathetic language instances
- Return both with evidence/examples

### Breakthrough Moments
- Identify significant moments:
  - **Cognitive**: New understanding, "aha" moments
  - **Emotional**: Emotional shifts, vulnerability
  - **Relational**: Dynamics shifts, trust building
  - **Behavioral**: New commitments, pattern changes
- Include: index, speaker, text excerpt, type, significance (1-5), description
- **Use methodology from metrics_calculations.md Section 15**

### Actions & Decisions
- Extract action items (owner + specific task + optional deadline)
- Extract decisions (clear statement of decision + owner)
- Look for commitment language ("will", "going to", "plan to", "decided")

### Meeting Quality
- Calculate signal vs. noise ratio
- Identify redundancy percentage
- Map meeting into phases (opening, context, problem, solution, decision, action, closing)
- Calculate agenda coverage percentage
- Calculate decision velocity (decisions per hour)
- **Use methodology from metrics_calculations.md Section 9 & 16**

### Recommendations
- Generate actionable recommendations based on analysis
- Focus on: participation balance, engagement improvements, knowledge gaps
- Assign priority (high/medium/low)
```

---

## PHASE 3: ADD FILE SAVE & EXPORT FUNCTIONALITY

### Step 3.1: Create `outputs/` Directory Initialization

**File:** `server.js`  
**Location:** Lines 38-44 (in `ensureUploadsDir` function)

**BEFORE:**
```javascript
// Ensure uploads directory exists
const ensureUploadsDir = async () => {
    try {
        await fs.mkdir('uploads', { recursive: true });
    } catch (error) {
        console.error('Error creating uploads directory:', error);
    }
};
```

**AFTER:**
```javascript
// Ensure uploads and outputs directories exist
const ensureDirectories = async () => {
    try {
        await fs.mkdir('uploads', { recursive: true });
        await fs.mkdir('outputs', { recursive: true });
    } catch (error) {
        console.error('Error creating directories:', error);
    }
};
```

---

### Step 3.2: Update Server Startup to Use New Function

**File:** `server.js`  
**Location:** Lines 250-257 (in `startServer` function)

**BEFORE:**
```javascript
// Start server
async function startServer() {
    await ensureUploadsDir();
    
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`OpenRouter API configured: ${!!OPENROUTER_API_KEY}`);
        console.log(`Model: ${MODEL_NAME}`);
    });
}
```

**AFTER:**
```javascript
// Start server
async function startServer() {
    await ensureDirectories();
    
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`OpenRouter API configured: ${!!OPENROUTER_API_KEY}`);
        console.log(`Model: ${MODEL_NAME}`);
    });
}
```

---

### Step 3.3: Save Analysis Output - Modify POST `/api/analyze` Handler

**File:** `server.js`  
**Location:** Lines 213-217 (the response section)

**BEFORE:**
```javascript
        // Step 5: Return analysis results
        res.json({
            success: true,
            analysis: analysis
        });
```

**AFTER:**
```javascript
        // Step 5: Save analysis to file
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const filename = `analysis_${timestamp}.json`;
        const outputPath = path.join('outputs', filename);
        
        try {
            await fs.writeFile(
                outputPath,
                JSON.stringify(analysis, null, 2),
                'utf-8'
            );
            console.log(`Analysis saved to: ${outputPath}`);
        } catch (saveError) {
            console.warn(`Warning: Failed to save analysis file: ${saveError.message}`);
            // Don't fail the request if file save fails, just warn
        }

        // Step 6: Return analysis results with file info
        res.json({
            success: true,
            analysis: analysis,
            outputFile: {
                filename: filename,
                path: outputPath,
                url: `/api/download?file=${filename}`,
                timestamp: timestamp
            }
        });
```

---

### Step 3.4: Add Download Endpoint

**File:** `server.js`  
**Location:** Lines 247-248 (after the health check endpoint)

**ADD NEW ENDPOINT:**

```javascript
/**
 * Download analysis file
 * GET /api/download?file=filename.json
 */
app.get('/api/download', async (req, res) => {
    const filename = req.query.file;
    
    if (!filename) {
        return res.status(400).json({ error: 'No file specified' });
    }
    
    // Sanitize filename to prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        return res.status(400).json({ error: 'Invalid filename' });
    }
    
    const filepath = path.join('outputs', filename);
    
    try {
        // Check if file exists
        await fs.access(filepath);
        
        // Send file
        res.download(filepath, filename, (err) => {
            if (err && !res.headersSent) {
                console.error('Error downloading file:', err);
                res.status(500).json({ error: 'Failed to download file' });
            }
        });
    } catch (error) {
        console.error('File not found:', filepath);
        res.status(404).json({ error: 'File not found' });
    }
});

```

---

## PHASE 4: UPDATE FRONTEND - REMOVE HARDCODED DATA

### Step 4.1: Fix Engagement Components (these are already using backend data - NO CHANGE NEEDED)
✅ Already correct - uses `analysis.engagement` fields

### Step 4.2: Remove Hardcoded Knowledge Coverage Chart

**File:** `js/charts-part1.js`  
**Location:** Lines 228-288 (the Knowledge Coverage Chart initialization)

**BEFORE:**
```javascript
            // Knowledge Coverage Chart
            const knowledgeEl = document.getElementById('knowledgeChart');
            if (knowledgeEl) {
                if (chartInstances.knowledgeChart) {
                    chartInstances.knowledgeChart.destroy();
                }
                const knowledgeCtx = knowledgeEl.getContext('2d');
                const knowledgeChart = new Chart(knowledgeCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Technology/\nPlatform', 'Governance/\nStructure', 'Communications', 'Budget/\nFinance', 'Private\nEquity', 'Investor\nRelations', 'HR/\nCompensation', 'SME Value\nProp'],
                        datasets: [{
                    label: 'Coverage Score',
                    data: [88, 85, 62, 60, 58, 55, 38, 35],
                    // ... rest of chart config
```

**AFTER:**
```javascript
            // Knowledge Coverage Chart
            const knowledgeEl = document.getElementById('knowledgeChart');
            if (knowledgeEl) {
                if (chartInstances.knowledgeChart) {
                    chartInstances.knowledgeChart.destroy();
                }
                
                // Get knowledge coverage data from analysis
                const knowledgeCoverage = analysis.knowledgeGaps?.byCoverage || [];
                const knowledgeLabels = knowledgeCoverage.map(k => k.topic);
                const knowledgeScores = knowledgeCoverage.map(k => k.coverageScore);
                
                const knowledgeCtx = knowledgeEl.getContext('2d');
                const knowledgeChart = new Chart(knowledgeCtx, {
                    type: 'bar',
                    data: {
                        labels: knowledgeLabels.length > 0 ? knowledgeLabels : ['No data available'],
                        datasets: [{
                    label: 'Coverage Score',
                    data: knowledgeScores.length > 0 ? knowledgeScores : [0],
                    // ... rest of chart config
```

---

### Step 4.3: Fix Power Language Chart - Remove Hardcoded Data

**File:** `js/charts-part1.js`  
**Location:** Lines 292-339 (Power Language Pie Chart)

**BEFORE:**
```javascript
            // Power Language Pie Chart
            const powerLanguageEl = document.getElementById('powerLanguageChart');
            if (powerLanguageEl) {
                if (chartInstances.powerLanguageChart) {
                    chartInstances.powerLanguageChart.destroy();
                }
                const powerLanguageCtx = powerLanguageEl.getContext('2d');
                const powerLanguageChart = new Chart(powerLanguageCtx, {
                    type: 'pie',
                    data: {
                        labels: ['Low Power (Collaborative)', 'Neutral', 'High Power (Directive)'],
                        datasets: [{
                    data: [42.8, 40.9, 16.3],
                    // ... rest of config
```

**AFTER:**
```javascript
            // Power Language Pie Chart
            const powerLanguageEl = document.getElementById('powerLanguageChart');
            if (powerLanguageEl) {
                if (chartInstances.powerLanguageChart) {
                    chartInstances.powerLanguageChart.destroy();
                }
                
                // Get power dynamics data from analysis
                const powerData = analysis.powerDynamics;
                const powerLanguageCtx = powerLanguageEl.getContext('2d');
                const powerLanguageChart = new Chart(powerLanguageCtx, {
                    type: 'pie',
                    data: {
                        labels: ['Low Power (Collaborative)', 'Neutral', 'High Power (Directive)'],
                        datasets: [{
                    data: [
                        powerData.lowPower || 0,
                        powerData.neutral || 0,
                        powerData.highPower || 0
                    ],
                    // ... rest of config
```

---

### Step 4.4: Fix Relational Health Timeline - Remove Hardcoded Data

**File:** `js/charts-part1.js`  
**Location:** Lines 341-482 (Relational Health Timeline)

**BEFORE:**
```javascript
            // Relational Health Timeline
            const relationalEl = document.getElementById('relationalTimeline');
            if (relationalEl) {
                if (chartInstances.relationalChart) {
                    chartInstances.relationalChart.destroy();
                }
                const relationalCtx = relationalEl.getContext('2d');
                const relationalChart = new Chart(relationalCtx, {
                    type: 'line',
                    data: {
                        labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100', '100-110', '110-118'],
                        datasets: [
                    {
                        label: 'Trust',
                        data: [5, 4, 3, 4, 4, 4, 5, 4, 3, 4, 4, 5],
                        // ... more datasets
```

**AFTER:**
```javascript
            // Relational Health Timeline
            const relationalEl = document.getElementById('relationalTimeline');
            if (relationalEl) {
                if (chartInstances.relationalChart) {
                    chartInstances.relationalChart.destroy();
                }
                
                // Get relational timeline data from analysis
                const relationalTimeline = analysis.relational?.timeline || [];
                const timeLabels = relationalTimeline.map(item => item.timeblock || 'N/A');
                const trustData = relationalTimeline.map(item => item.trust || 3);
                const alignmentData = relationalTimeline.map(item => item.alignment || 3);
                const careData = relationalTimeline.map(item => item.care || 3);
                const belongingData = relationalTimeline.map(item => item.belonging || 3);
                
                const relationalCtx = relationalEl.getContext('2d');
                const relationalChart = new Chart(relationalCtx, {
                    type: 'line',
                    data: {
                        labels: timeLabels.length > 0 ? timeLabels : ['No data'],
                        datasets: [
                    {
                        label: 'Trust',
                        data: trustData.length > 0 ? trustData : [3],
                        // ... more datasets updated similarly
```

---

## PHASE 5: UPDATE FRONTEND - ADD DOWNLOAD BUTTON

### Step 5.1: Add Download Button to HTML

**File:** `index.html`  
**Location:** Lines 47-51 (in the dashboard header section)

**BEFORE:**
```html
            <!-- Header -->
            <div class="dashboard-header">
                <h1>Better World Meeting Analysis Dashboard</h1>
                <p class="subtitle">Upload a transcript to begin analysis</p>
                <button onclick="showUploadArea()" class="re-upload-button" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--bg-secondary); color: var(--text-primary); border: 1px solid var(--border); border-radius: 6px; cursor: pointer;">Upload New Transcript</button>
            </div>
```

**AFTER:**
```html
            <!-- Header -->
            <div class="dashboard-header">
                <h1>Better World Meeting Analysis Dashboard</h1>
                <p class="subtitle">Upload a transcript to begin analysis</p>
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <button onclick="downloadAnalysis()" id="downloadBtn" class="download-button" style="padding: 0.5rem 1rem; background: var(--pastel-green); color: var(--text-primary); border: 1px solid var(--border); border-radius: 6px; cursor: pointer; display: none;">📥 Download Analysis</button>
                    <button onclick="showUploadArea()" class="re-upload-button" style="padding: 0.5rem 1rem; background: var(--bg-secondary); color: var(--text-primary); border: 1px solid var(--border); border-radius: 6px; cursor: pointer;">Upload New Transcript</button>
                </div>
            </div>
```

---

### Step 5.2: Add Download Function to `uploadHandler.js`

**File:** `js/uploadHandler.js`  
**Location:** End of file (after line 224)

**ADD THESE FUNCTIONS:**

```javascript
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
```

---

### Step 5.3: Update `uploadHandler.js` - Store Download URL

**File:** `js/uploadHandler.js`  
**Location:** Lines 55-62 (in `handleFileUpload` function, after getting response)

**BEFORE:**
```javascript
        const result = await response.json();
        
        if (!result.success || !result.analysis) {
            throw new Error(result.error || 'Analysis failed - no data returned');
        }
        
        // Store analysis data globally for charts
        window.analysisData = result.analysis;
```

**AFTER:**
```javascript
        const result = await response.json();
        
        if (!result.success || !result.analysis) {
            throw new Error(result.error || 'Analysis failed - no data returned');
        }
        
        // Store analysis data globally for charts
        window.analysisData = result.analysis;
        
        // Store download URL if provided
        if (result.outputFile?.url) {
            window.analysisDownloadUrl = result.outputFile.url;
            console.log('Analysis file saved:', result.outputFile.filename);
        }
```

---

### Step 5.4: Show Download Button After Analysis

**File:** `js/uploadHandler.js`  
**Location:** Lines 65-66 (after successful analysis)

**BEFORE:**
```javascript
        showUploadStatus('Analysis complete!', 'success');
        
        // Update dashboard with analysis results
        updateDashboardWithAnalysis(result.analysis);
```

**AFTER:**
```javascript
        showUploadStatus('Analysis complete!', 'success');
        
        // Show download button
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.style.display = 'inline-block';
        }
        
        // Update dashboard with analysis results
        updateDashboardWithAnalysis(result.analysis);
```

---

### Step 5.5: Hide Download Button When Re-uploading

**File:** `js/uploadHandler.js`  
**Location:** Lines 109-128 (in `window.showUploadArea` function)

**BEFORE:**
```javascript
window.showUploadArea = function() {
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.style.display = 'block';
    }
    
    const dashboard = document.getElementById('dashboardContent');
    if (dashboard) {
        dashboard.style.display = 'none';
    }
    
    // Clear analysis data
    window.analysisData = null;
    
    // Clear file input
    const fileInput = document.getElementById('transcriptFile');
    if (fileInput) {
        fileInput.value = '';
    }
}
```

**AFTER:**
```javascript
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
```

---

## Summary of Changes

| Phase | Files | Changes | Priority |
|-------|-------|---------|----------|
| 1 | `server.js` | Add `combineSystemPrompts()`, update `/api/analyze` | 🔴 CRITICAL |
| 2 | `systemprompts/analysis-prompt.md` | Add extended JSON structures, update guidelines | 🔴 CRITICAL |
| 3 | `server.js` | Add file save, add `/api/download` endpoint | 🟠 HIGH |
| 4 | `js/charts-part1.js` | Remove hardcoded data from 3 charts | 🟠 HIGH |
| 5 | `index.html`, `js/uploadHandler.js` | Add download button and functionality | 🟡 MEDIUM |

---

## Testing Checklist

After implementing each phase:

- [ ] **Phase 1:** Check server logs show both prompts loading
- [ ] **Phase 2:** Verify LLM returns new fields (inclusion, consensus, etc.)
- [ ] **Phase 3:** Confirm `outputs/` directory created, file saved with timestamp
- [ ] **Phase 4:** Upload test transcript, verify charts use backend data (not hardcoded)
- [ ] **Phase 5:** Verify download button appears and file downloads correctly

---

## When You Provide New Calculation Logic

I'll integrate it into the analysis prompt to replace/extend Section 2.2 with your specific calculation methodologies.

**Ready to start?** Let me know when you have the calculation logic file!

