element.style.display = 'block';
                button.textContent = 'Show less ▲';
                button.style.background = 'rgba(168, 216, 234, 0.1)';
            } else {
                element.style.display = 'none';
                button.textContent = 'Show 4 more beliefs ▼';
                button.style.background = 'var(--bg-secondary)';
            }
        }

        // Chart instances storage (global so both part1 and part2 can access it)
        if (typeof window.chartInstances === 'undefined') {
            window.chartInstances = {};
        }
        const chartInstances = window.chartInstances;

        // Chart.js default settings
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.borderColor = '#334155';

        // Function to initialize charts in part 1 (called after content loads)
        function initializeChartsPart1() {
            // Participation Donut Chart
            const participationEl = document.getElementById('participationChart');
            if (participationEl) {
                // Destroy existing chart if it exists
                if (chartInstances.participationChart) {
                    chartInstances.participationChart.destroy();
                }
                
                const participationCtx = participationEl.getContext('2d');
                const participationChart = new Chart(participationCtx, {
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
            chartInstances.participationChart = participationChart;
            }

            // Engagement Bar Chart
            const engagementEl = document.getElementById('engagementChart');
            if (engagementEl) {
                if (chartInstances.engagementChart) {
                    chartInstances.engagementChart.destroy();
                }
                const engagementCtx = engagementEl.getContext('2d');
                const engagementChart = new Chart(engagementCtx, {
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
            chartInstances.engagementChart = engagementChart;
            }

            // Topics Bar Chart
            const topicsEl = document.getElementById('topicsChart');
            if (topicsEl) {
                if (chartInstances.topicsChart) {
                    chartInstances.topicsChart.destroy();
                }
                const topicsCtx = topicsEl.getContext('2d');
                const topicsChart = new Chart(topicsCtx, {
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
            chartInstances.topicsChart = topicsChart;
            }

            // Knowledge Coverage Chart
            const knowledgeEl = document.getElementById('knowledgeChart');
            if (knowledgeEl) {
                if (chartInstances.knowledgeChart) {
                    chartInstances.knowledgeChart.destroy();
                }
                const knowledgeCtx = knowledgeEl.getContext('2d');
                const knowledgeChart = new Chart(knowledgeCtx, {
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
            chartInstances.knowledgeChart = knowledgeChart;
            }

            // PART 2 CHARTS

            // Power Language Pie Chart
            const powerLanguageEl = document.getElementById('powerLanguageChart');
            if (powerLanguageEl) {
                if (chartInstances.powerLanguageChart) {
                    chartInstances.powerLanguageChart.destroy();
                }
                const powerLanguageCtx = powerLanguageEl.getContext('2d');
                const powerLanguageChart = new Chart(powerLanguageCtx, {
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
            chartInstances.powerLanguageChart = powerLanguageChart;
            }

            // Relational Health Timeline
            const relationalEl = document.getElementById('relationalTimeline');
            if (relationalEl) {
                if (chartInstances.relationalChart) {
                    chartInstances.relationalChart.destroy();
                }
                const relationalCtx = relationalEl.getContext('2d');
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
            chartInstances.relationalChart = relationalChart;
            }
        } // End of initializeChartsPart1 function

        // Main function that initializes all charts (calls both parts)
        function initializeCharts() {
            if (typeof initializeChartsPart1 === 'function') {
                initializeChartsPart1();
            }
            if (typeof initializeChartsPart2 === 'function') {
                initializeChartsPart2();
            }
        }