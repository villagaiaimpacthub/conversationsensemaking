# Meeting Analysis Dashboard - Calculation Logic & Methodology

## Document Overview
This document outlines the calculation logic, metrics, and analytical methodology used in the Meeting Analysis Dashboard. Each section details how values are computed, what they measure, and the rationale behind the approach.

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
**Calculation**: Composite of:
- Pronoun ratio (collective vs. individual language)
- Interruption rate (lower is better)
- Inclusion language frequency (acknowledgments, invitations, reinforcements)
- Speaking time distribution (Gini coefficient)

**Formula**:
```
Inclusion Score = (0.25 × Pronoun Balance) + (0.25 × (100 - Interruption Rate)) + 
                  (0.3 × Inclusion Language Score) + (0.2 × Speaking Equity)
```

**Thresholds**:
- 70-100: High
- 40-69: Moderate
- 0-39: Low

### 1.4 Consensus Score (0-100)
**Metric**: Degree of agreement reached on discussed topics
**Calculation**: 
- Strong consensus topics: 100 points each
- Moderate consensus: 75 points each
- Low consensus: 50 points each
- Disagreement: 25 points each
- Average across all topics

**Formula**:
```
Consensus Score = (Sum of topic consensus scores) / (Number of topics)
```

### 1.5 Agenda Coverage
**Metric**: Percentage of planned topics discussed
**Calculation**: (Topics discussed / Topics planned) × 100
**Data Source**: Meeting agenda vs. actual discussion topics

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
**Visual**: Radar/spider chart showing knowledge depth per topic
**Scale**: 0-100 for each topic domain
**Calculation**: Based on:
- Depth of discussion
- Expert confidence expressed
- Questions raised vs. answered
- Data/evidence cited

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
**Categories**:

**High Power Language** (16.3%):
- Commands: "Do this", "You need to"
- Directives: "Let's move on", "We should"
- Certainty: "Obviously", "Clearly"
- Interruptions (dominant)

**Low Power Language** (42.8%):
- Questions: "What do you think?"
- Hedges: "Maybe", "Perhaps", "Could we"
- Qualifiers: "In my opinion", "I wonder if"
- Deference: "If you agree", "Does that make sense?"

**Neutral Language** (40.9%):
- Factual statements
- Data presentation
- Process discussion

**Calculation**: Pattern matching and linguistic analysis for each category

**Interpretation**:
- High low-power language: Collaborative culture
- High high-power language: Hierarchical culture
- Balanced: Context-dependent leadership

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

### 13.1 Trust
**Definition**: Expressions of confidence in others' competence and intentions
**Indicators**:
- Vulnerability sharing
- Delegation without micromanagement
- Accepting others' expertise
- Minimal verification behaviors

**Scoring**: 0-100 scale based on frequency of trust indicators
**Measurement**: Throughout meeting timeline (10-minute intervals)

### 13.2 Alignment
**Definition**: Agreement on goals, values, and direction
**Indicators**:
- Shared language/metaphors
- Agreement on priorities
- Consistent decision criteria
- Unified purpose statements

**Scoring**: 0-100 based on alignment markers

### 13.3 Care
**Definition**: Concern for others' wellbeing and experience
**Indicators**:
- Checking in on others
- Acknowledging feelings
- Accommodating needs
- Expressing gratitude

**Scoring**: 0-100 based on care expressions

### 13.4 Belonging
**Definition**: Sense of inclusion and membership
**Indicators**:
- Collective identity language ("we", "our tribe")
- Inclusion behaviors
- Shared stories/references
- Membership affirmations

**Scoring**: 0-100 based on belonging signals

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
- **Version**: 1.0
- **Last Updated**: November 2025
- **Dashboard Version**: Full Meeting Analysis Dashboard
- **Contact**: For questions about methodology or customization

---

## CREDITS & REFERENCES
This methodology synthesizes approaches from:
- Conversation analysis (linguistics)
- Organizational psychology
- Natural language processing
- Meeting science research
- Group dynamics theory
- Power and discourse analysis
