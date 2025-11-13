# Meeting Analysis Dashboard

A comprehensive HTML dashboard for analyzing meeting data, featuring interactive charts, detailed analytics, and actionable insights.

## Project Structure

```
.
├── index.html          # Main HTML file (66 lines)
├── css/
│   └── styles.css     # All CSS styles
├── js/
│   ├── contentLoader.js  # Dynamic content loader
│   ├── toggles.js        # Toggle functions
│   ├── charts-part1.js  # Chart initialization (part 1)
│   ├── charts-part2.js  # Chart initialization (part 2)
│   └── main.js          # Tab navigation & initialization
├── html/                # Tab content files (all < 500 lines)
│   ├── meeting-analysis-part1.html through part6.html
│   ├── longitudinal.html
│   ├── patterns.html
│   ├── actions.html
│   └── recommendations.html
├── server.ps1          # PowerShell HTTP server script
├── start-server.bat    # Batch file to start server
├── package.json        # NPM scripts (optional)
├── Archive/            # Original files (not needed for development)
│   ├── meeting_dashboard_with_recs.html
│   ├── meeting_dashboard_1311.html
│   └── meeting-analysis.html (original large file)
└── README.md          # This file
```

## Features

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

## Getting Started

### Option 1: Using the Local Server (Recommended)

1. **Windows**: Double-click `start-server.bat` or run:
   ```powershell
   .\server.ps1
   ```
2. Open your browser and navigate to: `http://localhost:8000`
3. To stop the server, press `Ctrl+C` in the terminal or close the PowerShell window

### Option 2: Direct File Access

1. Open `index.html` directly in a modern web browser
2. Note: Some features may not work correctly when opening files directly (file:// protocol)
3. Ensure you have an internet connection for Chart.js CDN

### Server Options

- Default port: `8000`
- Custom port: `.\server.ps1 3000` (replace 3000 with your desired port)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## File Descriptions

### `index.html`
The main HTML file containing the dashboard structure. Links to external CSS and JavaScript files.

### `css/styles.css`
Contains all styling including:
- CSS variables for theming
- Component styles
- Responsive design rules
- Dark theme implementation

### `js/main.js`
Contains all JavaScript functionality including:
- Chart initialization and configuration
- Tab navigation
- Toggle functions for expandable sections
- Interactive chart behaviors

## Customization

### Changing Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --bg-primary: #0f1419;
    --pastel-blue: #a8d8ea;
    /* ... other variables */
}
```

### Adding New Charts
Add chart initialization code in `js/main.js` following the existing pattern.

### Modifying Content
Edit the HTML structure in `index.html` to add or modify dashboard sections.

## Notes

- The project was refactored from a single-file HTML to a modular structure
- All original functionality has been preserved
- Chart.js is loaded from CDN - ensure internet connectivity

## License

This project is for internal use.

