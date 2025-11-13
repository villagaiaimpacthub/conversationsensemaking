// Tab Navigation Function with Dynamic Content Loading
        const tabFileMap = {
            'meeting-analysis': 'meeting-analysis.html',
            'longitudinal': 'longitudinal.html',
            'patterns': 'patterns.html',
            'actions': 'actions.html',
            'recommendations': 'recommendations.html'
        };

        function showTab(tabName) {
            // Hide all tab contents
            const contents = document.querySelectorAll('.tab-content');
            contents.forEach(content => content.classList.remove('active'));

            // Remove active class from all buttons
            const buttons = document.querySelectorAll('.tab-button');
            buttons.forEach(button => button.classList.remove('active'));

            // Show selected tab
            const tabElement = document.getElementById(tabName);
            if (tabElement) {
                tabElement.classList.add('active');
                
                // Load content if not already loaded
                const filename = tabFileMap[tabName];
                if (filename && typeof loadTabContent === 'function') {
                    loadTabContent(tabName, filename);
                }
            }

            // Set active button
            if (event && event.target) {
                event.target.classList.add('active');
            } else {
                // Fallback: find button by tab name
                buttons.forEach(button => {
                    if (button.getAttribute('onclick') && button.getAttribute('onclick').includes(tabName)) {
                        button.classList.add('active');
                    }
                });
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Toggle Trajectories Function
        function toggleTrajectories() {
            const content = document.getElementById('trajectoriesContent');
            const label = document.getElementById('trajectoriesLabel');
            const arrow = document.getElementById('trajectoriesArrow');
            
            if (content.classList.contains('show')) {
                content.classList.remove('show');
                label.textContent = 'Show Details';
                arrow.classList.remove('rotated');
            } else {
                content.classList.add('show');
                label.textContent = 'Hide Details';
                arrow.classList.add('rotated');
            }
        }

        // Initialize: Load the active tab content on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Load the initially active tab (meeting-analysis)
            const activeTab = document.querySelector('.tab-content.active');
            if (activeTab) {
                const tabId = activeTab.id;
                const filename = tabFileMap[tabId];
                if (filename && typeof loadTabContent === 'function') {
                    loadTabContent(tabId, filename);
                }
            }
        });