/**
 * Express Server for Meeting Analysis Dashboard
 * Handles file uploads, LLM processing, and API endpoints
 */

const express = require('express');
const multer = require('multer');
const mammoth = require('mammoth');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.')); // Serve static files from root

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept .docx files
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
            file.originalname.endsWith('.docx')) {
            cb(null, true);
        } else {
            cb(new Error('Only .docx files are allowed'), false);
        }
    }
});

// Ensure uploads and outputs directories exist
const ensureDirectories = async () => {
    try {
        await fs.mkdir('uploads', { recursive: true });
        await fs.mkdir('outputs', { recursive: true });
        console.log('Directories verified: uploads/, outputs/');
    } catch (error) {
        console.error('Error creating directories:', error);
    }
};

// OpenRouter API configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL_NAME = 'google/gemini-2.5-flash';

if (!OPENROUTER_API_KEY) {
    console.warn('WARNING: OPENROUTER_API_KEY not found in environment variables');
}

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
        const combined = prompts.join('\n\n---\n\n');
        console.log(`Combined ${promptPaths.length} prompts successfully`);
        return combined;
    } catch (error) {
        console.error('Error combining system prompts:', error);
        throw new Error(`Failed to combine system prompts: ${error.message}`);
    }
}

/**
 * Extract text from Word document
 * @param {string} filePath - Path to the .docx file
 * @returns {Promise<string>} Extracted text content
 */
async function extractTextFromDocx(filePath) {
    try {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    } catch (error) {
        console.error('Error extracting text from Word document:', error);
        throw new Error(`Failed to extract text from document: ${error.message}`);
    }
}

/**
 * Call OpenRouter API to analyze transcript
 * @param {string} systemPrompt - System prompt instructions
 * @param {string} transcript - Transcript text
 * @returns {Promise<Object>} Analysis results as JSON
 */
async function analyzeWithOpenRouter(systemPrompt, transcript) {
    if (!OPENROUTER_API_KEY) {
        throw new Error('OpenRouter API key not configured');
    }

    try {
        // Combine system prompt and transcript
        const userPrompt = `${transcript}\n\n---\n\nIMPORTANT: Return ONLY valid JSON. Do not include any markdown formatting, explanations, or text outside the JSON object. Start your response with { and end with }.`;
        
        // Prepare request body for OpenRouter API
        const requestBody = {
            model: MODEL_NAME,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userPrompt
                }
            ],
            temperature: 0.3, // Lower temperature for more consistent JSON output
            response_format: { type: 'json_object' } // Request JSON format if supported
        };
        
        // Make API request to OpenRouter
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER || 'http://localhost:3000', // Optional: your site URL
                'X-Title': 'Meeting Analysis Dashboard' // Optional: your app name
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenRouter API Error:', response.status, errorText);
            throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        
        // Extract text from OpenRouter response
        const text = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || '';
        
        if (!text) {
            throw new Error('No content in API response');
        }
        
        // Try to extract JSON from the response
        // LLM might wrap JSON in markdown code blocks
        let jsonText = text.trim();
        
        // Remove markdown code blocks if present
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/^```json\s*/i, '').replace(/\s*```$/m, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/m, '');
        }
        
        // Try to find JSON object in the text if it's embedded
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            jsonText = jsonMatch[0];
        }
        
        // Parse JSON
        let analysis;
        try {
            analysis = JSON.parse(jsonText);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Response text (first 500 chars):', text.substring(0, 500));
            throw new Error(`Failed to parse JSON response from LLM: ${parseError.message}. The response may not be valid JSON.`);
        }
        
        return analysis;
    } catch (error) {
        console.error('Error calling OpenRouter API:', error);
        throw new Error(`LLM analysis failed: ${error.message}`);
    }
}

/**
 * API endpoint to process transcript
 * POST /api/analyze
 * Body: multipart/form-data with 'file' field
 */
app.post('/api/analyze', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Step 1: Extract text from Word document
        console.log('Extracting text from Word document...');
        const transcriptText = await extractTextFromDocx(req.file.path);
        
        if (!transcriptText || transcriptText.trim().length === 0) {
            throw new Error('Document appears to be empty');
        }

        // Step 2: Load and combine system prompts
        console.log('Loading and combining system prompts...');
        const systemPrompt = await combineSystemPrompts([
            'systemprompts/analysis-prompt.md',
            'systemprompts/calculations_for_metrics.md'
        ]);

        // Step 3: Call OpenRouter API
        console.log('Calling OpenRouter API...');
        const analysis = await analyzeWithOpenRouter(systemPrompt, transcriptText);

        // Step 4: Save analysis to file
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

        // Step 5: Clean up uploaded file
        try {
            await fs.unlink(req.file.path);
        } catch (cleanupError) {
            console.warn('Failed to delete uploaded file:', cleanupError);
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

    } catch (error) {
        console.error('Error processing transcript:', error);
        
        // Clean up uploaded file on error
        if (req.file && req.file.path) {
            try {
                await fs.unlink(req.file.path);
            } catch (cleanupError) {
                console.warn('Failed to delete uploaded file:', cleanupError);
            }
        }

        res.status(500).json({
            success: false,
            error: error.message || 'An error occurred while processing the transcript'
        });
    }
});

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

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        openRouterConfigured: !!OPENROUTER_API_KEY,
        model: MODEL_NAME
    });
});

// Start server
async function startServer() {
    await ensureDirectories();
    
    app.listen(PORT, () => {
        console.log(`\n✅ Server running on http://localhost:${PORT}`);
        console.log(`✅ OpenRouter API configured: ${!!OPENROUTER_API_KEY}`);
        console.log(`✅ Model: ${MODEL_NAME}`);
        console.log(`✅ Prompts: analysis-prompt.md + calculations_for_metrics.md\n`);
    });
}

startServer().catch(console.error);

