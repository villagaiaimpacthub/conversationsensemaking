# Quick Setup Guide

## Prerequisites

- Node.js (v18 or higher recommended - v18+ includes native fetch API)
  - If using Node.js v14-17, you'll need to install `node-fetch`: `npm install node-fetch`
- npm (comes with Node.js)
- An OpenRouter account (sign up at https://openrouter.ai/)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Express (web server)
- Multer (file upload handling)
- Mammoth (Word document parsing)
- dotenv (environment variable management)

Note: We use OpenRouter API which uses standard HTTP requests (fetch), so no additional SDK is needed.

### 2. Get Your OpenRouter API Key

1. Visit: https://openrouter.ai/
2. Sign up or sign in with your account
3. Navigate to the API Keys section
4. Click "Create Key" or "New Key"
5. Copy the generated API key

### 3. Configure Environment

Create a `.env.local` file in the project root:

```bash
# Windows (PowerShell)
Copy-Item .env.local.example .env.local

# Mac/Linux
cp .env.local.example .env.local
```

Then edit `.env.local` and add your API key:

```
OPENROUTER_API_KEY=your_actual_api_key_here
PORT=3000
```

**Important:** Never commit the `.env.local` file to git (it's already in `.gitignore`).

### 4. Start the Server

```bash
npm start
```

You should see:
```
Server running on http://localhost:3000
Gemini API configured: true
```

### 5. Open the Dashboard

Open your browser and go to:
```
http://localhost:3000
```

### 6. Test the System

1. Prepare a Word document (.docx) with a meeting transcript
2. Upload it through the dashboard
3. Wait for analysis (this may take 30-60 seconds depending on transcript length)
4. View the results!

## Troubleshooting

### "Cannot find module" errors
- Run `npm install` again
- Make sure you're in the project root directory

### "OPENROUTER_API_KEY not found"
- Check that `.env.local` file exists in the root directory
- Verify the file contains `OPENROUTER_API_KEY=your_key`
- Restart the server after adding the key

### "Port already in use"
- Change the PORT in `.env.local` to a different number (e.g., 3001)
- Or stop the process using port 3000

### API errors
- Verify your OpenRouter API key is valid
- Check your API credits/quota at https://openrouter.ai/keys
- Ensure you have sufficient credits for the model
- Ensure the transcript file is not too large (max 10MB)

## Development

For development with auto-reload, you can use `nodemon`:

```bash
npm install -g nodemon
nodemon server.js
```

## Production Deployment

For production:
1. Set `NODE_ENV=production` in `.env.local`
2. Use a process manager like PM2
3. Set up proper error logging
4. Configure CORS if serving from different domain
5. Use environment variables from your hosting provider (don't commit `.env`)

