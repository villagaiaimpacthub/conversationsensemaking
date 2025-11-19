# KPI Cards - LLM Prompt Reference Guide

This document outlines exactly what instructions are sent to the LLM for each KPI card calculation.

---

## 1️⃣ **Total Speakers** 
### Status: ✅ FULLY IMPLEMENTED

**LLM Instruction:**
```
Count unique speakers
- Count the number of unique individuals who spoke during the meeting
- Data source: Speaker identification from transcript
```

**JSON Field:** `basicMetrics.totalSpeakers`

**Example:**
- Input: Transcript with Alex, Bob, Carol, David speaking
- Output: 4

**Thresholds:**
- Any positive number is "Active"
- 0 = No speakers

---

## 2️⃣ **Engagement Score** (0-100)
### Status: ✅ FULLY IMPLEMENTED

**LLM Instruction:**
```
Calculate composite engagement score using weighted average:

Engagement Score = (0.3 × Participation Balance) + (0.25 × Response Rate) + 
                   (0.25 × Active Listening) + (0.2 × Topic Depth)

Where:
- Participation Balance: How evenly distributed turns are (0-100, where 100 = perfectly balanced)
- Response Rate: % of questions that received answers
- Active Listening: Count acknowledgments, follow-ups (0-100)
- Topic Depth: Sustained focus vs. topic-hopping (0-100)
```

**JSON Field:** `engagement.overallEngagement`

**Component Breakdown:**
- **Question Frequency**: Count questions asked, normalize to 0-100 scale
- **Feedback Instances**: Count acknowledgments, agreements, positive feedback
- **Response Dynamics**: Track how often questions get answered
- **Turn-Taking Balance**: Measure how evenly distributed turns are

**Thresholds:**
- 75-100: High engagement ✅
- 50-74: Moderate engagement 🟡
- 0-49: Low engagement ❌

**Example:**
```
Input: 5 speakers, 40 utterances, questions: 8, answered: 7, lots of "I agree", balanced speaking
Output: Engagement Score: 78 (High)
- Participation Balance: 80 (fairly even)
- Response Rate: 87.5 (7/8 questions answered)
- Active Listening: 75 (multiple acknowledgments)
- Topic Depth: 65 (some topic hopping)
```

---

## 3️⃣ **Inclusion Score** (0-100)
### Status: ⚠️ NEEDS PROPER IMPLEMENTATION (Currently basic)

**LLM Instruction:**
```
Calculate 4-component inclusion score (sum = 0-100):

1. PRONOUN BALANCE (0-25 points)
   - Count collective pronouns: "we", "us", "our", "ours"
   - Count individual pronouns: "I", "me", "my", "mine", "you", "your", "yours"
   - Calculate ratio: collective / individual
   - Optimal ratio: 0.7-1.0 (balanced)
   - Scoring:
     * 0.7-1.0 = 25 points
     * 0.5-0.7 or 1.0-1.3 = 20 points
     * 0.3-0.5 or 1.3-1.5 = 15 points
     * Outside ranges = 10 points

2. INTERRUPTION RATE (0-25 points)
   - Count: Speaker cut off mid-sentence
   - Calculate: (interruptions / total_utterances) × 100
   - Scoring (lower is better):
     * ≤ 3% = 25 points
     * ≤ 5% = 20 points
     * ≤ 8% = 15 points
     * ≤ 12% = 10 points
     * > 12% = 5 points

3. INCLUSION LANGUAGE (0-30 points)
   Count three categories:
   
   a) ACKNOWLEDGMENTS:
      - "that's a good point"
      - "I hear you"
      - "thank you for sharing"
      - "I appreciate that"
      - "that makes sense"
      - "great idea"
   
   b) INVITATIONS:
      - "what do you think"
      - "your thoughts"
      - "would you like to add"
      - "your perspective"
      - "any input"
      - "does anyone have"
   
   c) REINFORCEMENTS:
      - "exactly"
      - "yes and"
      - "building on that"
      - "to add to that"
      - "I agree"
      - "right"
      - "absolutely"
   
   Calculate: (total_inclusion_instances / total_utterances) × 100
   Scoring:
     * ≥ 20% = 30 points
     * ≥ 15% = 25 points
     * ≥ 10% = 20 points
     * ≥ 7% = 15 points
     * < 7% = 10 points

4. SPEAKING EQUITY (0-20 points)
   - Calculate Gini coefficient for speaking time distribution
   - Gini: 0 = perfect equality, 1 = perfect inequality
   - Scoring (lower Gini is better):
     * ≤ 0.3 = 20 points
     * ≤ 0.4 = 17 points
     * ≤ 0.5 = 14 points
     * ≤ 0.6 = 10 points
     * > 0.6 = 5 points

FINAL SCORE = Component1 + Component2 + Component3 + Component4
```

**JSON Field:** `inclusion.score` + breakdown components

**Thresholds:**
- 70-100: High inclusion ✅
- 40-69: Moderate inclusion 🟡
- 0-39: Low inclusion ❌

**Example:**
```
Input: Transcript with balanced pronouns, 2% interruptions, good inclusion language, even speaking time
Calculation:
- Pronouns: 0.8 ratio = 25 points
- Interruptions: 2% = 25 points
- Inclusion Language: 18% = 30 points
- Speaking Equity: 0.28 Gini = 20 points
Output: Inclusion Score = 100 (High)
```

---

## 4️⃣ **Consensus Score** (0-100)
### Status: ⚠️ NEEDS PROPER IMPLEMENTATION

**LLM Instruction:**
```
Calculate consensus on each topic discussed, then average:

STEP 1: IDENTIFY ALL DISCUSSION TOPICS
- Extract main topics discussed in meeting

STEP 2: ANALYZE CONSENSUS PER TOPIC
For each topic, count indicator phrases:

AGREEMENT INDICATORS:
- Strong Agreement (100 points each):
  * "I agree"
  * "absolutely"
  * "exactly"
  * "yes"
  * "definitely"
  * "that makes sense"
  * "I'm on board"
  * "let's do it"
  * "sounds good"

- Moderate Agreement (75 points each):
  * "I think so"
  * "probably"
  * "makes sense"
  * "could work"
  * "I'm comfortable with that"
  * "okay"

DISAGREEMENT INDICATORS (50 points deduction each):
- "but"
- "however"
- "I'm not sure"
- "I disagree"
- "I don't think"
- "that won't work"
- "concerned about"
- "worried that"
- "what about"

HESITATION INDICATORS (25 points deduction each):
- "maybe"
- "we should think about"
- "need to consider"
- "not sure"
- "have questions"
- "unclear"

STEP 3: CALCULATE TOPIC CONSENSUS
```
consensus_points = (strong_agreement × 100) + (moderate_agreement × 75) 
                 - (disagreement × 50) - (hesitation × 25)
max_possible = total_responses × 100
topic_consensus = (consensus_points / max_possible) × 100
```

STEP 4: AVERAGE ACROSS ALL TOPICS
```
overall_consensus = average(all_topic_scores)
```

RESULT: 0-100 score representing group agreement level
```

**JSON Field:** `consensus.overallScore` + `consensus.topics[]`

**Classification:**
- 80-100: Strong consensus (unanimous or near-unanimous) ✅
- 60-79: Moderate consensus (general agreement) 🟡
- 40-59: Low consensus (mixed views)
- 0-39: Disagreement (significant opposition) ❌

**Example:**
```
Input: 3 topics discussed
- Topic 1 (Tool Adoption):
  * Strong agreement: 4 instances = 400 points
  * Moderate agreement: 2 instances = 150 points
  * Disagreement: 1 instance = -50 points
  * Hesitation: 0 = 0
  * Total: (400+150-50)/700 = 78% consensus

- Topic 2 (Budget):
  * Strong agreement: 2 = 200
  * Disagreement: 2 = -100
  * Hesitation: 2 = -50
  * Total: 50/500 = 50% consensus

- Topic 3 (Timeline):
  * Strong agreement: 3 = 300
  * Moderate agreement: 1 = 75
  * Total: 375/400 = 94% consensus

Output: Consensus Score = (78 + 50 + 94) / 3 = 74 (Moderate)
```

---

## 5️⃣ **Decisions Made**
### Status: ✅ FULLY IMPLEMENTED

**LLM Instruction:**
```
Extract decisions from meeting transcript.

IDENTIFICATION CRITERIA:
- Clear statement of decision: "We decided to...", "We're going to..."
- Explicit agreement from key stakeholders
- Actionable commitment made

REQUIRED METADATA:
- Speaker name
- Exact decision text
- Evidence of agreement
- Category (if applicable)

LOOK FOR COMMITMENT LANGUAGE:
- "will"
- "going to"
- "plan to"
- "decided"
- "committed to"
```

**JSON Field:** `decisions[]` (array)

**Structure:**
```json
{
  "speaker": "Alex",
  "text": "We're going to adopt the new platform",
  "type": "decision"
}
```

**Counting:**
- Returns the count of decision objects in array
- Example: 4 decisions = "Decisions Made: 4"

**Status Indicators:**
- > 0: "Productive" ✅
- 0: "None Recorded" ❌

---

## 6️⃣ **Action Items**
### Status: ✅ FULLY IMPLEMENTED

**LLM Instruction:**
```
Extract action items assigned to individuals.

REQUIRED ELEMENTS:
1. Action verb: "Create", "Review", "Prepare", "Send", "Follow up", etc.
2. Owner name: Specific person responsible
3. Deliverable description: What needs to be done
4. Optional: Deadline or priority

IDENTIFICATION PATTERNS:
- Direct assignment: "Sarah, can you..."
- Explicit commitment: "I will..."
- Task with owner: "We need [person] to..."

EXAMPLES:
✅ "Alex will prepare the proposal by Friday"
✅ "Bob needs to schedule a follow-up call"
✅ "Carol, can you send the budget report?"
✅ "I'm going to research pricing options"

❌ "We should probably look into that" (no owner)
❌ "Maybe someone will handle it" (vague)
```

**JSON Field:** `actions[]` (array)

**Structure:**
```json
{
  "speaker": "Alex",
  "text": "I will prepare the proposal",
  "type": "action"
}
```

**Counting:**
- Returns the count of action objects in array
- Example: 8 actions = "Action Items: 8"

**Status Indicators:**
- > 0: "Clear Ownership" ✅
- 0: "None Assigned" ❌

---

## 7️⃣ **Knowledge Gaps** (or "Info Gaps")
### Status: ✅ FULLY IMPLEMENTED

**LLM Instruction:**
```
Identify explicit statements of missing information or unanswered questions.

IDENTIFICATION CRITERIA:

EXPLICIT GAPS - Direct statements:
- "We don't know..."
- "Need to find out..."
- "What's the status of...?" (unanswered)
- "We'll need to research..."
- "I don't have that data"
- "We haven't decided yet"

SEVERITY CLASSIFICATION:
- HIGH: Blocks decisions or critical path
  * Prevents moving forward
  * Required for decision-making
  * Example: "We need to know the budget before we can proceed"

- MEDIUM: Important but not immediately blocking
  * Helpful for better decision-making
  * Not time-sensitive
  * Example: "We should understand market competition"

- LOW: Nice to have, not urgent
  * Educational/informational
  * Can be addressed later
  * Example: "It would be good to know industry best practices"

CATEGORIZE BY COVERAGE AREA (optional):
- Strategic
- Operations
- Financial
- Technology
- Market
- Team
- Legal
- Customer/Stakeholder

RETURN:
- Array of explicit gaps with speaker, text, and severity
- Count of total gaps
```

**JSON Fields:** 
- `knowledgeGaps.explicit[]` (array with details)
- `knowledgeGaps.totalGaps` (count)

**Structure:**
```json
{
  "speaker": "Alex",
  "text": "We don't know the final budget allocation",
  "severity": "high"
}
```

**Counting:**
- Sums: explicit gaps + total gaps count
- Example: 6 gaps = "Knowledge Gaps: 6"

**Status Indicators:**
- > 5: "Explicit" 🟡 (many gaps)
- 2-5: "Moderate" 🟡
- 0-2: "Minimal" ✅

---

## ⚠️ **Agenda Coverage** (Special)
### Status: ⚠️ NOT YET IMPLEMENTED - REQUIRES AGENDA INPUT

**LLM Instruction:**
```
Compare planned agenda items to actual discussion.

STEP 1: EXTRACT PLANNED AGENDA
- From meeting notes/invitation
- Or user provides as input

STEP 2: EXTRACT DISCUSSED TOPICS
- Identify main topics discussed
- Use topic modeling or manual review

STEP 3: MATCH PLANNED TO DISCUSSED
- Use semantic similarity matching
- Threshold: 0.65 cosine similarity for match
- Calculate coverage percentage

FORMULA:
Agenda Coverage = (Topics Covered / Total Planned Topics) × 100

THRESHOLDS:
- 90-100%: Excellent coverage ✅
- 75-89%: Good coverage ✅
- 60-74%: Moderate coverage 🟡
- <60%: Poor coverage ❌
```

**JSON Field:** `???` (not yet in output)

**Current Status:**
- Shows 0% by default in KPI card
- Requires "Requires Agenda" indicator
- TODO: Implement agenda input + matching logic

---

## 📊 Summary Table

| KPI Card | JSON Source | Status | Implementation |
|----------|-------------|--------|-----------------|
| Total Speakers | `basicMetrics.totalSpeakers` | ✅ | Complete |
| Engagement Score | `engagement.overallEngagement` | ✅ | Complete |
| Inclusion Score | `inclusion.score` | ⚠️ | Basic (needs components) |
| Consensus Score | `consensus.overallScore` | ⚠️ | Basic (needs topic analysis) |
| Decisions Made | `decisions.length` | ✅ | Complete |
| Action Items | `actions.length` | ✅ | Complete |
| Knowledge Gaps | `knowledgeGaps.totalGaps` | ✅ | Complete |
| Agenda Coverage | (not yet) | ⚠️ | Not Started |

---

## 🔗 Related Sections

For complete calculation details with Python code examples, see:
- `systemprompts/analysis-prompt.md` - High-level LLM instructions
- `systemprompts/calculations_for_metrics.md` - Detailed formulas and code
- `SYSTEM_PROMPTS_COMBINED.txt` - Complete reference document

---

## 💡 Tips for Improvement

1. **Inclusion Score**: Currently too simple. Should implement full 4-component calculation
2. **Consensus Score**: Currently too simple. Should analyze per-topic agreement
3. **Agenda Coverage**: Not yet implemented. Needs user input for planned agenda
4. **All Scores**: Consider adding confidence intervals (e.g., "78 ± 5")
5. **Dynamic Weights**: Consider adjusting weights based on meeting type/length


