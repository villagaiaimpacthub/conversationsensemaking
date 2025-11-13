element.style.display = 'block';
                button.textContent = 'Show less ▲';
                button.style.background = 'rgba(168, 216, 234, 0.1)';
            } else {
                element.style.display = 'none';
                button.textContent = 'Show 4 more beliefs ▼';
                button.style.background = 'var(--bg-secondary)';
            }
        }

        // Chart.js default settings
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.borderColor = '#334155';

        // Participation Donut Chart
        const participationCtx = document.getElementById('participationChart').getContext('2d');
        new Chart(participationCtx, {
            type: 'doughnut',
            data: {
                labels: ['Alex Alegria', 'Farhad', 'G (Giannandrea)', 'Sudheer', 'Chris', 'Anastasia', 'Others'],
                datasets: [{
                    data: [42.8, 14.4, 12.5, 11.5, 7.7, 7.2, 3.9],
                    backgroundColor: [
                        'rgba(212, 165, 245, 0.8)',
                        'rgba(168, 216, 234, 0.8)',
                        'rgba(168, 230, 207, 0.8)',
                        'rgba(255, 211, 182, 0.8)',
                        'rgba(255, 179, 217, 0.8)',
                        'rgba(168, 230, 207, 0.6)',
                        'rgba(148, 163, 184, 0.4)'
                    ],
                    borderWidth: 2,
                    borderColor: '#252d3d'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });

        // Engagement Bar Chart
        const engagementCtx = document.getElementById('engagementChart').getContext('2d');
        new Chart(engagementCtx, {
            type: 'bar',
            data: {
                labels: ['Feedback\nInstances', 'Question\nFrequency', 'Response\nDynamics', 'Turn-Taking\nBalance'],
                datasets: [{
                    label: 'Score',
                    data: [85, 82, 75, 68],
                    backgroundColor: [
                        'rgba(168, 230, 207, 0.8)',
                        'rgba(168, 216, 234, 0.8)',
                        'rgba(212, 165, 245, 0.8)',
                        'rgba(255, 211, 182, 0.8)'
                    ],
                    borderWidth: 0,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(51, 65, 85, 0.5)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Score: ' + context.parsed.y + '/100';
                            }
                        }
                    }
                }
            }
        });

        // Topics Bar Chart
        const topicsCtx = document.getElementById('topicsChart').getContext('2d');
        new Chart(topicsCtx, {
            type: 'bar',
            data: {
                labels: ['Tool Adoption', 'Circles & Roles', 'SME Strategy', 'Private Equity', 'Communications', 'HR Policy', 'Investors', 'Budget', 'Philanthropy'],
                datasets: [{
                    label: '% of Conversation',
                    data: [18, 17, 15, 12, 10, 9, 8, 6, 5],
                    backgroundColor: 'rgba(168, 216, 234, 0.8)',
                    borderWidth: 0,
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 20,
                        grid: {
                            color: 'rgba(51, 65, 85, 0.5)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.x + '% of conversation';
                            }
                        }
                    }
                }
            }
        });

        // Knowledge Coverage Chart
        const knowledgeCtx = document.getElementById('knowledgeChart').getContext('2d');
        new Chart(knowledgeCtx, {
            type: 'bar',
            data: {
                labels: ['Technology/\nPlatform', 'Governance/\nStructure', 'Communications', 'Budget/\nFinance', 'Private\nEquity', 'Investor\nRelations', 'HR/\nCompensation', 'SME Value\nProp'],
                datasets: [{
                    label: 'Coverage Score',
                    data: [88, 85, 62, 60, 58, 55, 38, 35],
                    backgroundColor: function(context) {
                        const value = context.parsed.y;
                        if (value >= 80) return 'rgba(168, 230, 207, 0.8)';
                        if (value >= 40) return 'rgba(255, 211, 182, 0.8)';
                        return 'rgba(255, 179, 217, 0.8)';
                    },
                    borderWidth: 0,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(51, 65, 85, 0.5)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                let level = 'Minimal';
                                if (value >= 80) level = 'Well Covered';
                                else if (value >= 40) level = 'Surface Level';
                                return level + ': ' + value + '/100';
                            }
                        }
                    }
                }
            }
        });

        // PART 2 CHARTS

        // Power Language Pie Chart
        const powerLanguageCtx = document.getElementById('powerLanguageChart').getContext('2d');
        new Chart(powerLanguageCtx, {
            type: 'pie',
            data: {
                labels: ['Low Power (Collaborative)', 'Neutral', 'High Power (Directive)'],
                datasets: [{
                    data: [42.8, 40.9, 16.3],
                    backgroundColor: [
                        'rgba(168, 216, 234, 0.8)',
                        'rgba(148, 163, 184, 0.6)',
                        'rgba(255, 211, 182, 0.8)'
                    ],
                    borderWidth: 2,
                    borderColor: '#252d3d'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });

        // Relational Health Timeline
        const relationalCtx = document.getElementById('relationalTimeline').getContext('2d');
        const relationalChart = new Chart(relationalCtx, {
            type: 'line',
            data: {
                labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100', '100-110', '110-118'],
                datasets: [
                    {
                        label: 'Trust',
                        data: [5, 4, 3, 4, 4, 4, 5, 4, 3, 4, 4, 5],
                        borderColor: 'rgba(168, 216, 234, 0.8)',
                        backgroundColor: 'rgba(168, 216, 234, 0.2)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Alignment',
                        data: [5, 3, 2, 4, 5, 5, 5, 4, 3, 5, 4, 5],
                        borderColor: 'rgba(168, 230, 207, 0.8)',
                        backgroundColor: 'rgba(168, 230, 207, 0.2)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Care',
                        data: [4, 4, 5, 4, 5, 4, 4, 4, 4, 4, 4, 5],
                        borderColor: 'rgba(212, 165, 245, 0.8)',
                        backgroundColor: 'rgba(212, 165, 245, 0.2)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Belonging',
                        data: [5, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 5],
                        borderColor: 'rgba(255, 179, 217, 0.8)',
                        backgroundColor: 'rgba(255, 179, 217, 0.2)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'dataset',
                    intersect: false
                },
                onHover: (event, activeElements) => {
                    if (activeElements.length > 0) {
                        const datasetIndex = activeElements[0].datasetIndex;
                        relationalChart.data.datasets.forEach((dataset, index) => {
                            if (index === datasetIndex) {
                                dataset.borderColor = dataset.borderColor.replace('0.8', '1');
                                dataset.borderWidth = 3;
                            } else {
                                dataset.borderColor = dataset.borderColor.replace(/[0-9.]+\)$/, '0.2)');
                                dataset.borderWidth = 1;
                            }
                        });
                        relationalChart.update('none');
                    }
                },
                onLeave: () => {
                    relationalChart.data.datasets.forEach((dataset, index) => {
                        const colors = [
                            'rgba(168, 216, 234, 0.8)',
                            'rgba(168, 230, 207, 0.8)',
                            'rgba(212, 165, 245, 0.8)',
                            'rgba(255, 179, 217, 0.8)'
                        ];
                        dataset.borderColor = colors[index];
                        dataset.borderWidth = 2;
                    });
                    relationalChart.update('none');
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        grid: {
                            color: 'rgba(51, 65, 85, 0.5)'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Time (minutes)',
                            color: '#94a3b8'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        },
                        onHover: (event, legendItem, legend) => {
                            const index = legendItem.datasetIndex;
                            relationalChart.data.datasets.forEach((dataset, i) => {
                                if (i === index) {
                                    dataset.borderColor = dataset.borderColor.replace(/[0-9.]+\)$/, '1)');
                                    dataset.borderWidth = 3;
                                } else {
                                    dataset.borderColor = dataset.borderColor.replace(/[0-9.]+\)$/, '0.2)');
                                    dataset.borderWidth = 1;
                                }
                            });
                            relationalChart.update('none');
                        },
                        onLeave: () => {
                            const colors = [
                                'rgba(168, 216, 234, 0.8)',
                                'rgba(168, 230, 207, 0.8)',
                                'rgba(212, 165, 245, 0.8)',
                                'rgba(255, 179, 217, 0.8)'
                            ];
                            relationalChart.data.datasets.forEach((dataset, index) => {
                                dataset.borderColor = colors[index];
                                dataset.borderWidth = 2;
                            });
                            relationalChart.update('none');
                        }
                    }
                }
            }
        });

        // Sentiment Timeline
        const sentimentCtx = document.getElementById('sentimentChart').getContext('2d');
        new Chart(sentimentCtx, {
            type: 'line',
            data: {
                labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100', '100-110', '110-118'],
                datasets: [{
                    label: 'Sentiment',
                    data: [4, 3, 1, 3, 2, 4, 4, 3, 1, 3, 2, 5],
                    borderColor: 'rgba(168, 230, 207, 0.8)',
                    backgroundColor: function(context) {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;
                        if (!chartArea) return;
                        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        gradient.addColorStop(0, 'rgba(168, 230, 207, 0)');
                        gradient.addColorStop(1, 'rgba(168, 230, 207, 0.4)');
                        return gradient;
                    },
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: -5,
                        max: 5,
                        grid: {
                            color: function(context) {
                                if (context.tick.value === 0) {
                                    return 'rgba(148, 163, 184, 0.5)';
                                }
                                return 'rgba(51, 65, 85, 0.5)';
                            }
                        },
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                if (value === 0) return 'Neutral';
                                if (value > 0) return '+' + value;
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Time (minutes)',
                            color: '#94a3b8'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Convergence/Divergence Timeline
        const convergenceCtx = document.getElementById('convergenceChart').getContext('2d');
        new Chart(convergenceCtx, {
            type: 'line',
            data: {
                labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100', '100-110', '110-118'],
                datasets: [{
                    label: 'Convergence Score',
                    data: [95, 80, 40, 35, 70, 85, 90, 85, 75, 80, 85, 95],
                    borderColor: 'rgba(168, 216, 234, 0.8)',
                    backgroundColor: function(context) {
                        const chart = context.chart;
                        const {ctx, chartArea} = chart;
                        if (!chartArea) return;
                        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                        gradient.addColorStop(0, 'rgba(168, 216, 234, 0)');
                        gradient.addColorStop(1, 'rgba(168, 216, 234, 0.4)');
                        return gradient;
                    },
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(51, 65, 85, 0.5)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Time (minutes)',
                            color: '#94a3b8'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Signal vs Noise Chart
        const signalNoiseCtx = document.getElementById('signalNoiseChart').getContext('2d');
        new Chart(signalNoiseCtx, {
            type: 'bar',
            data: {
                labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100', '100-110', '110-118'],
                datasets: [
                    {
                        label: 'Signal',
                        data: [85, 90, 75, 80, 85, 90, 95, 85, 70, 85, 80, 90],
                        backgroundColor: 'rgba(168, 230, 207, 0.8)',
                        borderRadius: 4
                    },
                    {
                        label: 'Noise',
                        data: [15, 10, 25, 20, 15, 10, 5, 15, 30, 15, 20, 10],
                        backgroundColor: 'rgba(255, 211, 182, 0.6)',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(51, 65, 85, 0.5)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    }
                }
            }
        });

        // Breakthrough Timeline Chart
        const breakthroughsCtx = document.getElementById('breakthroughsTimeline').getContext('2d');
        new Chart(breakthroughsCtx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Cognitive',
                        data: [
                            {x: 60, y: 4, label: 'SME Pitch Clarity', desc: '"We\'re not ready for SME pitch" - Collective realization, permission to slow down'},
                            {x: 80, y: 4, label: 'Communications Priority', desc: '"Communications is paramount" - Priority elevation, resource allocation clarity'},
                            {x: 105, y: 4, label: 'Philanthropic Path', desc: '"Philanthropic giving is fast path" - New funding strategy, end-of-year opportunity'}
                        ],
                        backgroundColor: 'rgba(168, 216, 234, 0.8)',
                        borderColor: 'rgba(168, 216, 234, 1)',
                        pointRadius: 8,
                        pointHoverRadius: 12
                    },
                    {
                        label: 'Relational',
                        data: [
                            {x: 40, y: 3, label: 'Tool Adoption Consensus', desc: 'From conflict to trust in collective process - Sudheer shifted to alignment'},
                            {x: 60, y: 3, label: 'SME Strategy Alignment', desc: 'Unanimous agreement on internal clarity first approach'},
                            {x: 80, y: 3, label: 'Communications Mandate', desc: 'Clear priority and resourcing commitment given to Anastasia'},
                            {x: 115, y: 3, label: 'Gratitude Cascade', desc: '"Not alone anymore", "tribe" - Deep emotional resonance and bonding'}
                        ],
                        backgroundColor: 'rgba(168, 230, 207, 0.8)',
                        borderColor: 'rgba(168, 230, 207, 1)',
                        pointRadius: 8,
                        pointHoverRadius: 12
                    },
                    {
                        label: 'Emotional',
                        data: [
                            {x: 17, y: 2, label: 'Determination Opening', desc: 'Chris\'s emotional declaration set action-oriented tone for entire meeting'}
                        ],
                        backgroundColor: 'rgba(212, 165, 245, 0.8)',
                        borderColor: 'rgba(212, 165, 245, 1)',
                        pointRadius: 8,
                        pointHoverRadius: 12
                    },
                    {
                        label: 'Behavioral',
                        data: [
                            {x: 70, y: 1, label: 'Role Acceptance', desc: 'Everyone took clear roles with immediate accountability'},
                            {x: 85, y: 1, label: 'Circle Launch', desc: '"Work in progress is okay" - Commitment to act despite imperfection'}
                        ],
                        backgroundColor: 'rgba(255, 211, 182, 0.8)',
                        borderColor: 'rgba(255, 211, 182, 1)',
                        pointRadius: 8,
                        pointHoverRadius: 12
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 0,
                        max: 5,
                        grid: {
                            color: 'rgba(51, 65, 85, 0.5)'
                        },
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                const labels = ['', 'Behavioral', 'Emotional', 'Relational', 'Cognitive'];
                                return labels[value] || '';
                            }
                        }
                    },
                    x: {
                        min: 0,
                        max: 120,
                        grid: {
                            color: 'rgba(51, 65, 85, 0.3)'
                        },
                        title: {
                            display: true,
                            text: 'Time (minutes)',
                            color: '#94a3b8'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                return context[0].raw.label;
                            },
                            label: function(context) {
                                return context.raw.desc;
                            }
                        },
                        displayColors: false,
                        padding: 12,
                        bodyFont: {
                            size: 12
                        },
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        });