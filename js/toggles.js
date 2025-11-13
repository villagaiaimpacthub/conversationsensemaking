// Toggle additional gaps visibility
        function toggleAdditionalGaps() {
            const additionalGaps = document.getElementById('additionalGaps');
            const button = document.getElementById('toggleGapsBtn');
            
            if (additionalGaps.style.display === 'none') {
                additionalGaps.style.display = 'block';
                button.textContent = 'Show less ▲';
                button.style.background = 'rgba(168, 216, 234, 0.1)';
            } else {
                additionalGaps.style.display = 'none';
                button.textContent = 'Show 5 more gaps ▼';
                button.style.background = 'var(--bg-secondary)';
            }
        }

        // Toggle explicit gaps visibility
        function toggleExplicitGaps() {
            const explicitGaps = document.getElementById('moreExplicitGaps');
            const button = document.getElementById('toggleExplicitGapsBtn');
            
            if (explicitGaps.style.display === 'none') {
                explicitGaps.style.display = 'block';
                button.textContent = 'Show less ▲';
                button.style.background = 'rgba(168, 216, 234, 0.1)';
            } else {
                explicitGaps.style.display = 'none';
                button.textContent = 'Show 3 more gaps ▼';
                button.style.background = 'var(--bg-secondary)';
            }
        }

        // Toggle power profiles
        function togglePowerProfiles() {
            const element = document.getElementById('morePowerProfiles');
            const button = document.getElementById('togglePowerBtn');
            
            if (element.style.display === 'none') {
                element.style.display = 'block';
                button.textContent = 'Show less ▲';
                button.style.background = 'rgba(168, 216, 234, 0.1)';
            } else {
                element.style.display = 'none';
                button.textContent = 'Show 3 more speakers ▼';
                button.style.background = 'var(--bg-secondary)';
            }
        }

        // Toggle epistemic authority
        function toggleEpistemic() {
            const element = document.getElementById('moreEpistemic');
            const button = document.getElementById('toggleEpistemicBtn');
            
            if (element.style.display === 'none') {
                element.style.display = 'block';
                button.textContent = 'Show less ▲';
                button.style.background = 'rgba(168, 216, 234, 0.1)';
            } else {
                element.style.display = 'none';
                button.textContent = 'Show 2 more experts ▼';
                button.style.background = 'var(--bg-secondary)';
            }
        }

        // Toggle archetypes
        function toggleArchetypes() {
            const element = document.getElementById('moreArchetypes');
            const button = document.getElementById('toggleArchetypesBtn');
            
            if (element.style.display === 'none') {
                element.style.display = 'block';
                button.textContent = 'Show less ▲';
                button.style.background = 'rgba(168, 216, 234, 0.1)';
            } else {
                element.style.display = 'none';
                button.textContent = 'Show 3 more archetypes ▼';
                button.style.background = 'var(--bg-secondary)';
            }
        }

        // Toggle excitement triggers
        function toggleExcitement() {
            const element = document.getElementById('moreExcitement');
            const button = document.getElementById('toggleExcitementBtn');
            
            if (element.style.display === 'none') {
                element.style.display = 'block';
                button.textContent = 'Show less ▲';
                button.style.background = 'rgba(168, 216, 234, 0.1)';
            } else {
                element.style.display = 'none';
                button.textContent = 'Show 2 more triggers ▼';
                button.style.background = 'var(--bg-secondary)';
            }
        }

        // Toggle concerns
        function toggleConcerns() {
            const element = document.getElementById('moreConcerns');
            const button = document.getElementById('toggleConcernsBtn');
            
            if (element.style.display === 'none') {
                element.style.display = 'block';
                button.textContent = 'Show less ▲';
                button.style.background = 'rgba(168, 216, 234, 0.1)';
            } else {
                element.style.display = 'none';
                button.textContent = 'Show 2 more triggers ▼';
                button.style.background = 'var(--bg-secondary)';
            }
        }

        // Toggle breakthroughs
        function toggleBreakthroughs() {
            const element = document.getElementById('moreBreakthroughs');
            const button = document.getElementById('toggleBreakthroughsBtn');
            
            if (element.style.display === 'none') {
                element.style.display = 'block';
                button.textContent = 'Show less ▲';
                button.style.background = 'rgba(168, 216, 234, 0.1)';
            } else {
                element.style.display = 'none';
                button.textContent = 'Show 3 more breakthroughs ▼';
                button.style.background = 'var(--bg-secondary)';
            }
        }

        // Toggle branches
        function toggleBranches() {
            const element = document.getElementById('moreBranches');
            const button = document.getElementById('toggleBranchesBtn');
            
            if (element.style.display === 'none') {
                element.style.display = 'block';
                button.textContent = 'Show less ▲';
                button.style.background = 'rgba(168, 216, 234, 0.1)';
            } else {
                element.style.display = 'none';
                button.textContent = 'Show 3 more branches ▼';
                button.style.background = 'var(--bg-secondary)';
            }
        }

        // Toggle encouraging beliefs
        function toggleEncouraging() {
            const element = document.getElementById('moreEncouraging');
            const button = document.getElementById('toggleEncouragingBtn');
            
            if (element.style.display === 'none') {