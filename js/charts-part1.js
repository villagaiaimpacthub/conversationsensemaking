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
            // Get analysis data
            const analysis = window.analysisData;
            if (!analysis) {
                console.warn('No analysis data available. Charts will use default/empty data.');
                return;
            }
            
            // Participation Donut Chart
            const participationEl = document.getElementById('participationChart');
            if (participationEl) {
                // Destroy existing chart if it exists
                if (chartInstances.participationChart) {
                    chartInstances.participationChart.destroy();
                }
                
                // Get participation data from analysis
                const participationData = analysis.participation.distribution;
                const labels = participationData.map(p => p.name);
                const data = participationData.map(p => p.percentage);
                
                // Generate colors for each speaker
                const colors = [
                    'rgba(212, 165, 245, 0.8)',
                    'rgba(168, 216, 234, 0.8)',
                    'rgba(168, 230, 207, 0.8)',
                    'rgba(255, 211, 182, 0.8)',
                    'rgba(255, 179, 217, 0.8)',
                    'rgba(168, 230, 207, 0.6)',
                    'rgba(148, 163, 184, 0.4)'
                ];
                const backgroundColor = labels.map((_, i) => colors[i % colors.length]);
                
                const participationCtx = participationEl.getContext('2d');
                const participationChart = new Chart(participationCtx, {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: data,
                            backgroundColor: backgroundColor,
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
                
                // Get engagement data from analysis
                const engagementData = analysis.engagement;
                const engagementLabels = ['Feedback\nInstances', 'Question\nFrequency', 'Response\nDynamics', 'Turn-Taking\nBalance'];
                const engagementScores = [
                    engagementData.feedbackInstances || 0,
                    engagementData.questionFrequency || 0,
                    engagementData.responseDynamics || 0,
                    engagementData.turnTakingBalance || 0
                ];
                
                const engagementCtx = engagementEl.getContext('2d');
                const engagementChart = new Chart(engagementCtx, {
                    type: 'bar',
                    data: {
                        labels: engagementLabels,
                        datasets: [{
                            label: 'Score',
                            data: engagementScores,
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
                console.log('Initializing topicsChart');
                if (chartInstances.topicsChart) {
                    chartInstances.topicsChart.destroy();
                }
                
                // Get topics data from analysis
                const topicsData = analysis.topics.distribution;
                const topicLabels = topicsData.map(t => t.topic);
                const topicPercentages = topicsData.map(t => t.percentage);
                
                const topicsCtx = topicsEl.getContext('2d');
                const topicsChart = new Chart(topicsCtx, {
                    type: 'bar',
                    data: {
                        labels: topicLabels,
                        datasets: [{
                            label: '% of Conversation',
                            data: topicPercentages,
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
                console.log('topicsChart initialized successfully');
            } else {
                console.warn('topicsChart element not found in DOM');
            }

            // Knowledge Coverage Chart
            const knowledgeEl = document.getElementById('knowledgeChart');
            if (knowledgeEl) {
                if (chartInstances.knowledgeChart) {
                    chartInstances.knowledgeChart.destroy();
                }
                
                // Get knowledge coverage data from analysis
                const knowledgeCoverage = analysis.knowledgeGaps?.byCoverage || [];
                const knowledgeLabels = knowledgeCoverage.length > 0 
                    ? knowledgeCoverage.map(k => k.topic) 
                    : ['No data available'];
                const knowledgeScores = knowledgeCoverage.length > 0 
                    ? knowledgeCoverage.map(k => k.coverageScore) 
                    : [0];
                
                const knowledgeCtx = knowledgeEl.getContext('2d');
                const knowledgeChart = new Chart(knowledgeCtx, {
                    type: 'bar',
                    data: {
                        labels: knowledgeLabels,
                        datasets: [{
                    label: 'Coverage Score',
                    data: knowledgeScores,
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
                
                // Get power dynamics data from analysis
                const powerData = analysis.powerDynamics?.overall || { lowPower: 0, neutral: 0, highPower: 0 };
                const powerLanguageCtx = powerLanguageEl.getContext('2d');
                const powerLanguageChart = new Chart(powerLanguageCtx, {
                    type: 'pie',
                    data: {
                        labels: ['Low Power (Collaborative)', 'Neutral', 'High Power (Directive)'],
                        datasets: [{
                    data: [
                        powerData.lowPower || 0,
                        powerData.neutral || 0,
                        powerData.highPower || 0
                    ],
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
                
                // Get relational timeline data from analysis
                const relationalTimeline = analysis.relational?.timeline || [];
                const timeLabels = relationalTimeline.length > 0 
                    ? relationalTimeline.map(item => item.timeblock || 'N/A') 
                    : ['No data'];
                const trustData = relationalTimeline.length > 0 
                    ? relationalTimeline.map(item => item.trust || 3) 
                    : [3];
                const alignmentData = relationalTimeline.length > 0 
                    ? relationalTimeline.map(item => item.alignment || 3) 
                    : [3];
                const careData = relationalTimeline.length > 0 
                    ? relationalTimeline.map(item => item.care || 3) 
                    : [3];
                const belongingData = relationalTimeline.length > 0 
                    ? relationalTimeline.map(item => item.belonging || 3) 
                    : [3];
                
                const relationalCtx = relationalEl.getContext('2d');
                const relationalChart = new Chart(relationalCtx, {
                    type: 'line',
                    data: {
                        labels: timeLabels,
                        datasets: [
                    {
                        label: 'Trust',
                        data: trustData,
                        borderColor: 'rgba(168, 216, 234, 0.8)',
                        backgroundColor: 'rgba(168, 216, 234, 0.2)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Alignment',
                        data: alignmentData,
                        borderColor: 'rgba(168, 230, 207, 0.8)',
                        backgroundColor: 'rgba(168, 230, 207, 0.2)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Care',
                        data: careData,
                        borderColor: 'rgba(212, 165, 245, 0.8)',
                        backgroundColor: 'rgba(212, 165, 245, 0.2)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Belonging',
                        data: belongingData,
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