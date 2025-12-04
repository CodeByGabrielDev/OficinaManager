const API_KEY = "jXRDWsgPum35nyxRWdnyrA==y0lwMHsGGFDcQPZL";


// Lista global para registrar os gráficos
window.graficosRegistrados = [];

function atualizarTemaGraficos() {
    var corTexto = document.body.classList.contains("dark-mode") ? "#ffffff" : "#000000";

    if (window.graficosRegistrados) {
        for (var i = 0; i < window.graficosRegistrados.length; i++) {
            var g = window.graficosRegistrados[i];

            // Pode ser gráfico doughnut (não tem escala)
            if (g.options.scales && g.options.scales.x && g.options.scales.y) {
                g.options.scales.x.ticks.color = corTexto;
                g.options.scales.y.ticks.color = corTexto;
            }

            g.options.plugins.legend.labels.color = corTexto;
            g.update();
        }
    }
}

// Atualiza ao trocar tema
document.getElementById("toggle-theme").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("tema", "dark");
    } else {
        localStorage.setItem("tema", "light");
    }

    atualizarTemaGraficos();
});

// Atualiza quando carregar a página com tema salvo
if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark-mode");
    atualizarTemaGraficos();
}
