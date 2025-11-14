# Quick Reference: Your Architecture at a Glance

## Your Question
> Where does the analysis prompt file get the logic from? Is it derived from the frontend?

## Quick Answer
**No. The prompt is generic and doesn't reference your detailed methodology (`metrics_calculations.md`).**

---

## The Three Logic Sources

### 1️⃣ YOUR METHODOLOGY (metrics_calculations.md)
**What:** Detailed rules for calculating all metrics
**Status:** ✅ Created | ❌ Not connected to backend
**Example:** Section 1.2 defines Engagement Score formula
```
Engagement = (0.3 × Balance) + (0.25 × Response) + (0.25 × Listening) + (0.2 × Depth)
```

### 2️⃣ BACKEND PROMPT (analysis-prompt.md) 
**What:** Instructions sent to LLM
**Status:** ⚠️ Exists but incomplete
**Problem:** Never references your methodology
**Size:** 192 lines (your methodology is 782 lines!)

### 3️⃣ FRONTEND DISPLAY (HTML/JS)
**What:** Charts and visualizations
**Status:** ⚠️ Has hardcoded demo data
**Problem:** Uses placeholder values instead of real analysis
**Examples of hardcoded data:**
- Power Language: `[42.8, 40.9, 16.3]` (static)
- Relational Timeline: `[5, 4, 3, 4, ...]` (static)
- Knowledge Coverage: `[88, 85, 62, ...]` (static)

---

## The Problem (Visual)

```
YOUR METHODOLOGY          BACKEND PROMPT           FRONTEND
(metrics_calculations)    (analysis-prompt)        (charts/html)

20 Sections               192 lines of             8 KPI Cards
782 lines                 generic instructions    6 Charts
✅ Comprehensive          ❌ NOT CONNECTED         ⚠️ Hardcoded Data

         ❌ MISSING LINK ❌
         The prompt never says:
         "Use the methodology from
          metrics_calculations.md"
```

---

## What Happens When User Uploads

```
CURRENT FLOW:

User uploads .docx
     ↓
Extract text
     ↓
Load analysis-prompt.md (IGNORE metrics_calculations.md)
     ↓
Send to LLM
     ↓
LLM returns generic analysis
     ↓
Frontend displays:
├─ Participation data ✅ (from backend)
├─ Engagement score ✅ (from backend)  
├─ Topics ✅ (from backend)
├─ Inclusion score ⚠️ (hardcoded: 72)
├─ Consensus score ⚠️ (hardcoded: 65)
├─ Power dynamics ⚠️ (hardcoded: 42.8, 40.9, 16.3)
├─ Relational health ⚠️ (hardcoded timeline)
└─ Knowledge gaps ⚠️ (hardcoded data)

❌ Dashboard shows MIX OF REAL + DEMO DATA
```

---

## What Should Happen

```
DESIRED FLOW:

User uploads .docx
     ↓
Extract text
     ↓
Load BOTH prompts:
├─ analysis-prompt.md (structure)
└─ metrics_calculations.md (methodology) ← THE KEY CHANGE!
     ↓
Combine prompts → tell LLM HOW to calculate everything
     ↓
Send to LLM
     ↓
LLM returns COMPLETE analysis following your methodology
     ↓
Frontend displays:
├─ Participation ✅ (real data)
├─ Engagement ✅ (real data)
├─ Topics ✅ (real data)
├─ Inclusion ✅ (real data)
├─ Consensus ✅ (real data)
├─ Power dynamics ✅ (real data)
├─ Relational health ✅ (real data)
└─ Knowledge gaps ✅ (real data)

✅ Dashboard shows 100% REAL ANALYSIS

     ↓
Save output file
     ↓
User can download JSON
```

---

## The 4 Changes Needed

| # | Component | Change | File |
|---|-----------|--------|------|
| 1 | Backend Prompt | Load AND combine both prompt files | `server.js:200` |
| 2 | Analysis Prompt | Extend JSON structure with missing fields | `analysis-prompt.md` |
| 3 | Frontend | Remove hardcoded data, use backend values | `charts-part1.js` |
| 4 | File Output | Save analysis to disk + provide download | `server.js:POST /api/analyze` |

---

## Where Each File Comes From

### metrics_calculations.md ← YOU
- Your comprehensive 20-section methodology
- How each metric should be calculated
- Thresholds and interpretations
- **Status:** Created but IGNORED by backend

### analysis-prompt.md ← SOMEONE ELSE
- Generic LLM analysis template
- Basic JSON structure definition
- Simple calculation hints
- **Status:** Only file being used by backend
- **Problem:** Doesn't reference your methodology!

### meeting-analysis-part1.html ← DEMO/TEMPLATE
- Visualization mockup
- Shows what dashboard SHOULD look like
- **Status:** Filled with hardcoded demo data
- **Problem:** Never meant to be production code

### charts-part1.js ← DEMO/TEMPLATE  
- Chart rendering code
- **Status:** Mix of real data + hardcoded fallbacks
- **Problem:** Falls back to demo data when backend doesn't provide it

---

## Data Mismatch Examples

### Missing: Inclusion Score
```
HTML expects (line 16):
<div class="kpi-label">Inclusion Score</div>
<div class="kpi-value">72</div>

Backend provides:
Nothing! (not in analysis-prompt structure)

Frontend does:
Uses hardcoded 72 ⚠️
```

### Missing: Consensus Topics
```
HTML expects (line 283-325):
List of topics with consensus percentages
"SME Timing Strategy" 100%
"Communications Priority" 100%
etc.

Backend provides:
Nothing! (not calculated)

Frontend does:
Uses hardcoded examples ⚠️
```

### Missing: Relational Health Timeline
```
Chart expects (line 351-385):
Timeline array with:
{ trust: 5, alignment: 5, care: 4, belonging: 5 }
{ trust: 4, alignment: 3, care: 4, belonging: 4 }
...

Backend provides:
{ trust: 0-5, collaboration: 0-5 } (not timeline!)

Frontend does:
Uses hardcoded 12-point timeline ⚠️
```

---

## Your Methodology Was Never Used

Looking at `metrics_calculations.md` sections:

| Section | Topic | Status |
|---------|-------|--------|
| 1.2 | Engagement Score Formula | ❌ Not used |
| 1.3 | Inclusion Score Formula | ❌ Not used |
| 1.4 | Consensus Methodology | ❌ Not used |
| 4.1 | Pronoun Usage Analysis | ❌ Not used |
| 4.2 | Interruptions & Repairs | ❌ Not used |
| 10.2 | Power Language Distribution | ❌ Not used (static data used) |
| 13.1-13.4 | Relational Health Metrics | ❌ Not used (static data used) |
| 14.1-14.3 | Emotional Dynamics | ❌ Not used |
| 15.1 | Breakthrough Moments | ❌ Not used |

**Only 50% of your methodology is even attempted in the backend!**

---

## Why This Happened

**Theory:** You created your methodology, then someone created a generic backend prompt template without seeing/reading your methodology file. Then frontend was built to show the vision but filled with placeholder data since backend didn't provide it.

**Evidence:**
- `metrics_calculations.md` never mentioned in `analysis-prompt.md`
- `analysis-prompt.md` is too generic for your specific methodology
- Frontend has exactly the hardcoded values for missing fields
- No cross-references between files

---

## The Fix (In 3 Steps)

### Step 1: Combine Prompts
```javascript
// server.js line 200
const analysisPrompt = await loadSystemPrompt('systemprompts/analysis-prompt.md');
const metricsPrompt = await loadSystemPrompt('systemprompts/metrics_calculations.md');
const systemPrompt = `${analysisPrompt}\n\n---\n\nMETHODOLOGY:\n\n${metricsPrompt}`;
```

### Step 2: Extend JSON Structure
Add to `analysis-prompt.md`:
```json
{
  "inclusion": { score: 0-100, pronounRatio, interruptions, inclusionLanguage },
  "consensus": { score: 0-100, topics: [{topic, consensus}] },
  "relational": { timeline: [{trust: 1-5, alignment: 1-5, care: 1-5, belonging: 1-5}] }
}
```

### Step 3: Remove Hardcoded Data
```javascript
// charts-part1.js
// BEFORE: data: [42.8, 40.9, 16.3]
// AFTER: data: [analysis.powerDynamics.lowPower, analysis.powerDynamics.neutral, analysis.powerDynamics.highPower]
```

---

## Bottom Line

Your `metrics_calculations.md` is **gold** — comprehensive and detailed. But it's sitting unused in a folder while a generic prompt runs the show.

The fix is simple: **Tell the backend prompt to reference your methodology.**

Then the dashboard will show real analysis instead of demo data.

