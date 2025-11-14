# Meeting Analysis Dashboard - Calculation Logic & Methodology

## ⚡ EXECUTIVE SUMMARY (v2.0 Updates)

**What's New**: This updated version includes complete backend implementation specifications for all dashboard metrics, addressing gaps between frontend display and backend calculation.

**Key Additions**:
1. **✅ Implementation Status** for every metric (fully implemented vs. needs work)
2. **📝 Complete Calculation Logic** for 6 previously undefined metrics:
   - Inclusion Score (4-component composite)
   - Consensus Score (topic-level agreement analysis)
   - Agenda Coverage (semantic topic matching)
   - Power Language Distribution (pattern library + NLP)
   - Relational Health Timeline (temporal indicator tracking)
   - Knowledge Coverage by Domain (categorization + depth scoring)
3. **💻 Python Code Examples** for backend integration
4. **📊 Quick Reference Table** showing all metrics, status, and complexity
5. **📚 Technical Glossary** defining all specialized terms

**For Backend Developers**: Section numbers reference exact calculation methodologies. All formulas, thresholds, and pattern libraries are specified for direct implementation.

**For Dashboard Users**: This document explains what each metric means, how it's calculated, and what the scores indicate about meeting quality.

---

## Document Overview
This document outlines the calculation logic, metrics, and analytical methodology used in the Meeting Analysis Dashboard. Each section details how values are computed, what they measure, and the rationale behind the approach.

---

## IMPLEMENTATION STATUS SUMMARY

### ✅ Fully Implemented Metrics
These metrics have complete backend calculation logic:
- Total Speakers
- Decisions Made  
- Action Items
- Knowledge Gaps (Explicit)
- Speaker Participation Distribution
- Topic Distribution
- Engagement Score (composite calculation defined)

### ⚠️ Needs Backend Implementation
These metrics are either hardcoded in frontend or missing backend calculation:

**Priority 1 - Required for Core KPIs:**
- **Inclusion Score** - Composite calculation defined, needs implementation
- **Consensus Score** - Needs topic-level consensus analysis
- **Agenda Coverage** - Requires agenda input and topic matching

**Priority 2 - Required for Charts:**
- **Power Language Distribution** - Pattern library defined, needs NLP implementation
- **Relational Health Timeline** - Indicator patterns defined, needs temporal analysis
- **Knowledge Coverage by Domain** - Scoring methodology defined, needs categorization

### 📋 Implementation Roadmap

**Phase 1: Core KPIs**
1. Implement Inclusion Score calculation (pronoun ratio, interruptions, inclusion language, equity)
2. Implement Consensus Score calculation (agreement marker analysis)
3. Implement Agenda Coverage (topic matching with planned agenda)

**Phase 2: Advanced Visualizations**  
4. Implement Power Language classifier (pattern-based NLP)
5. Implement Relational Health timeline calculator (temporal indicator tracking)
6. Implement Knowledge Coverage scoring (domain mapping + depth analysis)

**Phase 3: Refinement**
7. Tune thresholds based on real data
8. Add confidence intervals for scores
9. Implement caching for expensive calculations

---

## QUICK REFERENCE TABLE

| Metric | Status | Section | Dependencies | Complexity |
|--------|--------|---------|--------------|------------|
| Total Speakers | ✅ | 1.1 | Speaker identification | Low |
| Engagement Score | ✅ | 1.2 | Multiple components | Medium |
| Inclusion Score | ⚠️ | 1.3 | Pronouns, interruptions, equity | Medium |
| Consensus Score | ⚠️ | 1.4 | Topic extraction, sentiment | Medium |
| Agenda Coverage | ⚠️ | 1.5 | Agenda input, topic matching | Medium |
| Decisions Made | ✅ | 1.6 | Pattern matching | Low |
| Action Items | ✅ | 1.7 | Pattern matching | Low |
| Knowledge Gaps | ✅ | 1.8 | Pattern matching | Low |
| Participation Distribution | ✅ | 2.1 | Utterance counting | Low |
| Engagement Components | ✅ | 2.2 | Component tracking | Medium |
| Utterance Distribution | ✅ | 3.1 | Speaker analysis | Low |
| Pronoun Usage | ✅ | 4.1 | Word counting | Low |
| Interruptions & Repairs | ✅ | 4.2 | Pattern detection | Medium |
| Inclusion Language | ✅ | 4.3 | Phrase counting | Low |
| Topic Distribution | ✅ | 5.1 | Topic modeling | High |
| Agreement Patterns | ✅ | 7.1 | Sentiment per topic | Medium |
| Knowledge Gaps (Implied) | ✅ | 8.2 | Contextual analysis | High |
| Knowledge Coverage | ⚠️ | 8.3 | Domain categorization | High |
| Signal vs Noise | ✅ | 9.1 | On-topic classification | Medium |
| Power Language | ⚠️ | 10.1 | Pattern library + NLP | High |
| Speaker Power Profiles | ⚠️ | 10.2 | Power language per speaker | High |
| Epistemic Authority | ✅ | 11.1 | Deference tracking | Medium |
| Relational Health | ⚠️ | 13 | Indicator patterns + timeline | High |
| Sentiment Analysis | ✅ | 14.1 | NLP sentiment | Medium |
| Empathy Score | ✅ | 14.2 | Pattern matching | Medium |
| Breakthrough Moments | ✅ | 15 | Manual + pattern detection | High |
| Convergence/Divergence | ✅ | 16.1 | Idea tracking | High |
| Group Beliefs | ✅ | 17 | Qualitative analysis | Very High |

**Complexity Legend:**
- **Low**: Simple counting or pattern matching
- **Medium**: Multiple components or moderate NLP
- **High**: Advanced NLP or multiple dependencies  
- **Very High**: Requires human judgment + AI

---

## 1. PRIMARY KPI CARDS

### 1.1 Total Speakers
**Metric**: Count of active participants
**Calculation**: Number of unique individuals who spoke during the meeting
**Data Source**: Speaker identification from transcript

### 1.2 Engagement Score (0-100)
**Metric**: Composite score measuring meeting participation quality
**Calculation**: Weighted average of:
- Balanced participation (even distribution across speakers)
- Response rate (% of questions that received answers)
- Active listening indicators (acknowledgments, follow-ups)
- Topic depth (sustained focus vs. topic-hopping)

**Formula**: 
```
Engagement Score = (0.3 × Participation Balance) + (0.25 × Response Rate) + 
                   (0.25 × Active Listening) + (0.2 × Topic Depth)
```

**Thresholds**:
- 75-100: High
- 50-74: Moderate  
- 0-49: Low

### 1.3 Inclusion Score (0-100)
**Metric**: Measures how inclusive the conversation was
**Status**: ⚠️ NEEDS BACKEND IMPLEMENTATION

**Components Required**:
1. **Pronoun Balance** (25 points)
2. **Interruption Rate** (25 points)
3. **Inclusion Language** (30 points)
4. **Speaking Equity** (20 points)

**Detailed Calculation**:

#### Component 1: Pronoun Balance (0-25 points)
```python
collective_pronouns = count_words(['we', 'us', 'our', 'ours'])
individual_pronouns = count_words(['I', 'me', 'my', 'mine', 'you', 'your', 'yours'])
pronoun_ratio = collective_pronouns / individual_pronouns if individual_pronouns > 0 else 0

# Scoring (optimal ratio is 0.7-1.0)
if 0.7 <= pronoun_ratio <= 1.0:
    pronoun_score = 25
elif 0.5 <= pronoun_ratio < 0.7 or 1.0 < pronoun_ratio <= 1.3:
    pronoun_score = 20
elif 0.3 <= pronoun_ratio < 0.5 or 1.3 < pronoun_ratio <= 1.5:
    pronoun_score = 15
else:
    pronoun_score = 10
```

#### Component 2: Interruption Rate (0-25 points)
```python
interruptions = count_interruptions()  # Speaker cut off mid-sentence
total_utterances = count_total_utterances()
interruption_rate = (interruptions / total_utterances) * 100

# Scoring (lower is better)
if interruption_rate <= 3:
    interruption_score = 25
elif interruption_rate <= 5:
    interruption_score = 20
elif interruption_rate <= 8:
    interruption_score = 15
elif interruption_rate <= 12:
    interruption_score = 10
else:
    interruption_score = 5
```

#### Component 3: Inclusion Language (0-30 points)
```python
acknowledgments = count_phrases([
    'that\'s a good point', 'I hear you', 'thank you for sharing',
    'I appreciate that', 'that makes sense', 'great idea'
])
invitations = count_phrases([
    'what do you think', 'your thoughts', 'would you like to add',
    'your perspective', 'any input', 'does anyone have'
])
reinforcements = count_phrases([
    'exactly', 'yes and', 'building on that', 'to add to that',
    'I agree', 'right', 'absolutely'
])

total_inclusion_language = acknowledgments + invitations + reinforcements
inclusion_rate = (total_inclusion_language / total_utterances) * 100

# Scoring
if inclusion_rate >= 20:
    inclusion_language_score = 30
elif inclusion_rate >= 15:
    inclusion_language_score = 25
elif inclusion_rate >= 10:
    inclusion_language_score = 20
elif inclusion_rate >= 7:
    inclusion_language_score = 15
else:
    inclusion_language_score = 10
```

#### Component 4: Speaking Equity (0-20 points)
```python
# Calculate Gini coefficient for speaking time distribution
# Gini: 0 = perfect equality, 1 = perfect inequality
import numpy as np

speaking_percentages = [calculate_speaker_percentage(speaker) for speaker in speakers]
speaking_percentages.sort()
n = len(speaking_percentages)
index = np.arange(1, n + 1)
gini = (2 * np.sum(index * speaking_percentages)) / (n * np.sum(speaking_percentages)) - (n + 1) / n

# Scoring (lower Gini is better)
if gini <= 0.3:
    equity_score = 20
elif gini <= 0.4:
    equity_score = 17
elif gini <= 0.5:
    equity_score = 14
elif gini <= 0.6:
    equity_score = 10
else:
    equity_score = 5
```

**Final Formula**:
```python
inclusion_score = pronoun_score + interruption_score + inclusion_language_score + equity_score
# Result is already 0-100
```

**Thresholds**:
- 70-100: High
- 40-69: Moderate
- 0-39: Low

### 1.4 Consensus Score (0-100)
**Metric**: Degree of agreement reached on discussed topics
**Status**: ⚠️ NEEDS BACKEND IMPLEMENTATION

**Calculation Method**:

#### Step 1: Identify All Discussion Topics
```python
topics = extract_topics(transcript)  # Using topic modeling or manual tagging
```

#### Step 2: Analyze Consensus for Each Topic
For each topic, count agreement and disagreement indicators:

```python
def calculate_topic_consensus(topic_utterances):
    # Agreement indicators
    strong_agreement = count_phrases([
        'I agree', 'absolutely', 'exactly', 'yes', 'definitely',
        'that makes sense', 'I\'m on board', 'let\'s do it', 'sounds good'
    ])
    
    # Moderate agreement indicators  
    moderate_agreement = count_phrases([
        'I think so', 'probably', 'makes sense', 'could work',
        'I\'m comfortable with that', 'okay'
    ])
    
    # Disagreement indicators
    disagreement = count_phrases([
        'but', 'however', 'I\'m not sure', 'I disagree', 'I don\'t think',
        'that won\'t work', 'concerned about', 'worried that', 'what about'
    ])
    
    # Hesitation indicators
    hesitation = count_phrases([
        'maybe', 'we should think about', 'need to consider',
        'not sure', 'have questions', 'unclear'
    ])
    
    # Calculate consensus level
    total_responses = strong_agreement + moderate_agreement + disagreement + hesitation
    
    if total_responses == 0:
        return 50  # Neutral if no clear indicators
    
    # Weighted scoring
    consensus_points = (strong_agreement * 100) + (moderate_agreement * 75) - (disagreement * 50) - (hesitation * 25)
    max_possible_points = total_responses * 100
    
    consensus_percentage = max(0, min(100, (consensus_points / max_possible_points) * 100))
    
    return consensus_percentage
```

#### Step 3: Classify Consensus Level
```python
def classify_consensus(score):
    if score >= 90:
        return "Strong Consensus"
    elif score >= 70:
        return "Moderate Consensus"
    elif score >= 50:
        return "Low Consensus"
    else:
        return "Disagreement"
```

#### Step 4: Calculate Overall Score
```python
topic_scores = [calculate_topic_consensus(topic) for topic in topics]
consensus_score = sum(topic_scores) / len(topic_scores) if topics else 50
```

**Alternative Simplified Method**:
```python
# For quicker implementation
total_utterances = count_total_utterances()
agreement_markers = count_agreement_phrases()
disagreement_markers = count_disagreement_phrases()

agreement_rate = (agreement_markers / total_utterances) * 100
disagreement_rate = (disagreement_markers / total_utterances) * 100

# Simple consensus score
consensus_score = min(100, (agreement_rate / (agreement_rate + disagreement_rate)) * 100)
```

**Thresholds**:
- 80-100: Strong consensus
- 60-79: Moderate consensus  
- 40-59: Low consensus
- 0-39: Significant disagreement

### 1.5 Agenda Coverage
**Metric**: Percentage of planned topics discussed
**Status**: ⚠️ NEEDS BACKEND IMPLEMENTATION

**Implementation Method**:

#### Step 1: Extract Planned Agenda
```python
# Option A: From meeting invitation/notes
planned_agenda = extract_from_meeting_notes()

# Option B: User provides agenda topics list
planned_topics = [
    "Platform adoption decision",
    "Circle launch strategy", 
    "Communications priorities",
    "Fundraising approach",
    "HR policy framework"
]
```

#### Step 2: Extract Actual Discussion Topics
```python
# Using topic modeling (LDA, NMF, or similar)
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation

# Extract discussed topics from transcript
discussed_topics = extract_topics_from_transcript(
    transcript, 
    n_topics=len(planned_topics) + 3  # Allow for emergent topics
)
```

#### Step 3: Match Planned to Discussed
```python
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Create embeddings
planned_embeddings = model.encode(planned_topics)
discussed_embeddings = model.encode(discussed_topics)

# Calculate similarity matrix
similarity_matrix = cosine_similarity(planned_embeddings, discussed_embeddings)

# Match topics (threshold = 0.65 for semantic similarity)
covered_topics = 0
topic_coverage_details = []

for i, planned_topic in enumerate(planned_topics):
    max_similarity = max(similarity_matrix[i])
    best_match_idx = similarity_matrix[i].argmax()
    
    if max_similarity >= 0.65:
        covered_topics += 1
        status = "Covered"
        match = discussed_topics[best_match_idx]
    else:
        status = "Not Covered"
        match = None
    
    topic_coverage_details.append({
        'planned': planned_topic,
        'status': status,
        'match': match,
        'similarity': max_similarity
    })
```

#### Step 4: Calculate Coverage Score
```python
agenda_coverage = (covered_topics / len(planned_topics)) * 100
```

**Alternative Keyword-Based Method** (simpler):
```python
def calculate_agenda_coverage_simple(planned_topics, transcript):
    covered_count = 0
    
    for topic in planned_topics:
        # Extract key terms from topic
        keywords = extract_keywords(topic)
        
        # Check if keywords appear in transcript
        keyword_mentions = sum([transcript.lower().count(kw.lower()) for kw in keywords])
        
        # Consider covered if keywords mentioned 3+ times
        if keyword_mentions >= 3:
            covered_count += 1
    
    return (covered_count / len(planned_topics)) * 100
```

**Data Source Options**:
1. Manual agenda input at analysis time
2. Extract from meeting notes/invitation
3. Parse from structured meeting format (e.g., "Agenda:" section)
4. Use previous meeting's action items as default agenda

**Thresholds**:
- 90-100%: Excellent coverage
- 75-89%: Good coverage
- 60-74%: Moderate coverage
- <60%: Poor coverage

### 1.6 Decisions Made
**Metric**: Count of explicit decisions
**Identification Criteria**:
- Clear statement of decision ("We decided to...", "We're going to...")
- Explicit agreement from key stakeholders
- Actionable commitment made

### 1.7 Action Items
**Metric**: Count of assigned tasks
**Requirements**:
- Clear owner identified
- Specific action defined
- Traceable commitment

### 1.8 Knowledge or Info Gaps
**Metric**: Explicit statements of missing information
**Identification**: 
- Direct statements ("We don't know...", "Need to find out...")
- Questions left unanswered
- Deferred decisions due to missing data

---

## 2. PARTICIPATION & ENGAGEMENT

### 2.1 Speaker Participation Distribution
**Metric**: % of total utterances per speaker
**Calculation**: 
```
Speaker % = (Speaker's utterances / Total utterances) × 100
```

**Visualization**: Pie chart showing proportional contribution

### 2.2 Engagement Components
**Breakdown of engagement score into constituent parts**:

- **Questions Asked**: Count of interrogative statements
- **Ideas Contributed**: Novel suggestions or proposals
- **Active Listening**: Acknowledgments, paraphrasing, building on others' points
- **Topic Depth**: Average utterances per topic before switching

---

## 3. DETAILED SPEAKER ANALYSIS

### 3.1 Utterance Distribution
**Metric**: Detailed breakdown of speaking time
**Calculation**: For each speaker:
- Total utterances
- % of conversation
- Average words per utterance
- Speaking time (estimated from word count)

**Visual**: Horizontal bar chart, ordered by participation

---

## 4. INCLUSIVITY METRICS

### 4.1 Pronoun Usage
**Metrics Tracked**:

**Collective Pronouns**: Count of "we", "us", "our"
**Individual Pronouns**: Count of "I", "me", "you", "my"
**Ratio**: Collective / Individual

**Interpretation**:
- Ratio > 1.0: Collective-focused
- Ratio 0.7-1.0: Balanced
- Ratio < 0.7: Individual-focused

### 4.2 Interruptions & Repairs
**Definitions**:
- **Interruption**: Speaker cut off mid-sentence by another
- **Repair**: Self-correction or clarification
- **Technical Issue**: Audio/video problems causing breaks

**Calculation**:
```
Interruption Rate = (Interruptions / Total utterances) × 100
```

**Threshold for Healthy**: < 5 interruptions per 100 utterances

### 4.3 Inclusion Language
**Categories Tracked**:

**Acknowledgments**: "That's a good point", "I hear you", "Thank you for sharing"
**Invitations**: "What do you think?", "Would you like to add?", "Your perspective?"
**Reinforcements**: "Exactly", "Building on that", "Yes, and..."

**Calculation**:
```
Inclusion Language Score = (Total instances / Total utterances) × 100
```

**Interpretation**:
- > 15 per 100: High inclusion
- 8-15 per 100: Moderate
- < 8 per 100: Low

---

## 5. DISCUSSION TOPICS

### 5.1 Topic Distribution
**Metric**: % of conversation time per topic
**Methodology**:
1. Identify topic boundaries (topic modeling + manual review)
2. Count utterances per topic
3. Calculate percentage

**Calculation**:
```
Topic % = (Topic utterances / Total utterances) × 100
```

---

## 6. KEY TAKEAWAYS & DECISIONS

### 6.1 Decision Identification
**Criteria for Classification**:
- Explicit decision language
- Clear commitment
- Named owner/responsible party
- Specific action or outcome defined

**Metadata Captured**:
- Decision text
- Owner(s)
- Timestamp in meeting
- Category (DECISION tag)

### 6.2 Action Items Extraction
**Required Elements**:
- Action verb ("Create", "Review", "Prepare")
- Owner name
- Deliverable description
- Optional: Deadline

---

## 7. AGREEMENT & CONSENSUS PATTERNS

### 7.1 Consensus Classification
**Methodology**: Analyze discussion for:
- **Strong Consensus (90-100%)**: Unanimous or near-unanimous agreement, no objections
- **Moderate Consensus (70-89%)**: General agreement with minor reservations
- **Low Consensus (50-69%)**: Mixed views, some disagreement
- **Disagreement (<50%)**: Significant opposition or unresolved conflict

**Indicators Used**:
- Agreement language ("Yes", "Agreed", "I'm on board")
- Disagreement markers ("But", "However", "I'm not sure")
- Silence/non-response
- Voting results if applicable

---

## 8. KNOWLEDGE & INFORMATION GAPS

### 8.1 Explicit Gaps
**Definition**: Directly stated information needs
**Identification**: Pattern matching for:
- "We don't know..."
- "Need to find out..."
- "What's the status of...?" (unanswered)
- "We'll need to research..."

**Severity Classification**:
- **High**: Blocks decisions or critical path
- **Medium**: Important but not immediately blocking
- **Low**: Nice to have, not urgent

### 8.2 Implied Gaps
**Definition**: Information needs inferred from context
**Methodology**:
1. Identify incomplete discussions
2. Note questions raised without answers
3. Recognize areas of uncertainty or hesitation
4. Map to critical business needs

**Categories**:
- Strategic/competitive intelligence
- Operational details
- Financial projections
- Risk assessment
- Stakeholder requirements

### 8.3 Knowledge Coverage Assessment
**Status**: ⚠️ NEEDS BACKEND CATEGORIZATION (Currently hardcoded)

**Visual**: Radar/spider chart showing knowledge depth per topic
**Scale**: 0-100 for each topic domain

**Implementation**:

#### Step 1: Define Knowledge Domains
```python
# Define the key knowledge domains to assess
KNOWLEDGE_DOMAINS = [
    "Strategic Vision",
    "Operations & Processes", 
    "Financial Planning",
    "Technology & Tools",
    "Market & Competition",
    "Team & Culture",
    "Legal & Compliance",
    "Customer/Stakeholder Needs"
]
```

#### Step 2: Calculate Knowledge Depth Per Domain
```python
def calculate_knowledge_depth(transcript, domain):
    """
    Calculate knowledge depth score for a specific domain
    Returns 0-100 score
    """
    
    # Get utterances related to this domain
    domain_utterances = filter_utterances_by_topic(transcript, domain)
    
    if not domain_utterances:
        return 0  # No discussion = no knowledge
    
    # Initialize scoring components
    depth_score = 0
    confidence_score = 0
    evidence_score = 0
    completeness_score = 0
    
    # 1. Discussion Depth (0-25 points)
    # More sustained discussion = deeper knowledge
    depth_score = min(25, len(domain_utterances) * 2)
    
    # 2. Expert Confidence (0-25 points)
    # Confident language vs. uncertain language
    confident_phrases = count_phrases_in_utterances(domain_utterances, [
        r'\b(clearly|definitely|certainly|confident)\b',
        r'\bI\s+know\s+(that|how)\b',
        r'\bwe\s+understand\b'
    ])
    uncertain_phrases = count_phrases_in_utterances(domain_utterances, [
        r'\b(unclear|uncertain|not\s+sure|don\'?t\s+know)\b',
        r'\bneed\s+to\s+(research|find\s+out|investigate)\b',
        r'\bquestion\s+is\b'
    ])
    
    if confident_phrases + uncertain_phrases > 0:
        confidence_ratio = confident_phrases / (confident_phrases + uncertain_phrases)
        confidence_score = confidence_ratio * 25
    
    # 3. Data/Evidence Cited (0-25 points)
    # References to data, reports, past experience
    evidence_markers = count_phrases_in_utterances(domain_utterances, [
        r'\bdata\s+shows\b',
        r'\baccording\s+to\b',
        r'\bresearch\s+(shows|indicates)\b',
        r'\bin\s+our\s+experience\b',
        r'\b(report|study|analysis)\b',
        r'\bthe\s+numbers\b',
        r'\bwe\'?ve\s+seen\b'
    ])
    evidence_score = min(25, evidence_markers * 5)
    
    # 4. Discussion Completeness (0-25 points)
    # Are questions answered? Are gaps acknowledged?
    questions_asked = count_questions_in_utterances(domain_utterances)
    questions_answered = count_answers_after_questions(domain_utterances)
    
    if questions_asked > 0:
        answer_rate = questions_answered / questions_asked
        completeness_score = answer_rate * 25
    else:
        # No questions might mean complete understanding OR no depth
        completeness_score = 15  # Moderate default
    
    # Calculate total score
    total_score = depth_score + confidence_score + evidence_score + completeness_score
    
    return round(total_score)

def count_phrases_in_utterances(utterances, patterns):
    count = 0
    for utterance in utterances:
        for pattern in patterns:
            if re.search(pattern, utterance['text'], re.IGNORECASE):
                count += 1
    return count

def count_questions_in_utterances(utterances):
    return sum([1 for u in utterances if '?' in u['text']])

def count_answers_after_questions(utterances):
    answers = 0
    for i, utterance in enumerate(utterances):
        if '?' in utterance['text'] and i < len(utterances) - 1:
            # Check if next utterance is an answer
            next_utterance = utterances[i + 1]
            # Simple heuristic: if different speaker and no question, likely an answer
            if (next_utterance['speaker'] != utterance['speaker'] and 
                '?' not in next_utterance['text']):
                answers += 1
    return answers
```

#### Step 3: Map Topics to Domains
```python
def map_topics_to_domains(topics):
    """
    Map discussion topics to knowledge domains using keyword matching
    """
    
    DOMAIN_KEYWORDS = {
        "Strategic Vision": ['vision', 'strategy', 'direction', 'mission', 'purpose', 'goal'],
        "Operations & Processes": ['process', 'workflow', 'operations', 'procedures', 'system'],
        "Financial Planning": ['budget', 'funding', 'revenue', 'cost', 'financial', 'money'],
        "Technology & Tools": ['platform', 'tool', 'technology', 'software', 'system', 'tech'],
        "Market & Competition": ['market', 'competitor', 'industry', 'customer', 'positioning'],
        "Team & Culture": ['team', 'culture', 'people', 'hiring', 'hr', 'values'],
        "Legal & Compliance": ['legal', 'compliance', 'regulatory', 'policy', 'governance'],
        "Customer/Stakeholder Needs": ['customer', 'stakeholder', 'user', 'client', 'needs']
    }
    
    domain_mapping = {domain: [] for domain in KNOWLEDGE_DOMAINS}
    
    for topic in topics:
        topic_lower = topic.lower()
        for domain, keywords in DOMAIN_KEYWORDS.items():
            if any(keyword in topic_lower for keyword in keywords):
                domain_mapping[domain].append(topic)
    
    return domain_mapping
```

#### Step 4: Generate Complete Knowledge Coverage
```python
def calculate_knowledge_coverage(transcript):
    """
    Generate complete knowledge coverage assessment
    """
    
    coverage = {}
    
    for domain in KNOWLEDGE_DOMAINS:
        depth_score = calculate_knowledge_depth(transcript, domain)
        coverage[domain] = depth_score
    
    # Calculate overall knowledge coverage
    avg_coverage = sum(coverage.values()) / len(coverage)
    
    # Identify gaps (domains with low scores)
    knowledge_gaps = {k: v for k, v in coverage.items() if v < 50}
    strong_areas = {k: v for k, v in coverage.items() if v >= 75}
    
    return {
        'by_domain': coverage,
        'average': round(avg_coverage),
        'gaps': knowledge_gaps,
        'strong_areas': strong_areas
    }
```

**Output Format for Frontend**:
```json
{
    "by_domain": {
        "Strategic Vision": 85,
        "Operations & Processes": 78,
        "Financial Planning": 65,
        "Technology & Tools": 92,
        "Market & Competition": 45,
        "Team & Culture": 88,
        "Legal & Compliance": 40,
        "Customer/Stakeholder Needs": 60
    },
    "average": 69,
    "gaps": {
        "Market & Competition": 45,
        "Legal & Compliance": 40
    },
    "strong_areas": {
        "Strategic Vision": 85,
        "Technology & Tools": 92,
        "Team & Culture": 88
    }
}
```

**Calculation Basis**:
- **Depth of discussion**: More utterances = more knowledge
- **Expert confidence expressed**: Confident vs. uncertain language
- **Questions raised vs. answered**: Answer rate indicates completeness
- **Data/evidence cited**: References to concrete information

**Interpretation**:
- 85-100: Deep knowledge, high confidence
- 70-84: Good understanding, minor gaps
- 50-69: Moderate knowledge, significant uncertainty
- 30-49: Limited knowledge, many gaps
- 0-29: Very limited or no discussion

---

## 9. MEETING QUALITY ASSESSMENT

### 9.1 Signal vs. Noise
**Definitions**:
- **Signal**: On-topic, productive discussion
- **Noise**: Off-topic, redundant, or administrative talk

**Calculation**:
```
Signal % = (Signal utterances / Total utterances) × 100
Noise % = 100 - Signal %
```

**Threshold for Quality**: > 80% signal

### 9.2 Redundancy Analysis
**Metric**: % of repeated information
**Calculation**:
- Identify semantically similar utterances
- Mark as redundant if same point made >2 times
```
Redundancy % = (Redundant utterances / Total utterances) × 100
```

**Threshold for Efficiency**: < 10% redundancy

### 9.3 Meeting Flow Phases
**Methodology**: Identify distinct phases in meeting structure
**Common Phases**:
1. Opening/Check-in
2. Context Setting
3. Problem Identification
4. Solution Exploration
5. Decision Making
6. Action Planning
7. Closing/Summary

**Calculation**: Time spent (% of meeting) in each phase

---

## 10. POWER DYNAMICS

### 10.1 Power Language Distribution
**Status**: ⚠️ NEEDS PROPER BACKEND CALCULATION (Currently hardcoded in frontend)

**Categories**:

**High Power Language**:
- Commands: "Do this", "You need to"
- Directives: "Let's move on", "We should"
- Certainty: "Obviously", "Clearly"
- Interruptions (dominant)

**Low Power Language**:
- Questions: "What do you think?"
- Hedges: "Maybe", "Perhaps", "Could we"
- Qualifiers: "In my opinion", "I wonder if"
- Deference: "If you agree", "Does that make sense?"

**Neutral Language**:
- Factual statements
- Data presentation
- Process discussion

**Implementation**:

#### Step 1: Define Pattern Libraries
```python
HIGH_POWER_PATTERNS = {
    'commands': [
        r'\b(do|make|create|get|take|give)\s+(this|that|it)\b',
        r'\byou\s+(need|must|should|have)\s+to\b',
        r'\b(just|simply|obviously|clearly)\s+\w+\b'
    ],
    'directives': [
        r'\blet\'?s\s+(move|go|get|do)\b',
        r'\bwe\s+(should|must|need\s+to|have\s+to)\b',
        r'\b(here\'?s\s+what|this\s+is\s+how)\b'
    ],
    'certainty': [
        r'\b(obviously|clearly|definitely|certainly|absolutely)\b',
        r'\bthere\'?s\s+no\s+(question|doubt)\b',
        r'\bwithout\s+a\s+doubt\b'
    ],
    'interruptions': [
        # Detected by speech pattern analysis
        # Speaker A mid-sentence -> Speaker B starts
    ]
}

LOW_POWER_PATTERNS = {
    'questions': [
        r'\bwhat\s+do\s+you\s+think\b',
        r'\b(could|would|might)\s+we\b',
        r'\b(any\s+thoughts|your\s+perspective|input)\b'
    ],
    'hedges': [
        r'\b(maybe|perhaps|possibly|probably)\b',
        r'\b(sort\s+of|kind\s+of|I\s+guess)\b',
        r'\bmight\s+be\s+able\s+to\b'
    ],
    'qualifiers': [
        r'\bin\s+my\s+(opinion|view|perspective)\b',
        r'\bI\s+(think|feel|believe|wonder)\b',
        r'\bit\s+seems\s+(like|to\s+me)\b'
    ],
    'deference': [
        r'\bif\s+(you|everyone)\s+agree\b',
        r'\bdoes\s+that\s+make\s+sense\b',
        r'\bis\s+that\s+(okay|alright)\b'
    ]
}

NEUTRAL_PATTERNS = {
    'statements': [
        r'\b(the|this|that)\s+\w+\s+(is|was|will\s+be)\b',
        r'\baccording\s+to\b',
        r'\bdata\s+shows\b'
    ]
}
```

#### Step 2: Classify Each Utterance
```python
import re

def classify_power_language(utterance):
    high_power_count = 0
    low_power_count = 0
    
    # Check high power patterns
    for category, patterns in HIGH_POWER_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, utterance, re.IGNORECASE):
                high_power_count += 1
    
    # Check low power patterns
    for category, patterns in LOW_POWER_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, utterance, re.IGNORECASE):
                low_power_count += 1
    
    # Classify
    if high_power_count > low_power_count:
        return 'high'
    elif low_power_count > high_power_count:
        return 'low'
    else:
        return 'neutral'

def analyze_transcript_power_language(transcript):
    utterances = split_into_utterances(transcript)
    
    high_count = 0
    low_count = 0
    neutral_count = 0
    
    for utterance in utterances:
        classification = classify_power_language(utterance['text'])
        if classification == 'high':
            high_count += 1
        elif classification == 'low':
            low_count += 1
        else:
            neutral_count += 1
    
    total = len(utterances)
    
    return {
        'high_power_pct': (high_count / total) * 100,
        'low_power_pct': (low_count / total) * 100,
        'neutral_pct': (neutral_count / total) * 100,
        'counts': {
            'high': high_count,
            'low': low_count,
            'neutral': neutral_count
        }
    }
```

#### Step 3: Calculate Per-Speaker Profiles
```python
def calculate_speaker_power_profiles(transcript):
    speakers_data = {}
    
    for speaker in get_unique_speakers(transcript):
        speaker_utterances = get_speaker_utterances(transcript, speaker)
        
        high_count = 0
        low_count = 0
        neutral_count = 0
        
        for utterance in speaker_utterances:
            classification = classify_power_language(utterance)
            if classification == 'high':
                high_count += 1
            elif classification == 'low':
                low_count += 1
            else:
                neutral_count += 1
        
        total = len(speaker_utterances)
        
        speakers_data[speaker] = {
            'high_pct': round((high_count / total) * 100, 1) if total > 0 else 0,
            'low_pct': round((low_count / total) * 100, 1) if total > 0 else 0,
            'neutral_pct': round((neutral_count / total) * 100, 1) if total > 0 else 0
        }
    
    return speakers_data
```

**Output Format for Frontend**:
```json
{
    "overall": {
        "high_power": 16.3,
        "low_power": 42.8,
        "neutral": 40.9
    },
    "by_speaker": {
        "Alex": {"high": 22, "low": 31, "neutral": 47},
        "G": {"high": 19, "low": 35, "neutral": 46},
        "Sudheer": {"high": 8, "low": 58, "neutral": 34}
    }
}
```

**Interpretation**:
- High low-power language (>40%): Collaborative culture
- High high-power language (>30%): Hierarchical culture
- Balanced (20-30% each): Context-dependent leadership

### 10.2 Speaker Power Profiles
**Metric**: % of high-power vs. low-power language per speaker
**Calculation**: For each speaker:
```
High Power % = (High power utterances / Speaker's total utterances) × 100
Low Power % = (Low power utterances / Speaker's total utterances) × 100
```

**Visualization**: Stacked bar showing power language distribution per speaker

---

## 11. EPISTEMIC AUTHORITY

### 11.1 Knowledge Control Analysis
**Definition**: Who the group defers to as domain experts
**Identification Methodology**:
1. Track when speakers ask someone specific for input
2. Note when group waits for someone's opinion before deciding
3. Observe trust without verification
4. Count explicit expertise references

**Calculation**:
```
Authority Score = Count of deference instances per person per domain
```

**Example**: "G" has 8 instances in Technology domain

---

## 12. DOMINANT ARCHETYPES

### 12.1 Conversational Role Classification
**Methodology**: Classify speakers into archetypal roles based on language patterns

**Archetypes Identified**:
- **Ruler/Mentor**: Directive, guiding, authority
- **Sage/Judge**: Analytical, evaluative, wisdom-seeking
- **Creator/Sage**: Innovative, questioning, exploring
- **Caregiver**: Supportive, nurturing, harmonizing
- **Warrior**: Challenging, advocating, defending
- **Jester**: Lightening mood, creating connection

**Calculation**: Pattern matching on utterance content
**Score**: % of utterances matching archetype pattern

---

## 13. RELATIONAL HEALTH METRICS

**Status**: ⚠️ NEEDS TIMELINE CALCULATION (Currently hardcoded values)

### 13.1 Trust
**Definition**: Expressions of confidence in others' competence and intentions

**Indicators to Track**:
```python
TRUST_INDICATORS = {
    'vulnerability_sharing': [
        r'\bI\s+don\'?t\s+know\b',
        r'\bI\'?m\s+(not\s+sure|uncertain|confused)\b',
        r'\bneed\s+help\s+with\b'
    ],
    'delegation': [
        r'\b(you\s+decide|your\s+call|trust\s+your\s+judgment)\b',
        r'\bI\'?ll\s+leave\s+that\s+to\s+you\b',
        r'\byou\'?re\s+the\s+expert\b'
    ],
    'accepting_expertise': [
        r'\bthat\s+makes\s+sense\b',
        r'\bI\s+trust\s+(that|you)\b',
        r'\bsounds\s+good\b'
    ],
    'minimal_verification': [
        # Absence of: "Are you sure?", "Can you prove that?", "Show me"
        # Count as positive when expertise accepted without questioning
    ]
}
```

**Calculation Method**:
```python
def calculate_trust_score(utterances, time_interval_minutes=10):
    trust_timeline = []
    
    # Split meeting into intervals
    intervals = split_into_time_intervals(utterances, time_interval_minutes)
    
    for interval in intervals:
        trust_count = 0
        distrust_count = 0
        
        for utterance in interval:
            # Positive trust indicators
            for category, patterns in TRUST_INDICATORS.items():
                for pattern in patterns:
                    if re.search(pattern, utterance, re.IGNORECASE):
                        trust_count += 1
            
            # Negative trust indicators
            if re.search(r'\b(are\s+you\s+sure|prove\s+it|show\s+me)\b', utterance, re.IGNORECASE):
                distrust_count += 1
        
        total_indicators = trust_count + distrust_count
        if total_indicators > 0:
            trust_score = (trust_count / total_indicators) * 100
        else:
            trust_score = 70  # Neutral baseline
        
        trust_timeline.append({
            'time': interval['start_time'],
            'score': trust_score
        })
    
    return trust_timeline
```

**Scoring**: 0-100 scale based on frequency of trust indicators
**Measurement**: Throughout meeting timeline (10-minute intervals)

### 13.2 Alignment
**Definition**: Agreement on goals, values, and direction

**Indicators to Track**:
```python
ALIGNMENT_INDICATORS = {
    'shared_language': [
        r'\bour\s+(mission|vision|goal|purpose)\b',
        r'\bwe\'?re\s+all\s+(trying|working|aiming)\b',
        r'\bshared\s+(understanding|vision|goal)\b'
    ],
    'priority_agreement': [
        r'\b(most\s+important|priority|focus|critical)\b',
        # Check for agreement after priority statements
    ],
    'unified_purpose': [
        r'\btogether\s+we\b',
        r'\bcollective(ly)?\b',
        r'\bsame\s+page\b'
    ]
}

MISALIGNMENT_INDICATORS = [
    r'\bI\s+thought\s+we\s+were\b',
    r'\bthat\'?s\s+not\s+what\s+I\s+understood\b',
    r'\bdifferent\s+direction\b'
]
```

**Calculation**:
```python
def calculate_alignment_score(utterances, time_interval_minutes=10):
    alignment_timeline = []
    
    intervals = split_into_time_intervals(utterances, time_interval_minutes)
    
    for interval in intervals:
        alignment_count = 0
        misalignment_count = 0
        
        for utterance in interval:
            # Positive alignment
            for category, patterns in ALIGNMENT_INDICATORS.items():
                for pattern in patterns:
                    if re.search(pattern, utterance, re.IGNORECASE):
                        alignment_count += 1
            
            # Misalignment
            for pattern in MISALIGNMENT_INDICATORS:
                if re.search(pattern, utterance, re.IGNORECASE):
                    misalignment_count += 1
        
        total = alignment_count + misalignment_count
        if total > 0:
            alignment_score = (alignment_count / total) * 100
        else:
            alignment_score = 70  # Neutral baseline
        
        alignment_timeline.append({
            'time': interval['start_time'],
            'score': alignment_score
        })
    
    return alignment_timeline
```

**Scoring**: 0-100 based on alignment markers

### 13.3 Care
**Definition**: Concern for others' wellbeing and experience

**Indicators**:
```python
CARE_INDICATORS = {
    'checking_in': [
        r'\bhow\s+(are\s+you|is\s+everyone)\b',
        r'\bfeeling\s+okay\b',
        r'\bneed\s+a\s+break\b'
    ],
    'acknowledging_feelings': [
        r'\bI\s+(hear|see|understand)\s+(that|how)\b',
        r'\bthat\s+must\s+(be|feel)\b',
        r'\bI\s+appreciate\s+(you|that)\b'
    ],
    'accommodating': [
        r'\blet\s+me\s+know\s+if\s+you\s+need\b',
        r'\bhappy\s+to\s+(help|adjust|change)\b',
        r'\bwhatever\s+works\s+for\s+you\b'
    ],
    'gratitude': [
        r'\bthank\s+you\b',
        r'\bgrateful\s+for\b',
        r'\bappreciate\s+(you|this|that)\b'
    ]
}
```

**Calculation**: Same pattern as trust/alignment

### 13.4 Belonging
**Definition**: Sense of inclusion and membership

**Indicators**:
```python
BELONGING_INDICATORS = {
    'collective_identity': [
        r'\bwe\'?re\s+a\s+(team|tribe|family|community)\b',
        r'\bour\s+(group|team|community)\b',
        r'\btogether\b'
    ],
    'inclusion': [
        r'\ball\s+of\s+us\b',
        r'\beveryone\'?s\s+(voice|input|perspective)\b',
        r'\bwe\s+all\b'
    ],
    'shared_references': [
        r'\bas\s+we\s+(discussed|agreed|decided)\b',
        r'\bour\s+(conversation|agreement|decision)\b'
    ],
    'membership': [
        r'\bpart\s+of\s+(this|the\s+team)\b',
        r'\bnot\s+alone\b',
        r'\bin\s+this\s+together\b'
    ]
}
```

**Calculation**: Same pattern as trust/alignment

### 13.5 Complete Timeline Implementation
```python
def calculate_relational_health_timeline(transcript, interval_minutes=10):
    utterances = parse_transcript_with_timestamps(transcript)
    
    trust_data = calculate_trust_score(utterances, interval_minutes)
    alignment_data = calculate_alignment_score(utterances, interval_minutes)
    care_data = calculate_care_score(utterances, interval_minutes)
    belonging_data = calculate_belonging_score(utterances, interval_minutes)
    
    # Combine into single timeline
    timeline = []
    for i in range(len(trust_data)):
        timeline.append({
            'time': trust_data[i]['time'],
            'trust': trust_data[i]['score'],
            'alignment': alignment_data[i]['score'],
            'care': care_data[i]['score'],
            'belonging': belonging_data[i]['score']
        })
    
    # Calculate overall averages
    avg_trust = sum([t['trust'] for t in timeline]) / len(timeline)
    avg_alignment = sum([t['alignment'] for t in timeline]) / len(timeline)
    avg_care = sum([t['care'] for t in timeline]) / len(timeline)
    avg_belonging = sum([t['belonging'] for t in timeline]) / len(timeline)
    
    return {
        'timeline': timeline,
        'averages': {
            'trust': round(avg_trust),
            'alignment': round(avg_alignment),
            'care': round(avg_care),
            'belonging': round(avg_belonging)
        }
    }
```

**Output Format for Frontend**:
```json
{
    "timeline": [
        {"time": 0, "trust": 75, "alignment": 80, "care": 85, "belonging": 82},
        {"time": 10, "trust": 78, "alignment": 82, "care": 87, "belonging": 85},
        {"time": 20, "trust": 80, "alignment": 85, "care": 88, "belonging": 88}
    ],
    "averages": {
        "trust": 82,
        "alignment": 84,
        "care": 86,
        "belonging": 86
    }
}
```

**Timeline Visualization**: Line chart showing all four metrics over time

---

## 14. EMOTIONAL DYNAMICS

### 14.1 Sentiment Analysis
**Methodology**: Natural Language Processing sentiment analysis
**Calculation**:
- Assign sentiment score to each utterance (-5 to +5)
- -5 to -3: Very negative
- -2 to -1: Somewhat negative
- 0: Neutral
- +1 to +2: Somewhat positive
- +3 to +5: Very positive

**Average Sentiment**:
```
Avg Sentiment = Sum of all utterance sentiments / Total utterances
```

**Timeline**: Plot sentiment over time (10-minute intervals)

### 14.2 Empathy Score
**Definition**: Frequency of empathetic behaviors
**Components**:

**Explicit Empathetic Statements**: "I understand how you feel", "That must be challenging"
**Feeling-Oriented Questions**: "How does that feel?", "What's your sense?"
**Active Listening/Validation**: "I hear you", "That makes sense", paraphrasing

**Calculation**:
```
Empathy Score = (Total empathy instances / Total utterances) × 100
```

**Thresholds**:
- > 20 per 100: High empathy
- 10-20 per 100: Moderate
- < 10 per 100: Low

### 14.3 Emotional Triggers
**Categories**:

**Excitement Triggers**: Topics/moments that generated enthusiasm
- Identification: Exclamatory language, positive sentiment spikes
- Examples: "Awesome!", "This is great!", multiple expressions of excitement

**Frustration Triggers**: Topics/moments that generated stress
- Identification: Negative sentiment, tension markers
- Examples: Sighs, hesitations, negative language

**Methodology**: 
1. Identify sentiment peaks/troughs
2. Correlate with topics being discussed
3. Classify trigger type
4. Document trigger and response

---

## 15. BREAKTHROUGH MOMENTS

### 15.1 Classification System
**Four Types of Breakthroughs**:

**Cognitive Breakthroughs**: 
- New understanding or insight
- "Aha" moments
- Strategic clarity
- Example: "We're not ready for SME pitch" - collective realization

**Emotional Breakthroughs**:
- Significant emotional shift
- Vulnerability moment
- Emotional connection
- Example: Chris's determination opening

**Relational Breakthroughs**:
- Shift in group dynamics
- Conflict resolution
- Trust building
- Example: Tool adoption consensus after debate

**Behavioral Breakthroughs**:
- New commitment to action
- Pattern interruption
- Decision to change behavior
- Example: "Work in progress is okay" - permission to act imperfectly

### 15.2 Identification Methodology
**Indicators**:
- Language shift (before/after)
- Energy change (sentiment spike)
- Group response (multiple affirmations)
- Explicit naming ("This is a breakthrough")
- Decision or commitment following

**Timeline Plotting**: Scatter plot with:
- X-axis: Time in meeting (minutes)
- Y-axis: Breakthrough type
- Size: Significance

---

## 16. CONVERSATION STRUCTURE & QUALITY

### 16.1 Convergence/Divergence Analysis
**Definitions**:
- **Divergence**: Exploring multiple perspectives, generating options
- **Convergence**: Narrowing focus, moving toward decision

**Measurement**:
- Count unique ideas/perspectives introduced (divergence)
- Count agreement statements and option elimination (convergence)

**Healthy Pattern**: 
- Diverge → Converge pattern (V-shape)
- Divergence early, convergence later

**Visualization**: Line chart showing divergence/convergence over time

### 16.2 Signal vs. Noise Timeline
**Granularity**: 10-minute intervals
**Calculation**: For each interval:
```
Signal % = (On-topic utterances / Total utterances in interval) × 100
Noise % = 100 - Signal %
```

**Stacked Bar Chart**: Shows signal (green) vs. noise (orange) over time

### 16.3 Conversation Branch Analysis
**Definition**: Tracking topic transitions and tangents
**Metrics**:
- **Main Threads**: Primary discussion topics
- **Successful Branches**: Tangents that added value
- **Dead Ends**: Unresolved tangents
- **Returned Branches**: Topics revisited later

**Calculation**:
- Map topic flow as directed graph
- Classify each branch by outcome
- Count each type

---

## 17. GROUP BELIEFS & WORLDVIEWS

### 17.1 Identification Methodology
**Five-Factor Analysis**:

1. **Pattern Recognition**: Recurring phrases/themes revealing assumptions
   - Track repeated language
   - Identify underlying assumptions

2. **Action-Belief Correlation**: What actions/decisions reveal about values
   - Observe what group chooses to do
   - Infer values from choices

3. **Metaphor Analysis**: Symbolic language used
   - Examples: "tribe", "journey", "derailing"
   - Reveals mental models

4. **Resistance Points**: Where hesitation occurred
   - Note pushback or concern
   - Indicates conflicting beliefs

5. **Affirmation Patterns**: Strong agreement vs. pushback
   - Track enthusiasm vs. skepticism
   - Shows collective vs. individual beliefs

### 17.2 Belief Categories
**Encouraging Beliefs**: Beliefs that empower the group
- Examples: "Work in progress is okay", "We're a tribe"

**Limiting Beliefs**: Beliefs that constrain the group
- Examples: "We need everything figured out", "External validation required"

**Classification Criteria**:
- Does it enable action or create hesitation?
- Does it build confidence or create anxiety?
- Does it support growth or maintain status quo?

---

## 18. HEALTHY POWER DYNAMICS INDICATORS

### 18.1 Sympathy Positioning
**Definition**: Offering help in ways that support vs. control
**Identification**:
- Offering to reduce collective burden (healthy)
- Servant leadership positioning (healthy)
- "Rescuing" to establish superiority (unhealthy)

**Measurement**: Count instances and classify intent
**Healthy Indicators**:
- Genuine task-taking
- No strings attached
- No expectation of deference

### 18.2 Humor & Teasing
**Definition**: Use of humor to build rapport vs. establish dominance
**Categories**:
- **Self-deprecating**: Healthy (bonding)
- **Gentle teasing**: Healthy if reciprocal
- **Put-downs**: Unhealthy (dominance)
- **Sarcasm at expense**: Unhealthy

**Measurement**: Count and classify humor instances
**Ideal**: 0 instances of superiority-establishing humor

---

## 19. LONGITUDINAL ANALYSIS

### 19.1 Meeting Evolution Tracking
**Metrics Tracked Across Meetings**:
- Topic progression (recurring vs. new)
- Consensus score trends
- Participation balance evolution
- Relational health trajectory
- Decision velocity
- Knowledge gap closure rate

### 19.2 Pattern Evolution Categories
**Emergent Patterns**: New behaviors appearing
**Fading Patterns**: Behaviors decreasing
**Persistent Patterns**: Stable characteristics

**Methodology**:
- Compare metrics meeting-to-meeting
- Calculate trend direction (increasing/decreasing/stable)
- Identify inflection points
- Classify pattern type

### 19.3 Cultural Indicators Over Time
**Tracked Elements**:
- Power language ratios
- Inclusion metrics
- Consensus patterns
- Emotional tone
- Group beliefs evolution

**Visualization**: Line charts showing trends across 3+ meetings

---

## 20. COMPOSITE SCORES EXPLANATION

### 20.1 Overall Meeting Quality
**Formula**:
```
Meeting Quality = (0.25 × Engagement Score) + 
                  (0.20 × Inclusion Score) +
                  (0.20 × Consensus Score) +
                  (0.15 × Signal/Noise Ratio) +
                  (0.10 × Agenda Coverage) +
                  (0.10 × Decision Velocity)
```

**Interpretation**:
- 85-100: Excellent meeting
- 70-84: Good meeting
- 50-69: Moderate effectiveness
- <50: Needs improvement

---

## APPENDIX A: DATA COLLECTION METHODS

### Transcript Processing
1. **Audio/Video Recording**: Full meeting capture
2. **Transcription**: Automated with speaker identification
3. **Manual Review**: Quality check and correction
4. **Utterance Segmentation**: Break into speaker turns
5. **Timestamp Alignment**: Map to meeting timeline

### Natural Language Processing
- **Sentiment Analysis**: Pre-trained models + custom tuning
- **Topic Modeling**: LDA or similar algorithms
- **Entity Recognition**: Speaker names, decisions, action items
- **Pattern Matching**: Regex for specific indicators
- **Semantic Analysis**: Context and meaning extraction

### Manual Coding
- **Breakthrough Moments**: Human judgment required
- **Belief Identification**: Interpretive analysis
- **Power Dynamics**: Contextual assessment
- **Quality Check**: Human verification of automated analysis

---

## APPENDIX B: THRESHOLDS & BENCHMARKS

### Score Interpretations

| Metric | Excellent | Good | Moderate | Needs Work |
|--------|-----------|------|----------|------------|
| Engagement | 75-100 | 60-74 | 40-59 | 0-39 |
| Inclusion | 70-100 | 50-69 | 30-49 | 0-29 |
| Consensus | 80-100 | 60-79 | 40-59 | 0-39 |
| Signal/Noise | 85-100 | 70-84 | 50-69 | 0-49 |
| Empathy | 20+ | 15-19 | 10-14 | 0-9 |
| Relational Health | 80-100 | 65-79 | 50-64 | 0-49 |

### Meeting Duration Context
- **Short (< 30 min)**: Focus on efficiency metrics
- **Medium (30-90 min)**: Standard analysis
- **Long (90+ min)**: Add fatigue indicators, break analysis

---

## APPENDIX C: LIMITATIONS & CONSIDERATIONS

### Known Limitations
1. **Automated Sentiment**: May miss sarcasm, cultural context
2. **Speaker Identification**: Requires clean audio, may confuse similar voices
3. **Non-Verbal Cues**: Text analysis misses body language, facial expressions
4. **Cultural Bias**: Metrics may favor Western communication styles
5. **Context Dependence**: Meeting type affects what "good" looks like

### Best Practices for Interpretation
- **Compare to Baseline**: Track trends vs. absolute scores
- **Context Matters**: Consider meeting purpose, team phase, external factors
- **Combine Metrics**: No single metric tells full story
- **Human Judgment**: Use analysis to inform, not replace, human insight
- **Action-Oriented**: Focus on improvable patterns, not just measurement

---

## DOCUMENT VERSION
- **Version**: 2.0
- **Last Updated**: November 2025
- **Dashboard Version**: Full Meeting Analysis Dashboard
- **Changes in v2.0**:
  - Added implementation status for all metrics
  - Detailed calculation methods for Inclusion Score, Consensus Score, Agenda Coverage
  - Complete Power Language Distribution implementation with pattern libraries
  - Relational Health Timeline calculation with temporal indicators
  - Knowledge Coverage domain categorization and scoring
  - Complete backend integration examples with code
  - Testing examples for validation
- **Contact**: For questions about methodology or customization

---

## APPENDIX D: COMPLETE BACKEND INTEGRATION EXAMPLE

### Full Analysis Pipeline
```python
class MeetingAnalyzer:
    """
    Complete meeting analysis pipeline
    Calculates all dashboard metrics from transcript
    """
    
    def __init__(self, transcript, agenda=None):
        self.transcript = transcript
        self.agenda = agenda
        self.utterances = self.parse_transcript()
        self.speakers = self.get_unique_speakers()
        
    def analyze(self):
        """Run complete analysis and return all metrics"""
        
        results = {
            'kpis': self.calculate_kpis(),
            'participation': self.analyze_participation(),
            'inclusivity': self.analyze_inclusivity(),
            'topics': self.analyze_topics(),
            'power_dynamics': self.analyze_power_dynamics(),
            'relational_health': self.analyze_relational_health(),
            'emotional_dynamics': self.analyze_emotional_dynamics(),
            'knowledge_coverage': self.calculate_knowledge_coverage(),
            'conversation_structure': self.analyze_structure()
        }
        
        return results
    
    def calculate_kpis(self):
        """Calculate all primary KPI cards"""
        
        return {
            'total_speakers': len(self.speakers),
            'engagement_score': self.calculate_engagement_score(),
            'inclusion_score': self.calculate_inclusion_score(),
            'consensus_score': self.calculate_consensus_score(),
            'agenda_coverage': self.calculate_agenda_coverage(),
            'decisions_made': len(self.extract_decisions()),
            'action_items': len(self.extract_action_items()),
            'knowledge_gaps': len(self.extract_knowledge_gaps())
        }
    
    def calculate_engagement_score(self):
        """Composite engagement score"""
        
        participation_balance = self.calculate_participation_balance()
        response_rate = self.calculate_response_rate()
        active_listening = self.calculate_active_listening()
        topic_depth = self.calculate_topic_depth()
        
        score = (0.3 * participation_balance + 
                0.25 * response_rate +
                0.25 * active_listening +
                0.2 * topic_depth)
        
        return round(score)
    
    def calculate_inclusion_score(self):
        """Composite inclusion score - SEE SECTION 1.3 FOR DETAILS"""
        
        pronoun_score = self.calculate_pronoun_balance_score()
        interruption_score = self.calculate_interruption_score()
        inclusion_language_score = self.calculate_inclusion_language_score()
        equity_score = self.calculate_speaking_equity_score()
        
        total = pronoun_score + interruption_score + inclusion_language_score + equity_score
        return round(total)
    
    def calculate_consensus_score(self):
        """Calculate consensus across topics - SEE SECTION 1.4 FOR DETAILS"""
        
        topics = self.extract_topics()
        topic_scores = []
        
        for topic in topics:
            topic_utterances = self.get_topic_utterances(topic)
            consensus = self.calculate_topic_consensus(topic_utterances)
            topic_scores.append(consensus)
        
        return round(sum(topic_scores) / len(topic_scores)) if topic_scores else 50
    
    def calculate_agenda_coverage(self):
        """Calculate agenda coverage - SEE SECTION 1.5 FOR DETAILS"""
        
        if not self.agenda:
            return None  # No agenda provided
        
        discussed_topics = self.extract_topics()
        covered = self.match_agenda_to_discussed(self.agenda, discussed_topics)
        
        return round((covered / len(self.agenda)) * 100)
    
    def analyze_power_dynamics(self):
        """Power language analysis - SEE SECTION 10.1 FOR DETAILS"""
        
        overall = self.calculate_power_language_distribution()
        by_speaker = self.calculate_speaker_power_profiles()
        
        return {
            'overall': overall,
            'by_speaker': by_speaker
        }
    
    def analyze_relational_health(self):
        """Relational health timeline - SEE SECTION 13 FOR DETAILS"""
        
        timeline = self.calculate_relational_health_timeline(interval_minutes=10)
        
        return {
            'timeline': timeline['timeline'],
            'averages': timeline['averages']
        }
    
    def calculate_knowledge_coverage(self):
        """Knowledge coverage by domain - SEE SECTION 8.3 FOR DETAILS"""
        
        coverage = {}
        for domain in KNOWLEDGE_DOMAINS:
            coverage[domain] = self.calculate_knowledge_depth(domain)
        
        return {
            'by_domain': coverage,
            'average': round(sum(coverage.values()) / len(coverage))
        }
```

### Example Usage
```python
# Initialize analyzer
analyzer = MeetingAnalyzer(
    transcript=meeting_transcript,
    agenda=[
        "Platform adoption decision",
        "Circle launch strategy",
        "Communications priorities"
    ]
)

# Run complete analysis
results = analyzer.analyze()

# Format for dashboard
dashboard_data = {
    'kpi_cards': results['kpis'],
    'charts': {
        'participation': results['participation'],
        'power_language': results['power_dynamics']['overall'],
        'relational_health': results['relational_health']['timeline'],
        'knowledge_coverage': results['knowledge_coverage']['by_domain']
    }
}

# Export to JSON for frontend
import json
with open('dashboard_data.json', 'w') as f:
    json.dump(dashboard_data, f, indent=2)
```

### Testing Example
```python
def test_inclusion_score():
    """Test inclusion score calculation"""
    
    test_transcript = """
    Speaker A: I think we should consider this approach. What do you all think?
    Speaker B: That's a great point! I agree with that perspective.
    Speaker A: Thank you. Anyone else want to add their thoughts?
    Speaker C: Yes, building on what Speaker A said, we could also...
    """
    
    analyzer = MeetingAnalyzer(test_transcript)
    score = analyzer.calculate_inclusion_score()
    
    assert 70 <= score <= 100, f"Expected high inclusion score, got {score}"
    print(f"✓ Inclusion score: {score}")

def test_consensus_score():
    """Test consensus score calculation"""
    
    test_transcript = """
    Speaker A: Should we adopt this platform?
    Speaker B: I agree, it looks good.
    Speaker C: Yes, I'm on board.
    Speaker D: Absolutely, let's do it.
    """
    
    analyzer = MeetingAnalyzer(test_transcript)
    score = analyzer.calculate_consensus_score()
    
    assert score >= 80, f"Expected strong consensus, got {score}"
    print(f"✓ Consensus score: {score}")

# Run tests
test_inclusion_score()
test_consensus_score()
```

---

## GLOSSARY OF TECHNICAL TERMS

### Data Collection & Processing
- **Utterance**: A single continuous statement by one speaker, from when they start speaking until they stop
- **Transcript**: Full text record of meeting with speaker identification and timestamps
- **Topic Modeling**: Automated identification of discussion topics using algorithms (LDA, NMF)
- **Semantic Similarity**: Measure of how similar two pieces of text are in meaning (using embeddings)

### Linguistic Analysis
- **Pattern Matching**: Using regular expressions to find specific phrases or structures in text
- **Sentiment Analysis**: Automated detection of emotional tone (positive, negative, neutral)
- **Power Language**: Linguistic features that signal authority (commands) vs. collaboration (questions)
- **Hedging**: Use of qualifying language that softens statements ("maybe", "perhaps")

### Statistical Measures
- **Gini Coefficient**: Measure of inequality in a distribution (0 = perfect equality, 1 = perfect inequality)
- **Baseline**: Default or neutral score when no clear indicators present
- **Threshold**: Score cutoff that determines classification (e.g., score > 70 = "High")
- **Composite Score**: Metric calculated from multiple weighted components

### Meeting Analysis Concepts
- **Epistemic Authority**: Being recognized as the expert/knowledge holder in a domain
- **Convergence**: Process of narrowing options and moving toward consensus
- **Divergence**: Process of exploring multiple perspectives and generating ideas
- **Signal vs. Noise**: Productive on-topic discussion (signal) vs. off-topic or redundant talk (noise)
- **Breakthrough Moment**: Significant shift in understanding, emotion, relationship, or commitment

### Relational Dynamics
- **Trust**: Confidence in others' competence and good intentions
- **Alignment**: Agreement on goals, values, and direction
- **Care**: Expressed concern for others' wellbeing
- **Belonging**: Sense of inclusion and membership in the group
- **Psychological Safety**: Feeling safe to take risks and be vulnerable

### NLP & Machine Learning
- **Embedding**: Numerical representation of text that captures semantic meaning
- **Cosine Similarity**: Measure of similarity between two embedding vectors
- **TF-IDF**: Statistical measure of word importance (Term Frequency-Inverse Document Frequency)
- **Regular Expression (Regex)**: Pattern-matching syntax for finding text structures

### Scoring & Thresholds
- **Normalized Score**: Score scaled to 0-100 range for consistency
- **Weighted Average**: Average where some components contribute more than others
- **Binary Classification**: Two-category decision (e.g., signal vs. noise)
- **Multi-class Classification**: Multiple categories (e.g., strong/moderate/low consensus)

---

## CREDITS & REFERENCES
This methodology synthesizes approaches from:
- Conversation analysis (linguistics)
- Organizational psychology
- Natural language processing
- Meeting science research
- Group dynamics theory
- Power and discourse analysis
