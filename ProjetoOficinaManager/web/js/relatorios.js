document.addEventListener('DOMContentLoaded', function () {

    // ============================
    // GRÁFICO 1 - ATENDIMENTOS
    // ============================

    var ctxAtendimentos = document.getElementById('chartAtendimentos');

    var graficoAtendimentos = new Chart(ctxAtendimentos, {
        type: 'bar',
        data: {
            labels: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
            datasets: [{
                label: 'Ordens de Serviço (OS)',
                data: [12, 19, 15, 25, 22, 30],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#000000' }
                }
            },
            scales: {
                x: { ticks: { color: '#000000' } },
                y: { ticks: { color: '#000000' }, beginAtZero: true }
            }
        }
    });

    // Registra
    window.graficosRegistrados.push(graficoAtendimentos);

    // ============================
    // GRÁFICO 2 - PEÇAS MAIS USADAS
    // ============================

    var ctxPecas = document.getElementById('chartPecas');

    var graficoPecas = new Chart(ctxPecas, {
        type: 'doughnut',
        data: {
            labels: ['Óleo Motor', 'Filtro de Ar', 'Pastilha Freio', 'Amortecedor'],
            datasets: [{
                label: 'Vendas',
                data: [45, 30, 20, 5],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#000000' }
                }
            }
        }
    });

    // Registra
    window.graficosRegistrados.push(graficoPecas);

    // Ajusta para o tema caso a página carregue no dark
    atualizarTemaGraficos();
});
