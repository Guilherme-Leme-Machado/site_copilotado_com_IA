document.addEventListener("DOMContentLoaded", function () {
    // 1. Gráfico de Linhas: Perfil e Preferências por Geração (Substituindo Tabela 1)
    const ctx1 = document.getElementById('chartSolidaoLinhas');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Geração Z (≤ 1997)', 'Millennials (1980–1996)', 'Geração X (1965–1979)', 'Baby Boomers (1946–1964)'],
                datasets: [
                    {
                        label: 'Sentiram muita solidão ontem (%)',
                        data: [27, 21, 15, 10],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        tension: 0.3,
                        fill: true,
                        pointRadius: 6
                    },
                    {
                        label: 'Preferência: Totalmente Remoto (%)',
                        data: [23, 35, 35, 35],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        tension: 0.3,
                        fill: true,
                        pointRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'top' },
                    title: { display: true, text: 'Tendências Psicossociais e de Modelo de Trabalho por Geração' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 40,
                        ticks: { callback: function(value) { return value + '%'; } }
                    }
                }
            }
        });
    }

    // 2. Gráfico de Pizza: Preferência de Modelo de Trabalho na Geração Z (Destaque da Tabela 1)
    const ctx2 = document.getElementById('chartPreferencaGenZ');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['Modelo Híbrido (71%)', 'Totalmente Remoto (23%)', 'Exclusivamente Presencial (6%)'],
                datasets: [{
                    data: [71, 23, 6],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 99, 132, 0.8)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'bottom' },
                    title: { display: true, text: 'Preferência de Modelo de Trabalho - Geração Z' }
                }
            }
        });
    }

    // 3. Gráfico de Linhas (Comparativo): Saúde Mental e Impacto Organizacional (Gen Z vs Millennials - Tabela 3)
    const ctx3 = document.getElementById('chartSaudeMentalLinhas');
    if (ctx3) {
        new Chart(ctx3, {
            type: 'line',
            data: {
                labels: [
                    'Uso Diário de IA',
                    'Burnout Ativo',
                    'Fadiga Digital',
                    'Intenção de Saída (2 anos)',
                    'Meta Alta Liderança'
                ],
                datasets: [
                    {
                        label: 'Geração Z (%)',
                        data: [74, 47, 58, 31, 6],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        tension: 0.2,
                        pointStyle: 'rectRot',
                        pointRadius: 7
                    },
                    {
                        label: 'Millennials (%)',
                        data: [74, 45, 54, 25, 6],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        tension: 0.2,
                        pointStyle: 'circle',
                        pointRadius: 7
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'top' },
                    title: { display: true, text: 'Comparativo de Indicadores: Geração Z vs Millennials' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 90,
                        ticks: { callback: function(value) { return value + '%'; } }
                    }
                }
            }
        });
    }

    // 4. Gráfico de Pizza: Distribuição de Diagnóstico / Burnout na Geração Z
    const ctx4 = document.getElementById('chartBurnoutPie');
    if (ctx4) {
        new Chart(ctx4, {
            type: 'pie',
            data: {
                labels: ['Burnout Ativo (47%)', 'Fadiga Digital/Estresse (11%)', 'Sem Burnout Ativo (42%)'],
                datasets: [{
                    data: [47, 11, 42],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(75, 192, 192, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'bottom' },
                    title: { display: true, text: 'Prevalência de Burnout e Fadiga na Geração Z' }
                }
            }
        });
    }
});
