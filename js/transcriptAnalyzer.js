/**
 * Transcript Analyzer Module
 * Analyzes conversation transcripts and extracts metrics, insights, and data for visualization
 */

// Global storage for analysis results
window.analysisData = null;

/**
 * Main function to analyze a transcript
 * @param {string} transcriptText - The raw transcript text
 * @returns {Object} Analysis results with all metrics
 */
function analyzeTranscript(transcriptText) {
    console.log('Starting transcript analysis...');
    
    // Parse transcript into structured format
    const parsed = parseTranscript(transcriptText);
    
    // Perform various analyses
    const analysis = {
        // Basic metrics
        basicMetrics: calculateBasicMetrics(parsed),
        
        // Participation analysis
        participation: analyzeParticipation(parsed),
        
        // Engagement metrics
        engagement: analyzeEngagement(parsed),
        
        // Topic analysis
        topics: analyzeTopics(parsed),
        
        // Knowledge gaps
        knowledgeGaps: analyzeKnowledgeGaps(parsed),
        
        // Power dynamics
        powerDynamics: analyzePowerDynamics(parsed),
        
        // Sentiment analysis
        sentiment: analyzeSentiment(parsed),
        
        // Relational dynamics
        relational: analyzeRelational(parsed),
        
        // Breakthrough moments
        breakthroughs: analyzeBreakthroughs(parsed),
        
        // Actions and decisions
        actions: extractActions(parsed),
        
        // Recommendations (generated after all other analyses)
        recommendations: []
    };
    
    // Generate recommendations now that analysis is complete
    analysis.recommendations = generateRecommendations(parsed, analysis);
    
    // Store globally for chart access
    window.analysisData = analysis;
    
    console.log('Analysis complete:', analysis);
    return analysis;
}

/**
 * Parse transcript text into structured format
 * @param {string} text - Raw transcript text
 * @returns {Array} Array of utterance objects
 */
function parseTranscript(text) {
    const utterances = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    // Common transcript formats:
    // 1. "Speaker Name: text"
    // 2. "[Timestamp] Speaker Name: text"
    // 3. "Speaker Name (timestamp): text"
    
    let currentSpeaker = null;
    let currentText = [];
    
    for (const line of lines) {
        // Try to match speaker patterns
        const speakerMatch = line.match(/^([^:]+?):\s*(.+)$/);
        
        if (speakerMatch) {
            // Save previous utterance if exists
            if (currentSpeaker && currentText.length > 0) {
                utterances.push({
                    speaker: currentSpeaker.trim(),
                    text: currentText.join(' ').trim(),
                    timestamp: null
                });
            }
            
            currentSpeaker = speakerMatch[1].trim();
            // Remove timestamp if present
            currentSpeaker = currentSpeaker.replace(/\[.*?\]/g, '').trim();
            currentText = [speakerMatch[2].trim()];
        } else if (currentSpeaker) {
            // Continuation of current speaker's text
            currentText.push(line.trim());
        }
    }
    
    // Add last utterance
    if (currentSpeaker && currentText.length > 0) {
        utterances.push({
            speaker: currentSpeaker.trim(),
            text: currentText.join(' ').trim(),
            timestamp: null
        });
    }
    
    return utterances;
}

/**
 * Calculate basic metrics
 */
function calculateBasicMetrics(parsed) {
    const speakers = [...new Set(parsed.map(u => u.speaker))];
    const totalUtterances = parsed.length;
    const totalWords = parsed.reduce((sum, u) => sum + u.text.split(/\s+/).length, 0);
    const totalDuration = estimateDuration(parsed);
    
    return {
        totalSpeakers: speakers.length,
        speakers: speakers,
        totalUtterances: totalUtterances,
        totalWords: totalWords,
        estimatedDuration: totalDuration,
        averageWordsPerUtterance: totalWords / totalUtterances || 0
    };
}

/**
 * Estimate meeting duration based on transcript
 */
function estimateDuration(parsed) {
    // Rough estimate: average speaking rate is ~150 words per minute
    const totalWords = parsed.reduce((sum, u) => sum + u.text.split(/\s+/).length, 0);
    return Math.round(totalWords / 150); // minutes
}

/**
 * Analyze participation distribution
 */
function analyzeParticipation(parsed) {
    const speakerStats = {};
    
    parsed.forEach(utterance => {
        const speaker = utterance.speaker;
        if (!speakerStats[speaker]) {
            speakerStats[speaker] = {
                name: speaker,
                utterances: 0,
                words: 0
            };
        }
        speakerStats[speaker].utterances++;
        speakerStats[speaker].words += utterance.text.split(/\s+/).length;
    });
    
    const totalWords = Object.values(speakerStats).reduce((sum, s) => sum + s.words, 0);
    
    // Calculate percentages
    const participation = Object.values(speakerStats).map(stat => ({
        name: stat.name,
        utterances: stat.utterances,
        words: stat.words,
        percentage: totalWords > 0 ? (stat.words / totalWords * 100) : 0
    })).sort((a, b) => b.percentage - a.percentage);
    
    return {
        distribution: participation,
        totalWords: totalWords
    };
}

/**
 * Analyze engagement metrics
 */
function analyzeEngagement(parsed) {
    // Count questions, feedback instances, responses
    let questions = 0;
    let feedback = 0;
    let responses = 0;
    
    parsed.forEach(utterance => {
        const text = utterance.text.toLowerCase();
        // Simple heuristics
        if (text.includes('?') || text.match(/\b(what|how|why|when|where|who)\b/)) {
            questions++;
        }
        if (text.match(/\b(good|great|excellent|agree|yes|no|thanks|thank you)\b/)) {
            feedback++;
        }
        if (text.match(/\b(respond|answer|reply|react)\b/)) {
            responses++;
        }
    });
    
    // Calculate engagement scores (0-100 scale)
    const totalUtterances = parsed.length;
    const questionScore = Math.min(100, (questions / totalUtterances) * 100 * 10);
    const feedbackScore = Math.min(100, (feedback / totalUtterances) * 100 * 5);
    const responseScore = Math.min(100, (responses / totalUtterances) * 100 * 8);
    
    // Turn-taking balance (how evenly distributed)
    const speakers = [...new Set(parsed.map(u => u.speaker))];
    const speakerCounts = {};
    parsed.forEach(u => {
        speakerCounts[u.speaker] = (speakerCounts[u.speaker] || 0) + 1;
    });
    
    // Calculate Gini coefficient for turn-taking balance
    const counts = Object.values(speakerCounts).sort((a, b) => a - b);
    const mean = counts.reduce((a, b) => a + b, 0) / counts.length;
    const balanceScore = mean > 0 ? Math.max(0, 100 - (calculateGini(counts) * 100)) : 50;
    
    return {
        questionFrequency: questionScore,
        feedbackInstances: feedbackScore,
        responseDynamics: responseScore,
        turnTakingBalance: balanceScore,
        overallEngagement: (questionScore + feedbackScore + responseScore + balanceScore) / 4
    };
}

/**
 * Calculate Gini coefficient for inequality measurement
 */
function calculateGini(array) {
    if (array.length === 0) return 0;
    const sorted = [...array].sort((a, b) => a - b);
    const n = sorted.length;
    const mean = sorted.reduce((a, b) => a + b, 0) / n;
    
    let sum = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            sum += Math.abs(sorted[i] - sorted[j]);
        }
    }
    
    return sum / (2 * n * n * mean);
}

/**
 * Analyze topics discussed
 */
function analyzeTopics(parsed) {
    // Topic keywords (expandable)
    const topicKeywords = {
        'Tool Adoption': ['tool', 'platform', 'software', 'system', 'technology', 'adopt'],
        'Circles & Roles': ['circle', 'role', 'responsibility', 'structure', 'organization'],
        'SME Strategy': ['sme', 'small business', 'strategy', 'approach', 'plan'],
        'Private Equity': ['equity', 'investment', 'funding', 'capital', 'finance'],
        'Communications': ['communication', 'message', 'outreach', 'marketing', 'brand'],
        'HR Policy': ['hr', 'human resources', 'policy', 'employee', 'staff'],
        'Investors': ['investor', 'stakeholder', 'shareholder', 'funding'],
        'Budget': ['budget', 'cost', 'expense', 'financial', 'money'],
        'Philanthropy': ['philanthropy', 'charity', 'donation', 'giving', 'social impact']
    };
    
    const topicCounts = {};
    Object.keys(topicKeywords).forEach(topic => {
        topicCounts[topic] = 0;
    });
    
    parsed.forEach(utterance => {
        const text = utterance.text.toLowerCase();
        Object.entries(topicKeywords).forEach(([topic, keywords]) => {
            if (keywords.some(keyword => text.includes(keyword))) {
                topicCounts[topic]++;
            }
        });
    });
    
    const total = Object.values(topicCounts).reduce((a, b) => a + b, 0);
    const topicDistribution = Object.entries(topicCounts)
        .map(([topic, count]) => ({
            topic: topic,
            count: count,
            percentage: total > 0 ? (count / total * 100) : 0
        }))
        .sort((a, b) => b.percentage - a.percentage);
    
    return {
        distribution: topicDistribution,
        totalMentions: total
    };
}

/**
 * Analyze knowledge gaps
 */
function analyzeKnowledgeGaps(parsed) {
    const gapIndicators = [
        /\b(don't know|don't understand|unclear|confused|not sure)\b/i,
        /\b(need to learn|need to understand|need more information)\b/i,
        /\b(what is|what does|how does|explain)\b/i,
        /\b(missing|lack|gap|don't have)\b/i
    ];
    
    const gaps = [];
    parsed.forEach((utterance, index) => {
        gapIndicators.forEach(pattern => {
            if (pattern.test(utterance.text)) {
                gaps.push({
                    speaker: utterance.speaker,
                    text: utterance.text,
                    type: 'explicit'
                });
            }
        });
    });
    
    return {
        explicitGaps: gaps,
        totalGaps: gaps.length
    };
}

/**
 * Analyze power dynamics
 */
function analyzePowerDynamics(parsed) {
    // Power language indicators
    const highPowerWords = ['must', 'should', 'need to', 'require', 'demand', 'decide', 'direct'];
    const lowPowerWords = ['maybe', 'perhaps', 'could', 'might', 'suggest', 'consider', 'think'];
    
    let highPower = 0;
    let lowPower = 0;
    let neutral = 0;
    
    parsed.forEach(utterance => {
        const text = utterance.text.toLowerCase();
        const hasHighPower = highPowerWords.some(word => text.includes(word));
        const hasLowPower = lowPowerWords.some(word => text.includes(word));
        
        if (hasHighPower) highPower++;
        else if (hasLowPower) lowPower++;
        else neutral++;
    });
    
    const total = parsed.length;
    return {
        highPower: (highPower / total * 100),
        lowPower: (lowPower / total * 100),
        neutral: (neutral / total * 100)
    };
}

/**
 * Analyze sentiment over time
 */
function analyzeSentiment(parsed) {
    // Simple sentiment analysis based on keywords
    const positiveWords = ['good', 'great', 'excellent', 'wonderful', 'amazing', 'love', 'happy', 'excited'];
    const negativeWords = ['bad', 'terrible', 'worried', 'concerned', 'problem', 'issue', 'difficult'];
    
    const sentimentScores = parsed.map(utterance => {
        const text = utterance.text.toLowerCase();
        let score = 3; // neutral
        
        positiveWords.forEach(word => {
            if (text.includes(word)) score += 0.5;
        });
        
        negativeWords.forEach(word => {
            if (text.includes(word)) score -= 0.5;
        });
        
        return Math.max(1, Math.min(5, score));
    });
    
    return {
        timeline: sentimentScores,
        average: sentimentScores.reduce((a, b) => a + b, 0) / sentimentScores.length
    };
}

/**
 * Analyze relational dynamics
 */
function analyzeRelational(parsed) {
    // Trust indicators
    const trustWords = ['trust', 'believe', 'confident', 'rely', 'depend'];
    const trustScore = parsed.filter(u => 
        trustWords.some(word => u.text.toLowerCase().includes(word))
    ).length;
    
    // Collaboration indicators
    const collabWords = ['together', 'we', 'us', 'team', 'collaborate', 'work with'];
    const collabScore = parsed.filter(u =>
        collabWords.some(word => u.text.toLowerCase().includes(word))
    ).length;
    
    const total = parsed.length;
    return {
        trust: Math.min(5, (trustScore / total * 100) / 20),
        collaboration: Math.min(5, (collabScore / total * 100) / 20)
    };
}

/**
 * Analyze breakthrough moments
 */
function analyzeBreakthroughs(parsed) {
    const breakthroughIndicators = [
        /\b(breakthrough|realization|aha|understand|clear now)\b/i,
        /\b(decided|decision|agreement|consensus)\b/i,
        /\b(important|critical|key|essential)\b/i
    ];
    
    const breakthroughs = [];
    parsed.forEach((utterance, index) => {
        breakthroughIndicators.forEach(pattern => {
            if (pattern.test(utterance.text)) {
                breakthroughs.push({
                    index: index,
                    speaker: utterance.speaker,
                    text: utterance.text.substring(0, 100) + '...',
                    type: 'cognitive'
                });
            }
        });
    });
    
    return breakthroughs;
}

/**
 * Extract actions and decisions
 */
function extractActions(parsed) {
    const actionIndicators = [
        /\b(will|going to|plan to|need to|should|must)\b/i,
        /\b(action|task|todo|do|complete|finish)\b/i
    ];
    
    const actions = [];
    parsed.forEach(utterance => {
        actionIndicators.forEach(pattern => {
            if (pattern.test(utterance.text)) {
                actions.push({
                    speaker: utterance.speaker,
                    text: utterance.text,
                    type: 'action'
                });
            }
        });
    });
    
    return actions;
}

/**
 * Generate recommendations based on analysis
 */
function generateRecommendations(parsed, analysis) {
    const recommendations = [];
    
    // Participation balance
    const participation = analysis.participation.distribution;
    const maxParticipation = Math.max(...participation.map(p => p.percentage));
    if (maxParticipation > 50) {
        recommendations.push({
            type: 'participation',
            priority: 'high',
            text: `Consider encouraging more balanced participation. One speaker accounts for ${maxParticipation.toFixed(1)}% of the conversation.`
        });
    }
    
    // Engagement
    if (analysis.engagement.overallEngagement < 60) {
        recommendations.push({
            type: 'engagement',
            priority: 'medium',
            text: 'Engagement levels are moderate. Consider more interactive elements or structured discussions.'
        });
    }
    
    // Knowledge gaps
    if (analysis.knowledgeGaps.totalGaps > 5) {
        recommendations.push({
            type: 'knowledge',
            priority: 'high',
            text: `Multiple knowledge gaps identified (${analysis.knowledgeGaps.totalGaps}). Consider providing additional context or resources.`
        });
    }
    
    return recommendations;
}

