# Meeting Analysis Dashboard

A comprehensive HTML dashboard for analyzing meeting transcripts using AI-powered analysis. The dashboard features interactive charts, detailed analytics, and actionable insights powered by Google Gemini.

## Project Structure

```
.
├── index.html          # Main HTML file
├── server.js           # Express backend server
├── css/
│   └── styles.css     # All CSS styles
├── js/
│   ├── contentLoader.js  # Dynamic content loader
│   ├── toggles.js        # Toggle functions
│   ├── charts-part1.js  # Chart initialization (part 1)
│   ├── charts-part2.js  # Chart initialization (part 2)
│   ├── uploadHandler.js # File upload and API integration
│   ├── transcriptAnalyzer.js # Legacy client-side analyzer (kept for reference)
│   └── main.js          # Tab navigation & initialization
├── html/                # Tab content files
│   ├── meeting-analysis-part1.html through part6.html
│   ├── longitudinal.html
│   ├── patterns.html
│   ├── actions.html
│   └── recommendations.html
├── systemprompts/       # LLM system prompts
│   └── analysis-prompt.md
├── uploads/             # Temporary file uploads (gitignored)
├── .env.local           # Environment variables (gitignored)
├── .env.local.example   # Example environment file
├── package.json         # NPM dependencies and scripts
├── server.ps1           # PowerShell HTTP server (for static serving)
├── start-server.bat     # Batch file to start static server
└── README.md           # This file
```

## Features

- **AI-Powered Analysis**: Uses Google Gemini 2.5 Flash via OpenRouter to analyze meeting transcripts
- **Word Document Support**: Upload .docx files directly
- **Interactive Charts**: Powered by Chart.js for data visualization
- **Tabbed Interface**: Multiple views for different analysis perspectives
  - Oct 30 Deep Dive
  - Longitudinal Analysis
  - Cultural Patterns
  - Actions & Outcomes
  - Recommendations
- **Dark Theme**: Modern dark theme with pastel accents
- **Responsive Design**: Works on desktop and mobile devices
- **Comprehensive Analytics**:
  - Participation & Engagement metrics
  - Speaker analysis
  - Inclusivity metrics
  - Knowledge gap assessment
  - Power dynamics analysis
  - Emotional dynamics tracking
  - Breakthrough moments timeline

## Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling with CSS variables for theming
- **JavaScript**: Interactive functionality
- **Chart.js 4.4.0**: Data visualization library (loaded via CDN)
- **Node.js**: Backend server
- **Express**: Web framework
- **OpenRouter API**: LLM gateway for transcript analysis (using google/gemini-2.5-flash model)
- **Mammoth.js**: Word document parsing

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenRouter API key:

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=3000
```

**Getting an OpenRouter API Key:**
1. Visit https://openrouter.ai/
2. Sign up or sign in with your account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the key to your `.env.local` file

### 3. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env.local`).

### 4. Open the Dashboard

Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. **Upload a Transcript**: Click "Choose File" or drag and drop a `.docx` file containing your meeting transcript
2. **Wait for Analysis**: The system will:
   - Extract text from the Word document
   - Send it to OpenRouter API (Gemini 2.5 Flash) for analysis
   - Process the results
3. **View Dashboard**: Once analysis is complete, the dashboard will populate with all metrics and visualizations

## API Endpoints

### POST `/api/analyze`
Upload and analyze a meeting transcript.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with `file` field containing a `.docx` file

**Response:**
```json
{
  "success": true,
  "analysis": {
    "basicMetrics": { ... },
    "participation": { ... },
    "engagement": { ... },
    // ... other analysis data
  }
}
```

### GET `/api/health`
Check server health and configuration.

**Response:**
```json
{
  "status": "ok",
  "openRouterConfigured": true,
  "model": "google/gemini-2.5-flash"
}
```

## Development

### Running in Development Mode

```bash
npm run dev
```

### Static File Serving (Legacy)

If you need to serve static files only (without backend):

```bash
npm run static
```

This uses the PowerShell server script.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## File Format Requirements

The Word document should contain a transcript with:
- Speaker names followed by their dialogue
- Format: `Speaker Name: Text of what they said`
- Multiple speakers supported
- Any additional formatting will be preserved in text extraction

## Troubleshooting

### "OpenRouter API key not configured"
- Ensure `.env.local` file exists and contains `OPENROUTER_API_KEY`
- Restart the server after adding the key

### "Failed to analyze transcript"
- Check that the file is a valid `.docx` document
- Verify the backend server is running
- Check server logs for detailed error messages
- Ensure your OpenRouter API key has sufficient credits/quota

### Charts not displaying
- Check browser console for errors
- Ensure `window.analysisData` is set correctly
- Verify Chart.js is loaded (check Network tab)

## Notes

- Uploaded files are temporarily stored in `uploads/` directory and automatically deleted after processing
- The system prompt can be customized in `systemprompts/analysis-prompt.md`
- Analysis results are stored in `window.analysisData` for chart access
- The legacy client-side analyzer (`transcriptAnalyzer.js`) is kept for reference but not used in the current flow

## License

This project is for internal use.
