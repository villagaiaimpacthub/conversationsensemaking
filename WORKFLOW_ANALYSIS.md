# Workflow Analysis: Current vs. Desired UX

## Your Desired Workflow

```
1. User uploads transcript (Word document)
   ↓
2. Combine with metrics_calculations prompt (MD format from systemprompts/)
   ↓
3. Send both files to LLM
   ↓
4. Receive output file from LLM
   ↓
5. Use the file to populate the dashboard
```

---

## Current Implementation

### ✅ What's Working

**Step 1: User uploads transcript (Word document)**
- ✅ Upload interface exists (`index.html`)
- ✅ Accepts `.docx` files with drag-and-drop support
- ✅ `uploadHandler.js` manages file upload via `/api/analyze` endpoint

**Step 2: Combine with system prompts**
- ✅ `metrics_calculations.md` exists in `systemprompts/`
- ✅ `analysis-prompt.md` exists in `systemprompts/`
- ✅ Backend loads `analysis-prompt.md` using `loadSystemPrompt()` function
- ✅ Transcript text is extracted from .docx using Mammoth.js

**Step 3: Send to LLM**
- ✅ OpenRouter API integration exists
- ✅ System prompt + transcript are sent to LLM in `analyzeWithOpenRouter()` function
- ✅ Google Gemini 2.5 Flash model is used

**Step 4: Receive output from LLM**
- ✅ JSON response is parsed from LLM output
- ✅ Handles markdown code blocks, error cases
- ✅ Returns structured analysis object

**Step 5: Populate dashboard**
- ✅ Analysis stored in `window.analysisData`
- ✅ Tab content loads dynamically from `html/` folder
- ✅ Charts initialize from data

---

## ⚠️ Key Issues / Missing Components

### Issue 1: The `metrics_calculations.md` Prompt is NOT Being Used
**Current State:**
- `metrics_calculations.md` exists but is **completely ignored**
- Only `analysis-prompt.md` is sent to the LLM
- The comprehensive metrics methodology in `metrics_calculations.md` is never utilized

**What Should Happen:**
- Both `analysis-prompt.md` AND `metrics_calculations.md` should be combined
- The LLM should receive complete context about how to calculate all metrics

**Impact:**
- LLM analysis may not follow the intended calculation methodology
- Metrics might be incomplete or inconsistent with your requirements

---

### Issue 2: Output File Not Being Saved/Exported
**Current State:**
- LLM output is returned to frontend only
- No file is saved to disk
- No option to download or export analysis

**Your Intent:**
- "Receive output file from LLM" suggests you want a persistent file
- Should be JSON file with analysis results
- Should be downloadable or accessible for later use

**What's Missing:**
- File export functionality
- Download mechanism in frontend
- File storage (optional but useful)

---

### Issue 3: System Prompt Doesn't Reference `metrics_calculations.md`
**Current State:**
- `analysis-prompt.md` has a basic JSON structure
- Doesn't leverage the detailed calculation logic in `metrics_calculations.md`
- LLM must infer metrics without explicit guidance

**Your Intent:**
- `metrics_calculations.md` contains comprehensive methodology
- Should be used to guide LLM analysis
- Ensures consistency with your intended calculations

---

## 🎯 What Needs to Change

### Priority 1: Combine Both Prompts (CRITICAL)
**File:** `server.js` - Update `/api/analyze` endpoint

Currently:
```javascript
const systemPrompt = await loadSystemPrompt('systemprompts/analysis-prompt.md');
```

Should be:
```javascript
const analysisPrompt = await loadSystemPrompt('systemprompts/analysis-prompt.md');
const metricsPrompt = await loadSystemPrompt('systemprompts/metrics_calculations.md');
const combinedPrompt = `${analysisPrompt}\n\n---\n\nMETHODOLOGY REFERENCE:\n\n${metricsPrompt}`;
```

---

### Priority 2: Add File Export Functionality
**New Features Needed:**

1. **Backend (server.js)**
   - Save analysis JSON to file in `outputs/` directory
   - Generate timestamped filename
   - Return file path in response

2. **Frontend (uploadHandler.js & index.html)**
   - Add "Download Analysis" button after successful upload
   - Use file path from response to trigger download
   - Or create download link from JSON data

**Example Response Should Look Like:**
```json
{
  "success": true,
  "analysis": { ... },
  "outputFile": "outputs/analysis_2025-11-13_145230.json",
  "downloadUrl": "/api/download?file=analysis_2025-11-13_145230.json"
}
```

---

### Priority 3: Update Analysis Prompt with Methodology Reference
**File:** `systemprompts/analysis-prompt.md`

Add a section that references the methodology:
```markdown
## Calculation Methodology

Use the following calculation logic for all metrics:

[Include relevant sections from metrics_calculations.md or reference it]

### Engagement Score Calculation
[From metrics_calculations.md Section 1.2]
...

### Inclusion Score Calculation
[From metrics_calculations.md Section 1.3]
...

[etc.]
```

Or embed the entire metrics file as reference.

---

## 📋 Implementation Checklist

- [ ] **Step 1**: Modify `server.js` to load and combine both prompt files
- [ ] **Step 2**: Test that LLM receives combined prompts
- [ ] **Step 3**: Add `outputs/` directory for storing analysis files
- [ ] **Step 4**: Implement file save logic in backend
- [ ] **Step 5**: Update API response to include output file information
- [ ] **Step 6**: Add download button/functionality in frontend
- [ ] **Step 7**: Test complete flow: Upload → Analyze → Download
- [ ] **Step 8**: Update documentation (README.md)

---

## 🔄 Revised Workflow After Changes

```
1. User uploads transcript (Word document)
   ↓ [uploadHandler.js triggers POST /api/analyze]
   ↓
2. Backend extracts text from .docx
   ↓
3. Backend loads BOTH prompts:
   - analysis-prompt.md (structure & requirements)
   - metrics_calculations.md (methodology & calculations)
   ↓
4. Backend combines prompts with transcript
   ↓
5. Backend sends to OpenRouter API → LLM returns analysis JSON
   ↓
6. Backend SAVES analysis to file in outputs/ directory
   ↓
7. Backend returns to frontend:
   - analysis object (for dashboard display)
   - outputFile path (for download)
   ↓
8. Frontend populates dashboard with analysis data
   ↓
9. Frontend provides download button for JSON file
   ↓
10. User can download complete analysis for archival/sharing
```

---

## 📦 File Structure After Changes

```
.
├── systemprompts/
│   ├── analysis-prompt.md        (structure + requirements)
│   └── metrics_calculations.md   (calculation methodology)
├── outputs/                      (NEW - for saved analysis files)
│   ├── analysis_2025-11-13_145230.json
│   └── analysis_2025-11-13_145231.json
└── server.js                     (MODIFIED - combine prompts + save files)
```

---

## 💡 Additional Recommendations

1. **Versioning**: Include analysis version/date in output
2. **Metadata**: Save upload timestamp, original filename, LLM model used
3. **Archive**: Consider saving uploads to audit trail (though optional)
4. **Validation**: Validate that output JSON matches expected structure
5. **Error Handling**: Handle file save failures gracefully

---

## Summary

**Your desired workflow is 80% implemented.** The main gaps are:

1. ❌ Not using `metrics_calculations.md` in LLM prompt
2. ❌ Not saving output file
3. ❌ No file export/download functionality

**All three require changes to `server.js` and minor updates to frontend.**

This is straightforward work with clear implementation path.

