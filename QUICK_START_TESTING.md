# 🚀 Quick Start Testing Guide

## The Simplest Way to Test Everything

### 1️⃣ Start the Server (30 seconds)

```bash
npm start
```

**Expected Output:**
```
✅ Server running on http://localhost:3000
✅ OpenRouter API configured: true
✅ Model: google/gemini-2.5-flash
✅ Prompts: analysis-prompt.md + calculations_for_metrics.md
```

### 2️⃣ Open Browser (5 seconds)

Navigate to: **http://localhost:3000**

You should see the upload area with:
- Title: "Better World Meeting Analysis Dashboard"
- Upload zone for .docx files
- Drag-and-drop support

### 3️⃣ Upload a Test Transcript (2 minutes)

You have two options:

**Option A: Use an Existing Transcript**
- If you have a .docx meeting transcript, use that
- Drop it in the upload zone or click "Choose File"

**Option B: Create a Quick Test File**
1. Open Word or any text editor
2. Create sample meeting dialogue like:
   ```
   Speaker A: Let's discuss our strategy.
   Speaker B: I agree. What do you think about the timeline?
   Speaker A: That's a good point. I hear your concerns.
   Speaker B: Thank you for understanding. Let's move forward.
   ```
3. Save as `.docx` in your Documents folder
4. Upload to the dashboard

### 4️⃣ Wait for Analysis (30-60 seconds)

You'll see status messages:
- "Uploading file..."
- "Extracting text from document..."
- "Analyzing with AI..."
- ✅ "Analysis complete!"

### 5️⃣ Verify Download Button Appeared

After analysis completes, you should see:
- ✅ Green "📥 Download Analysis" button in the header
- ✅ "Upload New Transcript" button stays visible
- ✅ Dashboard shows meeting data

### 6️⃣ Check Charts Display Real Data

The dashboard should show:
- **Participation Chart**: Shows actual speakers from your transcript
- **Engagement Chart**: Shows scores (not empty)
- **Topics Chart**: Shows discussion topics from your transcript
- **Knowledge Coverage**: Shows real topics (not hardcoded list)
- **Power Language**: Shows calculated percentages (not hardcoded [42.8, 40.9, 16.3])
- **Relational Timeline**: Shows real data points (not hardcoded timeline)

### 7️⃣ Download the Analysis File

1. Click the "📥 Download Analysis" button
2. File will download: `analysis_2025-11-XX-XXXXXX.json`
3. Open the file in your text editor
4. **Verify it contains:**
   - ✅ `inclusion` object with score (not just stub)
   - ✅ `consensus` object with overall score and topics
   - ✅ `powerDynamics.overall` with calculated percentages
   - ✅ `relational.timeline` with arrays of metrics
   - ✅ `knowledgeGaps.byCoverage` with real topics

---

## 🔍 What to Look For (Success Indicators)

### ✅ Backend Working
- Server logs show: "Combined 2 prompts successfully"
- `outputs/` directory created
- Analysis file saved with timestamp

### ✅ LLM Integration Working  
- Analysis completes without timeout
- JSON response is valid (can open downloaded file)
- Contains all expected fields

### ✅ Frontend Working
- Download button appears after analysis
- Charts populate with non-zero data
- Dashboard is interactive

### ✅ File Operations Working
- Analysis file saved to `outputs/` directory
- Download button triggers file download
- Downloaded JSON is readable and complete

---

## 🐛 Troubleshooting

### Problem: Server won't start
```bash
# Make sure all dependencies are installed
npm install

# Try starting again
npm start
```

### Problem: Upload fails with "API key not configured"
```bash
# Check that .env.local exists and has OPENROUTER_API_KEY
cat .env.local

# Should show:
# OPENROUTER_API_KEY=your_key_here
# PORT=3000
```

### Problem: Analysis takes too long (>2 min)
- Check your internet connection
- Verify OpenRouter API is responding
- Check server logs for errors

### Problem: Charts show "No data available"
- This means the LLM returned empty analysis
- Check server logs for API errors
- Try uploading a longer transcript

### Problem: Download button doesn't appear
- Check browser console for errors (F12)
- Verify analysis completed successfully
- Try refreshing the page

### Problem: Downloaded JSON is empty
- Analysis file wasn't saved properly
- Check `outputs/` directory exists
- Check file permissions

---

## 📊 Example Test Cases

### Test 1: Basic Functionality (3 min)
1. Upload short meeting transcript
2. Wait for analysis
3. Verify charts populate
4. Download file
5. ✅ **Expected**: All steps complete successfully

### Test 2: Multiple Speakers (3 min)
1. Upload transcript with 4+ speakers
2. Check participation chart shows all speakers
3. ✅ **Expected**: Each speaker appears with percentage

### Test 3: Real Data vs Demo Data (2 min)
1. Check Knowledge Coverage chart
2. **Before fix**: Always showed [88, 85, 62, 60, 58, 55, 38, 35]
3. **After fix**: Should show different values based on your transcript
4. ✅ **Expected**: Values change based on uploaded transcript

### Test 4: File Persistence (2 min)
1. Upload transcript #1
2. Download analysis file #1
3. Upload transcript #2  
4. Download analysis file #2
5. ✅ **Expected**: Two separate files in `outputs/` directory

---

## 📈 Expected Behavior Timeline

```
0s:    User clicks "Choose File"
30s:   User selects .docx file
60s:   Upload completes, status: "Analyzing with AI..."
90s:   LLM processes (varies with API response time)
120s:  Status: "Analysis complete!"
125s:  Download button appears
130s:  User clicks "📥 Download Analysis"
131s:  File downloads to machine
135s:  User opens JSON file to verify
```

---

## ✅ Final Verification

After completing all steps, you should have:

1. ✅ Server running with both prompts loaded
2. ✅ Analysis completed successfully  
3. ✅ Charts showing real data (not hardcoded)
4. ✅ Download button visible
5. ✅ JSON file downloaded and saved
6. ✅ File contains all calculation fields
7. ✅ Two analysis files in `outputs/` directory (if tested twice)

**If all ✅, implementation is successful!**

---

## 🎯 What to Do If There Are Issues

**Scenario 1: Charts still show hardcoded data**
- This means frontend isn't loading from `analysis.knowledgeGaps.byCoverage`
- Check browser console for JavaScript errors
- Verify `js/charts-part1.js` was updated correctly

**Scenario 2: Download button doesn't work**
- Check that API response includes `outputFile` field
- Verify `/api/download` endpoint is working
- Try manual download: `localhost:3000/api/download?file=analysis_*.json`

**Scenario 3: Analysis returns empty JSON**
- LLM didn't understand the combined prompts
- Check that both prompts are being loaded (check server logs)
- Verify transcript text was extracted correctly
- Try a longer, clearer transcript

**Scenario 4: Files not saving**
- Check `outputs/` directory has write permissions
- Verify `ensureDirectories()` created the folder
- Check server logs for file write errors

---

## 💡 Pro Tips

1. **Keep server running** in terminal while testing
2. **Check browser console** (F12) for JavaScript errors
3. **Check server logs** for backend errors
4. **Look in `outputs/`** to verify files are being saved
5. **Compare two transcripts** to verify data changes dynamically

---

## 🎊 You're Ready!

Start the server and upload a test transcript. Everything should work automatically now.

**All 5 phases are implemented and ready to test!**

