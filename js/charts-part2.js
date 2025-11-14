        // Chart instances storage (use global from part1)
        const chartInstances = window.chartInstances || {};

        // Function to initialize charts in part 2
        function initializeChartsPart2() {
            // Sentiment Timeline
            const sentimentEl = document.getElementById('sentimentChart');
            if (sentimentEl) {
                if (chartInstances.sentimentChart) {
                    chartInstances.sentimentChart.destroy();
                }
                const sentimentCtx = sentimentEl.getContext('2d');
                const sentimentChart = new Chart(sentimentCtx, {
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
            chartInstances.sentimentChart = sentimentChart;
            }

            // Convergence/Divergence Timeline
            const convergenceEl = document.getElementById('convergenceChart');
            if (convergenceEl) {
                if (chartInstances.convergenceChart) {
                    chartInstances.convergenceChart.destroy();
                }
                const convergenceCtx = convergenceEl.getContext('2d');
                const convergenceChart = new Chart(convergenceCtx, {
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
            chartInstances.convergenceChart = convergenceChart;
            }

            // Signal vs Noise Chart
            const signalNoiseEl = document.getElementById('signalNoiseChart');
            if (signalNoiseEl) {
                if (chartInstances.signalNoiseChart) {
                    chartInstances.signalNoiseChart.destroy();
                }
                const signalNoiseCtx = signalNoiseEl.getContext('2d');
                const signalNoiseChart = new Chart(signalNoiseCtx, {
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
            chartInstances.signalNoiseChart = signalNoiseChart;
            }

            // Breakthrough Timeline Chart
            const breakthroughsEl = document.getElementById('breakthroughsTimeline');
            if (breakthroughsEl) {
                if (chartInstances.breakthroughsChart) {
                    chartInstances.breakthroughsChart.destroy();
                }
                const breakthroughsCtx = breakthroughsEl.getContext('2d');
                const breakthroughsChart = new Chart(breakthroughsCtx, {
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
            chartInstances.breakthroughsChart = breakthroughsChart;
            }
        } // End of initializeChartsPart2 function

        // Main function that initializes all charts (calls both parts)
        function initializeCharts() {
            if (typeof initializeChartsPart1 === 'function') {
                initializeChartsPart1();
            }
            if (typeof initializeChartsPart2 === 'function') {
                initializeChartsPart2();
            }
        }
        
        // Export to window so it's accessible globally
        window.initializeCharts = initializeCharts;