# Architecture Summary: Where Everything Comes From

## Your Question
> "Where does the analysis prompt file get the logic from? Is it derived from the frontend = from the way charts and metrics are meant to be displayed?"

## The Answer

**No, not really.** The relationship is actually backwards from what you'd hope:

- ❌ The backend prompt was **NOT** designed from the frontend requirements
- ❌ The frontend was **NOT** built to display backend data
- ✅ Instead: Frontend has hardcoded demo data, backend has a generic prompt

---

## What Actually Happened (Timeline Reconstruction)

### Phase 1: You Created Your Methodology (metrics_calculations.md)
**20 detailed sections covering:**
- How to calculate engagement, inclusion, consensus
- Relational health metrics (trust, alignment, care, belonging)
- Power dynamics analysis
- Knowledge gap identification
- Emotional dynamics
- Breakthrough moments
- etc.

📁 File: `systemprompts/metrics_calculations.md` (782 lines)
✅ This is YOUR logic - comprehensive and detailed

### Phase 2: Someone Created the Frontend UI (HTML + Charts)
**Created visualization mockups:**
- 6-part meeting analysis dashboard
- 8 KPI cards
- 6+ interactive charts
- Multiple tab views

📁 Files: `html/meeting-analysis-part*.html`, `js/charts-part1.js`
⚠️ **Problem:** Filled with hardcoded demo data to show the vision

**Hardcoded examples:**
```javascript
// Power dynamics - fake data (should come from your methodology!)
data: [42.8, 40.9, 16.3]

// Knowledge coverage - fake data
data: [88, 85, 62, 60, 58, 55, 38, 35]

// Relational health timeline - fake data
data: [5, 4, 3, 4, 4, 4, 5, 4, 3, 4, 4, 5]
```

### Phase 3: Someone Created a Generic Backend Prompt (analysis-prompt.md)
**A template-style prompt that:**
- Doesn't reference `metrics_calculations.md` at all
- Defines a simple JSON structure
- Has generic calculation instructions
- Is about 1/4 the detail of your methodology

📁 File: `systemprompts/analysis-prompt.md` (192 lines)
❌ **Problem:** Only ~50% of what frontend expects, ~20% of what your methodology specifies

---

## Current Data Flow (What Actually Happens)

```
User uploads .docx
         ↓
     [server.js]
         ↓
Extract text + Load analysis-prompt.md (ignore metrics_calculations.md!)
         ↓
Send to OpenRouter API
         ↓
Get JSON response
         ↓
Return to frontend
         ↓
Frontend tries to use it...
┌────────────────────────────────────────────────────────────────┐
│ For fields that exist in JSON:                                  │
│ ├─ Participation → Uses real data ✅                            │
│ ├─ Engagement → Uses real data ✅                              │
│ ├─ Topics → Uses real data ✅                                   │
│ └─ Actions → Uses real data ✅                                  │
│                                                                 │
│ For fields that DON'T exist in JSON:                           │
│ ├─ Inclusion Score → Falls back to hardcoded 72 ⚠️             │
│ ├─ Consensus Score → Falls back to hardcoded 65 ⚠️             │
│ ├─ Power Dynamics Chart → Shows hardcoded [42.8, 40.9, 16.3]  │
│ ├─ Relational Timeline → Shows hardcoded timeline ⚠️            │
│ ├─ Pronoun Usage → Shows hardcoded 347/423 ⚠️                  │
│ └─ Interruption Data → Shows hardcoded 8 ⚠️                    │
└────────────────────────────────────────────────────────────────┘
         ↓
Dashboard displays mix of real data + demo data = CONFUSING!
```

---

## What You Need For Your Ideal Workflow

### Three Sources of Logic:

1. **Your Methodology (metrics_calculations.md)** ← The RULES
   - How to calculate each metric
   - What constitutes "high" vs "low"
   - Thresholds and classifications
   - Calculation formulas

2. **Frontend Requirements (HTML/JS files)** ← The INTERFACE
   - What fields need to be in JSON?
   - What format? (number, array, object?)
   - What are the data ranges? (0-100, 1-5, etc?)
   - How does each chart need to render?

3. **Backend Prompt (analysis-prompt.md)** ← The BRIDGE
   - Tells LLM: "Apply these rules to get these outputs"
   - Should reference both methodology + required JSON structure
   - Should provide examples

---

## The 3-Tier Logic Architecture You Need

```
┌─────────────────────────────────────────────────────────────┐
│ TIER 1: METHODOLOGY RULES                                    │
│ (metrics_calculations.md)                                    │
│                                                              │
│ "Here's how to calculate engagement score:                  │
│  - Use formula: (0.3 × Balance) + (0.25 × Response) + ..."  │
│                                                              │
│ "Here's what relational health means:                       │
│  - Trust: confidence in others' competence                  │
│  - Alignment: agreement on goals                            │
│  - Care: concern for wellbeing                              │
│  - Belonging: sense of inclusion"                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ TIER 2: JSON INTERFACE SPECIFICATION                         │
│ (analysis-prompt.md WITH EXTENDED STRUCTURE)                │
│                                                              │
│ "Return this JSON with these EXACT keys:                    │
│  {                                                           │
│    "engagement": { score: 0-100 },                          │
│    "inclusion": { score: 0-100, pronounRatio, ... },        │
│    "relational": {                                          │
│      timeline: [ { trust: 1-5, alignment: 1-5, ... } ]     │
│    },                                                        │
│    ...                                                       │
│  }"                                                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ TIER 3: FRONTEND RENDERING                                   │
│ (HTML + JavaScript)                                          │
│                                                              │
│ const data = analysisJSON.engagement.score;                 │
│ displayChart(data);  // Shows actual value, not hardcoded!  │
└─────────────────────────────────────────────────────────────┘
```

---

## Current vs. Ideal Comparison

### CURRENT ARCHITECTURE ❌

```
metrics_calculations.md (unused!)
         ↓
    [IGNORED]
         ↓
analysis-prompt.md (generic)
         ↓
LLM response
         ↓
Frontend (hardcoded fallbacks)
         ↓
Dashboard (mix of real + demo data)
```

### IDEAL ARCHITECTURE ✅

```
metrics_calculations.md (your methodology)
         ↓
    [REFERENCED BY]
         ↓
analysis-prompt.md (EXTENDED with JSON spec)
         ↓
LLM response (follows your methodology exactly)
         ↓
Frontend (uses real data only)
         ↓
Dashboard (100% dynamic from your analysis)
         ↓
Output file (saved for archival/sharing)
```

---

## The Root Issue

Your `metrics_calculations.md` is like having a **cookbook (the recipes)** but the backend prompt only says "make a salad" without referencing the cookbook.

The frontend is like having **empty plates** waiting to be filled, but since the backend doesn't provide the right data, they get filled with placeholder food (hardcoded demo data).

---

## Why This Matters For Your Desired Workflow

Your desired workflow was:
```
1. Upload transcript
2. Combine with metrics_calculations prompts
3. Send to LLM
4. Receive output file
5. Populate dashboard
```

**Currently:**
- ❌ Step 2 is completely skipped
- ❌ Step 4 has no file saved
- ⚠️ Step 5 uses mostly demo data, not real analysis

---

## What Needs to Change

### Change 1: Combine the Prompts in Backend
**File:** `server.js` line 200

```javascript
// CURRENT: Only analysis-prompt
const systemPrompt = await loadSystemPrompt('systemprompts/analysis-prompt.md');

// NEW: Both prompts combined
const analysisPrompt = await loadSystemPrompt('systemprompts/analysis-prompt.md');
const metricsPrompt = await loadSystemPrompt('systemprompts/metrics_calculations.md');
const systemPrompt = `
${analysisPrompt}

---

## METHODOLOGY REFERENCE

${metricsPrompt}
`;
```

### Change 2: Extend the JSON Response Structure
**File:** `systemprompts/analysis-prompt.md`

Add all the missing fields your frontend needs:
- `inclusion` object with score and breakdown
- `consensus` object with topics and score
- Extended `relational` with timeline
- Extended `powerDynamics` 
- etc.

### Change 3: Update Frontend to Use Real Data
**Files:** `js/charts-part1.js`

Remove hardcoded data:
```javascript
// BEFORE (line 241):
data: [88, 85, 62, 60, 58, 55, 38, 35],

// AFTER (use backend data):
data: analysis.knowledgeGaps?.byCoverage?.map(k => k.score) || [],
```

### Change 4: Save Output File
**File:** `server.js` POST `/api/analyze` endpoint

```javascript
// Save analysis to file
const outputPath = `outputs/analysis_${timestamp}.json`;
await fs.writeFile(outputPath, JSON.stringify(analysis, null, 2));

// Return file path in response
res.json({
  success: true,
  analysis: analysis,
  outputFile: outputPath,
  downloadUrl: `/api/download?file=${filename}`
});
```

---

## Summary of Your Architecture

| Component | Purpose | Status |
|-----------|---------|--------|
| `metrics_calculations.md` | YOUR methodology (the rules) | ✅ Exists, ❌ Not Used |
| `analysis-prompt.md` | Backend prompt (the instructions to LLM) | ⚠️ Generic, incomplete |
| `charts-part1.js` | Frontend rendering (the UI) | ⚠️ Hardcoded fallbacks |
| Output file | Persistence (saving analysis) | ❌ Missing |

**Your job:** Connect these pieces so data flows properly from your methodology → through the LLM → into the frontend → and saved to disk.

The architecture is *close*, just not wired correctly.

